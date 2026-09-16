'use client';

import React, { useState, useEffect } from 'react';

interface ProjectMediaScreenProps {
  id: string;
  title: string;
  image: string;
  videoUrl?: string;
  isFeatured?: boolean;
}

export default function ProjectMediaScreen({
  id,
  title,
  image,
  videoUrl,
  isFeatured = false,
}: ProjectMediaScreenProps) {
  const [balance, setBalance] = useState(148920.45);
  const [reqSec, setReqSec] = useState(48210);
  const [tickerOffset, setTickerOffset] = useState(0);

  // Subtle real-time data tick
  useEffect(() => {
    const timer = setInterval(() => {
      setBalance((b) => b + (Math.random() * 8 - 3.8));
      setReqSec((r) => Math.floor(48000 + Math.random() * 600));
      setTickerOffset((o) => (o + 1) % 100);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // If a video URL is provided, render native video element with fallback
  if (videoUrl) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-[#0e0d14]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>
    );
  }

  // 1. FINTECH: FinEdge iOS Mobile Banking App Screen
  if (id === 'fintech') {
    return (
      <div className="relative w-full h-full bg-[#0b0c10] text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Realistic Mobile Device Mockup */}
        <div className="relative w-full max-w-[340px] aspect-[9/16] max-h-[92%] rounded-[36px] bg-[#12141c] border-2 border-white/20 shadow-2xl p-4 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
          
          {/* Dynamic Island Notch */}
          <div className="w-24 h-4.5 bg-black rounded-full mx-auto flex items-center justify-between px-2.5 mb-2 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between px-1">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">Apex Core Vault</div>
              <div className="text-xs font-machina font-semibold text-white">FinEdge Global</div>
            </div>
            <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE 60FPS</span>
            </div>
          </div>

          {/* Live Balance & Chart */}
          <div className="my-auto space-y-2">
            <div className="text-[10px] font-mono text-white/60">Total Liquid Assets</div>
            <div className="font-machina text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-baseline space-x-2">
              <span>${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="text-[11px] font-mono text-emerald-400 font-normal">+4.8%</span>
            </div>

            {/* Glowing SVG Chart */}
            <div className="relative h-16 w-full pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 240 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="fintechGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,50 Q40,42 80,30 T160,22 T240,8 L240,60 L0,60 Z"
                  fill="url(#fintechGrad)"
                />
                <path
                  d="M0,50 Q40,42 80,30 T160,22 T240,8"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="240" cy="8" r="4" fill="#38bdf8" className="animate-pulse" />
              </svg>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="grid grid-cols-4 gap-1.5 py-1">
            {['Send', 'Receive', 'Vault', 'Analytics'].map((action, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl py-1.5 text-center text-[9px] font-mono text-white/70 hover:bg-white/15 transition-colors cursor-pointer">
                {action}
              </div>
            ))}
          </div>

          {/* Live Streaming Transactions */}
          <div className="space-y-1.5 pt-1 border-t border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono bg-white/[0.04] p-1.5 rounded-lg border border-white/5">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white/80">Stripe Ingestion</span>
              </div>
              <span className="text-emerald-400 font-semibold">+$4,250.00</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono bg-white/[0.04] p-1.5 rounded-lg border border-white/5">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-white/80">AWS Cloud Edge</span>
              </div>
              <span className="text-white/60">-$340.20</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. CLOUD SAAS: Nexus Cloud Telemetry Dashboard (Web Browser Window)
  if (id === 'cloud-saas') {
    return (
      <div className="relative w-full h-full bg-[#0a0c14] text-white flex flex-col p-4 sm:p-6 overflow-hidden select-none">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* macOS Browser Chrome Window */}
        <div className="relative w-full h-full rounded-2xl bg-[#111420]/90 border border-white/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-md">
          
          {/* Window Header Bar */}
          <div className="h-9 bg-black/40 border-b border-white/10 flex items-center justify-between px-3.5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-md px-3 py-0.5 text-[10px] font-mono text-white/50 tracking-wider">
              nexus.cloud/telemetry/live
            </div>
            <div className="flex items-center space-x-1.5 text-[9px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>99.999% SLA</span>
            </div>
          </div>

          {/* Live Telemetry Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between space-y-4">
            
            {/* Top Metric Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-2.5">
                <div className="text-[10px] font-mono text-white/50 uppercase">Ingestion Rate</div>
                <div className="font-machina text-lg sm:text-xl font-bold text-white mt-0.5">
                  {reqSec.toLocaleString()} <span className="text-xs font-mono font-normal text-cyan-400">req/s</span>
                </div>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-2.5">
                <div className="text-[10px] font-mono text-white/50 uppercase">Global Latency</div>
                <div className="font-machina text-lg sm:text-xl font-bold text-emerald-400 mt-0.5">
                  7.2 <span className="text-xs font-mono font-normal text-white/60">ms</span>
                </div>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-2.5">
                <div className="text-[10px] font-mono text-white/50 uppercase">Active Nodes</div>
                <div className="font-machina text-lg sm:text-xl font-bold text-white mt-0.5">
                  128 <span className="text-xs font-mono font-normal text-purple-400">Clusters</span>
                </div>
              </div>
            </div>

            {/* Live Animated Equalizer & Waveform Grid */}
            <div className="flex-1 bg-black/30 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/60 mb-2">
                <span>REAL-TIME STREAM PROTOCOL</span>
                <span className="text-cyan-400">WEBSOCKET CONNECTED</span>
              </div>

              {/* Bouncing Equalizer Bars */}
              <div className="h-24 flex items-end justify-between gap-1 px-1">
                {[45, 80, 60, 95, 30, 85, 70, 100, 55, 90, 65, 40, 75, 95, 50, 85, 60, 90].map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      animation: `bar-dance ${1.2 + (idx % 4) * 0.3}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>

              {/* Cluster Status Ticker */}
              <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-2 border-t border-white/5">
                <span>US-EAST-1: OK</span>
                <span>EU-WEST-2: OK</span>
                <span>AP-SOUTH-1: OK</span>
                <span>LATAM-1: OK</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // 3. ECOSYSTEM: Aura AI Spatial Design System Canvas
  if (id === 'ecosystem') {
    return (
      <div className="relative w-full h-full bg-[#0d0f17] text-white p-6 flex flex-col justify-between overflow-hidden select-none">
        {/* Subtle Canvas Dot Grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Top Figma/Canvas Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">Spatial Framework v3</span>
          </div>
          <div className="text-[10px] font-mono text-white/40 uppercase">Auto-Layout Engine</div>
        </div>

        {/* Floating Design Component Tiles */}
        <div className="relative z-10 grid grid-cols-2 gap-3 my-auto">
          
          {/* Component 1: Glass Action Button */}
          <div className="bg-white/[0.05] border border-white/15 rounded-xl p-3.5 backdrop-blur-md shadow-lg space-y-2 group-hover:translate-x-1 transition-transform">
            <div className="text-[9px] font-mono text-white/50 uppercase">Button.Primary.Interactive</div>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg py-2 px-3 text-center text-xs font-machina font-semibold text-white shadow-md">
              Deploy Model ↗
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-white/40">
              <span>Token: --accent-spatial</span>
              <span className="text-emerald-400">Active</span>
            </div>
          </div>

          {/* Component 2: Token Palette */}
          <div className="bg-white/[0.05] border border-white/15 rounded-xl p-3.5 backdrop-blur-md shadow-lg space-y-2 group-hover:-translate-x-1 transition-transform">
            <div className="text-[9px] font-mono text-white/50 uppercase">Token Palette Swatches</div>
            <div className="flex items-center space-x-1.5">
              <span className="w-6 h-6 rounded-md bg-[#6366f1] shadow-xs" />
              <span className="w-6 h-6 rounded-md bg-[#06b6d4] shadow-xs" />
              <span className="w-6 h-6 rounded-md bg-[#a855f7] shadow-xs" />
              <span className="w-6 h-6 rounded-md bg-[#ec4899] shadow-xs" />
            </div>
            <div className="text-[8px] font-mono text-white/40">Synced across 4 targets</div>
          </div>

        </div>

        {/* Bottom Typography Scale */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-white/60">
          <span>--font-machina: 48px</span>
          <span className="text-purple-400">Micro-Interactions Enabled</span>
        </div>
      </div>
    );
  }

  // 4. LOGISTICS: HyperShip Dispatch Suite (Driver Navigation Mobile App)
  if (id === 'logistics') {
    return (
      <div className="relative w-full h-full bg-[#080c10] text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
        {/* Device Frame */}
        <div className="relative w-full max-w-[340px] aspect-[9/16] max-h-[92%] rounded-[36px] bg-[#101520] border-2 border-white/20 shadow-2xl p-4 flex flex-col justify-between overflow-hidden">
          
          {/* Laser Scanner Beam */}
          <div className="absolute inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-laser pointer-events-none z-30" />

          {/* Header */}
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/60">HYPERSHIP DISPATCH</span>
            <span className="text-emerald-400 font-semibold">ONLINE (0 DRAIN)</span>
          </div>

          {/* Dark Vector Map Simulator */}
          <div className="relative flex-1 my-3 bg-[#0a0f16] border border-white/10 rounded-2xl overflow-hidden p-3 flex flex-col justify-between">
            {/* Map Grid Lines */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {/* Animated Route Line */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <path
                d="M 40 180 Q 90 120 140 130 T 220 50"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <circle cx="220" cy="50" r="5" fill="#38bdf8" />
              <circle cx="40" cy="180" r="6" fill="#10b981" />
            </svg>

            {/* Waypoint Card */}
            <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-[10px] font-mono">
              <div className="text-cyan-400 font-semibold">NEXT WAYPOINT</div>
              <div className="text-white text-xs mt-0.5">Distribution Hub Sector 4</div>
            </div>

            {/* ETA & Battery Status */}
            <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-[10px] font-mono">
              <span>ETA: 11 MIN</span>
              <span className="text-emerald-400">BATTERY: 99%</span>
            </div>
          </div>

          {/* Barcode Scanner Trigger */}
          <div className="bg-white/10 border border-white/15 rounded-xl py-2 text-center text-xs font-machina font-semibold uppercase text-white">
            Scan Package QR ⎸
          </div>

        </div>
      </div>
    );
  }

  // 5. VENTURE: VenturePulse Portal (Private Equity & Cap-Table Web App)
  if (id === 'venture') {
    return (
      <div className="relative w-full h-full bg-[#0d0e15] text-white p-4 sm:p-6 flex flex-col justify-between overflow-hidden select-none">
        {/* macOS Chrome Header */}
        <div className="h-9 bg-black/40 border border-white/10 rounded-t-xl flex items-center justify-between px-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[10px] font-mono text-white/50">venturepulse.io/portfolio</span>
          <span className="text-[9px] font-mono text-cyan-400">$2.4B MANAGED</span>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 bg-[#121420] border-x border-b border-white/10 rounded-b-xl p-4 flex flex-col justify-between space-y-3">
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-white/50 uppercase">Consolidated Valuation</div>
              <div className="font-machina text-2xl font-bold text-white mt-0.5">$1,248,500,000</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-white/50 uppercase">Internal Rate Return</div>
              <div className="font-machina text-xl font-bold text-emerald-400">+34.8% Net</div>
            </div>
          </div>

          {/* Waterfall Cap-Table Bars */}
          <div className="space-y-2 bg-black/30 p-3 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>Series B Preferred</span>
              <span className="text-white">48.2% ($601M)</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full w-[48%]" />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-white/60 pt-1">
              <span>Series A Institutional</span>
              <span className="text-white">32.4% ($404M)</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-400 h-full w-[32%]" />
            </div>
          </div>

          {/* Live Portfolio Ticker */}
          <div className="overflow-hidden whitespace-nowrap text-[10px] font-mono text-white/50 pt-1 border-t border-white/5">
            <div className="flex space-x-6 animate-ticker">
              <span>STRIPE: +12.4%</span>
              <span>DATABRICKS: +22.1%</span>
              <span>SPACEX: +45.0%</span>
              <span>CANVA: +18.2%</span>
              <span>STRIPE: +12.4%</span>
              <span>DATABRICKS: +22.1%</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 6. CRYPTO: Zenith Trading Terminal (Web3 Terminal UI)
  return (
    <div className="relative w-full h-full bg-[#08080c] text-white p-4 sm:p-6 flex flex-col justify-between overflow-hidden select-none">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-machina text-xs font-bold text-white">BTC / USD PERP</span>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 font-semibold">$64,285.50 +4.12%</div>
      </div>

      {/* Live Candlestick & Order Book Simulation */}
      <div className="grid grid-cols-12 gap-3 flex-1 my-2.5">
        
        {/* Candlestick Chart Area */}
        <div className="col-span-7 bg-[#0e0e14] border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
          <div className="text-[9px] font-mono text-white/40">1M CANDLESTICK • VOLUME: 2.4k BTC</div>
          
          <div className="h-20 flex items-end justify-between px-2">
            {[40, 65, 50, 80, 70, 95, 85, 110, 90, 120].map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-0.5 h-3 ${i % 2 === 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
                <div 
                  className={`w-2 rounded-xs ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ height: `${h * 0.45}px` }}
                />
              </div>
            ))}
          </div>

          <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-between border-t border-white/5 pt-1">
            <span>INDEX: $64,285.00</span>
            <span>24H VOL: $1.4B</span>
          </div>
        </div>

        {/* Live Order Book Stream */}
        <div className="col-span-5 bg-[#0e0e14] border border-white/10 rounded-xl p-2.5 flex flex-col justify-between text-[9px] font-mono">
          <div className="text-white/40 border-b border-white/5 pb-1">ORDER BOOK</div>
          <div className="space-y-1 py-1">
            <div className="flex justify-between text-red-400"><span>64,292.0</span><span>1.42</span></div>
            <div className="flex justify-between text-red-400"><span>64,290.5</span><span>0.85</span></div>
            <div className="flex justify-between text-red-400"><span>64,288.0</span><span>2.10</span></div>
            <div className="h-px bg-white/10 my-1" />
            <div className="flex justify-between text-emerald-400"><span>64,285.5</span><span>3.45</span></div>
            <div className="flex justify-between text-emerald-400"><span>64,284.0</span><span>1.18</span></div>
            <div className="flex justify-between text-emerald-400"><span>64,282.5</span><span>4.90</span></div>
          </div>
        </div>

      </div>

      {/* Terminal Action Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/10 pt-2 text-white/60">
        <span>Instant Liquidity Pipeline</span>
        <span className="text-emerald-400 font-semibold">Sub-Millisecond Engine</span>
      </div>
    </div>
  );
}
