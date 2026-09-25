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
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. High-Contrast Studio Environment Rig for Realistic Glass Refraction & Specular Rims
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#f0f4fa');

    // Overhead Key Softbox
    const softbox1Geo = new THREE.PlaneGeometry(10, 10);
    const softbox1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const softbox1 = new THREE.Mesh(softbox1Geo, softbox1Mat);
    softbox1.position.set(4, 9, 5);
    softbox1.lookAt(0, 0, 0);
    envScene.add(softbox1);

    // Left Studio Rim Light Strip (Produces brilliant glass edge highlights)
    const stripGeo = new THREE.PlaneGeometry(2.5, 12);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const strip = new THREE.Mesh(stripGeo, stripMat);
    strip.position.set(-7, 2, -3);
    strip.lookAt(0, 0, 0);
    envScene.add(strip);

    // Right Diffuse Bounce Card (Soft fill)
    const fillGeo = new THREE.PlaneGeometry(8, 8);
    const fillMat = new THREE.MeshBasicMaterial({ color: 0xdde6f5 });
    const fill = new THREE.Mesh(fillGeo, fillMat);
    fill.position.set(6, -3, 3);
    fill.lookAt(0, 0, 0);
    envScene.add(fill);

    // Subtle Horizon Contrast Band (Gives the glass its razor-sharp definition)
    const horizonGeo = new THREE.RingGeometry(8, 14, 32);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x9fb2cc, side: THREE.DoubleSide });
    const horizon = new THREE.Mesh(horizonGeo, horizonMat);
    horizon.rotation.x = Math.PI / 2;
    horizon.position.y = -2;
    envScene.add(horizon);

    const envTexture = pmrem.fromScene(envScene).texture;
    scene.environment = envTexture;

    // 3. Direct Directional & Ambient Lighting
    const amb = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topLight.position.set(0, 10, 1);
    scene.add(topLight);

    // 4. Background Depth Objects (Visible & Refracted Through Glass)
    const bgGroup = new THREE.Group();
    bgGroup.position.set(0, 0, -1.2);
    bgGroup.renderOrder = 0;
    scene.add(bgGroup);

    // A. Refractive Architectural Precision Grid & Crosshair Markings
    const createGridTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 1024;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 1024, 1024);

        // Fine grid lines
        ctx.strokeStyle = 'rgba(24, 21, 32, 0.18)';
        ctx.lineWidth = 1.8;
        const step = 64;
        for (let x = 0; x <= 1024; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 1024);
          ctx.stroke();
        }
        for (let y = 0; y <= 1024; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1024, y);
          ctx.stroke();
        }

        // Concentric optical range rings
        ctx.strokeStyle = 'rgba(24, 21, 32, 0.28)';
        ctx.lineWidth = 2.2;
        ctx.setLineDash([10, 8]);
        const center = 512;
        [160, 280, 400, 480].forEach(r => {
          ctx.beginPath();
          ctx.arc(center, center, r, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        // Bold Crosshair centerlines
        ctx.strokeStyle = 'rgba(24, 21, 32, 0.38)';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.moveTo(center, 40);
        ctx.lineTo(center, 984);
        ctx.moveTo(40, center);
        ctx.lineTo(984, center);
        ctx.stroke();

        // Technical coordinate labels & optics metadata
        ctx.fillStyle = 'rgba(24, 21, 32, 0.55)';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('REFRACTIVE OPTICS • IOR 1.54', 72, 92);
        ctx.fillText('DISPERSION: 0.15 • PBR TRANSMISSION 1.0', 72, 116);
        ctx.fillText('OPUS GEEKS ARCHITECTURAL LABS', 620, 92);
        ctx.fillText('SPECTRAL CAUSTICS ACTIVE', 620, 116);
        ctx.fillText('X: +0.6200  Y: +0.0600  Z: +0.0000', 72, 940);
        ctx.fillText('TRUE CRYSTAL GLASS SPEC V3.4', 620, 940);

        // Center target ticks
        ctx.strokeRect(center - 28, center - 28, 56, 56);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 8;
      return tex;
    };

    const gridTexture = createGridTexture();
    const gridGeo = new THREE.PlaneGeometry(6.6, 6.6);
    const gridMat = new THREE.MeshBasicMaterial({
      map: gridTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    bgGroup.add(gridMesh);

    // B. Floating Chromatic Iridescent Ambient Light Orbs (Refracted & Magnified Through the Glass)
    const orbGroup = new THREE.Group();
    bgGroup.add(orbGroup);

    const createOrbTexture = (colorCore: string, colorMid: string) => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, colorCore);
        grad.addColorStop(0.45, colorMid);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
      }
      return new THREE.CanvasTexture(c);
    };

    const orb1Tex = createOrbTexture('rgba(96, 165, 250, 0.95)', 'rgba(59, 130, 246, 0.45)'); // Electric Ice Blue
    const orb2Tex = createOrbTexture('rgba(216, 180, 254, 0.90)', 'rgba(168, 85, 247, 0.40)'); // Soft Lavender Prism
    const orb3Tex = createOrbTexture('rgba(253, 224, 71, 0.90)', 'rgba(245, 158, 11, 0.45)');  // Warm Golden Amber

    const orb1Geo = new THREE.PlaneGeometry(2.2, 2.2);
    const orb1Mat = new THREE.MeshBasicMaterial({ map: orb1Tex, transparent: true, opacity: 0.85, depthWrite: false });
    const orb1 = new THREE.Mesh(orb1Geo, orb1Mat);
    orb1.position.set(-1.1, 0.3, 0.2);
    orbGroup.add(orb1);

    const orb2Geo = new THREE.PlaneGeometry(2.0, 2.0);
    const orb2Mat = new THREE.MeshBasicMaterial({ map: orb2Tex, transparent: true, opacity: 0.80, depthWrite: false });
    const orb2 = new THREE.Mesh(orb2Geo, orb2Mat);
    orb2.position.set(1.0, -0.3, 0.1);
    orbGroup.add(orb2);

    const orb3Geo = new THREE.PlaneGeometry(1.8, 1.8);
    const orb3Mat = new THREE.MeshBasicMaterial({ map: orb3Tex, transparent: true, opacity: 0.75, depthWrite: false });
    const orb3 = new THREE.Mesh(orb3Geo, orb3Mat);
    orb3.position.set(0.0, 0.6, 0.15);
    orbGroup.add(orb3);

    // 5. TRUE OPTICAL CRYSTAL GLASS MATERIAL (Zero Emissive, High IOR & Dispersion)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      roughness: 0.02,
      metalness: 0.0,
      transmission: 1.0,           // 100% full optical transmission for pure see-through glass
      ior: 1.54,                   // High-density optical flint crystal glass refractive index
      thickness: 1.8,              // Substantial optical thickness for deep lens magnification
      dispersion: 0.15,            // Real physical chromatic dispersion (prism rainbow splits on refracted edges)
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      reflectivity: 0.95,
      transparent: true,
      opacity: 1.0,
      envMapIntensity: 2.4,
      attenuationColor: new THREE.Color(0xffffff),
      attenuationDistance: 6.0,
    });

    // 6. High-Precision OG Monogram Mesh Group
    const heroOGGroup = new THREE.Group();
    heroOGGroup.renderOrder = 1;
    scene.add(heroOGGroup);

    const ogInnerGroup = new THREE.Group();
    heroOGGroup.add(ogInnerGroup);

    // Letter 'O' (High-density Torus for fluid Snell refraction)
    const oGeo = new THREE.TorusGeometry(0.58, 0.16, 48, 128);
    const letterO = new THREE.Mesh(oGeo, glassMat);
    letterO.position.set(-0.62, 0.06, 0);
    ogInnerGroup.add(letterO);

    // Letter 'G': Seamless solid glass tube with rounded hemispherical caps matching 'O'
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
    const gTubeGeo = new THREE.TubeGeometry(gCurve, 160, 0.16, 32, false);

    // Polished hemispherical caps at the two terminals for an optical jewelry-grade finish
    const cap1 = new THREE.SphereGeometry(0.16, 32, 24);
    cap1.translate(gPoints[0].x, gPoints[0].y, gPoints[0].z);

    const cap2 = new THREE.SphereGeometry(0.16, 32, 24);
    const lastPt = gPoints[gPoints.length - 1];
    cap2.translate(lastPt.x, lastPt.y, lastPt.z);

    const mergedGGeo = mergeGeometries([gTubeGeo, cap1, cap2]);
    const letterG = new THREE.Mesh(mergedGGeo, glassMat);
    letterG.position.set(0.62, 0.06, 0);
    ogInnerGroup.add(letterG);

    // 7. Soft Ground Shadow Plane (Refracted through bottom glass curves)
    const createDropShadowTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
        grad.addColorStop(0, 'rgba(24, 21, 32, 0.28)');
        grad.addColorStop(0.35, 'rgba(24, 21, 32, 0.12)');
        grad.addColorStop(0.7, 'rgba(24, 21, 32, 0.03)');
        grad.addColorStop(1, 'rgba(24, 21, 32, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
      }
      return new THREE.CanvasTexture(c);
    };

    const shadowTexture = createDropShadowTexture();
    const shadowPlaneGeo = new THREE.PlaneGeometry(3.6, 1.8);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    });
    const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.0, 0);
    heroOGGroup.add(shadowMesh);

    // Initial Monogram Placement & Scaling
    heroOGGroup.position.set(0, 0, 0.4);
    heroOGGroup.scale.set(1.65, 1.65, 1.65);

    const updateScale = () => {
      const w = container.clientWidth || window.innerWidth;
      if (w < 768) {
        heroOGGroup.scale.set(1.1, 1.1, 1.1);
        heroOGGroup.position.set(0, 0, 0);
        bgGroup.scale.set(0.85, 0.85, 0.85);
      } else if (w < 1024) {
        heroOGGroup.scale.set(1.4, 1.4, 1.4);
        heroOGGroup.position.set(0, 0, 0.2);
        bgGroup.scale.set(1.0, 1.0, 1.0);
      } else {
        heroOGGroup.scale.set(1.65, 1.65, 1.65);
        heroOGGroup.position.set(0, 0, 0.4);
        bgGroup.scale.set(1.15, 1.15, 1.15);
      }
    };
    updateScale();

    // 8. Interactive Mouse Physics & Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;
    let targetBgX = 0;
    let targetBgY = 0;

    const handleWindowMouseMove = (e: globalThis.MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Monogram 3D tilt
      targetRotY = normX * 0.45;
      targetRotX = -normY * 0.35;
      targetRotZ = normX * -0.15;

      // Background subtle counter-parallax for real dynamic glass refraction
      targetBgX = normX * -0.35;
      targetBgY = normY * 0.25;
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

    // 9. High-Fidelity Physics Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Continuous Organic Floating & Breathing
      ogInnerGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.06;

      // Smooth Rotation Lerp
      ogInnerGroup.rotation.x += (targetRotX - ogInnerGroup.rotation.x) * 0.07;
      ogInnerGroup.rotation.y += (targetRotY - ogInnerGroup.rotation.y) * 0.07;
      ogInnerGroup.rotation.z += (targetRotZ - ogInnerGroup.rotation.z) * 0.07;

      // Gentle continuous ambient drift
      heroOGGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.08;

      // Background Parallax & Chromatic Orbs Drift
      bgGroup.position.x += (targetBgX - bgGroup.position.x) * 0.05;
      bgGroup.position.y += (targetBgY - bgGroup.position.y) * 0.05;

      // Floating orbs gentle floating orbital motion behind glass
      orb1.position.x = -1.3 + Math.sin(elapsedTime * 1.2) * 0.25;
      orb1.position.y = 0.5 + Math.cos(elapsedTime * 1.4) * 0.20;

      orb2.position.x = 1.2 + Math.cos(elapsedTime * 1.0) * 0.22;
      orb2.position.y = -0.4 + Math.sin(elapsedTime * 1.3) * 0.18;

      orb3.position.x = 0.1 + Math.sin(elapsedTime * 1.5) * 0.30;
      orb3.position.y = 0.8 + Math.cos(elapsedTime * 1.1) * 0.15;

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
      envTexture.dispose();
      
      // Geometries
      oGeo.dispose();
      gTubeGeo.dispose();
      cap1.dispose();
      cap2.dispose();
      mergedGGeo.dispose();
      shadowPlaneGeo.dispose();
      gridGeo.dispose();
      orb1Geo.dispose();
      orb2Geo.dispose();
      orb3Geo.dispose();
      softbox1Geo.dispose();
      stripGeo.dispose();
      fillGeo.dispose();
      horizonGeo.dispose();

      // Materials & Textures
      glassMat.dispose();
      shadowPlaneMat.dispose();
      shadowTexture.dispose();
      gridMat.dispose();
      gridTexture.dispose();
      orb1Mat.dispose();
      orb1Tex.dispose();
      orb2Mat.dispose();
      orb2Tex.dispose();
      orb3Mat.dispose();
      orb3Tex.dispose();
      softbox1Mat.dispose();
      stripMat.dispose();
      fillMat.dispose();
      horizonMat.dispose();
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
