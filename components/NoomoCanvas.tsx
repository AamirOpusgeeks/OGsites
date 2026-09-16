'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface NoomoCanvasProps {
  scrollProgress?: number; // 0 (Hero) to 1 (Section 2)
}

export default function NoomoCanvas({ scrollProgress = 0 }: NoomoCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(scrollProgress);
  progressRef.current = scrollProgress;

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);

    // 2. Dynamic Studio Environment for Crisp Glass Reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#ffffff');
    const envL1 = new THREE.DirectionalLight(0xffffff, 4.0);
    envL1.position.set(6, 12, 6);
    envScene.add(envL1);
    const envTex = pmrem.fromScene(envScene).texture;
    scene.environment = envTex;

    // 3. Balanced Studio Lights & Ambient
    const amb = new THREE.AmbientLight(0xdbe3ee, 1.8);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(4, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.4);
    rimLight.position.set(-5, -4, -3);
    scene.add(rimLight);

    // 4. Frosted Glass Material for Platform & Sculptures
    const frostedGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#faf8f5'),
      roughness: 0.18,
      metalness: 0.05,
      transmission: 0.92,
      thickness: 1.8,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.96,
      envMap: envTex,
      envMapIntensity: 1.6,
    });

    // 5. DRACO + GLTF Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // 6. HERO ELEMENTS (Left & Right Floating Glass Accents)
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    loader.load(
      '/models/Platform-O.glb',
      (gltf) => {
        const left = gltf.scene;
        left.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = frostedGlassMat;
        });
        left.scale.set(0.13, 0.13, 0.13);
        left.position.set(-1.65, 0.45, 1.0);
        left.rotation.set(0.3, -0.4, 0.1);
        heroGroup.add(left);
      },
      undefined,
      (err) => console.error('Error loading left Platform-O:', err)
    );

    loader.load(
      '/models/N.glb',
      (gltf) => {
        const right = gltf.scene;
        right.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = frostedGlassMat;
        });
        right.scale.set(0.12, 0.12, 0.12);
        right.position.set(1.85, -0.45, 1.1);
        right.rotation.set(-0.2, 0.35, -0.1);
        heroGroup.add(right);
      },
      undefined,
      (err) => console.error('Error loading right N.glb:', err)
    );

    // 7. SECTION 2 STAGE (Horizontal Stepped Platform & Jellyfish)
    const stageGroup = new THREE.Group();
    stageGroup.position.set(0, 0, -5.0); // Initially deep in the Z-plane
    stageGroup.scale.set(0.65, 0.65, 0.65);
    stageGroup.visible = false;
    scene.add(stageGroup);

    let stagePlatform: THREE.Group | null = null;
    loader.load(
      '/models/Platform-O.glb',
      (gltf) => {
        stagePlatform = gltf.scene;
        stagePlatform.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = frostedGlassMat;
        });
        // Correct Isometric Floor Angle
        stagePlatform.scale.set(0.78, 0.78, 0.78);
        stagePlatform.rotation.set(1.22, -0.28, 0.14);
        stagePlatform.position.set(0, -0.65, 0.1);
        stageGroup.add(stagePlatform);
      },
      undefined,
      (err) => console.error('Error loading stage Platform-O:', err)
    );

    // Sculpted Translucent Bioluminescent Jellyfish
    const createSculptedJellyfish = () => {
      const jGroup = new THREE.Group();
      const jellyMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#d8b4fe'),
        roughness: 0.12,
        metalness: 0.08,
        transmission: 0.9,
        thickness: 1.4,
        ior: 1.48,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.92,
        emissive: new THREE.Color('#9333ea'),
        emissiveIntensity: 0.45,
        envMap: envTex,
        envMapIntensity: 2.0,
      });

      const bellGeo = new THREE.SphereGeometry(0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58);
      const bell = new THREE.Mesh(bellGeo, jellyMat);
      bell.scale.set(1.0, 0.65, 1.0);
      jGroup.add(bell);

      const coreGeo = new THREE.SphereGeometry(0.18, 20, 16);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0xa855f7,
        emissiveIntensity: 0.9,
        roughness: 0.1,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(0, 0.05, 0);
      jGroup.add(core);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const pts: THREE.Vector3[] = [];
        for (let j = 0; j <= 12; j++) {
          const y = -j * 0.07;
          const x = Math.cos(angle) * 0.22 + Math.sin(j * 0.5) * 0.03;
          const z = Math.sin(angle) * 0.22 + Math.cos(j * 0.5) * 0.03;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const tGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const tMat = new THREE.LineBasicMaterial({ color: 0xd8b4fe, transparent: true, opacity: 0.8 });
        jGroup.add(new THREE.Line(tGeo, tMat));
      }

      jGroup.scale.set(0.65, 0.65, 0.65);
      jGroup.position.set(0.1, 0.35, 0.4);
      jGroup.rotation.set(0.15, -0.2, 0);
      return jGroup;
    };

    let jellyfishMesh: THREE.Group | null = null;
    loader.load(
      '/models/Jellyfish.glb',
      (gltf) => {
        jellyfishMesh = gltf.scene;
        jellyfishMesh.scale.set(0.65, 0.65, 0.65);
        jellyfishMesh.position.set(0.1, 0.35, 0.4);
        jellyfishMesh.rotation.set(0.15, -0.2, 0);
        stageGroup.add(jellyfishMesh);
      },
      undefined,
      () => {
        jellyfishMesh = createSculptedJellyfish();
        stageGroup.add(jellyfishMesh);
      }
    );

    // 8. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onPointer = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onPointer);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 9. Animation Loop with performance.now()
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);
      const t = (performance.now() - startTime) * 0.001;
      const p = progressRef.current; // 0 -> 1 scroll interpolation

      // 1. Camera Forward Dolly
      camera.position.z = 8.5 - Math.min(1.2, p * 1.5);

      // 2. Hero Elements: Spatial Fly-Through past viewer's periphery in Phase 0
      const heroExitP = Math.min(1, p * 3.5);
      heroGroup.position.z = heroExitP * 5.5;
      heroGroup.position.x = -heroExitP * 1.2;
      heroGroup.visible = heroExitP < 0.98;
      heroGroup.rotation.y += (mouseX * 0.15 - heroGroup.rotation.y) * 0.05;

      // 3. Section Stage: Emerges into resting focus and evolves across sections
      const stageEnterP = Math.min(1, p * 3.0);
      const targetZ = -5.0 + stageEnterP * 5.0;
      const targetScale = 0.65 + stageEnterP * 0.35;
      stageGroup.position.z += (targetZ - stageGroup.position.z) * 0.08;
      
      // When scrolling into Section 3 (Enterprise, p > 0.68), fade out stageGroup to give focus to EnterpriseCards3D
      const enterpriseFade = Math.max(0, Math.min(1, 1 - (p - 0.68) * 5));
      const curScale = (stageGroup.scale.x + (targetScale - stageGroup.scale.x) * 0.08) * enterpriseFade;
      stageGroup.scale.set(curScale, curScale, curScale);
      stageGroup.position.y = 0;
      stageGroup.visible = p > 0.03 && enterpriseFade > 0.02;
      stageGroup.rotation.y = mouseX * 0.08;
      stageGroup.rotation.x = -mouseY * 0.05;

      // Multi-stage Platform dynamic evolution across IMMERSIVE -> INTERACTIVE
      if (stagePlatform) {
        stagePlatform.rotation.y = -0.28 + p * 0.6 + Math.sin(t * 0.4) * 0.03;
        stagePlatform.rotation.x = 1.22 - p * 0.12;
      }

      // Jellyfish Floating Oscillation
      if (jellyfishMesh) {
        jellyfishMesh.position.y = 0.35 + Math.sin(t * 1.8) * 0.05;
        jellyfishMesh.rotation.y = p * 0.8 + Math.sin(t * 0.6) * 0.05;
        jellyfishMesh.rotation.z = Math.sin(t * 0.9) * 0.03;
      }

      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onPointer);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      dracoLoader.dispose();
      pmrem.dispose();
      envTex.dispose();
      renderer.dispose();
      frostedGlassMat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
