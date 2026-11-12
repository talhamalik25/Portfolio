"use client";

import { useRef, Suspense, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

function subscribeReducedMotion(callback) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)");
}

function getMotionServerSnapshot() {
  return false;
}

/**
 * ScreenSurface
 * Loads genuine portfolio project texture and renders with emissive screen glow.
 */
function ScreenSurface() {
  const texture = useTexture("/images/projects/sooti-mehal.jpg");

  return (
    <meshBasicMaterial
      map={texture}
      toneMapped={false}
    />
  );
}

/**
 * LaptopModel
 * A meticulously proportioned 3D workstation laptop:
 * - Precision unibody aluminum chassis (dark graphite anodized finish)
 * - Recessed keyboard well with matte keys & speaker grilles
 * - Glass trackpad with tactile edge
 * - Cylindrical hinge assembly
 * - 16:10 display lid open at an ergonomic 110-degree angle
 * - Genuine portfolio project preview texture mapped to the screen
 * - Screen casting subtle ambient light down onto the keyboard deck
 */
function LaptopModel({ mouseRef }) {
  const laptopGroup = useRef(null);

  // Subtle pointer parallax (Stage 1 resting presentation)
  useFrame((state, delta) => {
    if (!laptopGroup.current) return;

    if (mouseRef?.current) {
      const targetRotX = 0.08 + mouseRef.current.y * 0.08;
      const targetRotY = -0.55 + mouseRef.current.x * 0.12;

      laptopGroup.current.rotation.x = THREE.MathUtils.lerp(
        laptopGroup.current.rotation.x,
        targetRotX,
        0.05,
      );
      laptopGroup.current.rotation.y = THREE.MathUtils.lerp(
        laptopGroup.current.rotation.y,
        targetRotY,
        0.05,
      );
    }
  });

  // Materials
  const aluminumDark = new THREE.MeshStandardMaterial({
    color: "#18181b",
    roughness: 0.32,
    metalness: 0.88,
  });

  const aluminumTrim = new THREE.MeshStandardMaterial({
    color: "#27272a",
    roughness: 0.28,
    metalness: 0.92,
  });

  const keyboardDeck = new THREE.MeshStandardMaterial({
    color: "#0f0f11",
    roughness: 0.65,
    metalness: 0.3,
  });

  const keycapMaterial = new THREE.MeshStandardMaterial({
    color: "#18181b",
    roughness: 0.55,
    metalness: 0.4,
  });

  const trackpadMaterial = new THREE.MeshStandardMaterial({
    color: "#222226",
    roughness: 0.22,
    metalness: 0.78,
  });

  const bezelMaterial = new THREE.MeshStandardMaterial({
    color: "#08080a",
    roughness: 0.12,
    metalness: 0.2,
  });

  const hingeMaterial = new THREE.MeshStandardMaterial({
    color: "#121214",
    roughness: 0.35,
    metalness: 0.9,
  });

  const accentEmissive = new THREE.MeshStandardMaterial({
    color: "#EB5002",
    emissive: "#EB5002",
    emissiveIntensity: 0.6,
  });

  return (
    <group ref={laptopGroup} position={[0, -0.35, 0]} rotation={[0.08, -0.55, 0]}>
      {/* ================= BASE / CHASSIS ================= */}
      <group position={[0, 0, 0]}>
        {/* Main Base Unibody */}
        <mesh material={aluminumDark} position={[0, -0.06, 0]}>
          <boxGeometry args={[3.8, 0.12, 2.5]} />
        </mesh>

        {/* Chamfered Bottom Lip */}
        <mesh material={aluminumTrim} position={[0, -0.115, 0]}>
          <boxGeometry args={[3.74, 0.015, 2.44]} />
        </mesh>

        {/* Front Opening Notch */}
        <mesh material={aluminumTrim} position={[0, -0.015, 1.245]}>
          <boxGeometry args={[0.5, 0.03, 0.015]} />
        </mesh>

        {/* Recessed Keyboard Well */}
        <mesh material={keyboardDeck} position={[0, 0.002, -0.22]}>
          <boxGeometry args={[3.1, 0.008, 1.38]} />
        </mesh>

        {/* Keyboard Key Rows (Stylized Precision Layout) */}
        {[-0.65, -0.42, -0.2, 0.02, 0.24].map((zOffset, rowIndex) => (
          <mesh
            key={rowIndex}
            material={keycapMaterial}
            position={[0, 0.012, -0.22 + zOffset]}
          >
            <boxGeometry args={[3.02, 0.012, 0.18]} />
          </mesh>
        ))}

        {/* Spacebar Accent Glow Dot */}
        <mesh position={[0, 0.015, 0.12]} material={accentEmissive}>
          <boxGeometry args={[0.08, 0.006, 0.02]} />
        </mesh>

        {/* Left & Right Speaker Perforations */}
        <mesh material={keyboardDeck} position={[-1.68, 0.002, -0.22]}>
          <boxGeometry args={[0.16, 0.006, 1.38]} />
        </mesh>
        <mesh material={keyboardDeck} position={[1.68, 0.002, -0.22]}>
          <boxGeometry args={[0.16, 0.006, 1.38]} />
        </mesh>

        {/* Precision Glass Trackpad */}
        <mesh material={trackpadMaterial} position={[0, 0.004, 0.68]}>
          <boxGeometry args={[1.35, 0.006, 0.84]} />
        </mesh>

        {/* Trackpad Hairline Border Accent */}
        <mesh material={aluminumTrim} position={[0, 0.001, 0.68]}>
          <boxGeometry args={[1.37, 0.002, 0.86]} />
        </mesh>
      </group>

      {/* ================= HINGE ================= */}
      <mesh
        material={hingeMaterial}
        position={[0, 0.015, -1.22]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.045, 0.045, 2.7, 24]} />
      </mesh>

      {/* ================= DISPLAY LID (110° Open Angle) ================= */}
      <group position={[0, 0.015, -1.22]} rotation={[-1.22, 0, 0]}>
        {/* Lid Chassis Backing */}
        <mesh material={aluminumDark} position={[0, 1.25, -0.04]}>
          <boxGeometry args={[3.8, 2.5, 0.08]} />
        </mesh>

        {/* Subtle Minimalist Logo / Emblem on Back of Lid */}
        <mesh position={[0, 1.25, -0.082]} material={accentEmissive}>
          <ringGeometry args={[0.07, 0.09, 32]} />
        </mesh>

        {/* Glossy Black Display Glass Bezel */}
        <mesh material={bezelMaterial} position={[0, 1.25, 0.003]}>
          <boxGeometry args={[3.76, 2.46, 0.008]} />
        </mesh>

        {/* Web Camera Lens at Top Bezel */}
        <mesh position={[0, 2.42, 0.009]}>
          <circleGeometry args={[0.018, 16]} />
          <meshBasicMaterial color="#1f2937" />
        </mesh>

        {/* Active 16:10 High-Resolution Screen Display */}
        <mesh position={[0, 1.26, 0.008]}>
          <planeGeometry args={[3.56, 2.24]} />
          <Suspense
            fallback={
              <meshBasicMaterial color="#09090b" />
            }
          >
            <ScreenSurface />
          </Suspense>
        </mesh>

        {/* Authentic Light Projection from Screen onto Keyboard */}
        <pointLight
          position={[0, 1.0, 0.5]}
          intensity={0.7}
          distance={2.8}
          color="#ffffff"
        />
      </group>
    </group>
  );
}

