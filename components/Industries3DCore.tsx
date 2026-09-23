'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Industries3DCoreProps {
  activeSectorAngle?: number;
  className?: string;
  onClick?: () => void;
}

export default function Industries3DCore({
  activeSectorAngle = 0,
  className = '',
  onClick,
}: Industries3DCoreProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotationY = useRef(0);
  const targetRotationX = useRef(0);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // High Performance WebGL Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    el.appendChild(renderer.domElement);

    // Royal Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const platinumRimLight = new THREE.PointLight(0xc9d2e7, 5.0, 20);
    platinumRimLight.position.set(-5, -4, 4);
    scene.add(platinumRimLight);

    const champagneLight = new THREE.DirectionalLight(0xf5ede0, 3.0);
    champagneLight.position.set(0, -6, -3);
    scene.add(champagneLight);

    // Root Group for Parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Royal Crown Obsidian & Platinum Torus Knot
    const coreGeo = new THREE.TorusKnotGeometry(1.1, 0.34, 160, 36, 2, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#181520'),
      roughness: 0.1,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      attenuationColor: new THREE.Color('#c9d2e7'),
      attenuationDistance: 1.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Central Brilliant-Cut Diamond Faceted Gem
    const gemGeo = new THREE.OctahedronGeometry(0.75, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      transmission: 0.85,
      opacity: 1,
      roughness: 0.05,
      ior: 2.4, // Diamond IOR
      thickness: 1.8,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      emissive: new THREE.Color('#181520'),
      emissiveIntensity: 0.3,
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    rootGroup.add(gemMesh);

    // 3. Royal Astrolabe / Horology Gyroscope Rings
    const createGyroRing = (radius: number, tube: number, rotX: number, rotY: number, color: string) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.95,
        roughness: 0.15,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createGyroRing(1.95, 0.018, Math.PI / 3, Math.PI / 5, '#c9d2e7');
    const ring2 = createGyroRing(2.25, 0.014, -Math.PI / 3.5, Math.PI / 4, '#181520');
    const ring3 = createGyroRing(2.55, 0.012, Math.PI / 2.1, -Math.PI / 6, '#f0efe9');
    rootGroup.add(ring1);
    rootGroup.add(ring2);
    rootGroup.add(ring3);

    // 4. Starlight Diamond Particle Swarm (160 Particles)
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.1 + Math.random() * 1.8;
      particlePos[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc9d2e7,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // Mouse Move Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY.current = x * 0.48;
      targetRotationX.current = -y * 0.48;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Continuous Fluid 3D Celestial Rotation
      coreMesh.rotation.x = elapsedTime * 0.28;
      coreMesh.rotation.y = elapsedTime * 0.36;

      gemMesh.rotation.x = -elapsedTime * 0.45;
      gemMesh.rotation.y = elapsedTime * 0.55;

      ring1.rotation.z = elapsedTime * 0.18;
      ring2.rotation.z = -elapsedTime * 0.22;
      ring3.rotation.z = elapsedTime * 0.14;

      particles.rotation.y = elapsedTime * 0.07;

      // Smooth Physics Lerp for Parallax
      rootGroup.rotation.y += (targetRotationY.current - rootGroup.rotation.y) * 0.065;
      rootGroup.rotation.x += (targetRotationX.current - rootGroup.rotation.x) * 0.065;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update rotation towards active sector angle
  useEffect(() => {
    if (activeSectorAngle !== undefined) {
      targetRotationY.current = (activeSectorAngle * Math.PI) / 180 * 0.35;
    }
  }, [activeSectorAngle]);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      className={`w-full h-full relative cursor-pointer select-none ${className}`}
    />
  );
}
