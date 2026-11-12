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
 * generateKeyboardTexture
 * Procedurally draws a photorealistic MacBook Pro keyboard deck:
 * - 6 rows of individual rounded keycaps with subtle drop shadows
 * - Crisp key markings, function row, inverted-T arrow cluster, spacebar
 * - Left and right precision speaker micro-grilles
 * - Smooth glass trackpad with fine metallic border
 */
function generateKeyboardTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Deck Base Finish (Space Gray anodized aluminum texture)
  ctx.fillStyle = "#28282d";
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle metallic horizontal grain
  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  for (let y = 0; y < 512; y += 3) {
    ctx.fillRect(0, y, 1024, 1);
  }

  // 2. Speaker Grilles (Left & Right Flanks)
  ctx.fillStyle = "#161619";
  const drawSpeaker = (startX) => {
    for (let x = startX; x < startX + 54; x += 5) {
      for (let y = 30; y < 290; y += 5) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
  drawSpeaker(40);
  drawSpeaker(930);

  // 3. Recessed Keyboard Well
  const wellX = 110;
  const wellY = 24;
  const wellW = 804;
  const wellH = 276;
  ctx.fillStyle = "#121215";
  ctx.beginPath();
  ctx.roundRect(wellX, wellY, wellW, wellH, 8);
  ctx.fill();

  // Subtle inner well shadow
  ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 4. Individual Key Rows Definition
  const rowLayouts = [
    // Row 0: Function Keys (14 keys)
    [
      { label: "esc", w: 56 },
      { label: "F1", w: 46 }, { label: "F2", w: 46 }, { label: "F3", w: 46 },
      { label: "F4", w: 46 }, { label: "F5", w: 46 }, { label: "F6", w: 46 },
      { label: "F7", w: 46 }, { label: "F8", w: 46 }, { label: "F9", w: 46 },
      { label: "F10", w: 46 }, { label: "F11", w: 46 }, { label: "F12", w: 46 },
      { label: "TouchID", w: 50 },
    ],
    // Row 1: Number Row (14 keys)
    [
      { label: "~", w: 46 },
      { label: "1", w: 46 }, { label: "2", w: 46 }, { label: "3", w: 46 },
      { label: "4", w: 46 }, { label: "5", w: 46 }, { label: "6", w: 46 },
      { label: "7", w: 46 }, { label: "8", w: 46 }, { label: "9", w: 46 },
      { label: "0", w: 46 }, { label: "-", w: 46 }, { label: "=", w: 46 },
      { label: "delete", w: 68 },
    ],
    // Row 2: QWERTY Row (14 keys)
    [
      { label: "tab", w: 68 },
      { label: "Q", w: 46 }, { label: "W", w: 46 }, { label: "E", w: 46 },
      { label: "R", w: 46 }, { label: "T", w: 46 }, { label: "Y", w: 46 },
      { label: "U", w: 46 }, { label: "I", w: 46 }, { label: "O", w: 46 },
      { label: "P", w: 46 }, { label: "[", w: 46 }, { label: "]", w: 46 },
      { label: "\\", w: 46 },
    ],
    // Row 3: ASDF Row (13 keys)
    [
      { label: "caps", w: 78 },
      { label: "A", w: 46 }, { label: "S", w: 46 }, { label: "D", w: 46 },
      { label: "F", w: 46 }, { label: "G", w: 46 }, { label: "H", w: 46 },
      { label: "J", w: 46 }, { label: "K", w: 46 }, { label: "L", w: 46 },
      { label: ";", w: 46 }, { label: "'", w: 46 },
      { label: "return", w: 82 },
    ],
    // Row 4: ZXCV Row (12 keys)
    [
      { label: "shift", w: 102 },
      { label: "Z", w: 46 }, { label: "X", w: 46 }, { label: "C", w: 46 },
      { label: "V", w: 46 }, { label: "B", w: 46 }, { label: "N", w: 46 },
      { label: "M", w: 46 }, { label: ",", w: 46 }, { label: ".", w: 46 },
      { label: "/", w: 46 },
      { label: "shift", w: 104 },
    ],
    // Row 5: Bottom Modifier & Space Row
    [
      { label: "fn", w: 44 }, { label: "control", w: 48 }, { label: "option", w: 56 },
      { label: "cmd", w: 68 }, { label: "", w: 260 }, { label: "cmd", w: 68 },
      { label: "option", w: 56 }, { label: "◄", w: 42 }, { label: "▲▼", w: 42 },
      { label: "►", w: 42 },
    ],
  ];

  const keyH = [32, 40, 40, 40, 40, 42];
  let curY = wellY + 8;

  rowLayouts.forEach((row, rowIdx) => {
    let curX = wellX + 12;
    const h = keyH[rowIdx];

    row.forEach((key) => {
      // Keycap Body
      ctx.fillStyle = "#1b1b1f";
      ctx.beginPath();
      ctx.roundRect(curX, curY, key.w, h, 4);
      ctx.fill();

      // Top Keycap Specular Bevel Edge
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bottom Keycap Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(curX + 2, curY + h - 2, key.w - 4, 2);

      // Key Label
      if (key.label) {
        ctx.fillStyle = "rgba(220, 220, 225, 0.65)";
        ctx.font = "10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(key.label, curX + key.w / 2, curY + h / 2);
      }

      curX += key.w + 6;
    });

    curY += h + 6;
  });

  // 5. Glass Trackpad
  const tpX = 332;
  const tpY = 320;
  const tpW = 360;
  const tpH = 175;

  ctx.fillStyle = "#222226";
  ctx.beginPath();
  ctx.roundRect(tpX, tpY, tpW, tpH, 10);
  ctx.fill();

  // Trackpad Fine Metallic Border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  return texture;
}

/**
 * ScreenDisplay
 * Textures the active project screenshot onto the 16:10 screen plane.
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
 * PhotorealisticLaptop
 *
 * Meticulously proportioned, unclipped 16-inch workstation laptop:
 * - Clean front-facing 3/4 beauty angle (rotation.y = -0.22)
 * - Scaled to fit comfortably inside the canvas viewport with generous padding
 * - Anodized Space Gray aluminum with specular edge chamfers
 * - Procedural photorealistic keyboard deck texture
 * - Thin black glass display bezels with camera eye
 * - Neutral studio lighting response with zero unnatural orange spill
 */
function PhotorealisticLaptop({ activeProject, interactionRef }) {
  const groupRef = useRef(null);
  const restingRotation = useMemo(() => ({ x: 0.08, y: -0.22 }), []);

  // Keyboard deck canvas texture
  const keyboardTex = useMemo(() => {
    if (typeof window === "undefined") return null;
    return generateKeyboardTexture();
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const inter = interactionRef.current;

    if (!inter.isDragging) {
      // Fluid inertial decay
      inter.velocity.x *= 0.92;
      inter.velocity.y *= 0.92;

      inter.rotation.y += inter.velocity.x;
      inter.rotation.x += inter.velocity.y;

      // Gentle spring return to resting beauty angle
      const returnFactor = 0.04;
      inter.rotation.x = THREE.MathUtils.lerp(
        inter.rotation.x,
        restingRotation.x + inter.mouse.y * 0.05,
        returnFactor,
      );
      inter.rotation.y = THREE.MathUtils.lerp(
        inter.rotation.y,
        restingRotation.y + inter.mouse.x * 0.08,
        returnFactor,
      );

      // Subtle resting float
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = -0.15 + Math.sin(t * 1.3) * 0.015;
    } else {
      inter.rotation.y += inter.velocity.x;
      inter.rotation.x += inter.velocity.y;
    }

    // Safety clamps: keeps the laptop legible and within visual container
    inter.rotation.x = THREE.MathUtils.clamp(inter.rotation.x, -0.1, 0.32);
    inter.rotation.y = THREE.MathUtils.clamp(inter.rotation.y, -0.75, 0.35);

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

  // Materials with neutral studio PBR tuning
  const aluminumBody = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#323238"),
        roughness: 0.28,
        metalness: 0.88,
      }),
    [],
  );

  const aluminumBevel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#4c4c56"),
        roughness: 0.18,
        metalness: 0.94,
      }),
    [],
  );

  const bezelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#08080a"),
        roughness: 0.1,
        metalness: 0.2,
      }),
    [],
  );

  const hingeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#18181c"),
        roughness: 0.35,
        metalness: 0.9,
      }),
    [],
  );

  const keyboardDeckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: keyboardTex || undefined,
        color: keyboardTex ? "#ffffff" : "#18181c",
        roughness: 0.35,
        metalness: 0.4,
      }),
    [keyboardTex],
  );

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} rotation={[0.08, -0.22, 0]} scale={0.82}>
      {/* ================= 1. BASE / LOWER CHASSIS ================= */}
      <group position={[0, 0, 0]}>
        {/* Main Aluminum Unibody Slab */}
        <mesh material={aluminumBody} position={[0, -0.065, 0]}>
          <boxGeometry args={[4.1, 0.13, 2.7]} />
        </mesh>

        {/* Specular Perimeter Chamfer Edge */}
        <mesh material={aluminumBevel} position={[0, -0.126, 0]}>
          <boxGeometry args={[4.04, 0.012, 2.64]} />
        </mesh>

        {/* Front Opening Thumb Scoop */}
        <mesh material={aluminumBevel} position={[0, -0.015, 1.346]}>
          <boxGeometry args={[0.55, 0.03, 0.012]} />
        </mesh>

        {/* Photorealistic Keyboard & Trackpad Deck Plane */}
        <mesh
          material={keyboardDeckMaterial}
          position={[0, 0.002, 0.02]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[3.95, 2.55]} />
        </mesh>
      </group>

      {/* ================= 2. HINGE CYLINDER ================= */}
      <mesh
        material={hingeMat}
        position={[0, 0.018, -1.33]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.046, 0.046, 3.1, 24]} />
      </mesh>

      {/* ================= 3. DISPLAY LID (105° Open Angle) ================= */}
      <group position={[0, 0.018, -1.33]} rotation={[-1.28, 0, 0]}>
        {/* Rear Lid Aluminum Shell */}
        <mesh material={aluminumBody} position={[0, 1.35, -0.042]}>
          <boxGeometry args={[4.1, 2.7, 0.084]} />
        </mesh>

        {/* Outer Lid Bevel Highlight */}
        <mesh material={aluminumBevel} position={[0, 1.35, -0.08]}>
          <boxGeometry args={[4.04, 2.64, 0.01]} />
        </mesh>

        {/* Minimalist Apple-Style Studio Emblem */}
        <mesh position={[0, 1.35, -0.088]}>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial color="#ffffff" opacity={0.65} transparent />
        </mesh>

        {/* Black Glass Display Bezel */}
        <mesh material={bezelMat} position={[0, 1.35, 0.003]}>
          <boxGeometry args={[4.05, 2.65, 0.008]} />
        </mesh>

        {/* Top Bezel HD Camera Eye */}
        <mesh position={[0, 2.62, 0.009]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>

        {/* Active 16:10 Project Showcase Screen Display */}
        <mesh position={[0, 1.34, 0.008]}>
          <planeGeometry args={[3.84, 2.42]} />
          <Suspense fallback={<meshBasicMaterial color="#09090b" />}>
            <ScreenDisplay activeProject={activeProject} />
          </Suspense>
        </mesh>

        {/* Subtle Glass Surface Sheen Overlay */}
        <mesh position={[0, 1.34, 0.01]}>
          <planeGeometry args={[3.84, 2.42]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.06}
            roughness={0.05}
            transmission={0.9}
            color="#ffffff"
          />
        </mesh>

        {/* Screen Ambient Downlight onto Keyboard */}
        <pointLight
          position={[0, 1.0, 0.6]}
          intensity={0.6}
          distance={2.8}
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
    rotation: { x: 0.08, y: -0.22 },
    mouse: { x: 0, y: 0 },
  });

  const handlePointerDown = (e) => {
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

    inter.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    inter.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (!inter.isDragging) return;

    const deltaX = e.clientX - inter.prevPointer.x;
    const deltaY = e.clientY - inter.prevPointer.y;

    inter.prevPointer = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.006;
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
        <div className="relative aspect-[16/10] w-full max-w-[540px] overflow-hidden rounded-2xl border border-white/10 bg-[#141418] p-3 shadow-2xl">
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
        camera={{ position: [1.1, 1.4, 4.6], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
        }}
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      >
        {/* Realistic Neutral Studio Lighting Rig */}
        <ambientLight intensity={1.4} color="#f8fafc" />

        {/* Studio Key Light (Top-Left Clean White) */}
        <directionalLight
          position={[-3.5, 5.5, 5.0]}
          intensity={2.4}
          color="#ffffff"
        />

        {/* Studio Fill Light (Front-Right Neutral Soft Fill) */}
        <directionalLight
          position={[4.0, 2.5, 3.5]}
          intensity={1.2}
          color="#e2e8f0"
        />

        {/* Subtle Overhead Fill */}
        <directionalLight
          position={[0, 4.5, 1.0]}
          intensity={0.8}
          color="#ffffff"
        />

        {/* Neutral Rear Rim Light (Clean Crisp Edge Definition — No Orange Spill) */}
        <directionalLight
          position={[1.5, 3.0, -4.0]}
          intensity={1.2}
          color="#f1f5f9"
        />

        {/* Ground Contact Shadow */}
        <ContactShadows
          position={[0, -0.25, 0]}
          opacity={0.65}
          scale={7.0}
          blur={2.0}
          far={3.0}
          color="#000000"
        />

        {/* Photorealistic Workstation Laptop Model */}
        <PhotorealisticLaptop
          activeProject={activeProject}
          interactionRef={interactionRef}
        />
      </Canvas>

      {/* Subtle Drag Hint Overlay */}
      <div
        className={`pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          hasInteracted && !isInteracting ? "opacity-0" : "opacity-85"
        }`}
      >
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 text-[0.55rem] font-medium tracking-[0.16em] text-white/50 uppercase backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span>Drag to explore</span>
        </div>
      </div>
    </div>
  );
}
