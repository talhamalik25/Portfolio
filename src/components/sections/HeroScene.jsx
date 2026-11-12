"use client";

import { useRef, useState, useEffect, Suspense, useSyncExternalStore, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function subscribeReducedMotion(callback) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionServerSnapshot() {
  return false;
}

/**
 * ScreenDisplay
 * Preloads and textures the active project screenshot onto the 16:10 display plane.
 */
function ScreenDisplay({ activeProject }) {
  const textures = useTexture({
    dentora: "/images/projects/dentora.png",
    jewellery: "/images/projects/jewellery-store.jpg",
    malik: "/images/projects/malik-enterprices.jpg",
  });

  const activeTex = textures[activeProject] || textures.dentora;

  useEffect(() => {
    Object.values(textures).forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
    });
  }, [textures]);

  return (
    <meshBasicMaterial
      map={activeTex}
      toneMapped={false}
    />
  );
}

/**
 * RealisticWorkstationLaptop
 *
 * Meticulously modeled 16-inch modern unibody workstation laptop:
 * - Rounded-corner unibody dark graphite aluminum chassis (#1a1a1d, metallic 0.88, roughness 0.28)
 * - Chamfered specular perimeter lip catching crisp studio rim reflections
 * - Recessed matte keyboard deck with 5 individual rows of keycaps and illuminated spacebar
 * - Precision glass trackpad with hairline border
 * - Cylindrical rear hinge assembly
 * - 16:10 display lid opened at an ergonomic 108° viewing angle
 * - High-resolution active project screen display casting authentic illumination onto the keyboard
 */
