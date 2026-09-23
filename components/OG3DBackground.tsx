'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

interface OG3DBackgroundProps {
  className?: string;
}

export default function OG3DBackground({ className = '' }: OG3DBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;

    // 1. Scene & Camera Setup (Matches Hero Section exact ratio)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 2.2;
    container.appendChild(renderer.domElement);

    // 2. 100% PURE BRILLIANT WHITE Studio Environment (Zero Off-White)
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

    // 3. Studio Lighting (100% Pure Brilliant Snow White)
    const amb = new THREE.AmbientLight(0xffffff, 3.0);
    scene.add(amb);

    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(5, 10, 7);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 3.0);
    fill.position.set(-6, 2, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 3.0);
    rim.position.set(-6, -5, -4);
    scene.add(rim);

    // 4. 100% PURE BRILLIANT SNOW WHITE Crystal Water Glass (Zero Off-White Tint)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.18, // Ensures bright, glowing, pure white optical brilliance
      roughness: 0.04,
      transmission: 0.96,
      thickness: 0.55,
      ior: 1.333, // Real physical water refractive index
      reflectivity: 1.0,
      transparent: true,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      envMapIntensity: 2.8,
      attenuationColor: new THREE.Color(0xffffff),
      attenuationDistance: 3.0,
    });

    // 5. Exact Hero OG Monogram Mesh Group
    const heroOGGroup = new THREE.Group();
    scene.add(heroOGGroup);

    const ogInnerGroup = new THREE.Group();
    heroOGGroup.add(ogInnerGroup);

    // Letter 'O'
    const oGeo = new THREE.TorusGeometry(0.58, 0.16, 32, 64);
    const letterO = new THREE.Mesh(oGeo, glassMat);
    letterO.position.set(-0.62, 0.06, 0);
    ogInnerGroup.add(letterO);

    // "G" letter: seamless solid glass tube with rounded caps matching "O" in proportion and thickness
    const gRadius = 0.58;
    const gBarY = -0.04;
    const gStartRad = (50 * Math.PI) / 180;
    const gPoints = [
      new THREE.Vector3(gRadius * Math.cos(gStartRad), gRadius * Math.sin(gStartRad), 0),
      new THREE.Vector3(gRadius * Math.cos((75 * Math.PI) / 180), gRadius * Math.sin((75 * Math.PI) / 180), 0),
      new THREE.Vector3(gRadius * Math.cos((110 * Math.PI) / 180), gRadius * Math.sin((110 * Math.PI) / 180), 0),
      new THREE.Vector3(gRadius * Math.cos((150 * Math.PI) / 180), gRadius * Math.sin((150 * Math.PI) / 180), 0),
      new THREE.Vector3(-gRadius, 0, 0),
      new THREE.Vector3(gRadius * Math.cos((215 * Math.PI) / 180), gRadius * Math.sin((215 * Math.PI) / 180), 0),
      new THREE.Vector3(0, -gRadius, 0),
      new THREE.Vector3(gRadius * Math.cos((305 * Math.PI) / 180), gRadius * Math.sin((305 * Math.PI) / 180), 0),
      new THREE.Vector3(gRadius * Math.cos((335 * Math.PI) / 180), gRadius * Math.sin((335 * Math.PI) / 180), 0),
      new THREE.Vector3(gRadius, gBarY - 0.1, 0),
      new THREE.Vector3(gRadius - 0.03, gBarY, 0),
      new THREE.Vector3(0.35, gBarY, 0),
      new THREE.Vector3(0.12, gBarY, 0),
    ];

    const gCurve = new THREE.CatmullRomCurve3(gPoints, false, 'centripetal');
    const gTubeGeo = new THREE.TubeGeometry(gCurve, 128, 0.16, 24, false);

    // Polished hemispherical caps at the two terminals for a luxury jewelry-grade finish
    const cap1 = new THREE.SphereGeometry(0.16, 24, 16);
    cap1.translate(gPoints[0].x, gPoints[0].y, gPoints[0].z);

    const cap2 = new THREE.SphereGeometry(0.16, 24, 16);
    const lastPt = gPoints[gPoints.length - 1];
    cap2.translate(lastPt.x, lastPt.y, lastPt.z);

    const mergedGGeo = mergeGeometries([gTubeGeo, cap1, cap2]);
    const letterG = new THREE.Mesh(mergedGGeo, glassMat);
    letterG.position.set(0.62, 0.06, 0);
    ogInnerGroup.add(letterG);

    // Soft Studio Drop Shadow Texture (Clean Monochrome)
    const createDropShadowTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
        grad.addColorStop(0, 'rgba(24, 21, 32, 0.30)');
        grad.addColorStop(0.35, 'rgba(24, 21, 32, 0.14)');
        grad.addColorStop(0.7, 'rgba(24, 21, 32, 0.03)');
        grad.addColorStop(1, 'rgba(24, 21, 32, 0)');
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
    shadowMesh.position.set(0, -1.0, 0);
    heroOGGroup.add(shadowMesh);

    // Hero Scale & Center Placement
    heroOGGroup.position.set(0, 0, 0.4);
    heroOGGroup.scale.set(1.65, 1.65, 1.65);

    // Responsive scaling
    const updateScale = () => {
      const w = container.clientWidth || window.innerWidth;
      if (w < 768) {
        heroOGGroup.scale.set(1.1, 1.1, 1.1);
        heroOGGroup.position.set(0, 0, 0);
      } else if (w < 1024) {
        heroOGGroup.scale.set(1.4, 1.4, 1.4);
        heroOGGroup.position.set(0, 0, 0.2);
      } else {
        heroOGGroup.scale.set(1.65, 1.65, 1.65);
        heroOGGroup.position.set(0, 0, 0.4);
      }
    };
    updateScale();

    // 6. Interactive Mouse Hover Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;

    const handleWindowMouseMove = (e: globalThis.MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = normX * 0.4;
      targetRotX = -normY * 0.35;
      targetRotZ = normX * -0.15;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      updateScale();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7. Exact Animation Loop from Hero Section
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Continuous Organic Floating & Breathing (Exact Hero Section formula)
      ogInnerGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.06;

      // Smooth Rotation Lerp
      ogInnerGroup.rotation.x += (targetRotX - ogInnerGroup.rotation.x) * 0.07;
      ogInnerGroup.rotation.y += (targetRotY - ogInnerGroup.rotation.y) * 0.07;
      ogInnerGroup.rotation.z += (targetRotZ - ogInnerGroup.rotation.z) * 0.07;

      // Gentle continuous ambient drift
      heroOGGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pmrem.dispose();
      oGeo.dispose();
      gTubeGeo.dispose();
      cap1.dispose();
      cap2.dispose();
      mergedGGeo.dispose();
      glassMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    />
  );
}
