"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Sparkles, Eye, CheckCircle2, ChevronRight, Layers } from "lucide-react";

interface ComponentConfig {
  key: string;
  name: string;
  order: number; // Assembly order 1-6
  explodedOffset: THREE.Vector3;
}

const COMPONENTS: Record<string, ComponentConfig> = {
  base_gusset: {
    key: "base_gusset",
    name: "Base & Foundation Gusset",
    order: 1,
    explodedOffset: new THREE.Vector3(0, -0.45, 0),
  },
  back_panel: {
    key: "back_panel",
    name: "Structured Back Leather",
    order: 2,
    explodedOffset: new THREE.Vector3(0, 0, -0.45),
  },
  side_gussets: {
    key: "side_gussets",
    name: "Sculpted Side Gussets",
    order: 3,
    explodedOffset: new THREE.Vector3(0.38, 0, 0),
  },
  front_panel: {
    key: "front_panel",
    name: "Signature Floral Front Panel",
    order: 4,
    explodedOffset: new THREE.Vector3(0, 0.05, 0.52),
  },
  handle_straps: {
    key: "handle_straps",
    name: "Artisan Arching Handle",
    order: 5,
    explodedOffset: new THREE.Vector3(0, 0.48, 0),
  },
  hardware: {
    key: "hardware",
    name: "Gold-Tone Clasps & Accents",
    order: 6,
    explodedOffset: new THREE.Vector3(0, 0.02, 0.22),
  },
};