function RealisticWorkstationLaptop({ activeProject, interactionRef, isInteracting }) {
  const groupRef = useRef(null);
  const restingRotation = useMemo(() => ({ x: 0.1, y: -0.52 }), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const inter = interactionRef.current;

    if (!inter.isDragging) {
      // Natural inertial velocity decay
      inter.velocity.x *= 0.92;
      inter.velocity.y *= 0.92;

      // Apply coasting velocity
      inter.rotation.y += inter.velocity.x;
      inter.rotation.x += inter.velocity.y;

      // Gentle spring-return toward resting beauty angle when settled
      const returnFactor = 0.035;
      inter.rotation.x = THREE.MathUtils.lerp(
        inter.rotation.x,
        restingRotation.x + inter.mouse.y * 0.08,
        returnFactor,
      );
      inter.rotation.y = THREE.MathUtils.lerp(
        inter.rotation.y,
        restingRotation.y + inter.mouse.x * 0.12,
        returnFactor,
      );

      // Subtle breathing idle motion
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = -0.32 + Math.sin(t * 1.4) * 0.025;
    } else {
      // Direct drag manipulation
      inter.rotation.y += inter.velocity.x;
      inter.rotation.x += inter.velocity.y;
    }

    // Strict safety limits to prevent unnatural inversion or lost angles
    inter.rotation.x = THREE.MathUtils.clamp(inter.rotation.x, -0.15, 0.42);
    inter.rotation.y = THREE.MathUtils.clamp(inter.rotation.y, -1.35, 0.35);

    // Smoothly apply rotation to group
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      inter.rotation.x,
      0.15,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      inter.rotation.y,
      0.15,
    );
  });

  // Materials with authentic PBR calibration
  const aluminumDark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#19191c"),
        roughness: 0.28,
        metalness: 0.9,
      }),
    [],
  );

  const aluminumEdge = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a2a2e"),
        roughness: 0.22,
        metalness: 0.94,
      }),
    [],
  );

  const keyboardWellMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0c0c0e"),
        roughness: 0.65,
        metalness: 0.2,
      }),
    [],
  );

  const keycapMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#161619"),
        roughness: 0.5,
        metalness: 0.35,
      }),
    [],
  );

  const trackpadMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#202024"),
        roughness: 0.18,
        metalness: 0.82,
      }),
    [],
  );

  const bezelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#080809"),
        roughness: 0.1,
        metalness: 0.15,
      }),
    [],
  );

  const hingeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111113"),
        roughness: 0.35,
        metalness: 0.92,
      }),
    [],
  );

  const accentGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#EB5002"),
        emissive: new THREE.Color("#EB5002"),
        emissiveIntensity: 0.8,
      }),
    [],
  );

  return (
    <group ref={groupRef} position={[0, -0.32, 0]} rotation={[0.1, -0.52, 0]}>
      {/* ================= 1. BASE / LOWER CHASSIS ================= */}
      <group position={[0, 0, 0]}>
        {/* Main Aluminum Unibody Slab */}
        <mesh material={aluminumDark} position={[0, -0.065, 0]}>
          <boxGeometry args={[4.1, 0.13, 2.7]} />
        </mesh>

        {/* Chamfered Perimeter Rim Highlight */}
        <mesh material={aluminumEdge} position={[0, -0.125, 0]}>
          <boxGeometry args={[4.04, 0.012, 2.64]} />
        </mesh>

        {/* Front Opening Thumb Scoop */}
        <mesh material={aluminumEdge} position={[0, -0.015, 1.346]}>
          <boxGeometry args={[0.55, 0.03, 0.012]} />
        </mesh>

        {/* Recessed Keyboard Deck */}
        <mesh material={keyboardWellMat} position={[0, 0.003, -0.22]}>
          <boxGeometry args={[3.36, 0.008, 1.48]} />
        </mesh>

        {/* Keyboard Key Rows with Individual Relief */}
        {[-0.68, -0.45, -0.22, 0.01, 0.24].map((z, rowIdx) => (
          <mesh
            key={rowIdx}
            material={keycapMat}
            position={[0, 0.014, -0.22 + z]}
          >
            <boxGeometry args={[3.28, 0.014, 0.185]} />
          </mesh>
        ))}

        {/* Backlit Spacebar Accent Indicator */}
        <mesh position={[0, 0.018, 0.14]} material={accentGlow}>
          <boxGeometry args={[0.1, 0.006, 0.02]} />
        </mesh>

        {/* Left & Right Speaker Micro-Grilles */}
        <mesh material={keyboardWellMat} position={[-1.82, 0.003, -0.22]}>
          <boxGeometry args={[0.18, 0.006, 1.48]} />
        </mesh>
        <mesh material={keyboardWellMat} position={[1.82, 0.003, -0.22]}>
          <boxGeometry args={[0.18, 0.006, 1.48]} />
        </mesh>

        {/* Large Precision Glass Trackpad */}
        <mesh material={trackpadMat} position={[0, 0.005, 0.76]}>
          <boxGeometry args={[1.48, 0.006, 0.92]} />
        </mesh>

        {/* Trackpad Hairline Border Trim */}
        <mesh material={aluminumEdge} position={[0, 0.002, 0.76]}>
          <boxGeometry args={[1.5, 0.002, 0.94]} />
        </mesh>
      </group>

      {/* ================= 2. HINGE ASSEMBLY ================= */}
      <mesh
        material={hingeMat}
        position={[0, 0.015, -1.33]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.048, 0.048, 3.1, 24]} />
      </mesh>

      {/* ================= 3. DISPLAY LID (108° Open Angle) ================= */}
      <group position={[0, 0.015, -1.33]} rotation={[-1.24, 0, 0]}>
        {/* Lid Rear Unibody Panel */}
        <mesh material={aluminumDark} position={[0, 1.34, -0.042]}>
          <boxGeometry args={[4.1, 2.7, 0.084]} />
        </mesh>

        {/* Minimalist Studio Emblem on Lid Back */}
        <mesh position={[0, 1.34, -0.086]} material={accentGlow}>
          <ringGeometry args={[0.08, 0.1, 32]} />
        </mesh>

        {/* Glossy Black Display Glass Bezel */}
        <mesh material={bezelMat} position={[0, 1.34, 0.003]}>
          <boxGeometry args={[4.05, 2.65, 0.008]} />
        </mesh>

        {/* Top Bezel HD Camera Eye */}
        <mesh position={[0, 2.61, 0.009]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>

        {/* Active 16:10 Project Showcase Screen Display */}
        <mesh position={[0, 1.34, 0.008]}>
          <planeGeometry args={[3.84, 2.42]} />
          <Suspense
            fallback={
              <meshBasicMaterial color="#09090b" />
            }
          >
            <ScreenDisplay activeProject={activeProject} />
          </Suspense>
        </mesh>

        {/* Authentic Digital Screen Backlight Cast onto Keyboard */}
        <pointLight
          position={[0, 1.1, 0.6]}
          intensity={0.85}
          distance={3.2}
          color="#ffffff"
        />
      </group>
    </group>
  );
}

