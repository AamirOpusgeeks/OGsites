'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface OG3DAnimatedProps {
  size?: number;
  className?: string;
}

export default function OG3DAnimated({ size = 120, className = '' }: OG3DAnimatedProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(0x818cf8, 2.8);
    blueRimLight.position.set(-4, -2, -3);
    scene.add(blueRimLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.0, 10);
    purpleLight.position.set(0, 2, 2);
    scene.add(purpleLight);

    // 3. Luxury Frosted Glass Material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      roughness: 0.16,
      transmission: 0.92,
      thickness: 0.5,
      ior: 1.52,
      reflectivity: 0.88,
      transparent: true,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });

    // 4. OG Monogram Mesh Group
    const ogGroup = new THREE.Group();
    scene.add(ogGroup);

    // Letter 'O' (Torus)
    const oGeo = new THREE.TorusGeometry(0.48, 0.14, 32, 64);
    const letterO = new THREE.Mesh(oGeo, glassMat);
    letterO.position.set(-0.5, 0, 0);
    ogGroup.add(letterO);

    // Letter 'G' (Torus Arc)
    const gGeo = new THREE.TorusGeometry(0.48, 0.14, 32, 64, Math.PI * 1.62);
    const letterG = new THREE.Mesh(gGeo, glassMat);
    letterG.position.set(0.5, 0, 0);
    letterG.rotation.set(0, 0, Math.PI * 0.24);
    ogGroup.add(letterG);

    // 'G' Horizontal Crossbar
    const gBarGeo = new THREE.BoxGeometry(0.46, 0.14, 0.14);
    const gBar = new THREE.Mesh(gBarGeo, glassMat);
    gBar.position.set(0.5, -0.12, 0.12);
    ogGroup.add(gBar);

    // Center Core Spherical Glow
    const coreGeo = new THREE.SphereGeometry(0.16, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xc9d2e7,
      emissive: 0x6366f1,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0, 0);
    ogGroup.add(coreMesh);

    // 5. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 1.5;
      targetRotX = -y * 1.5;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Organic Floating & Continuous Rotation
      ogGroup.position.y = Math.sin(elapsed * 1.8) * 0.08;
      
      // Smooth Mouse Tilt Interpolation
      mouseX += (targetRotX - mouseX) * 0.08;
      mouseY += (targetRotY - mouseY) * 0.08;

      ogGroup.rotation.x = mouseX + Math.sin(elapsed * 0.9) * 0.08;
      ogGroup.rotation.y = mouseY + (elapsed * 0.45);
      ogGroup.rotation.z = Math.sin(elapsed * 1.2) * 0.05;

      // Pulse Core Glow
      coreMesh.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      oGeo.dispose();
      gGeo.dispose();
      gBarGeo.dispose();
      coreGeo.dispose();
      glassMat.dispose();
      coreMat.dispose();
    };
  }, [size]);

  return (
    <div 
      ref={mountRef} 
      className={`relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 select-none ${className}`}
      style={{ width: size, height: size }}
      title="Opus Geeks 3D Monogram"
    />
  );
}
