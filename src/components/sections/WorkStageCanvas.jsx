"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "./workData";

const ProjectPlane = memo(function ProjectPlane({ index, activeIndex, palette }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const offset = index - activeIndex;
    const targetX = offset * 0.58;
    const targetY = offset * 0.06;
    const targetZ = -Math.abs(offset) * 1.2;
    const targetRotY = offset * -0.32;
    const targetScale = index === activeIndex ? 1 : 0.84;

    mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, 5, delta);
    mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 5, delta);
    mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetZ, 5, delta);
    mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, targetRotY, 5, delta);
    const scale = THREE.MathUtils.damp(mesh.scale.x, targetScale, 5, delta);
    mesh.scale.set(scale, scale, scale);

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.damp(
        materialRef.current.emissiveIntensity,
        index === activeIndex ? 0.22 : 0.06,
        4,
        delta,
      );
    }
  });

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
    };
  }, []);

  return (
    <RoundedBox
      ref={meshRef}
      args={[2.55, 1.62, 0.1]}
      radius={0.08}
      smoothness={3}
      position={[index * 0.58, 0, -Math.abs(index) * 1.2]}
    >
      <meshPhysicalMaterial
        ref={materialRef}
        color={palette.deep}
        emissive={palette.accent}
        emissiveIntensity={0.08}
        roughness={0.28}
        metalness={0.22}
        clearcoat={0.55}
        clearcoatRoughness={0.28}
        sheen={0.4}
        sheenColor={palette.wash}
      />
    </RoundedBox>
  );
});

const DustField = memo(function DustField() {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const count = 36;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3.4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#FF6B00"
        transparent
        opacity={0.28}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
});

function StageScene({ activeIndex, mouse }) {
  const groupRef = useRef(null);
  const fillRef = useRef(null);
  const fillColor = useRef(new THREE.Color(projects[0].palette.mid));
  const targetFill = useRef(new THREE.Color(projects[0].palette.mid));
  const palette = projects[activeIndex].palette;

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetY = mouse.current.x * 0.22;
    const targetX = mouse.current.y * 0.1;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 3.2, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3.2, delta);
    group.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.07;

    if (fillRef.current) {
      targetFill.current.set(palette.mid);
      fillColor.current.lerp(targetFill.current, 1 - Math.pow(0.12, delta * 60));
      fillRef.current.color.copy(fillColor.current);
    }
  });

  return (
    <>
      <color attach="background" args={["#0E0C0A"]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[3.2, 3.6, 5]} intensity={1.15} color="#FFF6EE" />
      <pointLight position={[-2.4, -0.6, 2.8]} intensity={0.7} color={palette.accent} />
      <pointLight position={[2.2, 1.4, -1]} intensity={0.35} color={palette.wash} />
      <DustField />
      <mesh position={[0, 0, -3.2]} scale={[8, 5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={fillRef} color={palette.mid} transparent opacity={0.18} />
      </mesh>
      <group ref={groupRef}>
        {projects.map((project, index) => (
          <ProjectPlane
            key={project.title}
            index={index}
            activeIndex={activeIndex}
            palette={project.palette}
          />
        ))}
      </group>
    </>
  );
}

export default function WorkStageCanvas({ activeIndex }) {
  const wrapRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleMove = (event) => {
    const bounds = wrapRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.current.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const handleLeave = () => {
    mouse.current.x = 0;
    mouse.current.y = 0;
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-full min-h-[340px] w-full overflow-hidden rounded-[28px] bg-[#0E0C0A] lg:min-h-[460px]"
    >
      {enabled ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.4], fov: 34 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor("#0E0C0A", 1);
          }}
        >
          <StageScene activeIndex={activeIndex} mouse={mouse} />
        </Canvas>
      ) : null}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
    </div>
  );
}
