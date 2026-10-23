"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { brand } from "@/data/brand";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * LEFEMME — CINEMATIC LUXURY FASHION ENTRANCE EXPERIENCE
 *
 * Storyboard:
 * - Scene 1: Typography mask reveal on warm ivory ("A little bloom for every bag").
 * - Scene 2: Intact Adina handbag reveal with soft chiaroscuro & golden champagne rim light.
 * - Scene 3: Camera push-in with gentle 3D rotation & directional light sweep across leather & gold hardware.
 * - Scene 4: The Bloom Moment — subtle, curved 3D rose petals drifting through foreground.
 * - Scene 5: Enter the Store CTA ("ENTER THE BLOOM CLUB"), Skip Entrance, seamless dissolve to storefront.
 */

let hasPassedEntranceInSession = false;

export function EntranceGate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Scene DOM Refs for masked typography reveals
  const introTextRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 3D Scene Refs
  const threeRefs = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    modelRoot?: THREE.Group;
    keyLight?: THREE.DirectionalLight;
    rimLight?: THREE.DirectionalLight;
    fillLight?: THREE.DirectionalLight;
    mouseX: number;
    mouseY: number;
    targetMouseX: number;
    targetMouseY: number;
    reqId?: number;
  }>({
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

  // Three.js & GSAP 5-Scene Orchestration
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
    // Soft Key Light (Studio Softbox)
    const keyLight = new THREE.DirectionalLight("#FFF8EE", 1.8);
    keyLight.position.set(3.2, 4.0, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);
    threeRefs.current.keyLight = keyLight;

    // Champagne Rim Light (Accenting gold hardware and leather silhouette)
    const rimLight = new THREE.DirectionalLight("#ECCB96", 1.3);
    rimLight.position.set(-3.2, 2.8, -2.5);
    scene.add(rimLight);
    threeRefs.current.rimLight = rimLight;

    // Soft Fill Light
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

    // 5. Load Original, Intact adina.glb Without Geometry Manipulation or Material Overwrites
    const loader = new GLTFLoader();
    loader.load(
      "/adina.glb",
      (gltf) => {
        const root = gltf.scene;

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            // Enable casting shadow onto ground plane, but preserve native material properties
            mesh.castShadow = true;
            mesh.receiveShadow = false; // Prevent self-shadow acne on thin-shell mesh

            if (mesh.material) {
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              mats.forEach((m) => {
                // Ensure front-side rendering to prevent backface z-fighting/shadow artifacts
                m.side = THREE.FrontSide;
              });
            }
          }
        });

        // Center model geometry perfectly
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
        setModelLoaded(true);

        // ==========================================
        // GSAP CINEMATIC LUXURY TIMELINE
        // ==========================================
        const masterTl = gsap.timeline({ delay: 0.2 });

        // --- SCENE 1: Typography Mask Reveal ---
        if (introTextRef.current) {
          const lines = introTextRef.current.querySelectorAll(".mask-line-inner");
          masterTl.fromTo(
            lines,
            { y: "110%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1.1, stagger: 0.18, ease: "power3.out" },
            0.1
          );

          // Fade out Scene 1 typography as camera approaches
          masterTl.to(
            introTextRef.current,
            { opacity: 0, y: -20, duration: 0.8, ease: "power2.inOut" },
            2.2
          );
        }

        // --- SCENE 2: Handbag Reveal & Camera Move ---
        // Smooth camera push-in and subtle luxury turntable rotation
        masterTl.to(
          camera.position,
          { z: 3.45, y: 0.04, duration: 2.2, ease: "power3.out" },
          1.8
        );
        masterTl.to(
          root.rotation,
          { y: 0.10, x: 0.0, duration: 2.2, ease: "power3.out" },
          1.8
        );

        // --- SCENE 3: Enter the Bloom Club CTA Reveal ---
        if (finalCtaRef.current) {
          const ctaElements = finalCtaRef.current.querySelectorAll(".cta-fade");
          masterTl.fromTo(
            finalCtaRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "none" },
            3.2
          );
          masterTl.fromTo(
            ctaElements,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out" },
            3.2
          );
        }
      },
      undefined,
      (err) => {
        console.error("Failed to load adina.glb for entrance:", err);
        dismissEntrance();
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

      const { modelRoot, camera } = threeRefs.current;
      if (modelRoot && modelLoaded) {
        modelRoot.rotation.y += (threeRefs.current.mouseX * 0.2 - (modelRoot.rotation.y - 0.15)) * 0.03;
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
      if (threeRefs.current.reqId) cancelAnimationFrame(threeRefs.current.reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [active, dismissEntrance, modelLoaded]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-hidden bg-[#FAF7F2] font-sans select-none flex flex-col justify-between"
    >
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6">
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

      {/* Scene 1: Typography Mask Reveal */}
      <div
        ref={introTextRef}
        className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-2 pointer-events-none my-auto"
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

      {/* Scene 5: Final Reveal Call to Action */}
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
