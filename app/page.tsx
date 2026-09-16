'use client';

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { ArrowUpRight, ChevronDown, Smartphone, Globe, Palette, Sparkles } from 'lucide-react';
import AIChatArchitect from '@/components/AIChatArchitect';
import OpusLogo from '@/components/OpusLogo';

gsap.registerPlugin(ScrollTrigger);

const OPUS_SECTIONS = [
  {
    id: 'fintech',
    title: 'FINTECH',
    tag: 'Mobile Architecture',
    category: 'React Native / High-Frequency Sync',
    client: 'Apex Global Financial App',
    desc: 'Sub-second WebSocket order execution pipelines, biometric zero-trust encryption, and bulletproof native state management engineered for scale.',
  },
  {
    id: 'cloud-saas',
    title: 'CLOUD SAAS',
    tag: 'Enterprise Web',
    category: 'Next.js Cloud / Distributed APIs',
    client: 'Nexus Cloud Intelligence Platform',
    desc: 'Scalable multi-tenant analytics dashboard and distributed cloud architecture handling 45k+ req/sec with edge caching and zero-downtime rollouts.',
  },
  {
    id: 'ecosystem',
    title: 'ECOSYSTEM',
    tag: 'Unified Multi-Platform',
    category: 'Multi-Device / AI-Powered Sync',
    client: 'Synapse Enterprise Ecosystem',
    desc: 'Unified enterprise infrastructure seamlessly synchronized across native iOS, Android, and responsive web platforms with real-time state replication.',
  },
];

