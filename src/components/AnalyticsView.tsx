/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Download, 
  Activity, 
  Cpu, 
  Compass, 
  CheckCircle, 
  Film, 
  Info, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  CpuIcon,
  Layers
} from 'lucide-react';
import { HIGH_CONFIDENCE_CLIPS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function AnalyticsView() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [gpuTemp, setGpuTemp] = useState(64);
  const [memoryUsage, setMemoryUsage] = useState(4.2);
  const [activeClipId, setActiveClipId] = useState<string | null>(null);

  // Fluctuating hardware diagnostic metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuTemp(prev => Math.max(60, Math.min(85, prev + Math.floor(Math.random() * 5 - 2))));
      setMemoryUsage(prev => {
        const val = prev + (Math.random() * 0.2 - 0.1);
        return parseFloat(Math.max(3.8, Math.min(5.2, val)).toFixed(1));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // SVG Line Chart coordinates data series
  const linePoints = [
    { label: '00:00', x: 20, y: 80, count: 210 },
    { label: '04:00', x: 180, y: 70, count: 480 },
    { label: '08:00', x: 340, y: 35, count: 1250 },
    { label: '12:00', x: 500, y: 65, count: 540 },
    { label: '16:00', x: 660, y: 20, count: 1780 },
    { label: '20:00', x: 820, y: 60, count: 910 },
    { label: '24:00', x: 980, y: 40, count: 1102 }
  ];

  // SVG Path Generator helper
  const svgPathD = linePoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  // Gradient helper path
  const svgGradientD = `${svgPathD} L 980 100 L 20 100 Z`;

  const handleDownloadReport = () => {
    alert("Report Telemetry sheet generated automatically as visual PDF.");
  };

  return (
    <div className="flex-grow p-4 md:p-6 space-y-6 relative overflow-y-auto select-none">
      
      {/* Date Header Filter controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">Operational Analytics</h2>
          <p className="text-xs font-mono text-on-surface-variant mt-1">
            Telemetry feed for node: <span className="text-primary font-bold">VIGIL-04-NORTH</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button className="bg-surface-container-high border border-outline-variant px-4 py-2 font-mono text-[9px] font-bold tracking-wider flex items-center gap-2 hover:bg-surface-variant transition-colors hover:text-primary rounded">
            <Calendar className="w-3.5 h-3.5" />
            <span>LAST 24H</span>
          </button>
          
          <button 
            onClick={handleDownloadReport}
            className="bg-primary hover:brightness-105 text-[#001f24] px-4 py-2 font-mono text-[10px] tracking-widest font-black flex items-center gap-2 rounded cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD REPORTS</span>
          </button>
        </div>
      </div>

      {/* Charts Double Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detection Frequency Curve */}
        <div className="lg:col-span-2 bg-[#171717]/60 border border-outline-variant/60 p-5 rounded-xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Detection Frequency</h3>
              <p className="text-primary font-mono text-base font-bold">2,482 TOTAL EVENTS</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
          </div>

          {/* Precision SVG Line Graph Layout Container  */}
          <div className="h-60 relative rounded border border-outline-variant/20 bg-[#070707] flex items-end">
            <svg 
              className="w-full h-full absolute inset-0 pt-6 pb-2" 
              viewBox="0 0 1000 100" 
              preserveAspectRatio="none"
            >
              {/* Radial plotting guide grid */}
              <defs>
                <linearGradient id="curveGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#00daf3" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00daf3" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path d={svgGradientD} fill="url(#curveGradient)" />
              <path d={svgPathD} fill="none" stroke="#00daf3" strokeWidth="2.5" className="opacity-90" />

              {/* Point plots */}
              {linePoints.map((p, i) => (
                <g key={i} className="cursor-pointer">
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r={hoverIndex === i ? 6 : 4} 
                    fill={hoverIndex === i ? '#ffffff' : '#00daf3'}
                    className="transition-all duration-150"
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  />
                </g>
              ))}
            </svg>

            {/* Simulated Tooltip display */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <AnimatePresence>
                {hoverIndex !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="glass-hud px-2.5 py-1 text-[10px] font-mono text-primary font-bold rounded flex items-center gap-2 "
                  >
                    <span>TIME: {linePoints[hoverIndex].label}</span>
                    <span className="opacity-50">|</span>
                    <span>EVENTS: {linePoints[hoverIndex].count}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* X Axis Timestamps list */}
            <div className="flex justify-between w-full px-4 pb-2 z-10 text-[9px] font-mono font-bold text-on-surface-variant opacity-60">
              {linePoints.map((p, i) => (
                <span key={i}>{p.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Distributions Progress list */}
        <div className="bg-[#171717]/60 border border-outline-variant/60 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">Object Classes</h3>
            <p className="text-primary font-mono text-base font-bold mb-6">LAST HOUR</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1 leading-none">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span>PERSON</span>
                <span className="text-primary">128</span>
              </div>
              <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary/80 glow-cyan" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="space-y-1 leading-none">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span>VEHICLE</span>
                <span className="text-primary font-bold">64</span>
              </div>
              <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary/50" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="space-y-1 leading-none">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span>PACKAGE</span>
                <span className="text-primary font-bold">12</span>
              </div>
              <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary/30" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div className="space-y-1 leading-none">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span>ANIMAL</span>
                <span className="text-primary font-bold">4</span>
              </div>
              <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary/20" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats diagnostics panel: System diagnostics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* GPU Temperature panel */}
        <div className="bg-surface-container-low border border-outline-variant p-5 rounded-xl flex items-center justify-between">
          <div>
            <h4 className="font-mono text-[9px] text-on-surface-variant font-bold uppercase mb-2">GPU TEMPERATURE</h4>
            <p className="font-mono text-xl font-medium text-primary leading-none">{gpuTemp}°C</p>
          </div>
          
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#222" strokeWidth="3" />
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="none" 
                stroke="#00daf3" 
                strokeDasharray="126" 
                strokeDashoffset={126 - (126 * (gpuTemp / 100))} 
                strokeWidth="3.5" 
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <Cpu className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Memory allocation dial panel */}
        <div className="bg-surface-container-low border border-outline-variant p-5 rounded-xl flex items-center justify-between">
          <div>
            <h4 className="font-mono text-[9px] text-on-surface-variant font-bold uppercase mb-2">MEMORY BANDWIDTH</h4>
            <p className="font-mono text-xl font-medium text-primary leading-none">{memoryUsage} <span className="text-xs text-on-surface-variant/70">GB</span></p>
          </div>

          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#222" strokeWidth="3" />
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="none" 
                stroke="#00daf3" 
                strokeDasharray="126" 
                strokeDashoffset={126 - (126 * (memoryUsage / 8))} 
                strokeWidth="3.5" 
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <Layers className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Model version release validation panel */}
        <div className="bg-surface-container-low border border-outline-variant p-5 rounded-xl flex items-center justify-between">
          <div>
            <h4 className="font-mono text-[9px] text-on-surface-variant font-bold tracking-wider uppercase mb-1">MODEL RELEASE</h4>
            <p className="font-mono text-xl font-black text-on-surface tracking-wide">YOLO v8</p>
          </div>
          
          <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-primary animate-pulse" />
            <span className="font-mono text-[9px] text-primary font-black uppercase">STABLE</span>
          </div>
        </div>
      </div>

      {/* Mini Clips Gallery Section */}
      <div className="space-y-4">
        <h3 className="font-mono text-[9px] text-on-surface-variant font-black tracking-widest uppercase">Recent High-Confidence Clips</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGH_CONFIDENCE_CLIPS.map((clip) => (
            <div 
              key={clip.id}
              onClick={() => setActiveClipId(clip.id)}
              className="aspect-video bg-surface-container-highest border border-outline-variant rounded overflow-hidden relative group cursor-pointer"
            >
              <img 
                src={clip.imageUrl} 
                alt={clip.id}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-300"
              />
              
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 transition-colors rounded"></div>
              
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary/80 text-[#001f24] font-mono text-[9px] font-black tracking-wider uppercase rounded-sm">
                {clip.id}
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="font-mono text-[9px] font-bold tracking-widest text-primary flex items-center gap-1.5 uppercase">
                  <span>LOAD FEED</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Loop Modal */}
      <AnimatePresence>
        {activeClipId && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container-low max-w-lg w-full rounded-xl border border-outline-variant overflow-hidden p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider">TACTICAL ENHANCEMENT FEED</span>
                <span className="text-xs text-on-surface font-semibold">{activeClipId}</span>
              </div>

              {/* Enhanced image zooming to mock a playing video */}
              <div className="aspect-video bg-black rounded border border-outline-variant overflow-hidden relative flex items-center justify-center">
                <img 
                  src={HIGH_CONFIDENCE_CLIPS.find(c => c.id === activeClipId)?.imageUrl} 
                  alt={activeClipId}
                  className="w-full h-full object-cover animate-pulse"
                />
                
                {/* Visual telemetry overlays */}
                <div className="absolute top-4 left-4 z-10 glass-hud px-2.5 py-1 text-[9px] font-mono text-primary font-bold uppercase rounded">
                  <span>CAM PORT: HD_SURV_04_NORTH</span>
                </div>
                
                <div className="absolute bottom-4 right-4 z-10 glass-hud px-2.5 py-1 text-[9px] font-mono text-primary font-bold uppercase rounded">
                  <span>COMPRESSION: H.265 PRO</span>
                </div>

                {/* Scanline filter inside player */}
                <div className="scanline-effect"></div>
              </div>

              <p className="text-[11px] text-on-surface-variant font-mono leading-relaxed mt-4">
                Archival loop frame contains highly stabilized focal telemetry extracted by the core YOLOv8 neural network. Tracking lines represent vector movement estimates.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setActiveClipId(null)}
                  className="flex-1 py-2.5 bg-primary text-[#001f24] hover:brightness-105 text-xs font-mono font-black uppercase tracking-wider transition-all rounded cursor-pointer"
                >
                  DISMISS STREAM
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