export default function HeroScene({ activeProject = "dentora", className = "" }) {
  const isMotionEnabled = useSyncExternalStore(
    subscribeReducedMotion,
    getMotionSnapshot,
    getMotionServerSnapshot,
  );

  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Interaction State (Ref-driven for 120fps physics without triggering React rerenders)
  const interactionRef = useRef({
    isDragging: false,
    prevPointer: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    rotation: { x: 0.1, y: -0.52 },
    mouse: { x: 0, y: 0 },
  });

  const handlePointerDown = (e) => {
    // Left click or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    interactionRef.current.isDragging = true;
    interactionRef.current.prevPointer = { x: e.clientX, y: e.clientY };
    interactionRef.current.velocity = { x: 0, y: 0 };
    setIsInteracting(true);
    setHasInteracted(true);

    if (e.target && e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const handlePointerMove = (e) => {
    const inter = interactionRef.current;

    // Track normalized mouse for idle parallax
    inter.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    inter.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (!inter.isDragging) return;

    const deltaX = e.clientX - inter.prevPointer.x;
    const deltaY = e.clientY - inter.prevPointer.y;

    inter.prevPointer = { x: e.clientX, y: e.clientY };

    // Fluid sensitivity tuned for tactile weight
    const sensitivity = 0.0075;
    inter.velocity.x = deltaX * sensitivity;
    inter.velocity.y = deltaY * sensitivity;
  };

  const handlePointerUp = (e) => {
    interactionRef.current.isDragging = false;
    setIsInteracting(false);

    if (e.target && e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  if (!isMotionEnabled) {
    // Accessible, high-contrast static preview for users with reduced motion preferences
    const previewSrc =
      activeProject === "jewellery"
        ? "/images/projects/jewellery-store.jpg"
        : activeProject === "malik"
        ? "/images/projects/malik-enterprices.jpg"
        : "/images/projects/dentora.png";

    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-label="3D Developer Laptop Workspace — Static High-Resolution View"
      >
        <div className="relative aspect-[16/10] w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#121215] p-3 shadow-2xl">
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/5 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt={`${activeProject} project screenshot`}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative select-none touch-none ${className} ${
        isInteracting ? "cursor-grabbing" : "cursor-grab"
      }`}
      aria-label="Interactive 3D Workstation Laptop. Drag to rotate workspace."
      role="region"
    >
      <Canvas
        camera={{ position: [3.1, 2.0, 4.0], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
        }}
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      >
        {/* Studio Lighting Rig with Calibrated Contrast */}
        <ambientLight intensity={0.95} color="#18181b" />

        {/* Studio Key Light (Top-Left, Clean Warm Cream #FAF7F2) */}
        <directionalLight
          position={[-4.5, 6.5, 5.5]}
          intensity={2.8}
          color="#FAF7F2"
        />

        {/* Studio Fill Light (Front-Right, Soft Neutral Slate) */}
        <directionalLight
          position={[5.5, 3.5, 3.5]}
          intensity={1.4}
          color="#cbd5e1"
        />

        {/* Dramatic Rim Accent Light (Portfolio Brand Orange #EB5002) */}
        <directionalLight
          position={[1.5, 4.0, -4.5]}
          intensity={3.8}
          color="#EB5002"
        />

        {/* Soft Realistic Contact Shadow Ground Plane */}
        <ContactShadows
          position={[0, -0.38, 0]}
          opacity={0.75}
          scale={7.5}
          blur={2.2}
          far={3.8}
          color="#000000"
        />

        {/* Interactive Laptop Model */}
        <RealisticWorkstationLaptop
          activeProject={activeProject}
          interactionRef={interactionRef}
          isInteracting={isInteracting}
        />
      </Canvas>

      {/* Minimalist Floating Interaction Hint */}
      <div
        className={`pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          hasInteracted && !isInteracting ? "opacity-0" : "opacity-90"
        }`}
      >
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[0.58rem] font-medium tracking-[0.16em] text-white/60 uppercase backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span>Drag to explore</span>
        </div>
      </div>
    </div>
  );
}
