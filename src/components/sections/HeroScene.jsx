"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function RotatingShape() {
  const meshRef = useRef(null);
  
  // Track mouse position natively instead of relying on Canvas pointer events
  // which would require pointer-events-auto and block DOM clicks
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Constant ambient rotation
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;

    // Subtle mouse parallax (lerp towards mouse position)
    const targetX = mouse.current.x * 0.3;
    const targetY = mouse.current.y * 0.3;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <Icosahedron ref={meshRef} args={[3, 1]} position={[0, 0, 0]}>
      <meshBasicMaterial 
        color="#EB5002" 
        wireframe 
        transparent 
        opacity={0.15} 
      />
    </Icosahedron>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        style={{ pointerEvents: 'none' }}
      >
        <RotatingShape />
      </Canvas>
    </div>
  );
}
