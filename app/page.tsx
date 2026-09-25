'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight, Layers, Cpu, Terminal, Rocket, Trophy, Users, CheckCircle2, ShieldCheck, Zap, Globe, Monitor, Smartphone, Palette, Gamepad2, Code2, Menu, X, ChevronDown, Star } from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import ServicesDropdown from '@/components/ServicesDropdown';
import GlobalFooter from '@/components/GlobalFooter';
import LuxuryTestimonials from '@/components/LuxuryTestimonials';
import { useLenis } from '@/components/providers/SmoothScroll';
import { useChat } from '@/components/providers/ChatProvider';

gsap.registerPlugin(ScrollTrigger);

const OPUS_SECTIONS = [
  {
    id: 'fintech',
    title: 'FINTECH',
    number: '01',
    tag: 'LIQUIDITY ENGINE • ZERO-TRUST',
    category: 'Institutional Core Architecture',
    client: 'APEX GLOBAL FINANCIAL PLATFORM',
    desc: 'An enterprise-grade liquidity engine engineered for ultra-low latency execution, real-time asset settlement, and bank-grade data security.',
    telemetry: { latency: '< 12ms Edge', security: 'Bank-Grade SOC-2' },
  },

  {
    id: 'healthcare',
    title: 'HEALTHCARE',
    number: '02',
    tag: 'HEALTHCARE AI • HIPAA COMPLIANT',
    category: 'Biofeedback & Telemetry Systems',
    client: 'PULSE BIO-INTELLIGENCE ECOSYSTEM',
    desc: 'Sub-second patient vital telemetry, continuous encrypted biometric streaming, and offline-first clinical workflow synchronization.',
    telemetry: { latency: '< 35ms Edge', security: 'HIPAA Encrypted Mesh' },
  },

  {
    id: 'retail',
    title: 'RETAIL',
    number: '03',
    tag: 'SPATIAL COMMERCE • SUB-SECOND',
    category: 'Global Omnichannel Infrastructure',
    client: 'AVENUE LUXURY COMMERCE PLATFORM',
    desc: 'High-conversion spatial retail engine with real-time 3D product interaction, sub-second checkout pipelines, and dynamic multi-currency pricing.',
    telemetry: { latency: '< 20ms Edge', security: 'PCI-DSS Tier-1' },
  },

  {
    id: 'real-estate',
    title: 'REAL ESTATE',
    number: '04',
    tag: 'SPATIAL ASSETS • 3D BIM TWIN',
    category: 'Digital Twin & Asset Management',
    client: 'VALOIS LUXURY REAL ESTATE VAULT',
    desc: 'Interactive architectural digital twin, immersive spatial 3D property tours, and zero-latency smart contract escrow for prime global assets.',
    telemetry: { latency: '< 28ms Edge', security: 'Zero-Trust Escrow' },
  },
];

// Interactive 3D Spatial Tilt Card Component for Process Steps (matching other pages)
function InteractiveProcessCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.18 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

