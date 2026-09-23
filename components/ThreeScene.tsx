'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    containerRef.current.appendChild(renderer.domElement);

    // Lights (Noomo soft lavender & cool studio tones)
    const ambientLight = new THREE.AmbientLight(0xf1eef7, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xcfd7ff, 1.4);
    dirLight2.position.set(-6, -4, -2);
    scene.add(dirLight2);

    // Frosted Glass Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfaf9f5,
      metalness: 0.05,
      roughness: 0.22,
      transmission: 0.88,
      thickness: 1.6,
      ior: 1.52,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.6,
    });

    // Meshes matching Noomo floating geometry
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.TorusGeometry(1.0, 0.42, 32, 64),
      new THREE.BoxGeometry(1.3, 1.3, 1.3),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.DodecahedronGeometry(1.1, 0),
      new THREE.CylinderGeometry(0.7, 0.7, 1.4, 32),
    ];

    const basePositions = [
      { x: -2.8, y: 1.2, z: -1.2 },
      { x: 3.0, y: -0.8, z: -2.0 },
      { x: 0.1, y: 2.2, z: -3.0 },
      { x: 2.4, y: 1.8, z: -1.8 },
      { x: -1.8, y: -2.2, z: -2.5 },
    ];

    geometries.forEach((geom, idx) => {
      const mesh = new THREE.Mesh(geom, glassMaterial);
      mesh.position.set(basePositions[idx].x, basePositions[idx].y, basePositions[idx].z);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      shapes.push(mesh);
    });

    // Interaction states
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Mouse Parallax Lerp
      camera.position.x += (mouseX * 0.9 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.7 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Scroll kinetic transformations
      shapes.forEach((mesh, index) => {
        const factor = (index + 1) * 0.4;
        mesh.rotation.x = elapsedTime * 0.25 + scrollProgress * Math.PI * 3 * factor;
        mesh.rotation.y = elapsedTime * 0.35 + scrollProgress * Math.PI * 2 * factor;

        // Disperse and push through Z/Y axes when scrolling
        mesh.position.y = basePositions[index].y - scrollProgress * 10 * factor;
        mesh.position.z = basePositions[index].z + Math.sin(scrollProgress * Math.PI * 2) * 2;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometries.forEach((g) => g.dispose());
      glassMaterial.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
}
