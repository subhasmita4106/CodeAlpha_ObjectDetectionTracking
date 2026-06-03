/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ZoomIn, 
  Expand, 
  Camera, 
  Volume2, 
  Video, 
  Info, 
  Flame, 
  Pause, 
  Play, 
  Eye, 
  EyeOff,
  Minimize2,
  FileText
} from 'lucide-react';
import { Detection } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MonitorViewProps {
  zoom: number;
  setZoom: (v: number) => void;
  isFeedPaused: boolean;
  setIsFeedPaused: (paused: boolean) => void;
  recentDetections: Detection[];
  activeStreamName: string;
  customFeedUrl: string;
}

export default function MonitorView({
  zoom,
  setZoom,
  isFeedPaused,
  setIsFeedPaused,
  recentDetections,
  activeStreamName,
  customFeedUrl
}: MonitorViewProps) {
  const [jitterOffset, setJitterOffset] = useState({ x: 0, y: 0 });
  const [showBoxes, setShowBoxes] = useState(true);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);

  // Simulated coordinate tracker jitter for maximum immersion
  useEffect(() => {
    if (isFeedPaused) return;
    const interval = setInterval(() => {
      setJitterOffset({
        x: (Math.random() * 2 - 1) * 2,
        y: (Math.random() * 2 - 1) * 2
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isFeedPaused]);

  // Handle tactical screenshot action
  const handleScreenshot = () => {
    // Street Cam Image URL
    const imgUrl = customFeedUrl;
    setScreenshot(imgUrl);
    setTimeout(() => {
      setScreenshot(null);
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 gap-6 relative select-none">
      
      {/* Absolute Layer: Flash notification on capture */}
      <AnimatePresence>
        {screenshot && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white pointer-events-none z-50 flex items-center justify-center"
          >
            <div className="bg-black/80 px-6 py-4 rounded border border-primary text-primary font-mono text-sm uppercase tracking-widest font-bold">
              📷 Frame Telemetry Captured
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Surveillance Video Canvas component */}
      <div className="relative flex-1 min-h-[350px] md:min-h-[450px] rounded-xl border border-primary/20 bg-[#070707] overflow-hidden group">
        
        {/* Street surveillance CCTV placeholder with Zoom Scaling styling */}
        <div className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
             style={{ transform: `scale(${zoom})` }}>
          <img 
            src={customFeedUrl}
            alt="Live Feed"
            className="w-full h-full object-cover opacity-60 grayscale-[0.25]"
          />
        </div>

        {/* Tactical Scanline filter effect */}
        <div className="scanline-effect"></div>

        {/* Active Bounding Overlay tracker boxes */}
        {showBoxes && !isFeedPaused && (
          <div className="absolute inset-0 pointer-events-none">
            {recentDetections.map((d) => {
              if (!d.boundingBox) return null;
              
              // Jitter delta values
              const dx = jitterOffset.x;
              const dy = jitterOffset.y;
              
              const isAlert = d.status === 'ALERT';
              const borderStyle = isAlert 
                ? 'border-secondary-container text-secondary' 
                : 'border-primary text-primary';
              const glowStyle = isAlert 
                ? 'bounding-box-glow-amber' 
                : 'bounding-box-glow-cyan';

              return (
                <div 
                  key={d.id}
                  className={`absolute border-2 transition-transform duration-100 ${borderStyle} ${glowStyle}`}
                  style={{
                    top: `${d.boundingBox.top}%`,
                    left: `${d.boundingBox.left}%`,
                    width: `${d.boundingBox.width}%`,
                    height: `${d.boundingBox.height}%`,
                    transform: `translate(${dx}px, ${dy}px)`
                  }}
                >
                  {/* Tag label */}
                  <div className={`absolute -top-6 left-0 px-2 py-0.5 font-mono text-[9px] font-bold flex items-center gap-1 ${
                    isAlert ? 'bg-secondary-container text-[#1e1400]' : 'bg-primary text-on-primary'
                  }`}>
                    <span>ID: {d.id}</span>
                    <span className="opacity-50">|</span>
                    <span className="uppercase">{d.type}</span>
                  </div>

                  {/* Confidence percent rate block */}
                  <div className="absolute -bottom-6 right-0 text-[10px] font-mono font-bold glass-hud px-1 px-1.5 py-0.5 text-primary rounded-sm border border-primary/20">
                    {(d.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* UI Overlay Indicator for Paused State */}
        {isFeedPaused && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
            <span className="w-12 h-12 rounded-full border border-orange-400 flex items-center justify-center animate-pulse text-orange-400 mb-3 bg-orange-400/10">
              <Pause className="w-6 h-6" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-bold">FEED FEED SUSPENDED</span>
            <span className="text-[10px] text-on-surface-variant font-medium mt-1">Ready to resume operational loop</span>
          </div>
        )}

        {/* Upper Right HUD Control Box */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <div className="glass-hud px-3 py-2 rounded-lg flex items-center gap-3">
            <Video className="w-4 h-4 text-primary animate-pulse" />
            <div>
              <p className="font-mono text-[9px] text-on-surface-variant leading-none font-bold">STREAM_01</p>
              <p className="text-xs font-semibold uppercase text-on-surface select-text">{activeStreamName}</p>
            </div>
          </div>
          
          <div className="glass-hud px-3 py-2 rounded-lg w-[140px]">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="font-mono text-[9px] text-on-surface-variant font-bold">ZOOM LEVEL</span>
              <span className="font-mono text-xs text-primary font-bold">{zoom.toFixed(1)}x</span>
            </div>
            
            <input 
              id="hud-zoom-slider"
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Lower Left Workspace Control Buttons */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-20">
          <button 
            id="zoom-reset-btn"
            onClick={() => setZoom(zoom >= 2 ? 1 : zoom + 0.2)}
            className="glass-hud p-2.5 rounded-full text-on-surface hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
            title="Manual Incremental Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button 
            id="toggle-boxes-btn"
            onClick={() => setShowBoxes(!showBoxes)}
            className={`glass-hud p-2.5 rounded-full transition-colors cursor-pointer ${showBoxes ? 'text-primary' : 'text-on-surface-variant'}`}
            title="Toggle Tracker Overlay"
          >
            {showBoxes ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button 
            id="snapshot-capture-btn"
            onClick={handleScreenshot}
            className="glass-hud p-2.5 rounded-full text-on-surface hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
            title="Snapshot Telemetry Captured"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrolling list for Recently Detected Items */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end px-1 select-none">
          <h2 className="font-mono text-[10px] text-on-surface font-black tracking-wider uppercase">RECENTLY DETECTED</h2>
          <span className="text-[10px] font-mono text-primary/80 uppercase font-black">
            COUNT: {recentDetections.length}
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 select-none no-scrollbar">
          {recentDetections.map((d) => (
            <div 
              key={d.id}
              className="flex-shrink-0 w-44 bg-surface-container-low border border-outline-variant p-2 rounded-lg group hover:border-primary/40 transition-colors"
            >
              <div className="relative h-24 bg-black rounded overflow-hidden mb-2">
                <img 
                  src={d.imageUrl} 
                  alt={d.type}
                  className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                />
                
                <div className={`absolute top-1.5 right-1.5 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-mono font-black ${
                  d.status === 'LOST' 
                    ? 'bg-amber-400/20 text-secondary' 
                    : 'bg-primary/20 text-primary'
                }`}>
                  {(d.confidence * 100).toFixed(0)}%
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase">{d.type}</p>
                  <p className="font-mono text-[11px] font-bold">ID: {d.id}</p>
                </div>
                
                <button
                  onClick={() => setSelectedDetection(d)}
                  className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                  title="View details"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button layout for Feed Management */}
      <div className="mt-auto py-2 flex justify-center select-none">
        <button 
          id="pause-feed-cta-btn"
          onClick={() => setIsFeedPaused(!isFeedPaused)}
          className={`px-12 py-3.5 rounded-full flex items-center gap-3 transition-all transform active:scale-95 font-mono text-xs tracking-widest font-black ${
            isFeedPaused 
              ? 'bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
              : 'bg-primary text-[#001f24] hover:brightness-105 shadow-[0_0_20px_rgba(0,229,255,0.3)]'
          }`}
        >
          {isFeedPaused ? (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>RESUME MONITORING</span>
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>PAUSE ACTIVE FEED</span>
            </>
          )}
        </button>
      </div>

      {/* Info Detail Modal overlay for specific element analysis */}
      <AnimatePresence>
        {selectedDetection && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container-low max-w-sm w-full rounded-xl border border-outline-variant overflow-hidden"
            >
              {/* Media preview */}
              <div className="relative h-48 bg-black">
                <img 
                  src={selectedDetection.imageUrl} 
                  alt="Tracked Entity"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 left-4 p-1.5 bg-black/75 rounded border border-primary text-primary font-mono text-[9px] font-bold">
                  FRAME SNAPSHOT ID: {selectedDetection.id}
                </div>
              </div>

              {/* Detail list */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase">Class Type</h3>
                  <p className="text-sm font-bold text-on-surface">{selectedDetection.type}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase">Confidence Scale</h3>
                    <p className="text-xs font-mono text-primary font-bold">{(selectedDetection.confidence * 100).toFixed(2)}%</p>
                  </div>
                  <div>
                    <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase font-bold">Model Status</h3>
                    <p className="text-xs font-mono text-on-surface font-semibold">{selectedDetection.status}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase">Captured At</h3>
                  <p className="text-xs font-mono text-on-surface-variant">{selectedDetection.timestamp}</p>
                </div>

                <button
                  onClick={() => setSelectedDetection(null)}
                  className="w-full py-2.5 bg-surface-container-high border border-outline-variant hover:text-primary hover:border-primary/50 text-xs font-mono font-bold tracking-wider transition-colors uppercase rounded"
                >
                  DISMISS METRICS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