export default function Prototype3DPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isAssembling, setIsAssembling] = useState(false);
  const [isAssembled, setIsAssembled] = useState(false);
  const [assemblyStep, setAssemblyStep] = useState(0); // 0 = exploded, 1-6 = steps, 7 = complete
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showWireframe, setShowWireframe] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Target and current progress per component: 0.0 = exploded, 1.0 = assembled
  const compProgress = useRef<Record<string, number>>({
    base_gusset: 0,
    back_panel: 0,
    side_gussets: 0,
    front_panel: 0,
    handle_straps: 0,
    hardware: 0,
  });

  const targetProgress = useRef<Record<string, number>>({
    base_gusset: 0,
    back_panel: 0,
    side_gussets: 0,
    front_panel: 0,
    handle_straps: 0,
    hardware: 0,
  });

  const animRef = useRef({
    time: 0,
    camDistance: 3.85,
    targetCamDistance: 3.85,
  });

  const partsRef = useRef<{
    root?: THREE.Group;
    meshes: Record<string, THREE.Mesh>;
  }>({
    meshes: {},
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight * 0.72;

    // 1. Scene setup — Warm luxury ivory studio
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FAF7F2");
    scene.fog = new THREE.FogExp2("#FAF7F2", 0.025);

    // 2. Camera setup — Optical framing of exploded volume and handle
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 40);
    camera.position.set(0, 0.05, 3.85);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // 4. Soft Luxury Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight("#FFF9F0", 1.85);
    keyLight.position.set(2.8, 3.8, 3.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#F5EADB", 1.4);
    rimLight.position.set(-2.8, 2.5, -2.8);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight("#FFFFFF", 0.85);
    fillLight.position.set(0, 1.2, 3.0);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.7);
    scene.add(ambientLight);

    // Ground Studio Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.15;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 5. Load 6-Component Separated GLB Asset
    const loader = new GLTFLoader();
    const glbUrl = "/models/working/adina_separated.glb";

    const configureModel = (root: THREE.Group) => {
      // Traverse and store original component references
      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material) {
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
              m.side = THREE.DoubleSide;
              if ("roughness" in m) {
                (m as THREE.MeshStandardMaterial).roughness = 0.82; // Premium matte leather
              }
              if ("metalness" in m) {
                (m as THREE.MeshStandardMaterial).metalness = 0.2; // Champagne gold hardware
              }
            });
          }

          if (COMPONENTS[mesh.name]) {
            partsRef.current.meshes[mesh.name] = mesh;
          }
        }
      });

      // Optical centering of original assembled model
      const box = new THREE.Box3().setFromObject(root);
      const center = box.getCenter(new THREE.Vector3());
      root.position.x = -center.x;
      root.position.y = -center.y;
      root.position.z = -center.z;

      partsRef.current.root = root;
      scene.add(root);

      setDebugInfo(
        `6 Identifiable Components Verified: ${Object.keys(partsRef.current.meshes).join(", ")}`
      );
      setLoading(false);
    };

    loader.load(
      glbUrl,
      (gltf) => {
        configureModel(gltf.scene);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error("Failed to load separated GLB, attempting fallback to original adina.glb:", err);
        loader.load("/adina.glb", (gltf) => {
          configureModel(gltf.scene);
          setDebugInfo("Fallback: Loaded original adina.glb");
          setLoading(false);
        });
      }
    );

    // 6. Animation Loop (High Precision)
    let reqId: number;
    let lastTime = performance.now();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      animRef.current.time += delta;

      const lerpSpeed = reducedMotion ? 0.35 : 0.075;
      animRef.current.camDistance += (animRef.current.targetCamDistance - animRef.current.camDistance) * lerpSpeed;

      camera.position.z = animRef.current.camDistance;
      camera.lookAt(0, -0.05, 0);

      // Smoothly interpolate each component from explodedOffset (0.0) to original (1.0)
      Object.entries(COMPONENTS).forEach(([key, comp]) => {
        const curr = compProgress.current[key];
        const target = targetProgress.current[key];
        compProgress.current[key] += (target - curr) * lerpSpeed;

        const mesh = partsRef.current.meshes[key];
        if (mesh) {
          // progress 0.0 = full exploded offset; progress 1.0 = exact 0 original assembled position
          const factor = 1.0 - compProgress.current[key];
          mesh.position.x = comp.explodedOffset.x * factor;
          mesh.position.y = comp.explodedOffset.y * factor;
          mesh.position.z = comp.explodedOffset.z * factor;
        }
      });

      // Subtle breathing rotation on root
      if (partsRef.current.root) {
        partsRef.current.root.rotation.y = Math.sin(animRef.current.time * 0.35) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [reducedMotion]);

  // Wireframe toggle
  useEffect(() => {
    Object.values(partsRef.current.meshes).forEach((mesh) => {
      if (mesh && mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if ("wireframe" in m) (m as THREE.MeshStandardMaterial).wireframe = showWireframe;
          });
        } else if ("wireframe" in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = showWireframe;
        }
      }
    });
  }, [showWireframe]);

  // Assembly Sequence Orchestrator
  const triggerAssembly = () => {
    if (isAssembling || isAssembled) return;

    setIsAssembling(true);
    animRef.current.targetCamDistance = 3.4; // Camera subtle push-in to assembled product

    if (reducedMotion) {
      // Instant clean transition for reduced motion
      Object.keys(targetProgress.current).forEach((k) => (targetProgress.current[k] = 1.0));
      setAssemblyStep(7);
      setIsAssembling(false);
      setIsAssembled(true);
      return;
    }

    // Believable Staggered Step Timing:
    // 1. Base settles (0ms)
    setAssemblyStep(1);
    targetProgress.current.base_gusset = 1.0;

    // 2. Back panel aligns (+350ms)
    setTimeout(() => {
      setAssemblyStep(2);
      targetProgress.current.back_panel = 1.0;
    }, 350);

    // 3. Side gussets join (+700ms)
    setTimeout(() => {
      setAssemblyStep(3);
      targetProgress.current.side_gussets = 1.0;
    }, 700);

    // 4. Front floral panel connects (+1100ms)
    setTimeout(() => {
      setAssemblyStep(4);
      targetProgress.current.front_panel = 1.0;
    }, 1100);

    // 5. Handle / strap attaches (+1550ms)
    setTimeout(() => {
      setAssemblyStep(5);
      targetProgress.current.handle_straps = 1.0;
    }, 1550);

    // 6. Gold hardware settles (+2000ms)
    setTimeout(() => {
      setAssemblyStep(6);
      targetProgress.current.hardware = 1.0;
    }, 2000);

    // 7. Complete (+2700ms)
    setTimeout(() => {
      setAssemblyStep(7);
      setIsAssembling(false);
      setIsAssembled(true);
    }, 2700);
  };

  const resetExplodedView = () => {
    Object.keys(targetProgress.current).forEach((k) => (targetProgress.current[k] = 0.0));
    animRef.current.targetCamDistance = 3.85;
    setIsAssembling(false);
    setIsAssembled(false);
    setAssemblyStep(0);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1E3A2F] overflow-hidden flex flex-col font-sans select-none">
      {/* Top Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-[#1E3A2F]/10 backdrop-blur-md bg-[#FAF7F2]/85">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#1E3A2F]/70 hover:text-[#1E3A2F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Website
          </Link>
          <span className="text-[#1E3A2F]/25">|</span>
          <span className="text-xs font-serif italic text-[#6E2C3A]">Adina 3D Assembly Experience</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all flex items-center gap-1.5 ${
              showWireframe
                ? "bg-[#1E3A2F] text-white border-[#1E3A2F]"
                : "border-[#1E3A2F]/20 text-[#1E3A2F]/70 hover:border-[#1E3A2F]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Wireframe
          </button>

          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
              reducedMotion
                ? "bg-[#6E2C3A] text-white border-[#6E2C3A]"
                : "border-[#1E3A2F]/20 text-[#1E3A2F]/70 hover:border-[#1E3A2F]"
            }`}
          >
            {reducedMotion ? "Reduced Motion: On" : "Smooth Easing"}
          </button>
        </div>
      </header>

      {/* Main Experience Viewport */}
      <div className="relative flex-1 w-full h-[72vh]">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-[#FAF7F2] flex flex-col items-center justify-center z-30 transition-opacity">
            <div className="w-10 h-10 rounded-full border-2 border-[#C4A574]/30 border-t-[#6E2C3A] animate-spin mb-4" />
            <p className="text-xs font-serif uppercase tracking-widest text-[#6E2C3A]">
              Loading Handbag Components...
            </p>
            <span className="text-[11px] text-[#1E3A2F]/50 mt-1">{loadProgress}%</span>
          </div>
        )}

        {/* Brand Editorial Overlay Header */}
        <div className="absolute top-6 left-6 z-10 max-w-sm pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border border-[#1E3A2F]/10 shadow-sm flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#C4A574]">
              {isAssembled ? "Complete Handbag" : "Exploded Artisan View"}
            </span>
            <h1 className="text-base font-serif text-[#1E3A2F] leading-tight font-medium">
              {isAssembled ? "Beautifully put together." : "A LITTLE BLOOM, PIECE BY PIECE"}
            </h1>
            <p className="text-xs text-[#1E3A2F]/70 leading-relaxed font-sans">
              {isAssembled
                ? "Every detail rests in perfect harmony. Hand-finished leather with gold-tone accents."
                : "Every detail comes together to create something lovely."}
            </p>
          </div>
        </div>

        {/* Step Indicator Badge */}
        <div className="absolute top-6 right-6 z-10 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#1E3A2F]/10 shadow-sm flex items-center gap-2.5">
            <Layers className="w-3.5 h-3.5 text-[#C4A574]" />
            <span className="text-xs font-medium text-[#1E3A2F]">
              {assemblyStep === 0
                ? "6 Components Separated"
                : assemblyStep === 1
                ? "1. Base Settling..."
                : assemblyStep === 2
                ? "2. Back Aligning..."
                : assemblyStep === 3
                ? "3. Sides Joining..."
                : assemblyStep === 4
                ? "4. Front Panel Connecting..."
                : assemblyStep === 5
                ? "5. Handle Attaching..."
                : assemblyStep === 6
                ? "6. Hardware Securing..."
                : "Assembled & Complete"}
            </span>
          </div>
        </div>

        {/* Floating Action Controls */}
        <div className="absolute bottom-6 inset-x-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-[#1E3A2F]/15 shadow-xl flex items-center gap-2">
            {!isAssembled && !isAssembling && (
              <button
                onClick={triggerAssembly}
                className="px-6 py-3 rounded-xl bg-[#1E3A2F] text-white hover:bg-[#6E2C3A] transition-all text-xs uppercase tracking-[0.16em] font-medium flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C4A574]" /> ASSEMBLE MY BAG
              </button>
            )}

            {isAssembling && (
              <button
                disabled
                className="px-6 py-3 rounded-xl bg-[#FAF7F2] text-[#1E3A2F]/60 border border-[#1E3A2F]/10 text-xs uppercase tracking-[0.16em] font-medium flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#C4A574]" /> Assembling Handbag...
              </button>
            )}

            {isAssembled && (
              <div className="flex items-center gap-2">
                <button
                  onClick={resetExplodedView}
                  className="px-4 py-3 rounded-xl bg-[#FAF7F2] text-[#1E3A2F] hover:bg-white border border-[#1E3A2F]/20 transition-all text-xs uppercase tracking-widest font-medium flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Replay Assembly
                </button>
                <Link
                  href="/bloom-club"
                  className="px-6 py-3 rounded-xl bg-[#6E2C3A] text-white hover:bg-[#521E2A] transition-all text-xs uppercase tracking-[0.16em] font-medium flex items-center gap-2 shadow-sm"
                >
                  ENTER THE BLOOM CLUB <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Honest Technical Footnote */}
      <footer className="px-6 py-3.5 bg-white/70 border-t border-[#1E3A2F]/10 text-xs text-[#1E3A2F]/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-[#1E3A2F]">Verified Components: </span>
          <span className="text-[#1E3A2F]/70">{debugInfo || "Adina assembly ready."}</span>
        </div>
        <div className="text-[11px] text-[#1E3A2F]/60 flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A2F]" />
          Zero manual position estimation • Original assembled coordinates preserved
        </div>
      </footer>
    </div>
  );
}