export default function HeroScene({ className = "" }) {
  const isMotionEnabled = useSyncExternalStore(
    subscribeReducedMotion,
    getMotionSnapshot,
    getMotionServerSnapshot,
  );

  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    if (e.pointerType === "touch") return;
    // Normalized coordinates (-1 to 1)
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  if (!isMotionEnabled) {
    // Elegant, accessible fallback for users with reduced motion
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-label="3D Developer Workspace Laptop"
      >
        <div className="relative aspect-[16/10] w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/10 bg-[#111113] p-4 shadow-2xl">
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/projects/sooti-mehal.jpg"
              alt="Talha Malik project preview on display"
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
      onPointerMove={handlePointerMove}
      className={`relative select-none ${className}`}
      aria-label="3D Developer Laptop Workspace. Showing live project preview."
    >
      <Canvas
        camera={{ position: [2.9, 1.9, 3.8], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Studio Lighting Rig */}
        <ambientLight intensity={0.9} color="#18181b" />

        {/* Studio Key Light (Top-Left, Clean Warm Cream) */}
        <directionalLight
          position={[-4, 6, 5]}
          intensity={2.4}
          color="#FAF7F2"
        />

        {/* Studio Fill Light (Front-Right, Soft Neutral) */}
        <directionalLight
          position={[5, 3, 3]}
          intensity={1.3}
          color="#d4d4d8"
        />

        {/* Dramatic Rim Accent Light (Portfolio Brand Orange #EB5002) */}
        <directionalLight
          position={[1, 3.5, -4]}
          intensity={3.6}
          color="#EB5002"
        />

        {/* Soft Ground Contact Shadow */}
        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.65}
          scale={7}
          blur={2.4}
          far={3.5}
          color="#000000"
        />

        {/* Micro Float for Subtle Life in Stage 1 */}
        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
          <LaptopModel mouseRef={mouse} />
        </Float>
      </Canvas>
    </div>
  );
}
