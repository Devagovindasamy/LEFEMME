import test from "node:test";
import assert from "node:assert/strict";

// Simulated SessionStorage
class MockSessionStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.get(key) ?? null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

// Simulated environment
function createPopupRunner({
  popupDelayMs = 30_000,
  sessionDismissKey = "lefemme-bloom-popup-dismissed",
  sessionJoinedKey = "lefemme-bloom-joined",
  sessionStartKey = "lefemme-bloom-session-start",
  sessionStorage = new MockSessionStorage(),
} = {}) {
  let currentTime = 1000000;
  let nextTimerId = 1;
  const activeTimers = new Map();

  const fakeNow = () => currentTime;
  const fakeSetTimeout = (fn, delay) => {
    const id = nextTimerId++;
    activeTimers.set(id, { fn, runAt: currentTime + delay });
    return id;
  };
  const fakeClearTimeout = (id) => {
    activeTimers.delete(id);
  };

  const advanceTimeBy = (ms) => {
    currentTime += ms;
    // Execute any timers that have matured, in order of runAt
    let executed = true;
    while (executed) {
      executed = false;
      let earliestId = null;
      let earliestTime = Infinity;
      for (const [id, timer] of activeTimers.entries()) {
        if (timer.runAt <= currentTime && timer.runAt < earliestTime) {
          earliestTime = timer.runAt;
          earliestId = id;
        }
      }
      if (earliestId !== null) {
        const { fn } = activeTimers.get(earliestId);
        activeTimers.delete(earliestId);
        fn();
        executed = true;
      }
    }
  };

  // Simulated BloomClubPopup component instance
  function mountComponent() {
    let isOpen = false;
    let unmounted = false;

    const getSessionItem = (key) => sessionStorage.getItem(key);
    const setSessionItem = (key, val) => sessionStorage.setItem(key, val);

    let timerId = null;

    // Effect
    if (!getSessionItem(sessionDismissKey) && !getSessionItem(sessionJoinedKey)) {
      let startTime;
      const storedStart = getSessionItem(sessionStartKey);
      if (storedStart) {
        const parsed = parseInt(storedStart, 10);
        if (!Number.isNaN(parsed) && parsed > 0) {
          startTime = parsed;
        } else {
          startTime = fakeNow();
          setSessionItem(sessionStartKey, String(startTime));
        }
      } else {
        startTime = fakeNow();
        setSessionItem(sessionStartKey, String(startTime));
      }

      const elapsed = fakeNow() - startTime;
      const remainingMs = Math.max(0, popupDelayMs - elapsed);

      timerId = fakeSetTimeout(() => {
        if (
          !getSessionItem(sessionDismissKey) &&
          !getSessionItem(sessionJoinedKey)
        ) {
          isOpen = true;
        }
      }, remainingMs);
    }

    const dismiss = () => {
      setSessionItem(sessionDismissKey, "1");
      isOpen = false;
    };

    const submit = () => {
      setSessionItem(sessionJoinedKey, "1");
      setSessionItem(sessionDismissKey, "1");
      isOpen = false;
    };

    const unmount = () => {
      unmounted = true;
      if (timerId !== null) {
        fakeClearTimeout(timerId);
      }
    };

    return {
      get isOpen() {
        return isOpen;
      },
      dismiss,
      submit,
      unmount,
      getActiveTimerCount() {
        return activeTimers.size;
      },
    };
  }

  return {
    sessionStorage,
    advanceTimeBy,
    mountComponent,
    getActiveTimerCount() {
      return activeTimers.size;
    },
    getCurrentTime() {
      return currentTime;
    },
  };
}

test("At 0 seconds: popup must remain hidden", () => {
  const env = createPopupRunner();
  const component = env.mountComponent();
  assert.equal(component.isOpen, false);
});

test("At 10 seconds: popup must remain hidden", () => {
  const env = createPopupRunner();
  const component = env.mountComponent();
  env.advanceTimeBy(10_000);
  assert.equal(component.isOpen, false);
});

test("At 29 seconds: popup must remain hidden", () => {
  const env = createPopupRunner();
  const component = env.mountComponent();
  env.advanceTimeBy(29_000);
  assert.equal(component.isOpen, false);
});

test("At 30 seconds or later: popup appears if not dismissed or submitted", () => {
  const env = createPopupRunner();
  const component = env.mountComponent();
  env.advanceTimeBy(29_999);
  assert.equal(component.isOpen, false);
  env.advanceTimeBy(1);
  assert.equal(component.isOpen, true);
});

test("Internal navigation: does not restart timer unnecessarily and does not trigger popup immediately", () => {
  const env = createPopupRunner();
  // Visitor lands on home page (t = 0)
  let component = env.mountComponent();
  assert.equal(component.isOpen, false);

  // Visitor spends 12 seconds on home page
  env.advanceTimeBy(12_000);
  assert.equal(component.isOpen, false);

  // Visitor navigates to /handbags (component unmounts from previous page and mounts on new page)
  component.unmount();
  component = env.mountComponent();

  // Must NOT trigger immediately upon navigation!
  assert.equal(component.isOpen, false);

  // Advance by 17 seconds (total 29 seconds elapsed) -> must still be hidden
  env.advanceTimeBy(17_000);
  assert.equal(component.isOpen, false);

  // Advance 1 more second (total 30 seconds elapsed) -> must appear
  env.advanceTimeBy(1_000);
  assert.equal(component.isOpen, true);
});

test("Dismissing the popup: must not cause it to reopen on next render or internal navigation", () => {
  const env = createPopupRunner();
  let component = env.mountComponent();

  // Advance to 30s to trigger popup
  env.advanceTimeBy(30_000);
  assert.equal(component.isOpen, true);

  // Visitor dismisses popup
  component.dismiss();
  assert.equal(component.isOpen, false);

  // Visitor navigates to another page
  component.unmount();
  component = env.mountComponent();

  // Must not open immediately or after more time
  assert.equal(component.isOpen, false);
  env.advanceTimeBy(60_000);
  assert.equal(component.isOpen, false);
});

test("Submitting the newsletter: must prevent popup from appearing", () => {
  const env = createPopupRunner();
  let component = env.mountComponent();

  // Visitor fills out footer form at 10 seconds
  env.advanceTimeBy(10_000);
  component.submit();

  // Advance past 30 seconds
  env.advanceTimeBy(30_000);
  assert.equal(component.isOpen, false);

  // Navigate to another page
  component.unmount();
  component = env.mountComponent();
  assert.equal(component.isOpen, false);
});

test("Component unmount: timer is properly cleaned up (no memory leaks or duplicate triggers)", () => {
  const env = createPopupRunner();
  const component = env.mountComponent();
  assert.equal(env.getActiveTimerCount(), 1);

  component.unmount();
  assert.equal(env.getActiveTimerCount(), 0);
});