export default function Page() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isChatOpenRef = useRef(isChatOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync isChatOpenRef and keep header visible when chat opens
  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
    if (isChatOpen && headerRef.current) {
      gsap.to(headerRef.current, { yPercent: 0, duration: 0.25, ease: 'power2.out' });
    }
  }, [isChatOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Programmatic Scroll Function to exact timeline stages
  const scrollToSection = (target: 'hero' | 'engineering' | 'ecosystem' | 'enterprise' | 'connect') => {
    const st = scrollTriggerRef.current;
    const lenis = lenisRef.current;
    if (!st || !lenis) return;

    const start = st.start;
    const distance = st.end - st.start;

    let targetScroll = 0;
    if (target === 'hero') {
      targetScroll = 0;
    } else if (target === 'engineering') {
      targetScroll = start + distance * 0.28;
    } else if (target === 'ecosystem') {
      targetScroll = start + distance * 0.62;
    } else if (target === 'enterprise' || target === 'connect') {
      targetScroll = start + distance * 0.95;
    }

    lenis.scrollTo(targetScroll, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  useEffect(() => {
    // 1. Lenis Smooth Scrolling (Precision calibrated for 120Hz/60Hz macOS trackpad & mouse wheel)
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Three.js Scene Setup
    const container = canvasContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.6;
    container.appendChild(renderer.domElement);

    // Lighting — bright white environment for clean white glass
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#f5f7fc');
    const envL1 = new THREE.DirectionalLight(0xffffff, 3.0);
    envL1.position.set(5, 10, 5);
    envScene.add(envL1);
    const envL2 = new THREE.DirectionalLight(0xf0f4ff, 2.0);
    envL2.position.set(-5, 5, -5);
    envScene.add(envL2);
    const envAmb = new THREE.AmbientLight(0xffffff, 2.0);
    envScene.add(envAmb);
    scene.environment = pmrem.fromScene(envScene).texture;

    const amb = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 3.0);
    key.position.set(5, 8, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xf0f4ff, 1.5);
    rim.position.set(-6, -4, -3);
    scene.add(rim);

    // Dynamic UI Texture Helpers — Ultra Clean Light Theme Luxury
    const createMobileScreenTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 2048;
      const ctx = c.getContext('2d');
      if (ctx) {
        // High-DPI Smooth Anti-Aliasing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Background: Pristine Luxury Off-White / Titanium Sheen
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
        bgGrad.addColorStop(0, '#f8fafc');
        bgGrad.addColorStop(1, '#edf2f7');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 2048);

        // Top Status Bar
        ctx.fillStyle = '#181520';
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('9:41', 80, 95);

        // Dynamic Island Capsule
        ctx.fillStyle = '#0f0f14';
        ctx.beginPath();
        ctx.roundRect(362, 50, 300, 68, 34);
        ctx.fill();

        // Dynamic Island Micro Camera & Sensor
        ctx.fillStyle = '#1e293b';
        ctx.beginPath(); ctx.arc(410, 84, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0a0a10';
        ctx.beginPath(); ctx.arc(410, 84, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.beginPath(); ctx.arc(620, 84, 5, 0, Math.PI * 2); ctx.fill();

        // Right Status Icons (Wifi, 5G, Battery)
        ctx.fillStyle = '#181520';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('5G', 840, 95);
        ctx.strokeStyle = '#181520';
        ctx.lineWidth = 4;
        ctx.strokeRect(900, 72, 44, 24);
        ctx.fillRect(904, 76, 32, 16);
        ctx.fillRect(946, 79, 4, 10);

        // App Header: User & Live Security Badge
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(105, 210, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#181520';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('OG', 82, 222);

        ctx.fillStyle = '#181520';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText('Opus Liquidity Vault', 175, 205);
        ctx.font = '500 28px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('Institutional Core • Tier 1', 175, 245);

        // Security Chip Indicator
        ctx.fillStyle = '#dcfce7';
        ctx.beginPath();
        ctx.roundRect(800, 185, 145, 52, 26);
        ctx.fill();
        ctx.fillStyle = '#16a34a';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('● SECURE', 820, 220);

        // ── HERO FINTECH BALANCE CARD ──
        const cardGrad = ctx.createLinearGradient(60, 310, 964, 820);
        cardGrad.addColorStop(0, '#181520');
        cardGrad.addColorStop(0.5, '#262233');
        cardGrad.addColorStop(1, '#0f0d14');

        ctx.shadowColor = 'rgba(24, 21, 32, 0.25)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 20;

        ctx.fillStyle = cardGrad;
        ctx.beginPath();
        ctx.roundRect(60, 310, 904, 510, 48);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Card Border Glow
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Card Header
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '600 28px sans-serif';
        ctx.fillText('TOTAL SETTLEMENT BALANCE', 110, 385);

        // Main Balance
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('$1,489,240.00', 110, 485);

        // Growth Badge Pill
        ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
        ctx.beginPath();
        ctx.roundRect(110, 525, 260, 56, 28);
        ctx.fill();
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('▲ +24.8% (24h)', 135, 564);

        // Card Chip Graphic
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.roundRect(810, 370, 90, 68, 16);
        ctx.fill();
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Card Footer
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '28px monospace';
        ctx.fillText('•••• 8920', 110, 760);
        ctx.fillText('EXP 09/29', 320, 760);

        ctx.font = 'bold 36px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('OPUS PRIME', 700, 760);

        // ── 4 ACTION BUTTONS ──
        const actions = [
          { label: 'Transfer', icon: '↗', bg: '#181520', text: '#ffffff' },
          { label: 'Receive', icon: '↙', bg: '#ffffff', text: '#181520' },
          { label: 'Exchange', icon: '⇄', bg: '#ffffff', text: '#181520' },
          { label: 'Vaults', icon: '◈', bg: '#ffffff', text: '#181520' },
        ];

        for (let i = 0; i < 4; i++) {
          const btnX = 60 + i * 235;
          ctx.fillStyle = actions[i].bg;
          ctx.beginPath();
          ctx.roundRect(btnX, 860, 200, 130, 32);
          ctx.fill();
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = actions[i].text;
          ctx.font = 'bold 44px sans-serif';
          ctx.fillText(actions[i].icon, btnX + 78, 925);
          ctx.font = '600 24px sans-serif';
          ctx.fillText(actions[i].label, btnX + 50, 965);
        }

        // ── LIVE PERFORMANCE ANALYTICS SECTION ──
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(60, 1030, 904, 380, 40);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#181520';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('High-Frequency Execution', 105, 1095);

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 28px monospace';
        ctx.fillText('● 0.04ms Latency', 690, 1095);

        // Realtime Glowing Chart Curve
        ctx.beginPath();
        ctx.moveTo(105, 1320);
        ctx.bezierCurveTo(280, 1340, 360, 1220, 520, 1260);
        ctx.bezierCurveTo(640, 1290, 760, 1160, 915, 1180);
        ctx.strokeStyle = '#181520';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Chart Gradient Fill
        ctx.lineTo(915, 1370);
        ctx.lineTo(105, 1370);
        ctx.closePath();
        const chartGrad = ctx.createLinearGradient(0, 1160, 0, 1370);
        chartGrad.addColorStop(0, 'rgba(24, 21, 32, 0.1)');
        chartGrad.addColorStop(1, 'rgba(24, 21, 32, 0)');
        ctx.fillStyle = chartGrad;
        ctx.fill();

        // ── RECENT SETTLEMENT TRANSACTIONS ──
        ctx.fillStyle = '#181520';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Real-Time Ledger', 60, 1470);

        const txs = [
          { name: 'Stripe Global Settlement', time: 'Just now • Verified', amt: '+$84,250.00', pos: true },
          { name: 'AWS Cloud Compute Cluster', time: '12m ago • Automated', amt: '-$3,120.00', pos: false },
          { name: 'Ethereum Liquidity Provider', time: '44m ago • Layer 2', amt: '+$142,500.00', pos: true },
          { name: 'Apple Pay Terminal Relay', time: '1h ago • POS Node', amt: '-$420.50', pos: false },
        ];

        for (let i = 0; i < txs.length; i++) {
          const ty = 1515 + i * 120;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(60, ty, 904, 100, 24);
          ctx.fill();
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Tx Icon Circle
          ctx.fillStyle = txs[i].pos ? '#f0fdf4' : '#f8fafc';
          ctx.beginPath();
          ctx.arc(115, ty + 50, 30, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = txs[i].pos ? '#16a34a' : '#64748b';
          ctx.font = 'bold 28px sans-serif';
          ctx.fillText(txs[i].pos ? '↓' : '↑', 105, ty + 58);

          // Details
          ctx.fillStyle = '#181520';
          ctx.font = 'bold 30px sans-serif';
          ctx.fillText(txs[i].name, 170, ty + 46);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '500 24px sans-serif';
          ctx.fillText(txs[i].time, 170, ty + 80);

          // Amount
          ctx.fillStyle = txs[i].pos ? '#16a34a' : '#181520';
          ctx.font = 'bold 32px monospace';
          ctx.fillText(txs[i].amt, 690, ty + 65);
        }
      }
      return new THREE.CanvasTexture(c);
    };

    const createKeyboardTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 680;
      const ctx = c.getContext('2d');
      if (ctx) {
        // Space Gray Anodized Aluminum Base
        ctx.fillStyle = '#22242a';
        ctx.fillRect(0, 0, 1024, 680);

        // Speaker Grills (Left & Right)
        ctx.fillStyle = '#141518';
        for (let x = 45; x <= 125; x += 10) {
          for (let y = 60; y <= 380; y += 8) {
            ctx.fillRect(x, y, 4, 4);
            ctx.fillRect(1024 - x - 4, y, 4, 4);
          }
        }

        // Recessed Dark Keyboard Well
        ctx.fillStyle = '#14151a';
        ctx.beginPath();
        ctx.roundRect(145, 45, 734, 345, 12);
        ctx.fill();
        ctx.strokeStyle = '#0e0f13';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Keyboard Rows (MacBook Magic Keyboard Layout)
        const rowHeights = [36, 44, 44, 44, 44, 48];
        let currentY = 55;
        for (let r = 0; r < 6; r++) {
          const h = rowHeights[r];
          const cols = r === 5 ? 8 : (r === 0 ? 14 : 14);
          const keyW = (710 - (cols - 1) * 6) / cols;
          for (let col = 0; col < cols; col++) {
            const kx = 157 + col * (keyW + 6);
            ctx.fillStyle = '#1c1e24';
            ctx.beginPath();
            ctx.roundRect(kx, currentY, keyW, h, 6);
            ctx.fill();
            ctx.strokeStyle = '#101116';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Subtle key legends / dots
            ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.fillRect(kx + keyW / 2 - 4, currentY + h / 2 - 1, 8, 2);
          }
          currentY += h + 7;
        }

        // Precision Force Touch Trackpad
        ctx.fillStyle = '#1f2127';
        ctx.beginPath();
        ctx.roundRect(360, 420, 304, 220, 14);
        ctx.fill();
        ctx.strokeStyle = '#323642';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      return new THREE.CanvasTexture(c);
    };

    const createLaptopScreenTexture = () => {
      const c = document.createElement('canvas');
      c.width = 2048;
      c.height = 1280;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Deep Space Black / Dark Luxury Cloud Platform Canvas
        ctx.fillStyle = '#0f1015';
        ctx.fillRect(0, 0, 2048, 1280);

        // Top Browser Header & Tab Bar
        ctx.fillStyle = '#161820';
        ctx.fillRect(0, 0, 2048, 96);
        ctx.strokeStyle = '#262936';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 95, 2048, 1);

        // macOS Window Controls (Red, Yellow, Green Dots)
        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(45, 48, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.arc(80, 48, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#10b981';
        ctx.beginPath(); ctx.arc(115, 48, 12, 0, Math.PI * 2); ctx.fill();

        // Browser URL Address Capsule
        ctx.fillStyle = '#0f1015';
        ctx.beginPath();
        ctx.roundRect(460, 22, 1128, 52, 26);
        ctx.fill();
        ctx.strokeStyle = '#2d3142';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('🔒', 500, 56);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '600 24px monospace';
        ctx.fillText('https://cloud.opusgeeks.com/cluster/nexus-enterprise', 540, 56);

        // Left Navigation Sidebar
        ctx.fillStyle = '#13141b';
        ctx.fillRect(0, 96, 260, 1184);
        ctx.strokeStyle = '#262936';
        ctx.lineWidth = 2;
        ctx.strokeRect(260, 96, 1, 1184);

        // Sidebar Brand
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('OPUS CLOUD', 40, 175);
        ctx.fillStyle = '#64748b';
        ctx.font = '500 20px sans-serif';
        ctx.fillText('ENTERPRISE V3.8', 40, 210);

        const navItems = [
          { icon: '◈', label: 'Clusters', active: true },
          { icon: '◬', label: 'Deployments', active: false },
          { icon: '∿', label: 'Traffic Analytics', active: false },
          { icon: '⧉', label: 'Storage Shards', active: false },
          { icon: '🛡', label: 'Security Engine', active: false },
          { icon: '⚙', label: 'Edge Gateways', active: false },
        ];

        for (let i = 0; i < navItems.length; i++) {
          const ny = 270 + i * 80;
          if (navItems[i].active) {
            ctx.fillStyle = '#1e212d';
            ctx.beginPath();
            ctx.roundRect(20, ny - 35, 220, 60, 14);
            ctx.fill();
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          ctx.fillStyle = navItems[i].active ? '#60a5fa' : '#64748b';
          ctx.font = 'bold 28px sans-serif';
          ctx.fillText(navItems[i].icon, 45, ny + 6);
          ctx.fillStyle = navItems[i].active ? '#ffffff' : '#94a3b8';
          ctx.font = '600 24px sans-serif';
          ctx.fillText(navItems[i].label, 95, ny + 6);
        }

        // Main Dashboard Area
        // Header
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px sans-serif';
        ctx.fillText('Global Cloud Infrastructure', 310, 175);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('● ALL REGIONS OPERATIONAL', 1540, 175);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 24px sans-serif';
        ctx.fillText('Next.js Cloud Engine • Distributed Microservices • Global Edge CDN', 310, 220);

        // 4 KPI Cards
        const kpis = [
          { title: 'GLOBAL THROUGHPUT', val: '1.48M req/s', change: '+22.4%', color: '#3b82f6' },
          { title: 'EDGE LATENCY (P99)', val: '8.4 ms', change: '-4.2ms', color: '#10b981' },
          { title: 'ACTIVE CLUSTERS', val: '128 Nodes', change: '100% Health', color: '#8b5cf6' },
          { title: 'INGRESS CAPACITY', val: '48.2 GB/s', change: 'Zero Loss', color: '#f59e0b' },
        ];

        for (let i = 0; i < 4; i++) {
          const kx = 310 + i * 425;
          ctx.fillStyle = '#161822';
          ctx.beginPath();
          ctx.roundRect(kx, 260, 395, 175, 24);
          ctx.fill();
          ctx.strokeStyle = '#262938';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#64748b';
          ctx.font = 'bold 20px sans-serif';
          ctx.fillText(kpis[i].title, kx + 30, 310);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 44px sans-serif';
          ctx.fillText(kpis[i].val, kx + 30, 375);

          ctx.fillStyle = kpis[i].color;
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText(kpis[i].change, kx + 30, 415);
        }

        // Live Cloud Traffic & Performance Visualizer
        ctx.fillStyle = '#161822';
        ctx.beginPath();
        ctx.roundRect(310, 470, 1080, 520, 28);
        ctx.fill();
        ctx.strokeStyle = '#262938';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 34px sans-serif';
        ctx.fillText('Real-Time Edge Ingress & Routing Stream', 350, 535);

        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('● 12ms WebSocket Feed', 1140, 535);

        // Glowing Wave Curves
        ctx.beginPath();
        ctx.moveTo(350, 850);
        ctx.bezierCurveTo(550, 890, 680, 680, 880, 740);
        ctx.bezierCurveTo(1020, 780, 1180, 620, 1340, 650);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(350, 850);
        ctx.bezierCurveTo(550, 890, 680, 680, 880, 740);
        ctx.bezierCurveTo(1020, 780, 1180, 620, 1340, 650);
        ctx.lineTo(1340, 930);
        ctx.lineTo(350, 930);
        ctx.closePath();
        const chartGrad = ctx.createLinearGradient(0, 650, 0, 930);
        chartGrad.addColorStop(0, 'rgba(59, 130, 246, 0.28)');
        chartGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = chartGrad;
        ctx.fill();

        // Right Side: Active Service Mesh
        ctx.fillStyle = '#161822';
        ctx.beginPath();
        ctx.roundRect(1420, 470, 590, 520, 28);
        ctx.fill();
        ctx.strokeStyle = '#262938';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 34px sans-serif';
        ctx.fillText('Cluster Orchestration', 1460, 535);

        const services = [
          { name: 'Kubernetes Pods: US-East', stat: '48 Nodes • Synced', ok: true },
          { name: 'PostgreSQL Distributed Shard', stat: 'Zero Replication Lag', ok: true },
          { name: 'Redis Edge In-Memory Cache', stat: '99.8% Hit Ratio', ok: true },
          { name: 'Zero-Trust TLS 1.3 Proxy', stat: 'Active Defense OK', ok: true },
        ];

        for (let i = 0; i < services.length; i++) {
          const sy = 600 + i * 95;
          ctx.fillStyle = '#1c1f2b';
          ctx.beginPath();
          ctx.roundRect(1460, sy - 30, 510, 78, 18);
          ctx.fill();
          ctx.strokeStyle = '#2b3042';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('✔', 1485, sy + 18);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(services[i].name, 1525, sy + 6);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '500 20px monospace';
          ctx.fillText(services[i].stat, 1525, sy + 32);
        }

        // Bottom Deployment Banner
        ctx.fillStyle = '#161822';
        ctx.beginPath();
        ctx.roundRect(310, 1025, 1700, 210, 28);
        ctx.fill();
        ctx.strokeStyle = '#262938';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('Continuous Deployment Pipeline', 350, 1085);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('● Commit 9f4a81b Deployed to Edge (0s downtime)', 350, 1130);
        ctx.fillStyle = '#64748b';
        ctx.font = '500 22px sans-serif';
        ctx.fillText('Multi-Region Global Edge CDN synced across 240+ Point-of-Presence locations worldwide.', 350, 1175);
      }
      return new THREE.CanvasTexture(c);
    };

    const buildIphone = () => {
      const group = new THREE.Group();

      const width = 1.2;
      const height = 2.45;
      const radius = 0.16;
      const depth = 0.08;

      // Rounded Titanium Body
      const shape = new THREE.Shape();
      const x = -width / 2;
      const y = -height / 2;
      shape.moveTo(x + radius, y);
      shape.lineTo(x + width - radius, y);
      shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius);
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height);
      shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);

      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      };

      const bodyGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      bodyGeo.center();

      const titaniumMat = new THREE.MeshPhysicalMaterial({
        color: 0x22242a,
        metalness: 0.95,
        roughness: 0.22,
        clearcoat: 0.8,
        clearcoatRoughness: 0.12,
      });
      const body = new THREE.Mesh(bodyGeo, titaniumMat);
      group.add(body);

      // Bezel & Screen
      const screenWidth = 1.14;
      const screenHeight = 2.38;
      const screenRadius = 0.13;
      const screenShape = new THREE.Shape();
      const sx = -screenWidth / 2;
      const sy = -screenHeight / 2;
      screenShape.moveTo(sx + screenRadius, sy);
      screenShape.lineTo(sx + screenWidth - screenRadius, sy);
      screenShape.quadraticCurveTo(sx + screenWidth, sy, sx + screenWidth, sy + screenRadius);
      screenShape.lineTo(sx + screenWidth, sy + screenHeight - screenRadius);
      screenShape.quadraticCurveTo(sx + screenWidth, sy + screenHeight, sx + screenWidth - screenRadius, sy + screenHeight);
      screenShape.lineTo(sx + screenRadius, sy + screenHeight);
      screenShape.quadraticCurveTo(sx, sy + screenHeight, sx, sy + screenHeight - screenRadius);
      screenShape.lineTo(sx, sy + screenRadius);
      screenShape.quadraticCurveTo(sx, sy, sx + screenRadius, sy);

      const screenGeo = new THREE.ShapeGeometry(screenShape, 32);
      const pos = screenGeo.attributes.position;
      const uvs = [];
      for (let i = 0; i < pos.count; i++) {
        const u = (pos.getX(i) - sx) / screenWidth;
        const v = (pos.getY(i) - sy) / screenHeight;
        uvs.push(u, v);
      }
      screenGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

      const screenMat = new THREE.MeshBasicMaterial({
        map: createMobileScreenTexture(),
        toneMapped: false,
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = depth / 2 + 0.022;
      group.add(screen);

      // Camera Lens Bump on Back
      const cameraPlateGeo = new THREE.BoxGeometry(0.48, 0.48, 0.04);
      const cameraPlate = new THREE.Mesh(cameraPlateGeo, titaniumMat);
      cameraPlate.position.set(-width / 2 + 0.32, height / 2 - 0.32, -depth / 2 - 0.02);
      group.add(cameraPlate);

      // Lens Circles
      const lensGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.03, 24);
      const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x050508, roughness: 0.1, metalness: 0.9, clearcoat: 1 });
      const lens1 = new THREE.Mesh(lensGeo, lensMat);
      lens1.rotation.x = Math.PI / 2;
      lens1.position.set(-width / 2 + 0.22, height / 2 - 0.22, -depth / 2 - 0.04);
      group.add(lens1);
      const lens2 = new THREE.Mesh(lensGeo, lensMat);
      lens2.rotation.x = Math.PI / 2;
      lens2.position.set(-width / 2 + 0.42, height / 2 - 0.22, -depth / 2 - 0.04);
      group.add(lens2);
      const lens3 = new THREE.Mesh(lensGeo, lensMat);
      lens3.rotation.x = Math.PI / 2;
      lens3.position.set(-width / 2 + 0.32, height / 2 - 0.42, -depth / 2 - 0.04);
      group.add(lens3);

      // Front Screen Glass Coating (Catches dynamic lighting & mouse tilt highlights)
      const glassShieldGeo = new THREE.ShapeGeometry(screenShape, 32);
      glassShieldGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      const glassShieldMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
        roughness: 0.05,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 0.9,
      });
      const glassShield = new THREE.Mesh(glassShieldGeo, glassShieldMat);
      glassShield.position.z = depth / 2 + 0.024;
      group.add(glassShield);

      return group;
    };

    const buildMacbook = () => {
      const group = new THREE.Group();

      const titaniumDarkMat = new THREE.MeshPhysicalMaterial({
        color: 0x16181f,
        metalness: 0.6,
        roughness: 0.32,
        clearcoat: 0.7,
        clearcoatRoughness: 0.15,
      });

      // ── 1. UNIBODY BASE CHASSIS (Rounded Corners & Precision Bevels) ──
      const baseW = 2.68;
      const baseD = 1.76;
      const baseR = 0.14;
      const baseH = 0.055;

      const baseShape = new THREE.Shape();
      const bx = -baseW / 2;
      const by = -baseD / 2;
      baseShape.moveTo(bx + baseR, by);
      baseShape.lineTo(bx + baseW - baseR, by);
      baseShape.quadraticCurveTo(bx + baseW, by, bx + baseW, by + baseR);
      baseShape.lineTo(bx + baseW, by + baseD - baseR);
      baseShape.quadraticCurveTo(bx + baseW, by + baseD, bx + baseW - baseR, by + baseD);
      baseShape.lineTo(bx + baseR, by + baseD);
      baseShape.quadraticCurveTo(bx, by + baseD, bx, by + baseD - baseR);
      baseShape.lineTo(bx, by + baseR);
      baseShape.quadraticCurveTo(bx, by, bx + baseR, by);

      const baseExtrude = new THREE.ExtrudeGeometry(baseShape, {
        depth: baseH,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.015,
        bevelThickness: 0.015,
      });
      baseExtrude.center();

      const baseMesh = new THREE.Mesh(baseExtrude, titaniumDarkMat);
      baseMesh.rotation.x = Math.PI / 2;
      baseMesh.position.set(0, -0.32, 0.45);
      group.add(baseMesh);

      // Keyboard & Trackpad Top Surface (Elevated above bevel)
      const deckGeo = new THREE.PlaneGeometry(baseW - 0.04, baseD - 0.04);
      const deckMat = new THREE.MeshBasicMaterial({
        map: createKeyboardTexture(),
        toneMapped: false,
      });
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.rotation.x = -Math.PI / 2;
      deck.position.set(0, -0.266, 0.45);
      group.add(deck);

      // ── 2. HINGE CYLINDER ──
      const hingeGeo = new THREE.CylinderGeometry(0.038, 0.038, 2.2, 24);
      const hingeMat = new THREE.MeshPhysicalMaterial({ color: 0x0f1013, metalness: 0.8, roughness: 0.3 });
      const hinge = new THREE.Mesh(hingeGeo, hingeMat);
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(0, -0.28, -0.42);
      group.add(hinge);

      // ── 3. DISPLAY LID (Hinged & Naturally Tilted Back ~110 Degrees) ──
      const lidGroup = new THREE.Group();
      lidGroup.position.set(0, -0.28, -0.42);
      lidGroup.rotation.x = -0.32; // Realistic ergonomic tilt
      group.add(lidGroup);

      const lidW = 2.68;
      const lidH = 1.76;
      const lidR = 0.14;
      const lidD = 0.035;

      const lidShape = new THREE.Shape();
      const lx = -lidW / 2;
      const ly = 0;
      lidShape.moveTo(lx + lidR, ly);
      lidShape.lineTo(lx + lidW - lidR, ly);
      lidShape.quadraticCurveTo(lx + lidW, ly, lx + lidW, ly + lidR);
      lidShape.lineTo(lx + lidW, ly + lidH - lidR);
      lidShape.quadraticCurveTo(lx + lidW, ly + lidH, lx + lidW - lidR, ly + lidH);
      lidShape.lineTo(lx + lidR, ly + lidH);
      lidShape.quadraticCurveTo(lx, ly + lidH, lx, ly + lidH - lidR);
      lidShape.lineTo(lx, ly + lidR);
      lidShape.quadraticCurveTo(lx, ly, lx + lidR, ly);

      const lidExtrude = new THREE.ExtrudeGeometry(lidShape, {
        depth: lidD,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.012,
        bevelThickness: 0.012,
      });

      const lidMesh = new THREE.Mesh(lidExtrude, titaniumDarkMat);
      lidMesh.position.set(0, 0, -lidD);
      lidGroup.add(lidMesh);

      // Deep Black Bezel (Sitting cleanly in front of lid)
      const bezelGeo = new THREE.PlaneGeometry(lidW - 0.04, lidH - 0.04);
      const bezelMat = new THREE.MeshBasicMaterial({ color: 0x08080c });
      const bezel = new THREE.Mesh(bezelGeo, bezelMat);
      bezel.position.set(0, lidH / 2, 0.018);
      lidGroup.add(bezel);

      // Camera Notch at Top of Screen
      const cameraNotchGeo = new THREE.BoxGeometry(0.22, 0.042, 0.006);
      const cameraNotchMat = new THREE.MeshBasicMaterial({ color: 0x030305 });
      const cameraNotch = new THREE.Mesh(cameraNotchGeo, cameraNotchMat);
      cameraNotch.position.set(0, lidH - 0.04, 0.024);
      lidGroup.add(cameraNotch);

      // High-Contrast Cloud Platform Display Screen (In front of bezel)
      const screenGeo = new THREE.PlaneGeometry(lidW - 0.12, lidH - 0.14);
      const screenMat = new THREE.MeshBasicMaterial({
        map: createLaptopScreenTexture(),
        toneMapped: false,
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, lidH / 2, 0.021);
      lidGroup.add(screen);

      // Front Display Glass Coating (Reflects lighting & mouse tilt)
      const screenGlassGeo = new THREE.PlaneGeometry(lidW - 0.12, lidH - 0.14);
      const screenGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08,
        roughness: 0.05,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 0.9,
      });
      const screenGlass = new THREE.Mesh(screenGlassGeo, screenGlassMat);
      screenGlass.position.set(0, lidH / 2, 0.023);
      lidGroup.add(screenGlass);

      return group;
    };

    // Hero OG Monogram (Prominent Luxury 3D Focal Piece)
    const heroOGGroup = new THREE.Group();
    scene.add(heroOGGroup);

    // Inner interactive group for responsive mouse hover physics & breathing (Never conflicts with GSAP)
    const ogInnerGroup = new THREE.Group();
    heroOGGroup.add(ogInnerGroup);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.18,
      transmission: 0.92,
      thickness: 0.45,
      ior: 1.52,
      reflectivity: 0.85,
      transparent: true,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.4,
    });
    const oGeo = new THREE.TorusGeometry(0.58, 0.16, 32, 64);
    const letterO = new THREE.Mesh(oGeo, glassMat);
    letterO.position.set(-0.62, 0.06, 0);
    ogInnerGroup.add(letterO);

    const gGeo = new THREE.TorusGeometry(0.58, 0.16, 32, 64, Math.PI * 1.6);
    const letterG = new THREE.Mesh(gGeo, glassMat);
    letterG.position.set(0.62, 0.06, 0);
    letterG.rotation.set(0, 0, Math.PI * 0.25);
    ogInnerGroup.add(letterG);
    const gBar = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.16, 0.16), glassMat);
    gBar.position.set(0.62, -0.1, 0.16);
    ogInnerGroup.add(gBar);
    heroOGGroup.position.set(0, 0.22, 0.4);
    heroOGGroup.scale.set(1.65, 1.65, 1.65);

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

    // Section 1: Floating iPhone App (Compact & Perfectly Placed)
    const stage1Group = new THREE.Group();
    stage1Group.scale.set(0, 0, 0);
    stage1Group.position.set(0, -0.18, 0.5);
    stage1Group.visible = false;
    scene.add(stage1Group);

    // Realistic Soft Contact Drop Shadow Underneath Mobile
    const phoneShadowGeo = new THREE.PlaneGeometry(2.4, 1.3);
    const phoneShadowMat = new THREE.MeshBasicMaterial({
      map: createDropShadowTexture(),
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const phoneShadow = new THREE.Mesh(phoneShadowGeo, phoneShadowMat);
    phoneShadow.rotation.x = -Math.PI / 2;
    phoneShadow.position.set(0, -1.35, -0.1);
    stage1Group.add(phoneShadow);

    const stage1Phone = buildIphone();
    stage1Phone.rotation.set(0.15, -0.28, 0.05);
    stage1Group.add(stage1Phone);

    // Section 2: Floating MacBook Web Platform (Compact & Perfectly Placed)
    const stage2Group = new THREE.Group();
    stage2Group.scale.set(0, 0, 0);
    stage2Group.position.set(0, -0.22, 0.4);
    stage2Group.visible = false;
    scene.add(stage2Group);

    // Realistic Soft Contact Drop Shadow Underneath Laptop
    const laptopShadowGeo = new THREE.PlaneGeometry(3.6, 2.3);
    const laptopShadowMat = new THREE.MeshBasicMaterial({
      map: createDropShadowTexture(),
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const laptopShadow = new THREE.Mesh(laptopShadowGeo, laptopShadowMat);
    laptopShadow.rotation.x = -Math.PI / 2;
    laptopShadow.position.set(0, -0.68, 0.35);
    stage2Group.add(laptopShadow);

    const stage2Laptop = buildMacbook();
    stage2Laptop.rotation.set(0.18, -0.25, 0.04);
    stage2Group.add(stage2Laptop);

    // Section 3: Dual Multi-Platform Sync
    const stage3Group = new THREE.Group();
    stage3Group.scale.set(0, 0, 0);
    stage3Group.position.set(0, -0.18, 0.4);
    stage3Group.visible = false;
    scene.add(stage3Group);

    // Shadows for Stage 3
    const shadowLaptop3Geo = new THREE.PlaneGeometry(2.8, 1.8);
    const shadowLaptop3Mat = new THREE.MeshBasicMaterial({ map: createDropShadowTexture(), transparent: true, depthWrite: false, opacity: 0.65 });
    const shadowLaptop3 = new THREE.Mesh(shadowLaptop3Geo, shadowLaptop3Mat);
    shadowLaptop3.rotation.x = -Math.PI / 2;
    shadowLaptop3.position.set(-0.55, -0.62, 0.25);
    stage3Group.add(shadowLaptop3);

    const shadowPhone3Geo = new THREE.PlaneGeometry(1.8, 1.1);
    const shadowPhone3Mat = new THREE.MeshBasicMaterial({ map: createDropShadowTexture(), transparent: true, depthWrite: false, opacity: 0.7 });
    const shadowPhone3 = new THREE.Mesh(shadowPhone3Geo, shadowPhone3Mat);
    shadowPhone3.rotation.x = -Math.PI / 2;
    shadowPhone3.position.set(1.25, -1.25, 0.7);
    stage3Group.add(shadowPhone3);

    const laptop3 = buildMacbook();
    laptop3.position.set(-0.55, -0.15, 0);
    laptop3.rotation.set(0.15, -0.22, 0.03);
    laptop3.scale.set(0.75, 0.75, 0.75);
    stage3Group.add(laptop3);

    const phone3 = buildIphone();
    phone3.position.set(1.25, -0.28, 0.8);
    phone3.rotation.set(0.1, -0.32, 0.05);
    phone3.scale.set(0.75, 0.75, 0.75);
    stage3Group.add(phone3);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onPointerMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Render Animation Loop with Interactive Mouse Tilt & Floating Physics
    let animId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();

      // Subtle high-performance camera parallax (Zero conflict with GSAP)
      camera.position.x += (mouseX * 0.25 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Interactive 3D OG Mouse Tilt & Organic Floating
      if (ogInnerGroup) {
        // Floating hover wave
        ogInnerGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.05;

        // Mouse hover interactive tilt
        const targetRotX = mouseY * 0.45;
        const targetRotY = mouseX * 0.55;
        const targetRotZ = (mouseX * -mouseY) * 0.2;

        ogInnerGroup.rotation.x += (targetRotX - ogInnerGroup.rotation.x) * 0.07;
        ogInnerGroup.rotation.y += (targetRotY - ogInnerGroup.rotation.y) * 0.07;
        ogInnerGroup.rotation.z += (targetRotZ - ogInnerGroup.rotation.z) * 0.07;

        // Subtle dynamic letter breathing
        letterO.rotation.z = Math.sin(elapsedTime * 0.9) * 0.04;
        letterG.rotation.z = Math.PI * 0.25 + Math.cos(elapsedTime * 0.9) * 0.04;
      }

      // Interactive 3D Mobile Hover Rotation Physics & Dynamic Shadow (Fintech Section)
      if (stage1Group) {
        // Organic floating wave
        const floatY = Math.sin(elapsedTime * 1.7) * 0.04;
        stage1Phone.position.y = floatY;

        // Dynamic Ground Contact Shadow reacts to phone hover & tilt
        phoneShadow.position.x = mouseX * 0.12;
        phoneShadow.position.z = -0.1 - mouseY * 0.1;
        const shadowScale = 1 - floatY * 2.0;
        phoneShadow.scale.set(shadowScale, shadowScale, 1);
        phoneShadowMat.opacity = Math.max(0.25, 0.72 - floatY * 2.5);

        // Interactive mouse hover pitch/yaw dynamic rotation
        const phoneTargetRotX = 0.15 + mouseY * 0.38;
        const phoneTargetRotY = -0.28 + mouseX * 0.52;
        const phoneTargetRotZ = 0.05 + (mouseX * -mouseY) * 0.18;

        stage1Phone.rotation.x += (phoneTargetRotX - stage1Phone.rotation.x) * 0.08;
        stage1Phone.rotation.y += (phoneTargetRotY - stage1Phone.rotation.y) * 0.08;
        stage1Phone.rotation.z += (phoneTargetRotZ - stage1Phone.rotation.z) * 0.08;
      }

      // Interactive 3D Laptop Hover Tilt & Dynamic Shadow (Cloud Infrastructure Section)
      if (stage2Group) {
        const floatY = Math.sin(elapsedTime * 1.7 + 0.8) * 0.03;
        stage2Laptop.position.y = floatY;

        // Dynamic Laptop Ground Contact Shadow
        laptopShadow.position.x = mouseX * 0.1;
        laptopShadow.position.z = 0.35 - mouseY * 0.08;
        const shadowScale = 1 - floatY * 1.8;
        laptopShadow.scale.set(shadowScale, shadowScale, 1);
        laptopShadowMat.opacity = Math.max(0.25, 0.68 - floatY * 2.2);

        const laptopTargetRotX = 0.18 + mouseY * 0.28;
        const laptopTargetRotY = -0.25 + mouseX * 0.42;

        stage2Laptop.rotation.x += (laptopTargetRotX - stage2Laptop.rotation.x) * 0.08;
        stage2Laptop.rotation.y += (laptopTargetRotY - stage2Laptop.rotation.y) * 0.08;
      }

      // Interactive Multi-Device Sync & Dynamic Shadows (Ecosystem Section)
      if (stage3Group) {
        const floatL = Math.sin(elapsedTime * 1.7) * 0.025;
        const floatP = Math.sin(elapsedTime * 1.7 + 1.2) * 0.035;
        laptop3.position.y = -0.15 + floatL;
        phone3.position.y = -0.28 + floatP;

        // Animate Dual Shadows
        shadowLaptop3.position.x = -0.55 + mouseX * 0.08;
        shadowPhone3.position.x = 1.25 + mouseX * 0.1;
        shadowLaptop3Mat.opacity = Math.max(0.2, 0.65 - floatL * 2.0);
        shadowPhone3Mat.opacity = Math.max(0.2, 0.7 - floatP * 2.0);

        const syncRotY = -0.22 + mouseX * 0.3;
        laptop3.rotation.y += (syncRotY - laptop3.rotation.y) * 0.08;
        phone3.rotation.y += ((-0.32 + mouseX * 0.38) - phone3.rotation.y) * 0.08;
      }

      renderer.render(scene, camera);
    };
    render();

    // Pre-compile shaders and upload all textures to VRAM across ALL stages to eliminate first-scroll hitch
    stage1Group.visible = true;
    stage2Group.visible = true;
    stage3Group.visible = true;
    renderer.compile(scene, camera);
    renderer.render(scene, camera);
    stage1Group.visible = false;
    stage2Group.visible = false;
    stage3Group.visible = false;

    // GSAP Scroll Sequences
    const ctx = gsap.context(() => {
      // Navbar auto-hide on scroll down only when chat is closed
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (isChatOpenRef.current) {
            // Chat is OPEN: Never hide navbar
            gsap.to(headerRef.current, { yPercent: 0, duration: 0.2, ease: 'power2.out' });
            return;
          }
          // Chat is CLOSED: Hide on scroll down, show on scroll up
          if (self.direction === 1 && self.scroll() > 60) {
            gsap.to(headerRef.current, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
          } else if (self.direction === -1) {
            gsap.to(headerRef.current, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
          }
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top top',
          end: '+=600%',
          pin: true,
          scrub: 0.5, // Fluid, instantaneous synchronization with Lenis — zero hitch
          anticipatePin: 1,
        },
      });

      // Save reference to trigger for scrollToSection calculations
      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // ── Hero Exits (Pure Hardware-Accelerated Transforms — Zero Blur Thrashing) ──
      tl.to(heroRef.current, {
        y: 120,
        opacity: 0,
        duration: 2,
        ease: 'power2.inOut',
      }, 0)
        .to(heroOGGroup.position, { x: 0, y: -1.8, z: -0.8, duration: 2, ease: 'power2.inOut' }, 0)
        .to(heroOGGroup.rotation, { x: -0.4, y: 0.3, z: 0, duration: 2, ease: 'power2.inOut' }, 0)
        .to(heroOGGroup.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: 'power3.in' }, 0.5)

        // ── S1 Phone Enters (From Top-Center down into center) ──
        .set(stage1Group, { visible: true }, 0.75)
        .fromTo(sectionsRef.current[0],
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 2, ease: 'power2.out' },
          0.8
        )
        .fromTo(stage1Group.scale,
          { x: 0.2, y: 0.2, z: 0.2 },
          { x: 1, y: 1, z: 1, duration: 2, ease: 'power2.out', immediateRender: false },
          0.8
        )
        .fromTo(stage1Group.rotation,
          { x: 0.35, y: 0, z: 0 },
          { x: 0, y: 0, z: 0, duration: 2, ease: 'power2.out', immediateRender: false },
          0.8
        )
        .fromTo(stage1Group.position,
          { x: 0, y: 2.2, z: 0.2 },
          { x: 0, y: -0.16, z: 0.5, duration: 2, ease: 'power2.out', immediateRender: false },
          0.8
        )

        // ── S1 Hold & Exit (Glides downward) ──
        .to(sectionsRef.current[0], {
          y: 80,
          opacity: 0,
          duration: 2,
          ease: 'power2.inOut',
        }, '+=1.2')
        .to(stage1Group.position, { x: 0, y: -1.8, z: -0.8, duration: 2, ease: 'power2.inOut' }, '<')
        .to(stage1Group.rotation, { x: -0.3, y: 0.2, z: 0, duration: 2, ease: 'power2.inOut' }, '<')
        .to(stage1Group.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: 'power3.in' }, '<+=0.5')
        .set(stage1Group, { visible: false })

        // ── S2 Laptop Enters (From Top-Center down into center) ──
        .set(stage2Group, { visible: true }, '<-=0.2')
        .fromTo(sectionsRef.current[1],
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 2, ease: 'power2.out' },
          '<+=0.8'
        )
        .fromTo(stage2Group.scale,
          { x: 0.2, y: 0.2, z: 0.2 },
          { x: 1, y: 1, z: 1, duration: 2, ease: 'power2.out', immediateRender: false },
          '<'
        )
        .fromTo(stage2Group.rotation,
          { x: 0.35, y: 0, z: 0 },
          { x: 0, y: 0, z: 0, duration: 2, ease: 'power2.out', immediateRender: false },
          '<'
        )
        .fromTo(stage2Group.position,
          { x: 0, y: 2.2, z: 0.2 },
          { x: 0, y: -0.22, z: 0.4, duration: 2, ease: 'power2.out', immediateRender: false },
          '<'
        )

        // ── S2 Laptop Hold & Exit (Glides downward) ──
        .to(sectionsRef.current[1], {
          y: 80,
          opacity: 0,
          duration: 2,
          ease: 'power2.inOut',
        }, '+=1.2')
        .to(stage2Group.position, { x: 0, y: -1.8, z: -0.8, duration: 2, ease: 'power2.inOut' }, '<')
        .to(stage2Group.rotation, { x: -0.3, y: -0.2, z: 0, duration: 2, ease: 'power2.inOut' }, '<')
        .to(stage2Group.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: 'power3.in' }, '<+=0.5')
        .set(stage2Group, { visible: false })

        // ── S3 Dual Devices Enter (From Top-Center down into center) ──
        .set(stage3Group, { visible: true }, '<-=0.2')
        .fromTo(sectionsRef.current[2],
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 2, ease: 'power2.out' },
          '<+=0.8'
        )
        .fromTo(stage3Group.scale,
          { x: 0.2, y: 0.2, z: 0.2 },
          { x: 1, y: 1, z: 1, duration: 2, ease: 'power2.out', immediateRender: false },
          '<'
        )
        .fromTo(stage3Group.rotation,
          { x: 0.3, y: 0, z: 0 },
          { x: 0, y: 0, z: 0, duration: 2, ease: 'power2.out', immediateRender: false },
          '<'
        )
        .fromTo(stage3Group.position,
          { x: 0, y: 2.0, z: 0.1 },
          { x: 0, y: -0.18, z: 0, duration: 2, ease: 'power2.out', immediateRender: false },
          '<'
        );
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      pmrem.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <main className="relative w-full bg-[#c9d2e7] text-[#181520] font-sans overflow-hidden antialiased">
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img src="/backgrounds/background_min.png" alt="background" className="w-full h-full object-cover" />
      </div>

      {/* 3D Canvas Layer */}
      <div ref={canvasContainerRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Interactive Navbar Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-transform duration-300"
      >
        {/* Left: Logo Button */}
        <button
          onClick={() => { setServicesOpen(false); scrollToSection('hero'); }}
          className="cursor-pointer group bg-transparent border-none p-0 outline-none flex items-center"
        >
          <OpusLogo variant="full" size={32} />
        </button>

        {/* Center: Clean Monochrome Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 font-neue text-[13px] font-medium tracking-[0.02em] text-[#181520]">
          {/* Home (Active) */}
          <button
            onClick={() => { setServicesOpen(false); scrollToSection('hero'); }}
            className="text-[#181520] font-semibold hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none font-neue text-[13px]"
          >
            Home
          </button>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center space-x-1 hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none font-neue text-[13px] font-medium text-[#181520]"
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Frosted Dropdown Menu */}
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-[#f0efe9]/95 backdrop-blur-xl border border-black/10 rounded-2xl p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <a
                  href="/services/app-development"
                  className="flex items-center space-x-3.5 p-3 rounded-xl hover:bg-black/[0.05] transition-colors group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/[0.06] flex items-center justify-center group-hover:bg-[#181520] group-hover:text-white transition-colors">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-machina text-xs font-bold uppercase tracking-wider text-[#181520]">App Development</div>
                    <div className="font-neue text-[11px] text-[#181520]/60 normal-case tracking-normal">React Native & Native Mobile</div>
                  </div>
                </a>

                <a
                  href="/services/web-development"
                  className="flex items-center space-x-3.5 p-3 rounded-xl hover:bg-black/[0.05] transition-colors group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/[0.06] flex items-center justify-center group-hover:bg-[#181520] group-hover:text-white transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-machina text-xs font-bold uppercase tracking-wider text-[#181520]">Web Development</div>
                    <div className="font-neue text-[11px] text-[#181520]/60 normal-case tracking-normal">Scalable Web Apps & Cloud</div>
                  </div>
                </a>

                <a
                  href="/services/ui-ux-design"
                  className="flex items-center space-x-3.5 p-3 rounded-xl hover:bg-black/[0.05] transition-colors group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/[0.06] flex items-center justify-center group-hover:bg-[#181520] group-hover:text-white transition-colors">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-machina text-xs font-bold uppercase tracking-wider text-[#181520]">UI/UX Design</div>
                    <div className="font-neue text-[11px] text-[#181520]/60 normal-case tracking-normal">Design Systems & Prototypes</div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Portfolio Showcase Route */}
          <a
            href="/portfolio"
            className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520]"
          >
            Portfolio
          </a>

          {/* Blogs */}
          <a
            href="/blogs"
            className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520]"
          >
            Blogs
          </a>

          {/* About */}
          <a
            href="/about"
            className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520]"
          >
            About
          </a>

          {/* Contact Us */}
          <button
            onClick={() => { setServicesOpen(false); scrollToSection('connect'); }}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none font-neue text-[13px] font-medium text-[#181520]"
          >
            Contact Us
          </button>

          {/* FAQs */}
          <a
            href="https://opusgeeks.com/#faqs"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520]"
          >
            FAQs
          </a>
        </nav>

        {/* Right: Get Started White Pill Button -> Triggers Dropdown AI Chat directly beneath button */}
        <div className="relative flex items-center">
          <button
            onClick={() => setIsChatOpen((prev) => !prev)}
            className="bg-white text-[#181520] hover:bg-[#181520] hover:text-white px-6 py-2.5 rounded-full font-neue text-[13px] font-medium tracking-[0.02em] shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-2 border border-black/5 active:scale-95 cursor-pointer outline-none"
          >
            <span>Get Started</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Floating Light Tinted Frosted Glass AI Architect Chat Dropdown Directly Under Button */}
          <AIChatArchitect isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      </header>

      {/* Pinned Stage */}
      <div ref={pinContainerRef} className="relative w-full h-screen overflow-hidden">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-full pt-24 pb-8 px-8 md:px-16 flex flex-col justify-between z-20 pointer-events-none will-change-transform origin-center"
        >
          {/* Top Row: Minimal Agency Badge + Agency Narrative */}
          <div className="flex items-start justify-between pt-2 pointer-events-auto">
            <div className="hidden sm:flex items-center space-x-2 border border-black/15 bg-black/[0.03] backdrop-blur-md rounded-full px-3.5 py-1 text-[#181520]">
              <span className="font-neue text-[11px] font-medium tracking-[0.04em] uppercase">
                Enterprise Architecture &amp; 3D Web
              </span>
            </div>

            <p className="font-neue max-w-[340px] text-[13px] md:text-[14px] leading-[140%] text-[#181520]/80 text-right">
              We craft high-performance digital products and scalable systems. Partnering with forward-thinking enterprises to turn complex technology into intuitive human experiences.
            </p>
          </div>

          {/* Center: Monumental Headline (Signature Agency Spread) */}
          <div className="my-auto py-2 uppercase font-machina text-[#181520] flex flex-col leading-[0.88] tracking-[-0.035em] select-none text-left">
            <div className="text-[8.2vw] whitespace-nowrap">CODE THAT</div>
            <div className="text-[8.2vw] flex justify-between items-baseline w-full whitespace-nowrap">
              <span>SCALES</span>
              <span className="pr-4 md:pr-10">YOUR</span>
            </div>
            <div className="text-[8.2vw] whitespace-nowrap">DIGITAL FUTURE</div>
          </div>

          {/* Bottom Row: Capabilities Tags + Scroll Indicator + Supporting Copy */}
          <div className="flex items-end justify-between pb-2 pointer-events-auto">
            {/* Left: Engineering Pillars */}
            <div className="hidden md:flex flex-col space-y-1 text-left">
              <span className="font-machina text-[10px] font-bold uppercase tracking-widest text-[#181520]/60">
                Core Capabilities
              </span>
              <span className="font-neue text-[12px] text-[#181520] tracking-wide">
                React Native • Next.js Cloud • WebGL 3D
              </span>
            </div>

            {/* Center: Scroll Down Indicator */}
            <div className="hidden lg:flex flex-col items-center space-y-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-machina text-[10px] uppercase tracking-widest text-[#181520]">Scroll</span>
              <div className="w-4 h-7 border border-black/40 rounded-full flex justify-center p-1">
                <div className="w-1 h-1.5 bg-[#181520] rounded-full animate-bounce" />
              </div>
            </div>

            {/* Right: Sub-headline */}
            <p className="font-neue max-w-[260px] text-[13px] md:text-[14px] leading-[130%] text-[#181520]/80 text-right">
              Enterprise-grade mobile engineering, custom software solutions, and next-gen architectures.
            </p>
          </div>
        </div>

        {/* Dynamic Device Sections */}
        {OPUS_SECTIONS.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { sectionsRef.current[index] = el; }}
            className="absolute inset-0 w-full h-full px-6 md:px-14 flex flex-col justify-between py-12 z-20 pointer-events-none will-change-transform origin-center opacity-0"
          >
            <div className="absolute top-[8%] left-0 w-full text-center select-none z-0 pointer-events-none">
              <h2 className="font-machina text-[11vw] leading-none uppercase tracking-tight text-[#181520]/80">
                {item.title}
              </h2>
            </div>

            <div className="mt-auto w-full flex items-end justify-between pb-6 pointer-events-auto z-30">
              <div className="flex flex-col space-y-2">
                <span className="inline-block border border-black/40 rounded-full px-4 py-1 text-xs uppercase font-neue w-max">
                  {item.tag}
                </span>
                <span className="text-sm font-neue text-[#181520]">
                  {item.category}
                </span>
              </div>

              <a
                href={`/portfolio?project=${item.id}`}
                className="bg-[#181520] text-white px-8 py-3.5 rounded-full flex items-center space-x-3 text-xs uppercase tracking-widest font-machina hover:scale-105 transition-transform shadow-lg cursor-pointer"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="max-w-[320px] text-left">
                <h3 className="font-machina text-xl font-bold uppercase mb-2">
                  {item.client}
                </h3>
                <p className="font-neue text-sm leading-relaxed text-[#181520]">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
