'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';
import { useLenis } from '@/components/providers/SmoothScroll';

interface Subpage3DBackgroundProps {
  isAppReady?: boolean;
}

export default function Subpage3DBackground({ isAppReady = true }: Subpage3DBackgroundProps) {
  const pathname = usePathname();
  const { lenis } = useLenis();
  const mountRef = useRef<HTMLDivElement>(null);

  // Landing page has its own dedicated pinned 3D canvas stage
  const isLandingPage = pathname === '/';

  useEffect(() => {
    if (isLandingPage) return;

    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Perspective Camera (Matching Hero Section Exactly)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 2. High-Performance WebGL Renderer (Matching Hero Section Exactly)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.6;
    container.appendChild(renderer.domElement);

    // 3. Environment PMREM & Studio Lighting (Matching Hero Section Exactly)
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#ffffff');

    const envL1 = new THREE.DirectionalLight(0xffffff, 4.5);
    envL1.position.set(5, 12, 6);
    envScene.add(envL1);

    const envL2 = new THREE.DirectionalLight(0xffffff, 3.5);
    envL2.position.set(-5, 6, -5);
    envScene.add(envL2);

    const envAmb = new THREE.AmbientLight(0xffffff, 3.0);
    envScene.add(envAmb);

    scene.environment = pmrem.fromScene(envScene).texture;

    // Direct Scene Lights (Matching Hero Section Exactly)
    const amb = new THREE.AmbientLight(0xffffff, 3.0);
    scene.add(amb);

    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(5, 10, 7);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 3.0);
    rim.position.set(-6, -5, -4);
    scene.add(rim);

    // 4. Pure Solid Brilliant White 3D Material (Matching Hero Section Image 1 Exactly)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
      specularIntensity: 1.2,
      specularColor: new THREE.Color(0xffffff),
      envMapIntensity: 2.8,
    });

    // 5. Hero OG Monogram Mesh Group (Matching Hero Section Exactly)
    const rootOGGroup = new THREE.Group();
    scene.add(rootOGGroup);

    const ogInnerGroup = new THREE.Group();
    rootOGGroup.add(ogInnerGroup);

    // Letter 'O' (Torus)
    const oGeo = new THREE.TorusGeometry(0.58, 0.16, 32, 64);
    const letterO = new THREE.Mesh(oGeo, glassMat);
    letterO.position.set(-0.62, 0.06, 0);
    ogInnerGroup.add(letterO);

    // Letter 'G' (Torus Arc)
    const gGeo = new THREE.TorusGeometry(0.58, 0.16, 32, 64, Math.PI * 1.6);
    const letterG = new THREE.Mesh(gGeo, glassMat);
    letterG.position.set(0.62, 0.06, 0);
    letterG.rotation.set(0, 0, Math.PI * 0.25);
    ogInnerGroup.add(letterG);

    // Crossbar
    const gBarGeo = new THREE.BoxGeometry(0.58, 0.16, 0.16);
    const gBar = new THREE.Mesh(gBarGeo, glassMat);
    gBar.position.set(0.62, -0.1, 0.16);
    ogInnerGroup.add(gBar);

    // Soft Ground Drop Shadow Plane (Matching Hero Section Exactly)
    const createDropShadowTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
        grad.addColorStop(0, 'rgba(15, 12, 28, 0.45)');
        grad.addColorStop(0.35, 'rgba(15, 12, 28, 0.22)');
        grad.addColorStop(0.7, 'rgba(15, 12, 28, 0.06)');
        grad.addColorStop(1, 'rgba(15, 12, 28, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
      }
      return new THREE.CanvasTexture(c);
    };

    const shadowPlaneGeo = new THREE.PlaneGeometry(3.6, 1.8);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: createDropShadowTexture(),
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    });
    const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.78, 0);
    rootOGGroup.add(shadowMesh);

    // Initial positioning & responsive sizing matching Hero Section (Centered & Monumental)
    let baseScale = 1.65;
    let basePosX = 0;
    let startY = 0.22;
    let scrollDeltaY = 1.5;

    const updateLayout = () => {
      const w = window.innerWidth;
      if (w < 768) {
        baseScale = 1.1;
        basePosX = 0;
        startY = 0.18;
        scrollDeltaY = 1.3;
      } else if (w < 1024) {
        baseScale = 1.4;
        basePosX = 0;
        startY = 0.2;
        scrollDeltaY = 1.4;
      } else {
        baseScale = 1.65;
        basePosX = 0;
        startY = 0.22;
        scrollDeltaY = 1.5;
      }
      rootOGGroup.scale.set(baseScale, baseScale, baseScale);
    };
    updateLayout();

    // 6. Interactive Mouse & Scroll State (Matching Hero Section Mouse Dynamics)
    let mouseX = 0;
    let mouseY = 0;

    // Synchronously compute initial scroll state to prevent initial frame glitch / jumping
    const initScrollY = typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop || 0) : 0;
    const initMaxScroll = typeof window !== 'undefined' ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) : 1;
    let currentScrollProgress = Math.min(1, Math.max(0, initScrollY / initMaxScroll));
    let currentScrollVelocity = 0;

    let currentY = startY - (currentScrollProgress * scrollDeltaY);
    let currentRotY = currentScrollProgress * Math.PI * 2.0;

    // Place at exact hero coordinates (Centered at x:0, y:0.22, z:0.4)
    rootOGGroup.position.set(basePosX, currentY, 0.4);
    ogInnerGroup.rotation.y = currentRotY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Listen to Lenis smooth scroll progress or fallback to native scroll
    const updateScrollProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      currentScrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    if (lenis) {
      const unsubscribe = lenis.on('scroll', (e: { progress: number; velocity: number }) => {
        currentScrollProgress = e.progress;
        currentScrollVelocity = e.velocity || 0;
      });

      window.addEventListener('scroll', updateScrollProgress, { passive: true });
    } else {
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
    }

    // Resize Observer
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateLayout();
    };

    window.addEventListener('resize', handleResize);

    // Render immediately one frame synchronously
    renderer.render(scene, camera);

    // 7. Render & Scroll-Reactive Physics Loop (Exact Hero Physics)
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (document.hidden) return;

      const elapsedTime = clock.getElapsedTime();

      // Real-time scroll sampling guarantee
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const instantProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Blend instant progress with event progress
      currentScrollProgress += (instantProgress - currentScrollProgress) * 0.12;

      // Camera parallax matching hero section
      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.15 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Scroll-Reactive Dynamic Position
      const targetY = startY - (currentScrollProgress * scrollDeltaY);
      currentY += (targetY - currentY) * 0.08;
      rootOGGroup.position.y = currentY;
      rootOGGroup.position.x = basePosX;

      // Floating hover wave & interactive mouse tilt matching hero section
      ogInnerGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.05;

      const targetRotX = mouseY * 0.45;
      const targetScrollRotY = (mouseX * 0.55) + (currentScrollProgress * Math.PI * 2.0);
      const targetRotZ = (mouseX * -mouseY) * 0.2;

      ogInnerGroup.rotation.x += (targetRotX - ogInnerGroup.rotation.x) * 0.07;
      ogInnerGroup.rotation.y += (targetScrollRotY - ogInnerGroup.rotation.y) * 0.07;
      ogInnerGroup.rotation.z += (targetRotZ - ogInnerGroup.rotation.z) * 0.07;

      // Subtle dynamic letter breathing (Matching Hero Section Exactly)
      letterO.rotation.z = Math.sin(elapsedTime * 0.9) * 0.04;
      letterG.rotation.z = Math.PI * 0.25 + Math.cos(elapsedTime * 0.9) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateScrollProgress);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pmrem.dispose();
      oGeo.dispose();
      gGeo.dispose();
      gBarGeo.dispose();
      glassMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
    };
  }, [pathname, lenis, isLandingPage]);

  if (isLandingPage) return null;

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
      style={{
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