// Animated Numeric Counter for Significant Metrics
function MetricCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1800;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = value / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Page() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { lenis } = useLenis();
  const { isChatOpen, openChat, toggleChat } = useChat();
  const [currentSector, setCurrentSector] = useState(0);
  const currentSectorRef = useRef(0);
  const stage1PhoneRef = useRef<THREE.Group | null>(null);
  const stage1ScreenMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isChatOpenRef = useRef(isChatOpen);
  const sectorTexturesRef = useRef<THREE.Texture[]>([]);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const metricsSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);
  const [activeMetricPillar, setActiveMetricPillar] = useState<number>(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSelectSector = (targetIdx: number) => {
    const total = OPUS_SECTIONS.length;
    const direction = currentSectorRef.current === -1 ? 1 : (targetIdx > currentSectorRef.current ? 1 : -1);
    // If no sector selected yet, jump to the requested index directly
    const nextIdx = currentSectorRef.current === -1 ? ((targetIdx % total + total) % total) : ((targetIdx % total + total) % total);
    if (nextIdx === currentSectorRef.current) return;

    currentSectorRef.current = nextIdx;
    setCurrentSector(nextIdx);

    // Update Three.js Phone Screen Texture
    if (stage1ScreenMatRef.current && sectorTexturesRef.current[nextIdx]) {
      stage1ScreenMatRef.current.map = sectorTexturesRef.current[nextIdx];
      stage1ScreenMatRef.current.needsUpdate = true;
    }

    // Luxury Multi-Axis Cinematic 3D Transition
    if (stage1PhoneRef.current) {
      gsap.killTweensOf(stage1PhoneRef.current.rotation);
      gsap.killTweensOf(stage1PhoneRef.current.scale);
      gsap.killTweensOf(stage1PhoneRef.current.position);

      // Spring bounce along Y & Z
      const curZ = stage1PhoneRef.current.position.z;
      gsap.fromTo(
        stage1PhoneRef.current.position,
        { y: -0.04, z: curZ + direction * 0.05 },
        {
          y: 0,
          z: curZ,
          duration: 0.85,
          ease: 'power3.out',
        }
      );

      // Micro-compression & elastic expansion
      gsap.fromTo(
        stage1PhoneRef.current.scale,
        { x: 0.94, y: 0.94, z: 0.94 },
        {
          x: 1, y: 1, z: 1,
          duration: 0.9,
          ease: 'elastic.out(1.05, 0.45)',
        }
      );

      // High-precision horology rotation (upright posture, zero crooked roll)
      gsap.fromTo(
        stage1PhoneRef.current.rotation,
        {
          y: -0.06 + direction * 0.14,
          x: 0.04,
          z: 0,
        },
        {
          y: -0.06,
          x: 0.04,
          z: 0,
          duration: 0.85,
          ease: 'power3.out',
        }
      );
    }
  };

  // Keyboard navigation for sector slider (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleSelectSector(currentSectorRef.current + 1);
      } else if (e.key === 'ArrowLeft') {
        handleSelectSector(currentSectorRef.current - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch swipe support for mobile slider
  const touchStartXRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        handleSelectSector(currentSectorRef.current + 1);
      } else {
        handleSelectSector(currentSectorRef.current - 1);
      }
    }
    touchStartXRef.current = null;
  };

  // Sync isChatOpenRef and keep header visible when chat opens
  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
    if (isChatOpen && headerRef.current) {
      gsap.to(headerRef.current, { yPercent: 0, duration: 0.25, ease: 'power2.out' });
    }
  }, [isChatOpen]);

  // Programmatic Scroll Function to exact timeline stages
  const scrollToSection = (target: 'hero' | 'fintech' | 'healthcare' | 'saas' | 'engineering' | 'ecosystem' | 'enterprise' | 'connect' | 'reviews') => {
    const st = scrollTriggerRef.current;
    if (!st || !lenis) return;

    if (target === 'hero') {
      lenis.scrollTo(0, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    const start = st.start;
    const distance = st.end - st.start;

    if (target === 'reviews') {
      lenis.scrollTo(start + distance * 0.95, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    const targetScroll = start + distance * 0.7;

    if (target === 'fintech' || target === 'engineering') {
      handleSelectSector(0);
    } else if (target === 'healthcare' || target === 'ecosystem') {
      handleSelectSector(1);
    } else if (target === 'saas' || target === 'enterprise' || target === 'connect') {
      handleSelectSector(2);
    }

    lenis.scrollTo(targetScroll, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  useEffect(() => {
    // Three.js Scene Setup
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

    const amb = new THREE.AmbientLight(0xffffff, 3.0);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(5, 10, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 3.0);
    rim.position.set(-6, -5, -4);
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

    const createHealthcareScreenTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 2048;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Background: Clean Clinical Luxury with subtle Cyan/Slate tint
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
        bgGrad.addColorStop(0, '#f0fdfa');
        bgGrad.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 2048);

        // Top Status Bar
        ctx.fillStyle = '#0f172a';
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('9:41', 80, 95);

        // Dynamic Island Capsule
        ctx.fillStyle = '#0f0f14';
        ctx.beginPath();
        ctx.roundRect(362, 50, 300, 68, 34);
        ctx.fill();

        ctx.fillStyle = '#06b6d4';
        ctx.beginPath(); ctx.arc(410, 84, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#14b8a6';
        ctx.beginPath(); ctx.arc(620, 84, 5, 0, Math.PI * 2); ctx.fill();

        // Right Status Icons
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('5G', 840, 95);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        ctx.strokeRect(900, 72, 44, 24);
        ctx.fillRect(904, 76, 32, 16);
        ctx.fillRect(946, 79, 4, 10);

        // Header: Pulse Bio-Intelligence & HIPAA Badge
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(105, 210, 45, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ccfbf1'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('⚡', 87, 222);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText('Pulse Bio-Telemetry', 175, 205);
        ctx.font = '500 28px sans-serif';
        ctx.fillStyle = '#0d9488';
        ctx.fillText('Continuous Vitals Engine • HIPAA', 175, 245);

        // HIPAA Security Chip
        ctx.fillStyle = '#cffafe';
        ctx.beginPath(); ctx.roundRect(790, 185, 155, 52, 26); ctx.fill();
        ctx.fillStyle = '#0891b2';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('● ENCRYPTED', 808, 218);

        // ── HERO VITALS CARD ──
        const cardGrad = ctx.createLinearGradient(60, 310, 964, 820);
        cardGrad.addColorStop(0, '#042f2e');
        cardGrad.addColorStop(0.5, '#115e59');
        cardGrad.addColorStop(1, '#021e1d');
        ctx.fillStyle = cardGrad;
        ctx.beginPath(); ctx.roundRect(60, 310, 904, 510, 48); ctx.fill();

        ctx.strokeStyle = 'rgba(45, 212, 191, 0.25)'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = 'rgba(204, 251, 241, 0.7)';
        ctx.font = '600 28px sans-serif';
        ctx.fillText('REAL-TIME PATIENT VITALS', 110, 385);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 84px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('72 BPM', 110, 485);

        // Rhythm Status Pill
        ctx.fillStyle = 'rgba(20, 184, 166, 0.25)';
        ctx.beginPath(); ctx.roundRect(460, 420, 240, 56, 28); ctx.fill();
        ctx.strokeStyle = 'rgba(20, 184, 166, 0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#2dd4bf';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('● Sinus Rhythm', 485, 457);

        // ECG Wave Graph on Card
        ctx.beginPath();
        ctx.moveTo(110, 640);
        ctx.lineTo(260, 640);
        ctx.lineTo(290, 600);
        ctx.lineTo(320, 690);
        ctx.lineTo(360, 530);
        ctx.lineTo(400, 710);
        ctx.lineTo(430, 620);
        ctx.lineTo(470, 640);
        ctx.lineTo(600, 640);
        ctx.lineTo(630, 590);
        ctx.lineTo(660, 690);
        ctx.lineTo(700, 530);
        ctx.lineTo(740, 710);
        ctx.lineTo(770, 620);
        ctx.lineTo(910, 640);
        ctx.strokeStyle = '#2dd4bf';
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.fillStyle = 'rgba(204, 251, 241, 0.6)';
        ctx.font = '28px monospace';
        ctx.fillText('HRV: 99.4ms', 110, 760);
        ctx.fillText('SpO2: 99%', 420, 760);
        ctx.font = 'bold 32px sans-serif';
        ctx.fillStyle = '#5eead4';
        ctx.fillText('PULSE AI', 750, 760);

        // 4 Action Buttons
        const actions = [
          { label: 'Telemetry', icon: '♥', bg: '#042f2e', text: '#ffffff' },
          { label: 'Clinical', icon: '✚', bg: '#ffffff', text: '#0f172a' },
          { label: 'Triage', icon: '⚡', bg: '#ffffff', text: '#0f172a' },
          { label: 'Records', icon: '📁', bg: '#ffffff', text: '#0f172a' },
        ];
        for (let i = 0; i < 4; i++) {
          const btnX = 60 + i * 235;
          ctx.fillStyle = actions[i].bg;
          ctx.beginPath(); ctx.roundRect(btnX, 860, 200, 130, 32); ctx.fill();
          ctx.strokeStyle = '#ccfbf1'; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = actions[i].text;
          ctx.font = 'bold 44px sans-serif';
          ctx.fillText(actions[i].icon, btnX + 78, 925);
          ctx.font = '600 24px sans-serif';
          ctx.fillText(actions[i].label, btnX + 45, 965);
        }

        // Live Diagnostic Stream
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.roundRect(60, 1030, 904, 380, 40); ctx.fill();
        ctx.strokeStyle = '#ccfbf1'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Continuous Biofeedback Stream', 105, 1095);
        ctx.fillStyle = '#0d9488';
        ctx.font = 'bold 28px monospace';
        ctx.fillText('● 100% In Sync', 720, 1095);

        ctx.beginPath();
        ctx.moveTo(105, 1280);
        ctx.bezierCurveTo(280, 1220, 360, 1340, 520, 1240);
        ctx.bezierCurveTo(640, 1180, 760, 1320, 915, 1260);
        ctx.strokeStyle = '#0d9488';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Recent Telemetry Logs
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Automated Clinical Logs', 60, 1470);

        const logs = [
          { name: 'Continuous ECG Ingestion', time: 'Sub-second • Encrypted', stat: 'Normal' },
          { name: 'Blood Oxygen Sensor Sync', time: '2m ago • HealthKit', stat: '99%' },
          { name: 'Offline SQLite Storage Pass', time: '15m ago • Encrypted', stat: 'Synced' },
          { name: 'Clinical Cloud Relaying', time: '1h ago • Zero-Trust', stat: 'Verified' },
        ];
        for (let i = 0; i < logs.length; i++) {
          const ty = 1515 + i * 120;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.roundRect(60, ty, 904, 100, 24); ctx.fill();
          ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 30px sans-serif';
          ctx.fillText(logs[i].name, 95, ty + 48);
          ctx.fillStyle = '#64748b';
          ctx.font = '24px sans-serif';
          ctx.fillText(logs[i].time, 95, ty + 82);
          ctx.fillStyle = '#0d9488';
          ctx.font = 'bold 28px monospace';
          ctx.fillText(logs[i].stat, 800, ty + 60);
        }
      }
      return new THREE.CanvasTexture(c);
    };

    const createSaasScreenTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 2048;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Background: Deep Slate Tech Luxury
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
        bgGrad.addColorStop(0, '#f8fafc');
        bgGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 2048);

        // Top Status Bar
        ctx.fillStyle = '#0f172a';
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('9:41', 80, 95);

        // Dynamic Island Capsule
        ctx.fillStyle = '#0f0f14';
        ctx.beginPath();
        ctx.roundRect(362, 50, 300, 68, 34);
        ctx.fill();

        ctx.fillStyle = '#6366f1';
        ctx.beginPath(); ctx.arc(410, 84, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath(); ctx.arc(620, 84, 5, 0, Math.PI * 2); ctx.fill();

        // Right Status Icons
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('5G', 840, 95);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        ctx.strokeRect(900, 72, 44, 24);
        ctx.fillRect(904, 76, 32, 16);
        ctx.fillRect(946, 79, 4, 10);

        // Header: Nexus Cloud Terminal
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(105, 210, 45, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#e0e7ff'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#4f46e5';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('NX', 78, 222);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText('Nexus Cloud Engine', 175, 205);
        ctx.font = '500 28px sans-serif';
        ctx.fillStyle = '#4f46e5';
        ctx.fillText('Distributed Multi-Tenant • 99.999%', 175, 245);

        // Status Badge
        ctx.fillStyle = '#e0e7ff';
        ctx.beginPath(); ctx.roundRect(790, 185, 155, 52, 26); ctx.fill();
        ctx.fillStyle = '#4338ca';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('● CLUSTERS', 808, 218);

        // ── HERO THROUGHPUT CARD ──
        const cardGrad = ctx.createLinearGradient(60, 310, 964, 820);
        cardGrad.addColorStop(0, '#1e1b4b');
        cardGrad.addColorStop(0.5, '#312e81');
        cardGrad.addColorStop(1, '#0f0d26');
        ctx.fillStyle = cardGrad;
        ctx.beginPath(); ctx.roundRect(60, 310, 904, 510, 48); ctx.fill();

        ctx.strokeStyle = 'rgba(129, 140, 248, 0.25)'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = 'rgba(224, 231, 255, 0.7)';
        ctx.font = '600 28px sans-serif';
        ctx.fillText('DISTRIBUTED INGESTION RATE', 110, 385);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 84px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('45,820 QPS', 110, 485);

        // SLA Pill
        ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
        ctx.beginPath(); ctx.roundRect(640, 420, 240, 56, 28); ctx.fill();
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#a5b4fc';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('● 99.999% SLA', 665, 457);

        // Histogram / Cluster Load Bars
        const barHeights = [180, 240, 290, 210, 310, 260, 340, 280];
        for (let b = 0; b < barHeights.length; b++) {
          const bx = 110 + b * 98;
          ctx.fillStyle = 'rgba(129, 140, 248, 0.4)';
          ctx.fillRect(bx, 710 - barHeights[b] * 0.4, 60, barHeights[b] * 0.4);
        }

        ctx.fillStyle = 'rgba(224, 231, 255, 0.6)';
        ctx.font = '28px monospace';
        ctx.fillText('p99: 4.2ms', 110, 760);
        ctx.fillText('Edge Hit: 99.8%', 420, 760);
        ctx.font = 'bold 32px sans-serif';
        ctx.fillStyle = '#c7d2fe';
        ctx.fillText('GLOBAL MESH', 700, 760);

        // 4 Action Buttons
        const actions = [
          { label: 'Clusters', icon: '☵', bg: '#1e1b4b', text: '#ffffff' },
          { label: 'Telemetry', icon: '📈', bg: '#ffffff', text: '#0f172a' },
          { label: 'Pipelines', icon: '⚡', bg: '#ffffff', text: '#0f172a' },
          { label: 'Security', icon: '🛡', bg: '#ffffff', text: '#0f172a' },
        ];
        for (let i = 0; i < 4; i++) {
          const btnX = 60 + i * 235;
          ctx.fillStyle = actions[i].bg;
          ctx.beginPath(); ctx.roundRect(btnX, 860, 200, 130, 32); ctx.fill();
          ctx.strokeStyle = '#e0e7ff'; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = actions[i].text;
          ctx.font = 'bold 44px sans-serif';
          ctx.fillText(actions[i].icon, btnX + 78, 925);
          ctx.font = '600 24px sans-serif';
          ctx.fillText(actions[i].label, btnX + 50, 965);
        }

        // Live Performance Panel
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.roundRect(60, 1030, 904, 380, 40); ctx.fill();
        ctx.strokeStyle = '#e0e7ff'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Multi-Region Ingestion Mesh', 105, 1095);
        ctx.fillStyle = '#4f46e5';
        ctx.font = 'bold 28px monospace';
        ctx.fillText('● 18 Nodes Active', 680, 1095);

        ctx.beginPath();
        ctx.moveTo(105, 1300);
        ctx.bezierCurveTo(280, 1200, 420, 1330, 560, 1210);
        ctx.bezierCurveTo(680, 1150, 800, 1280, 915, 1220);
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Cluster status cards
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Autonomous Pod Metrics', 60, 1470);

        const pods = [
          { name: 'US-East Cloud Core Ingestion', time: '14,200 QPS • 0 Errors', stat: 'Healthy' },
          { name: 'EU-Central Edge Accelerator', time: '11,450 QPS • 2.1ms Latency', stat: 'Healthy' },
          { name: 'AP-Tokyo Gateway Node', time: '10,980 QPS • Zero Packet Loss', stat: 'Healthy' },
          { name: 'Global Database Shard Relay', time: '9,190 QPS • Synchronized', stat: 'Healthy' },
        ];
        for (let i = 0; i < pods.length; i++) {
          const ty = 1515 + i * 120;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.roundRect(60, ty, 904, 100, 24); ctx.fill();
          ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 30px sans-serif';
          ctx.fillText(pods[i].name, 95, ty + 48);
          ctx.fillStyle = '#64748b';
          ctx.font = '24px sans-serif';
          ctx.fillText(pods[i].time, 95, ty + 82);
          ctx.fillStyle = '#4f46e5';
          ctx.font = 'bold 28px monospace';
          ctx.fillText(pods[i].stat, 790, ty + 60);
        }
      }
      return new THREE.CanvasTexture(c);
    };

    const createRetailScreenTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 2048;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Background: Warm Champagne / Atelier Chalk
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
        bgGrad.addColorStop(0, '#faf8f5');
        bgGrad.addColorStop(1, '#f1ede4');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 2048);

        // Status Bar
        ctx.fillStyle = '#1c1917';
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('9:41', 80, 95);

        // Dynamic Island
        ctx.fillStyle = '#0c0a09';
        ctx.beginPath();
        ctx.roundRect(362, 50, 300, 68, 34);
        ctx.fill();

        ctx.fillStyle = '#d97706';
        ctx.beginPath(); ctx.arc(410, 84, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.arc(620, 84, 5, 0, Math.PI * 2); ctx.fill();

        // Right Status Icons
        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('5G', 840, 95);
        ctx.strokeStyle = '#1c1917';
        ctx.lineWidth = 4;
        ctx.strokeRect(900, 72, 44, 24);
        ctx.fillRect(904, 76, 32, 16);
        ctx.fillRect(946, 79, 4, 10);

        // Header: Avenue Luxury Horology
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(105, 210, 45, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#e7e5e4'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#78350f';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('AV', 82, 222);

        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText('Avenue Luxury Atelier', 175, 205);
        ctx.font = '500 28px sans-serif';
        ctx.fillStyle = '#a8a29e';
        ctx.fillText('Spatial Commerce • Sub-Second', 175, 245);

        // Live AR Badge
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath(); ctx.roundRect(790, 185, 155, 52, 26); ctx.fill();
        ctx.fillStyle = '#b45309';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('● 3D AR LIVE', 808, 218);

        // ── HERO PRODUCT SHOWCASE CARD ──
        const cardGrad = ctx.createLinearGradient(60, 310, 964, 820);
        cardGrad.addColorStop(0, '#1c1917');
        cardGrad.addColorStop(0.5, '#292524');
        cardGrad.addColorStop(1, '#0c0a09');
        ctx.fillStyle = cardGrad;
        ctx.beginPath(); ctx.roundRect(60, 310, 904, 510, 48); ctx.fill();

        ctx.strokeStyle = 'rgba(217, 119, 6, 0.3)'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = 'rgba(254, 243, 199, 0.75)';
        ctx.font = '600 28px sans-serif';
        ctx.fillText('LIMITED CHRONO EDITION • 1 OF 50', 110, 385);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 74px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('$18,500.00', 110, 485);

        // Free Freight Pill
        ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.beginPath(); ctx.roundRect(580, 420, 300, 56, 28); ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('● Insured Global Air', 605, 457);

        // Watch Visual Ring
        ctx.beginPath();
        ctx.arc(512, 650, 95, 0, Math.PI * 2);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(512, 650, 70, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '28px monospace';
        ctx.fillText('CALIBRE 3920', 110, 760);
        ctx.fillText('TITANIUM BEZEL', 400, 760);
        ctx.font = 'bold 32px sans-serif';
        ctx.fillStyle = '#fde68a';
        ctx.fillText('SWISS CORE', 720, 760);

        // 4 Action Buttons
        const actions = [
          { label: 'Instant Buy', icon: '', bg: '#1c1917', text: '#ffffff' },
          { label: 'AR Room', icon: '👓', bg: '#ffffff', text: '#1c1917' },
          { label: 'Reserve', icon: '◈', bg: '#ffffff', text: '#1c1917' },
          { label: 'Concierge', icon: '★', bg: '#ffffff', text: '#1c1917' },
        ];
        for (let i = 0; i < 4; i++) {
          const btnX = 60 + i * 235;
          ctx.fillStyle = actions[i].bg;
          ctx.beginPath(); ctx.roundRect(btnX, 860, 200, 130, 32); ctx.fill();
          ctx.strokeStyle = '#e7e5e4'; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = actions[i].text;
          ctx.font = 'bold 44px sans-serif';
          ctx.fillText(actions[i].icon, btnX + 78, 925);
          ctx.font = '600 24px sans-serif';
          ctx.fillText(actions[i].label, btnX + 45, 965);
        }

        // Live Commerce Stream
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.roundRect(60, 1030, 904, 380, 40); ctx.fill();
        ctx.strokeStyle = '#e7e5e4'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Spatial Commerce Telemetry', 105, 1095);
        ctx.fillStyle = '#d97706';
        ctx.font = 'bold 28px monospace';
        ctx.fillText('● 0.18s Paint', 740, 1095);

        ctx.beginPath();
        ctx.moveTo(105, 1280);
        ctx.bezierCurveTo(280, 1190, 420, 1340, 580, 1220);
        ctx.bezierCurveTo(700, 1140, 820, 1290, 915, 1200);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Recent Purchases
        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Real-Time Flagship Orders', 60, 1470);

        const orders = [
          { name: 'London Flagship Boutique', time: 'Just now • Verified Apple Pay', amt: '$18,500.00' },
          { name: 'Tokyo Ginza Spatial Kiosk', time: '14m ago • AR Biometric Sign', amt: '$37,000.00' },
          { name: 'Zurich Vault Allocation', time: '42m ago • Multi-Currency Escrow', amt: '$55,500.00' },
          { name: 'New York Madison Ave Salon', time: '1h ago • Seamless NFC Relay', amt: '$18,500.00' },
        ];
        for (let i = 0; i < orders.length; i++) {
          const ty = 1515 + i * 120;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.roundRect(60, ty, 904, 100, 24); ctx.fill();
          ctx.strokeStyle = '#e7e5e4'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = '#1c1917';
          ctx.font = 'bold 30px sans-serif';
          ctx.fillText(orders[i].name, 95, ty + 48);
          ctx.fillStyle = '#78716c';
          ctx.font = '24px sans-serif';
          ctx.fillText(orders[i].time, 95, ty + 82);
          ctx.fillStyle = '#16a34a';
          ctx.font = 'bold 28px monospace';
          ctx.fillText(orders[i].amt, 720, ty + 60);
        }
      }
      return new THREE.CanvasTexture(c);
    };

    const createRealEstateScreenTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 2048;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Background: Clean Architectural Slate
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
        bgGrad.addColorStop(0, '#f8fafc');
        bgGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 2048);

        // Status Bar
        ctx.fillStyle = '#0f172a';
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('9:41', 80, 95);

        // Dynamic Island
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.roundRect(362, 50, 300, 68, 34);
        ctx.fill();

        ctx.fillStyle = '#3b82f6';
        ctx.beginPath(); ctx.arc(410, 84, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath(); ctx.arc(620, 84, 5, 0, Math.PI * 2); ctx.fill();

        // Right Status Icons
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('5G', 840, 95);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        ctx.strokeRect(900, 72, 44, 24);
        ctx.fillRect(904, 76, 32, 16);
        ctx.fillRect(946, 79, 4, 10);

        // Header: Valois Real Estate Vault
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(105, 210, 45, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('VR', 82, 222);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText('Valois Property Vault', 175, 205);
        ctx.font = '500 28px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('Spatial 3D Digital Twin • BIM Core', 175, 245);

        // Badge
        ctx.fillStyle = '#dbeafe';
        ctx.beginPath(); ctx.roundRect(790, 185, 155, 52, 26); ctx.fill();
        ctx.fillStyle = '#1d4ed8';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('● 3D BIM TWIN', 802, 218);

        // ── HERO PROPERTY CARD ──
        const cardGrad = ctx.createLinearGradient(60, 310, 964, 820);
        cardGrad.addColorStop(0, '#0f172a');
        cardGrad.addColorStop(0.5, '#1e293b');
        cardGrad.addColorStop(1, '#020617');
        ctx.fillStyle = cardGrad;
        ctx.beginPath(); ctx.roundRect(60, 310, 904, 510, 48); ctx.fill();

        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = 'rgba(219, 234, 254, 0.75)';
        ctx.font = '600 28px sans-serif';
        ctx.fillText('THE PENTHOUSE AT SKYLINE TOWER', 110, 385);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 74px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('$19,500,000', 110, 485);

        // Verified Escrow Pill
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.beginPath(); ctx.roundRect(580, 420, 300, 56, 28); ctx.fill();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#93c5fd';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('● Verified Smart Escrow', 595, 457);

        // Floorplan Blueprint Wireframe
        ctx.beginPath();
        ctx.strokeRect(110, 540, 804, 160);
        ctx.moveTo(350, 540); ctx.lineTo(350, 700);
        ctx.moveTo(600, 540); ctx.lineTo(600, 700);
        ctx.moveTo(110, 620); ctx.lineTo(350, 620);
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '28px monospace';
        ctx.fillText('8,450 SQ FT', 110, 760);
        ctx.fillText('5 BEDS • 6 BATHS', 380, 760);
        ctx.font = 'bold 32px sans-serif';
        ctx.fillStyle = '#bfdbfe';
        ctx.fillText('MANHATTAN', 720, 760);

        // 4 Action Buttons
        const actions = [
          { label: '3D Tour', icon: '🏛', bg: '#0f172a', text: '#ffffff' },
          { label: 'BIM Specs', icon: '📐', bg: '#ffffff', text: '#0f172a' },
          { label: 'Escrow', icon: '⚖', bg: '#ffffff', text: '#0f172a' },
          { label: 'Private Jet', icon: '✈', bg: '#ffffff', text: '#0f172a' },
        ];
        for (let i = 0; i < 4; i++) {
          const btnX = 60 + i * 235;
          ctx.fillStyle = actions[i].bg;
          ctx.beginPath(); ctx.roundRect(btnX, 860, 200, 130, 32); ctx.fill();
          ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = actions[i].text;
          ctx.font = 'bold 44px sans-serif';
          ctx.fillText(actions[i].icon, btnX + 78, 925);
          ctx.font = '600 24px sans-serif';
          ctx.fillText(actions[i].label, btnX + 45, 965);
        }

        // Live Spatial Inspection Stream
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.roundRect(60, 1030, 904, 380, 40); ctx.fill();
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('60fps WebGL Spatial Walkthrough', 105, 1095);
        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 28px monospace';
        ctx.fillText('● Digital Twin Active', 660, 1095);

        ctx.beginPath();
        ctx.moveTo(105, 1290);
        ctx.bezierCurveTo(280, 1210, 420, 1350, 580, 1230);
        ctx.bezierCurveTo(700, 1160, 820, 1290, 915, 1210);
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Recent Inquiries
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Verified Institutional Escrow Log', 60, 1470);

        const logs = [
          { name: 'New York Central Park South Penthouse', time: 'Today • Proof of Funds Verified', stat: 'Under Escrow' },
          { name: 'Miami Star Island Waterfront Villa', time: 'Yesterday • 3D BIM Spatial Inspection', stat: 'Appraised' },
          { name: 'Geneva Lakefront Private Estate', time: '3d ago • Smart Contract Escrow Lock', stat: 'Secured' },
          { name: 'London Mayfair Heritage Residence', time: '5d ago • Biometric Notarization', stat: 'Completed' },
        ];
        for (let i = 0; i < logs.length; i++) {
          const ty = 1515 + i * 120;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.roundRect(60, ty, 904, 100, 24); ctx.fill();
          ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 30px sans-serif';
          ctx.fillText(logs[i].name, 95, ty + 48);
          ctx.fillStyle = '#64748b';
          ctx.font = '24px sans-serif';
          ctx.fillText(logs[i].time, 95, ty + 82);
          ctx.fillStyle = '#2563eb';
          ctx.font = 'bold 28px monospace';
          ctx.fillText(logs[i].stat, 740, ty + 60);
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

    const buildIphone = (initialTexture?: THREE.Texture) => {
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
        map: initialTexture || createMobileScreenTexture(),
        toneMapped: false,
      });
      group.userData.screenMat = screenMat;
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
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.18,
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
    const oGeo = new THREE.TorusGeometry(0.58, 0.16, 32, 64);
    const letterO = new THREE.Mesh(oGeo, glassMat);
    letterO.position.set(-0.62, 0.06, 0);
    ogInnerGroup.add(letterO);

    // "G" letter: seamless solid glass tube with rounded caps matching "O" in proportion and thickness
    const gRadius = 0.58;
    const gBarY = -0.04;
    const gStartRad = 50 * Math.PI / 180;
    const gPoints = [
      new THREE.Vector3(gRadius * Math.cos(gStartRad), gRadius * Math.sin(gStartRad), 0),
      new THREE.Vector3(gRadius * Math.cos(75 * Math.PI / 180), gRadius * Math.sin(75 * Math.PI / 180), 0),
      new THREE.Vector3(gRadius * Math.cos(110 * Math.PI / 180), gRadius * Math.sin(110 * Math.PI / 180), 0),
      new THREE.Vector3(gRadius * Math.cos(150 * Math.PI / 180), gRadius * Math.sin(150 * Math.PI / 180), 0),
      new THREE.Vector3(-gRadius, 0, 0),
      new THREE.Vector3(gRadius * Math.cos(215 * Math.PI / 180), gRadius * Math.sin(215 * Math.PI / 180), 0),
      new THREE.Vector3(0, -gRadius, 0),
      new THREE.Vector3(gRadius * Math.cos(305 * Math.PI / 180), gRadius * Math.sin(305 * Math.PI / 180), 0),
      new THREE.Vector3(gRadius * Math.cos(335 * Math.PI / 180), gRadius * Math.sin(335 * Math.PI / 180), 0),
      new THREE.Vector3(gRadius, gBarY - 0.10, 0),
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
    const getOGResponsive = () => {
      const w = window.innerWidth;
      if (w < 480) return { scale: 1.05, y: 0.16 };
      if (w < 768) return { scale: 1.25, y: 0.18 };
      if (w < 1024) return { scale: 1.45, y: 0.20 };
      return { scale: 1.65, y: 0.22 };
    };
    const initOG = getOGResponsive();
    heroOGGroup.position.set(0, initOG.y, 0.4);
    heroOGGroup.scale.set(initOG.scale, initOG.scale, initOG.scale);

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
    const fintechTexture = createMobileScreenTexture();
    const healthcareTexture = createHealthcareScreenTexture();
    const retailTexture = createRetailScreenTexture();
    const realEstateTexture = createRealEstateScreenTexture();
    sectorTexturesRef.current = [fintechTexture, healthcareTexture, retailTexture, realEstateTexture];

    // Default Insights Screen Texture (shown before any sector is selected)
    const createDefaultInsightsTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 2048;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Background: Clean gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
        bgGrad.addColorStop(0, '#f8fafc');
        bgGrad.addColorStop(1, '#edf2f7');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 2048);

        // Top Status Bar
        ctx.fillStyle = '#181520';
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('9:41', 80, 95);

        // Dynamic Island
        ctx.fillStyle = '#0f0f14';
        ctx.beginPath();
        ctx.roundRect(362, 50, 300, 68, 34);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath(); ctx.arc(410, 84, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0a0a10';
        ctx.beginPath(); ctx.arc(410, 84, 5, 0, Math.PI * 2); ctx.fill();

        // Battery icons
        ctx.fillStyle = '#181520';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('5G', 840, 95);
        ctx.strokeStyle = '#181520';
        ctx.lineWidth = 4;
        ctx.strokeRect(900, 72, 44, 24);
        ctx.fillRect(904, 76, 32, 16);

        // App Header
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
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText('Industry Insights', 175, 205);
        ctx.font = '500 28px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('Select an industry to explore', 175, 245);

        // Hero Card with gradient
        const cardGrad = ctx.createLinearGradient(60, 310, 964, 820);
        cardGrad.addColorStop(0, '#181520');
        cardGrad.addColorStop(0.5, '#1e293b');
        cardGrad.addColorStop(1, '#0f172a');
        ctx.shadowColor = 'rgba(24, 21, 32, 0.25)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 20;
        ctx.fillStyle = cardGrad;
        ctx.beginPath();
        ctx.roundRect(60, 310, 904, 510, 48);
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // Card title
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '500 28px sans-serif';
        ctx.fillText('OPUS GEEKS', 110, 380);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px sans-serif';
        ctx.fillText('In-Depth Industry', 110, 450);
        ctx.fillText('Insights Hub', 110, 510);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '400 30px sans-serif';
        ctx.fillText('Fintech • Healthcare • Retail • Real Estate', 110, 570);

        // Decorative accent line
        const accentGrad = ctx.createLinearGradient(110, 620, 500, 620);
        accentGrad.addColorStop(0, '#3b82f6');
        accentGrad.addColorStop(1, '#06b6d4');
        ctx.fillStyle = accentGrad;
        ctx.beginPath();
        ctx.roundRect(110, 620, 250, 5, 3);
        ctx.fill();

        // Explore text
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '500 26px sans-serif';
        ctx.fillText('Tap a sector to explore →', 110, 720);

        // Category cards below
        const cats = ['Fintech', 'Healthcare', 'Retail', 'Real Estate'];
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        cats.forEach((cat, i) => {
          const y = 900 + i * 200;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(60, y, 904, 160, 28);
          ctx.fill();

          // Color accent dot
          ctx.fillStyle = colors[i];
          ctx.beginPath();
          ctx.arc(110, y + 80, 18, 0, Math.PI * 2);
          ctx.fill();

          // Category label
          ctx.fillStyle = '#181520';
          ctx.font = 'bold 38px sans-serif';
          ctx.fillText(cat, 150, y + 70);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '400 26px sans-serif';
          ctx.fillText('Tap to explore insights', 150, y + 110);

          // Arrow
          ctx.fillStyle = '#cbd5e1';
          ctx.font = 'bold 42px sans-serif';
          ctx.fillText('→', 890, y + 85);
        });
      }
      return new THREE.CanvasTexture(c);
    };
    const defaultInsightsTexture = createDefaultInsightsTexture();

    const stage1Group = new THREE.Group();
    stage1Group.scale.set(0, 0, 0);
    stage1Group.position.set(0, -0.72, 0.5);
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

    const stage1Phone = buildIphone(fintechTexture);
    stage1Phone.rotation.set(0.04, -0.06, 0);
    stage1Group.add(stage1Phone);
    const stage1ScreenMat = stage1Phone.userData.screenMat as THREE.MeshBasicMaterial;
    stage1PhoneRef.current = stage1Phone;
    stage1ScreenMatRef.current = stage1ScreenMat;

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
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Responsive phone sizing helper — keeps phone from overlapping top buttons on mobile
    const getPhoneResponsive = () => {
      const w = window.innerWidth;
      if (w < 480) return { scale: 0.52, y: -0.3 };        // small phones
      if (w < 640) return { scale: 0.58, y: -0.22 };       // large phones
      if (w < 768) return { scale: 0.65, y: -0.15 };       // small tablets
      if (w < 1024) return { scale: 0.72, y: -0.12 };      // tablets
      return { scale: 0.82, y: -0.09 };                     // desktop
    };

    let resizeDebounceTimer: ReturnType<typeof setTimeout>;

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Auto-close mobile drawer menu on desktop
      if (w >= 1024) {
        setMobileMenuOpen(false);
      }

      // Dynamically adapt Hero 3D Monogram if at initial hero section
      if (window.scrollY < 80) {
        const ogResp = getOGResponsive();
        gsap.to(heroOGGroup.scale, { x: ogResp.scale, y: ogResp.scale, z: ogResp.scale, duration: 0.35, ease: 'power2.out' });
        gsap.to(heroOGGroup.position, { y: ogResp.y, duration: 0.35, ease: 'power2.out' });
      }

      // Dynamically adjust phone scale & position on resize so it never overlaps buttons
      if (stage1Group) {
        const resp = getPhoneResponsive();
        gsap.to(stage1Group.scale, { x: resp.scale, y: resp.scale, z: resp.scale, duration: 0.35, ease: 'power2.out' });
        gsap.to(stage1Group.position, { y: resp.y, duration: 0.35, ease: 'power2.out' });
      }

      // Debounced ScrollTrigger refresh so manual window dragging smoothly recalculates pins and triggers
      clearTimeout(resizeDebounceTimer);
      resizeDebounceTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Render Animation Loop with Interactive Mouse Tilt & Floating Physics
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);
      if (document.hidden) return; // Save CPU/GPU when user changes tab
      const elapsedTime = (performance.now() - startTime) * 0.001;

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
        letterG.rotation.z = Math.cos(elapsedTime * 0.9) * 0.04;
      }

      // Interactive 3D Mobile Hover Rotation Physics & Dynamic Shadow (Fintech Section)
      if (stage1Group) {
        // Organic floating wave — add offset rather than override so GSAP elevation is preserved
        const floatY = Math.sin(elapsedTime * 1.7) * 0.04;
        stage1Phone.position.y += (floatY - (stage1Phone.userData._prevFloat ?? 0));
        stage1Phone.userData._prevFloat = floatY;

        // Dynamic Ground Contact Shadow reacts to phone hover & tilt
        phoneShadow.position.x = mouseX * 0.12;
        phoneShadow.position.z = -0.1 - mouseY * 0.1;
        const shadowScale = 1 - floatY * 2.0;
        phoneShadow.scale.set(shadowScale, shadowScale, 1);
        phoneShadowMat.opacity = Math.max(0.25, 0.72 - floatY * 2.5);

        // Interactive mouse hover pitch/yaw dynamic rotation (refined, upright posture)
        const phoneTargetRotX = 0.04 + mouseY * 0.06;
        const phoneTargetRotY = -0.06 + mouseX * 0.08;
        const phoneTargetRotZ = 0; // ZERO roll tilt — stays upright and never looks like it's falling!

        stage1Phone.rotation.x += (phoneTargetRotX - stage1Phone.rotation.x) * 0.06;
        stage1Phone.rotation.y += (phoneTargetRotY - stage1Phone.rotation.y) * 0.06;
        stage1Phone.rotation.z += (phoneTargetRotZ - stage1Phone.rotation.z) * 0.06;
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
          end: '+=750%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Save reference to trigger for scrollToSection calculations
      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // ── Stage 1 (Hero) Exits ──
      tl.to(heroRef.current, {
        y: -90,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0)
        .to(heroOGGroup.position, { x: 0, y: -1.8, z: -0.8, duration: 1.2, ease: 'power2.inOut' }, 0)
        .to(heroOGGroup.rotation, { x: -0.4, y: 0.3, z: 0, duration: 1.2, ease: 'power2.inOut' }, 0)
        .to(heroOGGroup.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: 'power3.in' }, 0.2)

        // ── Stage 2 (Showcase + 3D Phone) Enters ──
        .set(heroRef.current, { pointerEvents: 'none' }, 0.4)
        .set(showcaseRef.current, { pointerEvents: 'auto' }, 0.4)
        .set(stage1Group, { visible: true }, 0.4)
        .fromTo(showcaseRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          0.4
        )
        .fromTo(stage1Group.scale,
          { x: 0.08, y: 0.08, z: 0.08 },
          { x: getPhoneResponsive().scale, y: getPhoneResponsive().scale, z: getPhoneResponsive().scale, duration: 1.4, ease: 'expo.out', immediateRender: false },
          0.4
        )
        .fromTo(stage1Group.rotation,
          { x: 0.5, y: -0.2, z: 0.08 },
          { x: 0.04, y: -0.06, z: 0, duration: 1.4, ease: 'expo.out', immediateRender: false },
          0.4
        )
        .fromTo(stage1Group.position,
          { x: 0, y: 3.0, z: -0.5 },
          { x: 0, y: getPhoneResponsive().y, z: 0.45, duration: 1.4, ease: 'expo.out', immediateRender: false },
          0.4
        )

        // Hold Stage 2
        .to({}, { duration: 1.2 }, 1.8)

        // ── Stage 2 Exits & Stage 3 (Process Plan) Enters ──
        .to(showcaseRef.current, {
          y: -90,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 3.0)
        .set(showcaseRef.current, { pointerEvents: 'none' }, 3.6)
        .to(stage1Group.position, {
          y: -2.5,
          z: -0.8,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 3.0)
        .to(stage1Group.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.0,
          ease: 'power3.in',
        }, 3.2)
        .set(processSectionRef.current, { pointerEvents: 'auto' }, 3.4)
        .fromTo(processSectionRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          3.4
        )

        // Hold Stage 3
        .to({}, { duration: 1.2 }, 4.8)

        // ── Stage 3 Exits & Stage 4 (Significant Metrics) Enters ──
        .to(processSectionRef.current, {
          y: -90,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 6.0)
        .set(processSectionRef.current, { pointerEvents: 'none' }, 6.6)
        .set(metricsSectionRef.current, { pointerEvents: 'auto' }, 6.4)
        .fromTo(metricsSectionRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          6.4
        )

        // Hold Stage 4
        .to({}, { duration: 1.2 }, 7.8)

        // ── Stage 4 Exits & Stage 5 (Advanced Service Offerings) Enters ──
        .to(metricsSectionRef.current, {
          y: -90,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 9.0)
        .set(metricsSectionRef.current, { pointerEvents: 'none' }, 9.6)
        .set(servicesSectionRef.current, { pointerEvents: 'auto' }, 9.4)
        .fromTo(servicesSectionRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          9.4
        )

        // Hold Stage 5
        .to({}, { duration: 1.2 }, 10.8)

        // ── Stage 5 Exits & Stage 6 (Verified Client Testimonials) Enters ──
        .to(servicesSectionRef.current, {
          y: -90,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 12.0)
        .set(servicesSectionRef.current, { pointerEvents: 'none' }, 12.6)
        .set(testimonialsSectionRef.current, { pointerEvents: 'auto' }, 12.4)
        .fromTo(testimonialsSectionRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          12.4
        )

        // Hold Stage 6
        .to({}, { duration: 1.4 }, 13.8);
    });

    return () => {
      ctx.revert();
      clearTimeout(resizeDebounceTimer);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      pmrem.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const activeSector = (currentSector >= 0 && currentSector < OPUS_SECTIONS.length) ? OPUS_SECTIONS[currentSector] : OPUS_SECTIONS[0];

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
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#c9d2e7]/35 backdrop-blur-md border-b border-black/[0.04] transition-all duration-300"
      >
        {/* Left: Logo Button */}
        <button
          onClick={() => scrollToSection('hero')}
          className="cursor-pointer group bg-transparent border-none p-0 outline-none flex items-center"
        >
          <OpusLogo variant="full" size={32} />
        </button>

        {/* Right Side: Grouped Navigation Links & Get Started CTA */}
        <div className="flex items-center space-x-6 sm:space-x-8 ml-auto">
          <nav className="hidden lg:flex items-center space-x-8 font-neue text-[13px] font-medium tracking-[0.02em] text-[#181520]">
            {/* Home (Active) */}
            <button
              onClick={() => scrollToSection('hero')}
              className="text-[#181520] font-semibold hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none outline-none font-neue text-[13px]"
            >
              Home
            </button>

            {/* Services Dropdown */}
            <ServicesDropdown />

            {/* Portfolio Showcase Route */}
            <a
              href="/portfolio"
              className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520]"
            >
              Portfolio
            </a>

            {/* Testimonials & Reviews */}
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520] cursor-pointer bg-transparent border-none outline-none"
            >
              Reviews
            </button>

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
            <a
              href="/contact-us"
              className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520]"
            >
              Contact Us
            </a>

            {/* FAQs */}
            <a
              href="/faqs"
              className="hover:opacity-60 transition-opacity font-neue text-[13px] font-medium text-[#181520]"
            >
              FAQs
            </a>
          </nav>

          {/* Right: Book a Strategy Call White Pill Button & Mobile Hamburger Toggle */}
          <div className="relative flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => openChat('Book a Strategy Call')}
              className="bg-white text-[#181520] hover:bg-[#181520] hover:text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full font-neue text-xs sm:text-[13px] font-medium tracking-[0.02em] shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-1.5 sm:space-x-2 border border-black/5 active:scale-95 cursor-pointer outline-none whitespace-nowrap"
            >
              <span className="hidden xs:inline sm:inline">Book a Strategy Call</span>
              <span className="inline xs:hidden sm:hidden">Book Call</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/70 hover:bg-white border border-black/10 text-[#181520] focus:outline-none transition-all shadow-xs cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Matching GlobalHeader Premium Aesthetics) */}
      <div
        className={`fixed inset-0 z-50 bg-[#c9d2e7]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <OpusLogo variant="full" size={26} />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full bg-white/80 border border-black/10 text-[#181520] cursor-pointer"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-4 my-auto overflow-y-auto pr-1">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToSection('hero');
            }}
            className="font-machina text-2xl font-black uppercase text-[#181520] hover:translate-x-2 transition-transform text-left bg-transparent border-none p-0 cursor-pointer"
          >
            Home
          </button>

          {/* Services Dropdown in Mobile Drawer */}
          <div className="flex flex-col space-y-2 py-1">
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="font-machina text-2xl font-black uppercase text-[#181520] flex items-center justify-between text-left cursor-pointer bg-transparent border-none p-0"
            >
              <span>Services</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col space-y-2 pl-3 border-l-2 border-black/15 my-1">
                {[
                  { label: 'Web Development', href: '/services/web-development' },
                  { label: 'App Development', href: '/services/app-development' },
                  { label: 'UI/UX Design', href: '/services/ui-ux-design' },
                ].map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-machina text-sm font-bold uppercase tracking-wider text-[#181520]/80 hover:text-black py-1 flex items-center justify-between"
                  >
                    <span>{sub.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {[
            { label: 'Portfolio', href: '/portfolio' },
            { 
              label: 'Reviews', 
              href: '#testimonials',
              onClick: () => {
                setMobileMenuOpen(false);
                scrollToSection('reviews');
              }
            },
            { label: 'Blogs', href: '/blogs' },
            { label: 'About', href: '/about' },
            { label: 'Contact Us', href: '/contact-us' },
            { label: 'FAQs', href: '/faqs' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="font-machina text-2xl font-black uppercase text-[#181520] hover:translate-x-2 transition-transform"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-black/10 flex flex-col space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openChat('Book a Strategy Call');
            }}
            className="w-full bg-[#181520] text-white py-3.5 rounded-full font-machina text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#c9d2e7]" />
            <span>Book a Strategy Call</span>
          </button>
        </div>
      </div>


      {/* Pinned Stage */}
      <div
        ref={pinContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-full pt-24 pb-8 px-8 md:px-16 flex flex-col justify-between z-20 pointer-events-none will-change-transform origin-center"
        >
          {/* Top Row: Clean spacing for header separation */}
          <div className="pt-2 pointer-events-none" />

          {/* Center: Monumental Headline (Signature Agency Spread) */}
          <h1 className="my-auto py-2 uppercase font-machina text-[#181520] flex flex-col gap-2 md:gap-4 leading-[0.98] tracking-[-0.035em] select-none text-left">
            <span className="text-[7.2vw] sm:text-[7.8vw] md:text-[8vw] whitespace-nowrap">ARCHITECTING</span>
            <span className="text-[7.2vw] sm:text-[7.8vw] md:text-[8vw] whitespace-nowrap">SOFTWARE FOR THE</span>
            <span className="text-[7.2vw] sm:text-[7.8vw] md:text-[8vw] whitespace-nowrap">AI-FIRST ERA.</span>
          </h1>

          {/* Bottom Row: Clean Scroll Indicator + High-Converting US Enterprise Sales Narrative */}
          <div className="flex items-end justify-between pb-2 pointer-events-auto">
            {/* Left: Spacer to balance layout */}
            <div className="hidden md:block w-32" />

            {/* Center: Scroll Down Indicator */}
            <div className="hidden lg:flex flex-col items-center space-y-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-machina text-[10px] uppercase tracking-widest text-[#181520]">Scroll</span>
              <div className="w-4 h-7 border border-black/40 rounded-full flex justify-center p-1">
                <div className="w-1 h-1.5 bg-[#181520] rounded-full animate-bounce" />
              </div>
            </div>

            {/* Right: High-Converting Enterprise Value Proposition */}
            <p className="font-neue max-w-[400px] text-[13px] md:text-[14px] leading-[150%] text-[#181520]/85 text-right font-normal">
              We help fast-moving US enterprises and ambitious startups design, build, and deploy high-performance software with speed and precision.
            </p>
          </div>
        </div>

        {/* Dynamic 4-Sector Interactive Showcase Section — Master Architectural Luxury */}
        <div
          ref={showcaseRef}
          className="absolute inset-0 w-full h-full px-4 sm:px-8 md:px-12 flex flex-col justify-between pt-20 sm:pt-24 pb-2.5 sm:pb-3 z-20 pointer-events-auto will-change-transform origin-center opacity-0 select-none overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Architectural Background Typographic Watermark (Heroic Scale) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <span
              key={activeSector.id + '-watermark'}
              className="font-machina font-black text-[16vw] leading-none uppercase tracking-[-0.04em] text-[#181520]/[0.038] select-none text-center whitespace-nowrap will-change-transform"
              style={{
                animation: 'luxuryWatermarkIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {activeSector.title}
            </span>
          </div>

          {/* Minimalist Top HUD Header & Precision Swiss Segmented Console */}
          <div className="relative w-full flex flex-col items-center z-30 pointer-events-none select-none">
            {/* Architectural Section Title */}
            <h2 className="font-machina font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.6vw] uppercase tracking-[-0.03em] text-[#181520] leading-none text-center">
              Our In-Depth Industry Insights
            </h2>

            {/* Single Razor-Sharp Subtitle */}
            <p className="font-neue text-[11px] sm:text-[12px] text-[#181520]/60 text-center max-w-md mx-auto mt-1 tracking-tight">
              Bespoke digital architecture engineered for capital-grade global enterprises.
            </p>

            {/* Precision Horology Console */}
            <div className="mt-2 sm:mt-2.5 pointer-events-auto">
              <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(24,21,32,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
                {OPUS_SECTIONS.map((sec, idx) => {
                  const isActive = idx === currentSector;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSelectSector(idx)}
                      className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-machina text-[10px] sm:text-[11px] tracking-[0.14em] uppercase cursor-pointer flex items-center transition-all duration-300 outline-none ${
                        isActive
                          ? 'bg-[#181520] text-white shadow-[0_4px_20px_rgba(24,21,32,0.3)] font-bold'
                          : 'text-[#181520]/60 hover:text-[#181520] hover:bg-[#181520]/[0.05] font-semibold'
                      }`}
                    >
                      <span className={`font-mono text-[9px] mr-1.5 transition-opacity ${isActive ? 'text-white/60' : 'text-[#181520]/40'}`}>
                        {sec.number}
                      </span>
                      <span className="relative z-10">{sec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom: Luxury Dossier HUD Console (Slim Architectural Dock) */}
          <div className="relative mt-auto w-full max-w-6xl mx-auto pb-1 pointer-events-auto z-30">
            <div
              key={activeSector.id}
              className="w-full rounded-2xl sm:rounded-3xl bg-white/70 hover:bg-white/80 backdrop-blur-2xl border border-white/90 px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_20px_50px_rgba(24,21,32,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 transition-all duration-400"
              style={{
                animation: 'luxuryFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {/* Left: Sector Meta & Client */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#181520] text-white tracking-widest">
                    {activeSector.number}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#181520]/60 font-semibold truncate">
                    {activeSector.tag}
                  </span>
                </div>
                <h3 className="font-machina text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#181520]">
                  {activeSector.client}
                </h3>
                <p className="font-neue text-[11px] sm:text-xs leading-[150%] text-[#181520]/75 line-clamp-1 mt-0.5">
                  {activeSector.desc}
                </p>
              </div>

              {/* Center: Live Architecture & Telemetry Specs */}
              <div className="hidden lg:flex items-center gap-6 px-6 border-x border-black/10 shrink-0">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#181520]/45">Latency</div>
                  <div className="font-machina text-xs font-bold text-[#181520]">{activeSector.telemetry.latency}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#181520]/45">Security</div>
                  <div className="font-machina text-xs font-bold text-[#181520]">{activeSector.telemetry.security}</div>
                </div>
              </div>

              {/* Right: Integrated Next/Prev Switcher + Master CTA */}
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-black/5">
                {/* Minimalist Prev/Next Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.05]">
                  <button
                    onClick={() => handleSelectSector(currentSector <= 0 ? OPUS_SECTIONS.length - 1 : currentSector - 1)}
                    aria-label="Previous Sector"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-[#181520] text-[#181520] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleSelectSector((currentSector + 1) % OPUS_SECTIONS.length)}
                    aria-label="Next Sector"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-[#181520] text-[#181520] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary CTA Button */}
                <a
                  href={`/portfolio?project=${activeSector.id}`}
                  className="group relative overflow-hidden bg-[#181520] hover:bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center space-x-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-machina shadow-[0_6px_24px_rgba(24,21,32,0.25)] cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="relative z-10 font-bold">Explore Architecture</span>
                  <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            Stage 3: Our Comprehensive Process Plan Section (Award-Winning Luxury)
        ══════════════════════════════════════════════════════════════ */}
        <div
          ref={processSectionRef}
          className="absolute inset-0 w-full h-full px-6 md:px-14 flex flex-col justify-between pt-20 sm:pt-22 md:pt-24 pb-6 sm:pb-8 z-20 pointer-events-none will-change-transform origin-center opacity-0 select-none overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto w-full flex flex-col justify-between h-full z-10">
            {/* Header: Positioned comfortably below navbar */}
            <div className="process-header max-w-3xl mb-2 sm:mb-3">
              <h2 className="font-machina font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.6vw] uppercase tracking-[-0.02em] text-[#181520] leading-[1.05] mb-1.5">
                Our Comprehensive <br className="hidden sm:block" />
                <span>Process</span> Plan
              </h2>
              <p className="font-neue text-xs sm:text-[13px] md:text-[14px] text-[#181520]/70 leading-relaxed max-w-2xl font-normal">
                Embark on a seamless journey with Opus Geeks, where innovation meets a meticulously crafted process plan. From concept to shipping, we ensure a holistic approach to software development.
              </p>
            </div>

            {/* 4 Process Step Cards in 2x2 Grid (Interactive 3D Tilt + Luxury Glassmorphism) */}
            <div className="process-grid grid grid-cols-2 gap-2 sm:gap-3.5 md:gap-4 my-auto">
              {[
                {
                  num: '01',
                  icon: Layers,
                  title: 'Branding & Identity',
                  desc: 'Establishing an iconic identity for your product with cohesive design systems, multi-platform tokens, and authoritative brand voice.',
                  tag: 'Discovery & Identity',
                },
                {
                  num: '02',
                  icon: Cpu,
                  title: 'Interactive Prototyping',
                  desc: 'Validating user journeys and interactive paradigms through high-fidelity spatial prototypes and frictionless UX engineering.',
                  tag: 'Design & Validation',
                },
                {
                  num: '03',
                  icon: Terminal,
                  title: 'Full-Stack Development',
                  desc: 'Transforming designs into zero-latency production-grade code with distributed cloud microservices and automated QA pipelines.',
                  tag: 'Engineering & QA',
                },
                {
                  num: '04',
                  icon: Rocket,
                  title: 'Global Launch & Scale',
                  desc: 'Precision multi-region deployment, sub-second edge CDN distribution, continuous telemetry, and 24/7 autonomous scaling.',
                  tag: 'Go-To-Market & Scale',
                },
              ].map((step) => (
                <InteractiveProcessCard
                  key={step.num}
                  className="process-card group p-2.5 sm:p-4 md:p-5.5 rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/70 hover:bg-white/95 backdrop-blur-2xl border border-white/70 hover:border-black/15 shadow-[0_10px_35px_rgba(24,21,32,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] hover:shadow-[0_24px_50px_rgba(24,21,32,0.12),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Step Top Row: Number & Tag */}
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2.5">
                        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 group-hover:bg-[#181520] border border-black/5 shadow-sm flex items-center justify-center transition-colors duration-300">
                            <step.icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#181520] group-hover:text-white transition-colors duration-300" />
                          </div>
                          <span className="font-machina text-base sm:text-2xl font-black text-[#181520]/30 group-hover:text-[#181520] transition-colors duration-300">
                            {step.num}
                          </span>
                        </div>
                        <span className="hidden sm:inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-neue font-semibold tracking-wider uppercase bg-white/80 group-hover:bg-[#181520] group-hover:text-white border border-white/80 group-hover:border-[#181520] text-[#181520]/75 shadow-sm transition-all duration-300">
                          {step.tag}
                        </span>
                      </div>

                      {/* Step Title */}
                      <h3 className="font-machina text-xs sm:text-base md:text-xl font-bold uppercase tracking-tight text-[#181520] group-hover:text-black group-hover:translate-x-1 transition-all duration-300 mb-0.5 sm:mb-1">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="font-neue text-[10px] sm:text-xs md:text-[12.5px] leading-snug sm:leading-relaxed text-[#181520]/70 group-hover:text-[#181520]/90 transition-colors duration-300 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                        {step.desc}
                      </p>
                    </div>

                    {/* Subtle Bottom Glow Accent */}
                    <div className="w-full h-0.5 bg-black/[0.04] group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#181520]/30 group-hover:to-transparent mt-1.5 sm:mt-3 transition-all duration-300" />
                  </div>
                </InteractiveProcessCard>
              ))}
            </div>

            {/* Bottom Action / CTA Banner */}
            <div className="pt-2.5 pb-1 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
              <div>
                <h4 className="font-machina text-sm sm:text-base font-black uppercase tracking-tight text-[#181520]">
                  Ready To Build Something Extraordinary?
                </h4>
                <p className="font-neue text-xs text-[#181520]/65 font-normal">
                  Let&apos;s turn your vision into market-leading software.
                </p>
              </div>
              <button
                onClick={() => openChat('Get A Quote')}
                className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#181520] text-white font-machina text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(24,21,32,0.28),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_16px_45px_rgba(24,21,32,0.4),0_0_30px_rgba(201,210,231,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] border border-white/15 hover:border-white/35 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] cursor-pointer outline-none shrink-0 overflow-hidden"
              >
                {/* Iridescent shimmer sweep */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{
                    backgroundImage: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.18) 55%, transparent 80%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2.2s ease-in-out infinite',
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get A Quote</span>
                  <Sparkles className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="relative z-10 w-6 h-6 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#181520] flex items-center justify-center transition-all duration-300 -mr-1">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            Stage 4: Significant Metrics That Hold Weight Section (Interactive Expanding Monoliths)
        ══════════════════════════════════════════════════════════════ */}
        <div
          ref={metricsSectionRef}
          className="absolute inset-0 w-full h-full px-6 md:px-14 flex flex-col justify-between pt-20 sm:pt-24 md:pt-26 pb-8 sm:pb-10 z-20 pointer-events-none will-change-transform origin-center opacity-0 select-none overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto w-full flex flex-col justify-between h-full z-10">
            {/* Header Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 items-start mb-3 sm:mb-4">
              {/* Left: Monumental Title */}
              <div className="lg:col-span-5">
                <h2 className="font-machina font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.6vw] leading-[1.05] uppercase tracking-[-0.02em] text-[#181520] text-left">
                  Significant Metrics <br className="hidden sm:block" />
                  That Hold Weight
                </h2>
              </div>

              {/* Right: Narrative Description */}
              <div className="lg:col-span-7 pt-1 sm:pt-2">
                <p className="font-neue text-xs sm:text-[13px] md:text-[14px] leading-relaxed text-[#181520]/70 font-normal">
                  Unlocking success hinges on key metrics that carry substantial impact. At Opus Geeks, we prioritize metrics such as user engagement, ensuring a rich user experience, while closely monitoring performance efficiency to guarantee seamless interactions. Our focus extends to conversion rates, fortifying your digital goals, and maintaining strict security and compliance metrics.
                </p>
              </div>
            </div>

            {/* Interactive Expanding Monolithic Pillars */}
            <div className="grid grid-cols-2 md:flex md:flex-row gap-2 sm:gap-3 md:gap-3.5 w-full my-auto h-auto md:h-[58vh] max-h-[500px]">
              {[
                {
                  num: '01',
                  value: 40,
                  suffix: '+',
                  title: 'Happy Clients',
                  subtitle: 'Institutional & Global Partners',
                  desc: 'Trusted by Tier-1 institutions, multi-currency fintech platforms, and venture-backed Silicon Valley innovators.',
                  tag: '100% Client Retention',
                  kpi: 'Tier-1 Institutional Core',
                  growth: '+42% Volume Growth',
                  icon: Users,
                },
                {
                  num: '02',
                  value: 340,
                  suffix: '+',
                  title: 'Projects Completed',
                  subtitle: 'Production-Grade Architectures',
                  desc: 'Shipped high-frequency fintech engines, spatial 3D retail apps, HIPAA-compliant telemetry, and distributed cloud meshes.',
                  tag: 'Zero Critical Downtime',
                  kpi: '99.999% Service SLA',
                  growth: '0.04ms Edge Execution',
                  icon: CheckCircle2,
                },
                {
                  num: '03',
                  value: 300,
                  suffix: '',
                  title: 'Dedicated Members',
                  subtitle: 'Elite Engineering Squad',
                  desc: 'A dedicated team of senior systems architects, spatial 3D mathematicians, AI practitioners, and security analysts.',
                  tag: 'Top 1% Global Engineering',
                  kpi: '24/7 Follow-The-Sun Ops',
                  growth: 'Multi-Region Squads',
                  icon: Cpu,
                },
                {
                  num: '04',
                  value: 25,
                  suffix: '+',
                  title: 'Awards Won',
                  subtitle: 'International Design Prestige',
                  desc: 'Celebrated worldwide with honors including Awwwards Site of the Day, FWA of the Day, and international UX excellence awards.',
                  tag: 'Awwwards & FWA Winner',
                  kpi: 'Global Industry Benchmark',
                  growth: '5x Design Honors',
                  icon: Trophy,
                },
              ].map((pillar, idx) => {
                const isActive = idx === activeMetricPillar;
                return (
                  <div
                    key={pillar.num}
                    onMouseEnter={() => setActiveMetricPillar(idx)}
                    onClick={() => setActiveMetricPillar(idx)}
                    className={`relative rounded-xl sm:rounded-2xl md:rounded-3xl cursor-pointer overflow-hidden flex flex-col justify-between p-3 sm:p-5 md:p-6 select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                      ? 'col-span-1 md:flex-[2.4] bg-white/95 backdrop-blur-3xl border border-white/95 shadow-[0_20px_60px_rgba(24,21,32,0.12),inset_0_1px_0_rgba(255,255,255,1)] z-10'
                      : 'col-span-1 md:flex-1 bg-white/60 hover:bg-white/80 backdrop-blur-2xl border border-white/70 shadow-[0_8px_30px_rgba(24,21,32,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]'
                      }`}
                  >
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                        <div
                          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${isActive
                            ? 'bg-[#181520] text-white border border-[#181520]'
                            : 'bg-white/90 text-[#181520] border border-black/5'
                            }`}
                        >
                          <pillar.icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                        </div>
                        <span
                          className={`font-machina font-black text-xs sm:text-base transition-colors duration-300 ${isActive ? 'text-[#181520]' : 'text-[#181520]/40'
                            }`}
                        >
                          {pillar.num}
                        </span>
                      </div>
                    </div>

                    {/* Center: Monumental Numeric Counter */}
                    <div className="my-auto py-1 sm:py-2">
                      <div
                        className={`font-machina font-black tracking-tight leading-none transition-all duration-300 ${isActive
                          ? 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181520]'
                          : 'text-xl sm:text-3xl md:text-4xl text-[#181520]/80'
                          }`}
                      >
                        <MetricCounter value={pillar.value} suffix={pillar.suffix} />
                      </div>
                      <div className="font-machina text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-tight text-[#181520] mt-1 sm:mt-1.5 whitespace-nowrap truncate">
                        {pillar.title}
                      </div>

                      {/* Active Only Extended Details */}
                      {isActive && (
                        <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-black/5 space-y-1.5 sm:space-y-2.5">
                          <p className="font-neue text-[10px] sm:text-xs md:text-[13px] leading-relaxed text-[#181520]/75 line-clamp-2 md:line-clamp-3">
                            {pillar.desc}
                          </p>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 pt-0.5 sm:pt-1">
                            <span className="text-[9px] sm:text-[10px] font-neue font-bold uppercase tracking-wider text-[#181520] bg-[#181520]/5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-black/5">
                              {pillar.tag}
                            </span>
                            <span className="hidden sm:inline-block text-[9px] sm:text-[10px] font-neue font-bold uppercase tracking-wider text-emerald-700 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-500/20">
                              ● {pillar.growth}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Indicator Bar */}
                    <div className="w-full">
                      <div
                        className={`h-0.5 sm:h-1 rounded-full transition-all duration-500 ${isActive
                          ? 'bg-[#181520] w-full'
                          : 'bg-black/10 w-6 sm:w-8'
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            Stage 5: Our Advanced Service Offerings and Solutions (Interactive Spatial Split Showcase)
        ══════════════════════════════════════════════════════════════ */}
        <div
          ref={servicesSectionRef}
          className="absolute inset-0 w-full h-full px-6 md:px-14 flex flex-col justify-between pt-20 sm:pt-22 md:pt-24 pb-6 sm:pb-8 z-20 pointer-events-none will-change-transform origin-center opacity-0 select-none overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto w-full flex flex-col justify-between h-full z-10">
            {/* Header Area */}
            <div className="process-header max-w-4xl mb-2 sm:mb-3">
              <h2 className="font-machina font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.6vw] uppercase tracking-[-0.02em] text-[#181520] leading-[1.05] mb-1.5">
                Our Advanced Service <br className="hidden sm:block" />
                <span>Offerings</span> and Solutions.
              </h2>
              <p className="font-neue text-xs sm:text-[13px] md:text-[14px] text-[#181520]/60 max-w-2xl font-normal">
                Bespoke digital engineering and spatial product solutions engineered for high-velocity enterprises.
              </p>
            </div>

            {/* Split Showcase: Left Interactive Command Deck + Right Floating 3D Device Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 my-auto items-center h-[52vh] sm:h-[54vh] md:h-[56vh] max-h-[480px]">
              {/* Left Column: Interactive Service Selector Accordion */}
              <div className="lg:col-span-6 flex flex-col justify-center gap-2 sm:gap-2.5 h-full overflow-y-auto pr-1">
                {[
                  {
                    num: '01',
                    icon: Monitor,
                    title: 'Website Development',
                    tag: 'Next.js & WebGL 3D',
                    desc: 'High-performance web applications and 3D WebGL architectures engineered for maximum conversion and speed.',
                    specs: ['Next.js 15', 'WebGL 60FPS', 'Edge P99'],
                  },
                  {
                    num: '02',
                    icon: Smartphone,
                    title: 'Mobile App Development',
                    tag: 'iOS & Android Native',
                    desc: 'Native iOS & Android mobile applications built for sub-second fluidity, offline sync, and enterprise reliability.',
                    specs: ['SwiftUI & React Native', 'Offline Sync', 'Biometrics'],
                  },
                  {
                    num: '03',
                    icon: Palette,
                    title: 'UI/UX Design',
                    tag: 'Spatial Systems & UI',
                    desc: 'Spatial design systems, micro-interactions, and accessible interfaces tailored for digital products.',
                    specs: ['Design Tokens', 'WCAG AAA', 'Micro-Physics'],
                  },
                  {
                    num: '04',
                    icon: Gamepad2,
                    title: 'Game Development',
                    tag: 'Unreal 5 & Unity',
                    desc: 'Immersive 3D games and spatial simulations built with cutting-edge realtime graphics engines.',
                    specs: ['Unreal Engine 5', 'Ray Tracing', 'Multiplayer Sync'],
                  },
                ].map((service, idx) => {
                  const isActive = idx === activeServiceIdx;
                  return (
                    <div
                      key={service.num}
                      onMouseEnter={() => setActiveServiceIdx(idx)}
                      onClick={() => setActiveServiceIdx(idx)}
                      className={`relative p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-400 select-none ${isActive
                        ? 'bg-white/95 backdrop-blur-2xl border border-white/95 shadow-[0_12px_36px_rgba(24,21,32,0.08),inset_0_1px_0_rgba(255,255,255,1)]'
                        : 'bg-white/50 hover:bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_rgba(24,21,32,0.03)]'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm ${isActive
                              ? 'bg-[#181520] text-white'
                              : 'bg-white/90 text-[#181520] border border-black/5'
                              }`}
                          >
                            <service.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-machina text-sm sm:text-base font-bold uppercase tracking-tight text-[#181520]">
                              {service.title}
                            </h3>
                            <span className="font-neue text-[10px] sm:text-[11px] font-semibold text-[#181520]/50 uppercase tracking-wider">
                              {service.tag}
                            </span>
                          </div>
                        </div>
                        <span className="font-machina text-sm sm:text-base font-black text-[#181520]/30">
                          {service.num}
                        </span>
                      </div>

                      {/* Expanded Narrative (When Active) */}
                      {isActive && (
                        <div className="mt-2.5 pt-2.5 border-t border-black/5 animate-fade-in">
                          <p className="font-neue text-xs sm:text-[12.5px] leading-relaxed text-[#181520]/75">
                            {service.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {service.specs.map((spec, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] font-neue font-medium px-2 py-0.5 rounded-full bg-[#181520]/5 text-[#181520]/80 border border-black/5"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Dynamic Realistic Device Stage in Elegant Light Mode */}
              <div className="lg:col-span-6 hidden lg:flex items-center justify-center relative h-full w-full">
                <div className="relative w-full h-full max-h-[450px] rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_16px_50px_rgba(24,21,32,0.06),inset_0_1px_0_rgba(255,255,255,1)] flex items-center justify-center p-3 sm:p-5 overflow-hidden">

                  {/* ─────────────────────────────────────────────────────────
                      01: WEBSITE DEVELOPMENT ➔ Real Luxury Tech Website in Full MacBook Pro
                  ───────────────────────────────────────────────────────── */}
                  {activeServiceIdx === 0 && (
                    <div className="relative w-full max-w-[490px] flex flex-col items-center justify-center animate-fade-in transition-all duration-500 hover:scale-[1.02]">
                      {/* Laptop Screen Bezel (Silver Anodized Aluminum Lid) */}
                      <div className="w-full bg-[#0f172a] rounded-t-2xl p-2 pb-1.5 shadow-[0_25px_60px_rgba(24,21,32,0.2)] border-2 border-slate-300 relative">
                        {/* Camera Notch */}
                        <div className="w-14 h-2 bg-black rounded-b-md mx-auto mb-1 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>

                        {/* Laptop Screen Display (Edge-to-Edge Browser Screen) */}
                        <div className="w-full bg-white text-[#181520] rounded-lg overflow-hidden border border-slate-700la/50 shadow-inner flex flex-col h-[255px] relative">
                          {/* Browser Toolbar */}
                          <div className="bg-[#f1f5f9] px-3 py-1 border-b border-slate-200 flex items-center justify-between shrink-0">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                              <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                              <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="bg-white px-3 py-0.5 rounded-md border border-slate-200 text-[8.5px] font-mono text-slate-700 flex items-center gap-1.5 w-52 justify-center shadow-xs">
                              <span className="text-emerald-600 text-[8px]">🔒</span>
                              <span className="text-slate-900 truncate font-semibold">https://aethera-spatial.io</span>
                            </div>
                            <div className="text-[7.5px] font-bold text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                              LIVE 4K
                            </div>
                          </div>

                          {/* Full Real Website Screenshot */}
                          <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-100">
                            <img
                              src="/services/website-preview.jpg"
                              alt="Real Website Development Preview"
                              className="w-full h-full object-cover object-top"
                            />
                            {/* Live Badge Overlay */}
                            <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-slate-200/80 shadow-md text-[7.5px] font-mono font-bold text-emerald-700 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              99.9% Uptime • Next.js 15
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Laptop Bottom Base / Keyboard Lip (Silver Aluminum) */}
                      <div className="w-[108%] h-3.5 bg-gradient-to-b from-[#cbd5e1] to-[#94a3b8] rounded-b-xl shadow-[0_15px_30px_rgba(24,21,32,0.18)] border-t border-white relative flex items-center justify-center">
                        <div className="w-14 h-1 bg-slate-400 rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      02: MOBILE APP DEVELOPMENT ➔ Real Full Edge-to-Edge iPhone
                  ───────────────────────────────────────────────────────── */}
                  {activeServiceIdx === 1 && (
                    <div className="relative w-full max-w-[340px] flex items-center justify-center animate-fade-in transition-all duration-500 hover:scale-[1.02]">
                      {/* iPhone Body Frame (Silver Titanium) */}
                      <div className="w-[200px] h-[380px] rounded-[42px] bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] p-[7px] shadow-[0_30px_70px_rgba(24,21,32,0.22)] border-2 border-slate-300 relative flex flex-col justify-between">

                        {/* Edge-to-Edge Screen Display */}
                        <div className="w-full h-full bg-white rounded-[35px] overflow-hidden relative shadow-inner border border-slate-200">
                          {/* Dynamic Island */}
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[72px] h-[18px] bg-black rounded-full z-30 flex items-center justify-between px-2 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
                          </div>

                          {/* Real Full Screen App Image */}
                          <img
                            src="/services/mobile-preview.jpg"
                            alt="Real iOS Mobile App Preview"
                            className="w-full h-full object-cover object-top"
                          />

                          {/* Bottom Home Indicator Bar */}
                          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-black/60 rounded-full z-20 backdrop-blur-xs" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      03: UI/UX DESIGN ➔ Real Figma Workspace inside MacBook Pro Laptop
                  ───────────────────────────────────────────────────────── */}
                  {activeServiceIdx === 2 && (
                    <div className="relative w-full max-w-[490px] flex flex-col items-center justify-center animate-fade-in transition-all duration-500 hover:scale-[1.02]">
                      {/* Laptop Screen Bezel (Silver Anodized Aluminum Lid) */}
                      <div className="w-full bg-[#0f172a] rounded-t-2xl p-2 pb-1.5 shadow-[0_25px_60px_rgba(24,21,32,0.2)] border-2 border-slate-300 relative">
                        {/* Camera Notch */}
                        <div className="w-14 h-2 bg-black rounded-b-md mx-auto mb-1 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>

                        {/* Laptop Screen Display (Figma Workspace) */}
                        <div className="w-full bg-[#2c2c2c] text-white rounded-lg overflow-hidden border border-slate-700/50 shadow-inner flex flex-col h-[255px] relative">
                          {/* Figma Window Toolbar */}
                          <div className="bg-[#222222] px-3 py-1 border-b border-[#333333] flex items-center justify-between shrink-0 text-[8px]">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                              </div>
                              <span className="font-machina font-bold text-slate-200 tracking-wide ml-1">
                                FinTrack UI/UX System.fig
                              </span>
                            </div>
                            <div className="flex items-center space-x-1.5 font-mono">
                              <span className="bg-white/10 px-1.5 py-0.5 rounded text-slate-300 font-bold border border-white/10">100%</span>
                              <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded shadow-sm">Share</span>
                            </div>
                          </div>

                          {/* Real Full Figma Screenshot */}
                          <div className="relative flex-1 w-full h-full overflow-hidden bg-[#1e1e1e]">
                            <img
                              src="/services/uiux-preview.jpg"
                              alt="Real Figma UI/UX Design System Preview"
                              className="w-full h-full object-cover object-center"
                            />

                            {/* Live Designer Cursor (Aamir) */}
                            <div className="absolute top-3 right-4 z-20 flex items-center space-x-1 animate-bounce">
                              <div className="w-3 h-3 text-pink-500 font-bold">▲</div>
                              <div className="bg-pink-600 text-white text-[7.5px] font-neue px-1.5 py-0.5 rounded-full font-bold shadow-lg">
                                Aamir (Lead UI/UX)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Laptop Bottom Base / Keyboard Lip (Silver Aluminum) */}
                      <div className="w-[108%] h-3.5 bg-gradient-to-b from-[#cbd5e1] to-[#94a3b8] rounded-b-xl shadow-[0_15px_30px_rgba(24,21,32,0.18)] border-t border-white relative flex items-center justify-center">
                        <div className="w-14 h-1 bg-slate-400 rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      04: GAME DEVELOPMENT ➔ Real EA SPORTS FC Match on Full Handheld Console
                  ───────────────────────────────────────────────────────── */}
                  {activeServiceIdx === 3 && (
                    <div className="relative w-full max-w-[490px] flex items-center justify-center animate-fade-in transition-all duration-500 hover:scale-[1.02]">
                      {/* Horizontal Handheld Console Body (Matte White OLED Console) */}
                      <div className="w-full h-[255px] bg-[#f8fafc] rounded-[36px] p-2.5 shadow-[0_30px_70px_rgba(24,21,32,0.2)] border-2 border-slate-300 flex items-center justify-between relative overflow-hidden">

                        {/* Left Controls (D-Pad & Analog Stick) */}
                        <div className="w-13 flex flex-col items-center justify-center space-y-3 z-10 shrink-0">
                          {/* Analog Thumbstick */}
                          <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                            <div className="w-5 h-5 rounded-full bg-slate-200 border border-slate-400" />
                          </div>
                          {/* D-Pad */}
                          <div className="w-8 h-8 relative flex items-center justify-center">
                            <div className="absolute w-8 h-2.5 bg-slate-400 rounded-sm" />
                            <div className="absolute w-2.5 h-8 bg-slate-400 rounded-sm" />
                          </div>
                        </div>

                        {/* Center EA SPORTS FC Soccer Match Screenshot Screen */}
                        <div className="flex-1 h-full rounded-2xl border-2 border-white overflow-hidden relative mx-2 shadow-inner bg-black">
                          <img
                            src="/services/game-preview.jpg"
                            alt="Real EA SPORTS FC Gameplay Preview"
                            className="w-full h-full object-cover object-center"
                          />

                          {/* Bottom FPS Overlay */}
                          <div className="absolute bottom-1.5 left-2 bg-black/70 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[7px] font-mono font-bold border border-white/20">
                            EA FC 25 • 4K 60FPS
                          </div>
                        </div>

                        {/* Right Controls (ABXY Action Buttons with Soft Pastel Colors) */}
                        <div className="w-13 flex flex-col items-center justify-center space-y-3 z-10 shrink-0">
                          {/* ABXY Diamond Buttons */}
                          <div className="w-8 h-8 relative flex items-center justify-center">
                            <div className="absolute top-0 w-2.5 h-2.5 rounded-full bg-amber-400 flex items-center justify-center text-[6px] font-bold text-black shadow-xs">Y</div>
                            <div className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-[6px] font-bold text-white shadow-xs">A</div>
                            <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-sky-500 flex items-center justify-center text-[6px] font-bold text-white shadow-xs">X</div>
                            <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-rose-500 flex items-center justify-center text-[6px] font-bold text-white shadow-xs">B</div>
                          </div>
                          {/* Right Analog Stick */}
                          <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                            <div className="w-5 h-5 rounded-full bg-slate-200 border border-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Bottom Action / CTA Banner */}
            <div className="pt-2.5 pb-1 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
              <div>
                <h4 className="font-machina text-sm sm:text-base font-black uppercase tracking-tight text-[#181520]">
                  Ready to accelerate your product roadmap?
                </h4>
                <p className="font-neue text-xs text-[#181520]/60 font-normal">
                  Bespoke digital engineering and creative services tailored for high-growth enterprises.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 hover:bg-white text-[#181520] font-machina text-xs font-bold uppercase tracking-wider border border-black/10 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_1px_3px_rgba(251,191,36,0.3)]" />
                  <span>Verified Reviews ↓</span>
                </button>
                <button
                  onClick={() => openChat('Get A Quote')}
                  className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#181520] text-white font-machina text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(24,21,32,0.28),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_16px_45px_rgba(24,21,32,0.4),0_0_30px_rgba(201,210,231,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] border border-white/15 hover:border-white/35 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] cursor-pointer outline-none shrink-0 overflow-hidden"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                      backgroundImage: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.18) 55%, transparent 80%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2.2s ease-in-out infinite',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Get A Quote</span>
                    <Sparkles className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                  <div className="relative z-10 w-6 h-6 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#181520] flex items-center justify-center transition-all duration-300 -mr-1">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            Stage 6: Verified Client Dossiers & Testimonials (Pinned Stage)
        ══════════════════════════════════════════════════════════════ */}
        <div
          ref={testimonialsSectionRef}
          id="testimonials"
          className="absolute inset-0 w-full h-full px-4 sm:px-8 md:px-14 flex flex-col justify-between pt-20 sm:pt-22 md:pt-24 pb-4 sm:pb-6 z-20 pointer-events-none will-change-transform origin-center opacity-0 select-none overflow-hidden"
        >
          <LuxuryTestimonials />
        </div>
      </div>

      {/* ================= GLOBAL LUXURY FOOTER ================= */}
      <GlobalFooter className="bg-[#c9d2e7] border-t border-black/15" />

      {/* CSS Keyframes for Ribbon Motion */}
      <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </main>
  );
}
