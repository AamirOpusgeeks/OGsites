'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EnterpriseCards3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);

    // Studio Lights
    const amb = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(amb);

    const key = new THREE.DirectionalLight(0xffffff, 3.5);
    key.position.set(5, 8, 6);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 2.0);
    rim.position.set(-6, -4, -3);
    scene.add(rim);

    // Helper: Canvas Texture for Labels (iOS, Android, Web)
    const createCardTexture = (title: string, subtitle: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 512, 512);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 38px sans-serif';
        ctx.fillText(title, 48, 80);
        ctx.font = '24px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(subtitle, 48, 120);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // Rounded Box Geometry for Sleek Glass Cards
    const cardGeo = new THREE.BoxGeometry(2.3, 1.3, 0.08);

    // Card 1: iOS (Electric Blue)
    const iosTex = createCardTexture('iOS', 'Apple Ecosystem');
    const iosMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1e60f2'),
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.65,
      thickness: 1.2,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.95,
      map: iosTex,
    });

    // Card 2: Android (Vibrant Coral / Orange)
    const androidTex = createCardTexture('Android', 'Google Play Core');
    const androidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f05d3b'),
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.65,
      thickness: 1.2,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.95,
      map: androidTex,
    });

    // Card 3: Web (Teal / Green)
    const webTex = createCardTexture('Web', 'Cloud & PWA Platform');
    const webMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1cb287'),
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.65,
      thickness: 1.2,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.95,
      map: webTex,
    });

    const stackGroup = new THREE.Group();
    scene.add(stackGroup);

    // 1. Top Card: iOS
    const iosCard = new THREE.Mesh(cardGeo, iosMat);
    iosCard.position.set(0, 0.45, 0.35);
    iosCard.rotation.set(-0.25, 0.22, -0.06);
    stackGroup.add(iosCard);

    // 2. Middle Card: Android
    const androidCard = new THREE.Mesh(cardGeo, androidMat);
    androidCard.position.set(0, -0.05, 0.15);
    androidCard.rotation.set(-0.22, 0.18, -0.04);
    stackGroup.add(androidCard);

    // 3. Bottom Card: Web
    const webCard = new THREE.Mesh(cardGeo, webMat);
    webCard.position.set(0, -0.55, -0.05);
    webCard.rotation.set(-0.18, 0.15, -0.02);
    stackGroup.add(webCard);

    // Base Frosted Pedestal (Platform)
    const pedestalGeo = new THREE.BoxGeometry(3.0, 0.15, 2.2);
    const pedestalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.5,
      transparent: true,
      opacity: 0.92,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, -1.2, 0);
    pedestal.rotation.set(0.2, -0.3, 0.05);
    scene.add(pedestal);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;

    const onPointer = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onPointer);

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop with performance.now()
    let reqId: number;
    const startTime = performance.now();

    const loop = () => {
      reqId = requestAnimationFrame(loop);
      const t = (performance.now() - startTime) * 0.001;

      // Stack Float & Tilt
      stackGroup.rotation.y += (mouseX * 0.35 - stackGroup.rotation.y) * 0.05;
      stackGroup.rotation.x += (-mouseY * 0.25 - stackGroup.rotation.x) * 0.05;

      // Soft Floating Breathing on individual cards
      iosCard.position.y = 0.45 + Math.sin(t * 1.8) * 0.03;
      androidCard.position.y = -0.05 + Math.sin(t * 1.8 + 0.6) * 0.025;
      webCard.position.y = -0.55 + Math.sin(t * 1.8 + 1.2) * 0.02;

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onPointer);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      cardGeo.dispose();
      pedestalGeo.dispose();
      iosMat.dispose();
      androidMat.dispose();
      webMat.dispose();
      pedestalMat.dispose();
      iosTex.dispose();
      androidTex.dispose();
      webTex.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full pointer-events-none" />;
}
