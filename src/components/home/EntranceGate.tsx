"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { brand } from "@/data/brand";
import { Sparkles, ArrowRight, RotateCw } from "lucide-react";

/**
 * LEFEMME — CINEMATIC LUXURY FASHION ENTRANCE & EDITORIAL 3D EXPERIENCE
 *
 * Architecture:
 * 1. Immediate Editorial Brand Reveal:
 *    - Minimalist warm ivory canvas with forest green wordmark, masked typography line reveals,
 *      and an animated botanical flower line motif with an elegant, truthful progress bar.
 * 2. True Download & Parse Synchronization:
 *    - Tracks actual GLB download progress (bytes loaded / total).
 *    - Pre-compiles shaders and executes the first valid Three.js render pass in memory.
 * 3. Seamless Dissolve Transition:
 *    - Once the model is genuinely ready, the loader dissolves smoothly into the hero 3D scene.
 *    - The intact Adina handbag is revealed with high-fashion camera movement and soft studio chiaroscuro.
 * 4. Error Resilience:
 *    - If network connectivity fails, a refined retry button and skip action appear gracefully.
 */

let hasPassedEntranceInSession = false;

export function EntranceGate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // DOM Refs for animations
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // 3D Scene Refs
  const threeRefs = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    modelRoot?: THREE.Group;
    keyLight?: THREE.DirectionalLight;
    rimLight?: THREE.DirectionalLight;
    fillLight?: THREE.DirectionalLight;
    isModelReady: boolean;
    mouseX: number;
    mouseY: number;
    targetMouseX: number;
    targetMouseY: number;
    reqId?: number;
    masterTimeline?: gsap.core.Timeline;
  }>({
    isModelReady: false,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  const dismissEntrance = useCallback(() => {
    hasPassedEntranceInSession = true;
    try {
      sessionStorage.setItem(brand.entrance.sessionKey, "1");
    } catch {
      /* ignore */
    }
    setActive(false);
  }, []);

  const handleEnterStore = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const { camera, modelRoot, keyLight } = threeRefs.current;
    const tl = gsap.timeline({
      onComplete: () => dismissEntrance(),
    });

    if (finalCtaRef.current) {
      tl.to(
        finalCtaRef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      );
    }

    if (camera) {
      tl.to(
        camera.position,
        {
          z: 1.6,
          y: -0.05,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0.1
      );
    }

    if (modelRoot) {
      tl.to(
        modelRoot.rotation,
        {
          y: modelRoot.rotation.y + 0.3,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0.1
      );
    }

    if (keyLight) {
      tl.to(
        keyLight,
        {
          intensity: 3.8,
          duration: 0.8,
          ease: "power2.in",
        },
        0.3
      );
    }

    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.75,
          ease: "power2.inOut",
        },
        0.65
      );
    }
  }, [dismissEntrance, isTransitioning]);

  // Session detection & URL params
  useEffect(() => {
    (window as unknown as { __lefemmeReplayEntrance?: () => void }).__lefemmeReplayEntrance = () => {
      hasPassedEntranceInSession = false;
      setActive(true);
    };

    const params = new URLSearchParams(window.location.search);
    const mode = params.get(brand.entrance.replayParam);

    if (mode === "off") {
      return;
    }

    if (mode === "replay") {
      hasPassedEntranceInSession = false;
      const id = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(id);
    }

    if (!hasPassedEntranceInSession) {
      try {
        const stored = sessionStorage.getItem(brand.entrance.sessionKey);
        if (stored === "1") {
          return;
        }
      } catch {
        /* ignore */
      }
      const id = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  // Three.js & Synchronized Loading Orchestration
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FAF7F2"); // Warm ivory
    scene.fog = new THREE.FogExp2("#FAF7F2", 0.028);
    threeRefs.current.scene = scene;

    // 2. Camera — High fashion portrait perspective
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 40);
    camera.position.set(0, 0.05, 3.85); // Preserves complete handbag and handle visibility
    threeRefs.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.04;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    threeRefs.current.renderer = renderer;

    // 4. Soft Luxury Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight("#FFF8EE", 1.8);
    keyLight.position.set(3.2, 4.0, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);
    threeRefs.current.keyLight = keyLight;

    const rimLight = new THREE.DirectionalLight("#ECCB96", 1.3);
    rimLight.position.set(-3.2, 2.8, -2.5);
    scene.add(rimLight);
    threeRefs.current.rimLight = rimLight;

    const fillLight = new THREE.DirectionalLight("#FFFFFF", 0.7);
    fillLight.position.set(0, 1.5, 3.2);
    scene.add(fillLight);
    threeRefs.current.fillLight = fillLight;

    // Atelier Ground Shadow Plane (Receives contact shadows from handbag)
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.05;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Initial loader presentation animation
    if (loaderRef.current) {
      const loaderItems = loaderRef.current.querySelectorAll(".loader-anim-item");
      gsap.fromTo(
        loaderItems,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: "power3.out" }
      );
    }

    // 5. Load Original, Intact adina.glb With Progress Tracking
    const loader = new GLTFLoader();
    let isDisposed = false;

    loader.load(
      "/adina.glb",
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = false; // Prevent self-shadow acne on thin-shell mesh

            if (mesh.material) {
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              mats.forEach((m) => {
                m.side = THREE.FrontSide;
              });
            }
          }
        });

        // Center model geometry
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        // Presentation angles: complete bag and handle visible
        root.rotation.y = -0.35;
        root.rotation.x = 0.02;

        scene.add(root);
        threeRefs.current.modelRoot = root;

        // Pre-compile shaders and perform warm-up render pass
        renderer.compile(scene, camera);
        camera.lookAt(0, -0.06, 0);
        renderer.render(scene, camera);

        threeRefs.current.isModelReady = true;

        // ============================================================
        // SEAMLESS TRANSITION FROM EDITORIAL LOADER TO HERO 3D SCENE
        // ============================================================
        const transitionTl = gsap.timeline({ delay: 0.1 });
        threeRefs.current.masterTimeline = transitionTl;

        // 1. Complete progress bar fill
        if (progressBarRef.current) {
          transitionTl.to(
            progressBarRef.current,
            { width: "100%", duration: 0.4, ease: "power2.out" },
            0
          );
        }

        // 2. Smoothly dissolve loader overlay
        if (loaderRef.current) {
          transitionTl.to(
            loaderRef.current,
            {
              opacity: 0,
              y: -15,
              duration: 0.75,
              ease: "power2.inOut",
              pointerEvents: "none",
            },
            0.3
          );
        }

        // 3. Scene 1 Editorial Typography Reveal
        if (introTextRef.current) {
          const lines = introTextRef.current.querySelectorAll(".mask-line-inner");
          transitionTl.fromTo(
            lines,
            { y: "110%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1.0, stagger: 0.16, ease: "power3.out" },
            0.6
          );

          // Fade out Scene 1 typography as camera approaches
          transitionTl.to(
            introTextRef.current,
            { opacity: 0, y: -20, duration: 0.8, ease: "power2.inOut" },
            2.6
          );
        }

        // 4. Scene 2 Handbag Reveal & Camera Move
        transitionTl.to(
          camera.position,
          { z: 3.45, y: 0.04, duration: 2.2, ease: "power3.out" },
          2.2
        );
        transitionTl.to(
          root.rotation,
          { y: 0.10, x: 0.0, duration: 2.2, ease: "power3.out" },
          2.2
        );

        // 5. Scene 3 Enter the Bloom Club CTA Reveal
        if (finalCtaRef.current) {
          const ctaElements = finalCtaRef.current.querySelectorAll(".cta-fade");
          transitionTl.fromTo(
            finalCtaRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "none" },
            3.6
          );
          transitionTl.fromTo(
            ctaElements,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out" },
            3.6
          );
        }
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const ratio = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
          setDownloadProgress(ratio);
        }
      },
      (err) => {
        console.error("Failed to load adina.glb for entrance:", err);
        setLoadError(true);
      }
    );

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      threeRefs.current.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      threeRefs.current.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation & Render Loop
    let clock = new THREE.Clock();
    const renderLoop = () => {
      threeRefs.current.reqId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      // Mouse inertia
      threeRefs.current.mouseX += (threeRefs.current.targetMouseX - threeRefs.current.mouseX) * 0.045;
      threeRefs.current.mouseY += (threeRefs.current.targetMouseY - threeRefs.current.mouseY) * 0.045;

      const { modelRoot, camera, isModelReady } = threeRefs.current;
      if (modelRoot && isModelReady) {
        modelRoot.rotation.y += (threeRefs.current.mouseX * 0.2 - (modelRoot.rotation.y - 0.10)) * 0.03;
        modelRoot.rotation.x += (-threeRefs.current.mouseY * 0.12 - modelRoot.rotation.x) * 0.03;
      }

      if (camera) {
        camera.lookAt(0, -0.06, 0);
        renderer.render(scene, camera);
      }
    };
    renderLoop();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      if (threeRefs.current.masterTimeline) threeRefs.current.masterTimeline.kill();
      if (threeRefs.current.reqId) cancelAnimationFrame(threeRefs.current.reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [active, dismissEntrance, retryCount]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-hidden bg-[#FAF7F2] font-sans select-none flex flex-col justify-between"
    >
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-[0.28em] uppercase text-forest font-medium">
            Lefemme
          </span>
          <span className="h-px w-6 bg-gold/50" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-burgundy font-medium">
            {brand.community}
          </span>
        </div>

        <button
          onClick={dismissEntrance}
          className="text-[11px] uppercase tracking-[0.24em] text-forest/70 hover:text-forest transition-colors py-1.5 px-3.5 rounded-full border border-forest/15 hover:border-forest/40 bg-white/40 backdrop-blur-sm"
        >
          Skip Entrance
        </button>
      </header>

      {/* ============================================================ */}
      {/* LUXURY EDITORIAL LOADER OVERLAY                              */}
      {/* ============================================================ */}
      <div
        ref={loaderRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FAF7F2] px-6 transition-opacity"
      >
        <div className="max-w-md w-full flex flex-col items-center text-center">
          {/* Animated Botanical Motif */}
          <div className="loader-anim-item relative w-12 h-12 mb-6 text-burgundy">
            <svg viewBox="0 0 48 48" className="w-full h-full animate-[spin_16s_linear_infinite]" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#ECCB96" strokeWidth="0.8" strokeDasharray="3 3" />
              <path
                d="M24 10C24 10 27.5 17 27.5 24C27.5 31 24 38 24 38C24 38 20.5 31 20.5 24C20.5 17 24 10 24 10Z"
                fill="#6E2C3A"
                fillOpacity="0.25"
                stroke="#6E2C3A"
                strokeWidth="0.8"
              />
              <path
                d="M10 24C10 24 17 20.5 24 20.5C31 20.5 38 24 38 24C38 24 31 27.5 24 27.5C17 27.5 10 24 10 24Z"
                fill="#6E2C3A"
                fillOpacity="0.25"
                stroke="#6E2C3A"
                strokeWidth="0.8"
              />
              <circle cx="24" cy="24" r="3" fill="#C4A574" />
            </svg>
          </div>

          <span className="loader-anim-item text-[10px] uppercase tracking-[0.34em] text-burgundy font-medium mb-2">
            Atelier Lefemme · Haute Maroquinerie
          </span>

          <h2 className="loader-anim-item font-serif text-3xl sm:text-4xl font-light text-forest tracking-tight leading-tight mb-2">
            A little bloom for <span className="italic text-burgundy font-normal">every bag.</span>
          </h2>

          <p className="loader-anim-item text-xs text-ink-soft/80 font-light max-w-xs leading-relaxed mb-8">
            Preparing your sculptural 3D experience…
          </p>

          {/* Minimalist Champagne Progress Indicator */}
          {!loadError ? (
            <div className="loader-anim-item w-48 flex flex-col items-center gap-2">
              <div className="w-full h-[1.5px] bg-forest/10 rounded-full overflow-hidden relative">
                {downloadProgress !== null ? (
                  <div
                    ref={progressBarRef}
                    className="h-full bg-forest transition-all duration-300 ease-out"
                    style={{ width: `${downloadProgress}%` }}
                  />
                ) : (
                  <div
                    ref={progressBarRef}
                    className="h-full bg-forest w-1/3 rounded-full animate-[indeterminate_1.6s_easeInOut_infinite]"
                  />
                )}
              </div>
              <span className="text-[10px] tracking-[0.24em] uppercase text-taupe/80 font-mono">
                {downloadProgress !== null ? `${downloadProgress}%` : "CRAFTING"}
              </span>
            </div>
          ) : (
            <div className="loader-anim-item flex flex-col items-center gap-3 mt-2">
              <p className="text-xs text-burgundy font-light">Unable to load 3D asset at this moment.</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setLoadError(false);
                    setRetryCount((c) => c + 1);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-forest/20 text-[10px] uppercase tracking-wider text-forest hover:bg-forest hover:text-ivory transition-colors"
                >
                  <RotateCw className="w-3 h-3" /> Retry
                </button>
                <button
                  onClick={dismissEntrance}
                  className="px-3.5 py-1.5 rounded-full bg-forest text-[10px] uppercase tracking-wider text-ivory hover:bg-forest-soft transition-colors"
                >
                  Continue to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scene 1: Typography Mask Reveal (Presented once model is ready) */}
      <div
        ref={introTextRef}
        className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-2 pointer-events-none my-auto opacity-0"
      >
        <div className="overflow-hidden">
          <span className="mask-line-inner block text-[11px] uppercase tracking-[0.34em] text-burgundy font-medium">
            Atelier Lefemme · Haute Maroquinerie
          </span>
        </div>

        <div className="overflow-hidden mt-1">
          <h1 className="mask-line-inner block font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-forest tracking-tight leading-tight">
            A little bloom for <span className="italic text-burgundy font-normal">every bag.</span>
          </h1>
        </div>

        <div className="overflow-hidden mt-2">
          <p className="mask-line-inner block text-xs sm:text-sm text-ink-soft/80 font-light max-w-md leading-relaxed">
            Handcrafted botanical silhouettes sculpted in supple calfskin and finished with champagne gold accents.
          </p>
        </div>
      </div>

      {/* Scene 3: Final Hero Call to Action */}
      <div
        ref={finalCtaRef}
        className="relative z-20 max-w-lg mx-auto px-6 pb-12 sm:pb-16 text-center flex flex-col items-center gap-3 pointer-events-auto opacity-0"
      >
        <span className="cta-fade text-[10px] uppercase tracking-[0.32em] text-gold font-medium">
          House Signature Piece · Adina
        </span>

        <h2 className="cta-fade font-serif text-3xl sm:text-4xl font-light text-forest tracking-tight">
          Unclasp your <span className="italic text-burgundy font-normal">floral world.</span>
        </h2>

        <div className="cta-fade mt-3 flex items-center gap-4">
          <button
            onClick={handleEnterStore}
            className="group inline-flex items-center gap-3 bg-forest px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.22em] text-ivory shadow-[0_10px_24px_rgba(30,58,47,0.22)] transition-all hover:bg-forest-soft hover:shadow-[0_14px_32px_rgba(30,58,47,0.32)] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold group-hover:rotate-12 transition-transform" />
            <span>ENTER THE BLOOM CLUB</span>
            <ArrowRight className="w-3.5 h-3.5 text-ivory/70 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <span className="cta-fade text-[10px] text-taupe tracking-widest uppercase mt-1">
          Drag to explore in 360°
        </span>
      </div>
    </div>
  );
}
