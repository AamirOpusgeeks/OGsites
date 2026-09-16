import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

// Complete FileReader polyfill for Node.js
class FileReaderPolyfill {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      const base64 = Buffer.from(buf).toString('base64');
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
      if (this.onload) this.onload({ target: this });
    });
  }
}
global.FileReader = FileReaderPolyfill;

const scene = new THREE.Scene();

// 1. Materials
const bellMat = new THREE.MeshStandardMaterial({
  color: 0xd8b4fe,
  roughness: 0.15,
  metalness: 0.1,
  transparent: true,
  opacity: 0.88,
  emissive: 0x9333ea,
  emissiveIntensity: 0.35,
  side: THREE.DoubleSide,
});

const innerBellMat = new THREE.MeshStandardMaterial({
  color: 0xf472b6,
  roughness: 0.2,
  transparent: true,
  opacity: 0.75,
  emissive: 0xd946ef,
  emissiveIntensity: 0.5,
  side: THREE.DoubleSide,
});

const coreMat = new THREE.MeshStandardMaterial({
  color: 0xc084fc,
  emissive: 0xa855f7,
  emissiveIntensity: 0.9,
  roughness: 0.1,
});

const armMat = new THREE.MeshStandardMaterial({
  color: 0xe879f9,
  roughness: 0.25,
  transparent: true,
  opacity: 0.85,
  emissive: 0x7e22ce,
  emissiveIntensity: 0.3,
  side: THREE.DoubleSide,
});

const tentacleMat = new THREE.MeshStandardMaterial({
  color: 0xd8b4fe,
  roughness: 0.3,
  transparent: true,
  opacity: 0.8,
  emissive: 0xa855f7,
  emissiveIntensity: 0.4,
});

// 2. Outer Bell Dome (Translucent umbrella)
const bellGeo = new THREE.SphereGeometry(0.7, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.58);
const pos = bellGeo.attributes.position;
for (let i = 0; i < pos.count; i++) {
  const y = pos.getY(i);
  const x = pos.getX(i);
  const z = pos.getZ(i);
  const r = Math.sqrt(x * x + z * z);
  const ripple = Math.sin(Math.atan2(z, x) * 16) * 0.02 * (r / 0.7);
  pos.setX(i, x * (1 + ripple));
  pos.setZ(i, z * (1 + ripple));
  pos.setY(i, y * 0.8);
}
bellGeo.computeVertexNormals();
const bellMesh = new THREE.Mesh(bellGeo, bellMat);
scene.add(bellMesh);

// 3. Inner Bell Dome
const innerBellGeo = new THREE.SphereGeometry(0.5, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.52);
const innerBellMesh = new THREE.Mesh(innerBellGeo, innerBellMat);
innerBellMesh.scale.set(1.0, 0.75, 1.0);
innerBellMesh.position.set(0, 0.04, 0);
scene.add(innerBellMesh);

// 4. Glowing Core / Nucleus
const coreGeo = new THREE.SphereGeometry(0.22, 24, 18);
const coreMesh = new THREE.Mesh(coreGeo, coreMat);
coreMesh.position.set(0, 0.1, 0);
scene.add(coreMesh);

// 5. Four Oral Arms
for (let i = 0; i < 4; i++) {
  const angle = (i / 4) * Math.PI * 2;
  const armPoints = [];
  for (let j = 0; j <= 20; j++) {
    const t = j / 20;
    const y = -t * 0.9;
    const spiral = t * Math.PI * 2.5 + angle;
    const radius = 0.12 * (1 - t * 0.6);
    const x = Math.cos(spiral) * radius;
    const z = Math.sin(spiral) * radius;
    armPoints.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(armPoints);
  const armGeo = new THREE.TubeGeometry(curve, 24, 0.02, 8, false);
  const armMesh = new THREE.Mesh(armGeo, armMat);
  scene.add(armMesh);
}

// 6. Perimeter Tentacles
for (let i = 0; i < 16; i++) {
  const angle = (i / 16) * Math.PI * 2;
  const radius = 0.58;
  const points = [];
  for (let j = 0; j <= 24; j++) {
    const t = j / 24;
    const y = -t * 1.1;
    const wave = Math.sin(t * Math.PI * 3 + i) * 0.04;
    const x = Math.cos(angle) * radius + wave;
    const z = Math.sin(angle) * radius + Math.cos(t * Math.PI * 2.5 + i) * 0.03;
    points.push(new THREE.Vector3(x, y, z));
  }
  const tCurve = new THREE.CatmullRomCurve3(points);
  const tGeo = new THREE.TubeGeometry(tCurve, 24, 0.008, 6, false);
  const tMesh = new THREE.Mesh(tGeo, tentacleMat);
  scene.add(tMesh);
}

// Export as GLB
const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (gltf) => {
    const outPath = path.resolve(process.cwd(), 'public/models/Jellyfish.glb');
    fs.writeFileSync(outPath, Buffer.from(gltf));
    console.log('Successfully generated public/models/Jellyfish.glb, size:', fs.statSync(outPath).size);
  },
  (error) => {
    console.error('Error exporting GLTF:', error);
  },
  { binary: true }
);
