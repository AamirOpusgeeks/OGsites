"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Frosted glass 3D shapes on light background
function FloatingShapes({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const dodecaRef = useRef<THREE.Mesh>(null);

  // Mouse tracking vector for smooth parallax
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Strict Noomo Frosted Glass MeshPhysicalMaterial
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f7f5f0"),
      transmission: 0.88,
      opacity: 1,
      roughness: 0.25,
      ior: 1.52,
      thickness: 1.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 0.4,
      transparent: true,
      attenuationColor: new THREE.Color("#e8e4dc"),
      attenuationDistance: 2.2,
    });
  }, []);

  useEffect(() => {
    return () => {
      glassMaterial.dispose();
    };
  }, [glassMaterial]);

  useFrame((_, delta) => {
    // 1. Pointer Parallax Smooth Lerp
    if (groupRef.current) {
      const targetRotX = mouseTarget.current.y * 0.2;
      const targetRotY = mouseTarget.current.x * 0.25;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        delta * 2.5
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        delta * 2.5
      );

      // Scroll Reaction: Translate on Z and Y axis as window scrolls
      const targetZ = scrollProgress * 5.2; // Translate through camera
      const targetY = -scrollProgress * 3.5; // Drift vertically
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetZ,
        delta * 3.0
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        delta * 3.0
      );
    }

    // 2. Continuous Organic Tumble + Scroll Acceleration
    const speed = 1 + scrollProgress * 2.8;

    // Torus Tumble
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.35 * speed;
      torusRef.current.rotation.y += delta * 0.45 * speed;
      torusRef.current.position.x = 2.4 + scrollProgress * 1.5;
    }

    // Box Tumble
    if (boxRef.current) {
      boxRef.current.rotation.x -= delta * 0.3 * speed;
      boxRef.current.rotation.z += delta * 0.4 * speed;
      boxRef.current.position.x = -2.6 - scrollProgress * 1.4;
    }

    // Octahedron Tumble
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.5 * speed;
      octaRef.current.rotation.z -= delta * 0.35 * speed;
      octaRef.current.position.y = 2.1 + scrollProgress * 1.2;
    }

    // Dodecahedron Tumble (Central Floating Hero)
    if (dodecaRef.current) {
      dodecaRef.current.rotation.x += delta * 0.25 * speed;
      dodecaRef.current.rotation.y -= delta * 0.3 * speed;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Dodecahedron */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh
          ref={dodecaRef}
          position={[0, 0.1, 0.5]}
          material={glassMaterial}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1.35, 0]} />
        </mesh>
      </Float>

      {/* Floating Torus */}
      <mesh
        ref={torusRef}
        position={[2.5, -0.8, -0.8]}
        rotation={[Math.PI / 4, 0.4, 0]}
        material={glassMaterial}
      >
        <torusGeometry args={[1.2, 0.38, 32, 100]} />
      </mesh>

      {/* Floating Box */}
      <mesh
        ref={boxRef}
        position={[-2.7, 0.6, -1.2]}
        rotation={[0.6, 0.4, 0.2]}
        material={glassMaterial}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
      </mesh>

      {/* Floating Octahedron */}
      <mesh
        ref={octaRef}
        position={[0.8, 2.3, -1.8]}
        rotation={[0.3, 0.2, 0.8]}
        material={glassMaterial}
      >
        <octahedronGeometry args={[1.25, 0]} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const maxScroll = window.innerHeight * 2.2;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#eae8e3]">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        {/* Soft, clean high-key studio lighting for light ivory background */}
        <ambientLight intensity={1.4} color="#ffffff" />
        <directionalLight
          position={[6, 9, 8]}
          intensity={1.8}
          color="#ffffff"
          castShadow
        />
        <directionalLight
          position={[-6, -4, -4]}
          intensity={0.8}
          color="#dedbd3"
        />
        {/* Subtle rim reflections for frosted glass definition */}
        <pointLight position={[-4, 3, 4]} intensity={1.2} color="#ffffff" />
        <pointLight position={[4, -3, 3]} intensity={1.0} color="#e3e0d8" />

        <FloatingShapes scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
