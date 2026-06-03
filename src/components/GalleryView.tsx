/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  RefreshCw, 
  Activity, 
  Cpu, 
  Layers, 
  Eye, 
  Radio 
} from 'lucide-react';
import { Detection } from '../types';
import { ARCHIVE_DETECTIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function GalleryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [detections, setDetections] = useState<Detection[]>(ARCHIVE_DETECTIONS);
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // High fidelity incrementing runtime clock loop
  const [sessionTime, setSessionTime] = useState('04:22:15');
  useEffect(() => {
    let secs = 15;
    let mins = 22;
    let hrs = 4;
    const interval = setInterval(() => {
      secs++;
      if (secs >= 60) {
        secs = 0;
        mins++;
        if (mins >= 60) {
          mins = 0;
          hrs++;
        }
      }
      const pad = (v: number) => v.toString().padStart(2, '0');
      setSessionTime(`${pad(hrs)}:${pad(mins)}:${pad(secs)}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter archived collections
  const filteredDetections = detections.filter(d => 
    d.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.id.includes(searchQuery)
  );

  // Sync databases workflow simulation
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      // Introduce mock detection with slight telemetry timestamp adjustments
      if (detections.length === ARCHIVE_DETECTIONS.length) {
        const customAudit: Detection = {
          id: '5024',
          type: 'Drone',
          confidence: 0.97,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdunuTZ_5XY5FsuuWW1pKdvFNblNCAi9-MFOu1F2d9AkbzoltSbTsY6DNpnyp8AxxQ-t-xUNM7N5Z64XvnOC9v0nMGLI5I-JisXsIU4K7wB5yGOATrw0O94UQvWGoITWlmafo11rFYj8LTu49Eo6dqQUT7EDjy2LPQ3MoQ1_0TyojrVGpyAa5jIYcuxZt0JAYY6DM7Ibkqn8e-LrE2svFvS8Xd5kq8RWCVXouFYGkgwg-mIqaDstGcMO4cavKSFsNxLm0FNn4Z40F9',
          status: 'ALERT'
        };
        setDetections([customAudit, ...detections]);
      }
    }, 1000);
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 relative select-none">
      
      {/* Absolute floating Scan Action Button */}
      <button 
        id="gallery-scan-fab"
        onClick={handleSync}
        className="fixed right-6 bottom-24 md:bottom-8 z-40 w-12 h-12 bg-primary text-[#001f24] rounded-full shadow-lg hover:glow-cyan flex items-center justify-center cursor-pointer transition-transform duration-100 active:scale-90"
        title="Refresh and sync archives"
      >
        <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
      </button>

      {/* Header and Live Search section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Object Gallery</h2>
          <p className="text-xs font-mono text-on-surface-variant mt-1">Archived detections from YOLO-v8 Node 04</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input 
            type="text"
            placeholder="Search ID or Class (e.g. Truck)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all font-sans"
          />
        </div>
      </div>

      {/* Stats Bento-Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant border-l-4 border-l-primary leading-none">
          <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">TOTAL ARCHIVES</p>
          <p className="font-mono text-lg font-bold text-primary">12,842</p>
        </div>

        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant leading-none">
          <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">SESSION RUNTIME</p>
          <p className="font-mono text-lg font-bold text-on-surface whitespace-nowrap">{sessionTime}</p>
        </div>

        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant leading-none">
          <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">SYS INTEGRITY</p>
          <p className="font-mono text-lg font-bold text-on-surface">98.2%</p>
        </div>

        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant leading-none">
          <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">CONFIDENCE MEAN</p>
          <p className="font-mono text-lg font-bold text-secondary">0.94</p>
        </div>
      </div>

      {/* Active Path Visual Tool Overlay Modal */}
      <AnimatePresence>
        {activePathId && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container-low max-w-md w-full rounded-xl border border-outline-variant overflow-hidden p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase">Tactical Tracker Path</h3>
                  <p className="text-sm font-bold text-primary">VEHICLE LOG #{activePathId}</p>
                </div>
                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded font-mono text-[9px] font-bold">GRID_04_Y</span>
              </div>

              {/* Path Grid map layout */}
              <div className="h-44 bg-surface-container-lowest border border-outline-variant rounded relative flex items-center justify-center p-2 mb-4 overflow-hidden">
                {/* Radial grid line design */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00daf3_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Simulated SVG vector path line */}
                <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    d="M 10 90 Q 40 20, 70 50 T 90 10" 
                    fill="none" 
                    stroke="#00daf3" 
                    strokeWidth="2" 
                    className="stroke-dash-animation"
                  />
                  {/* Scatter circle indicator coordinates */}
                  <circle cx="10" cy="90" r="3" fill="#00daf3" />
                  <circle cx="45" cy="30" r="3" fill="#ffdf9e" />
                  <circle cx="70" cy="50" r="3" fill="#00daf3" />
                  <circle cx="90" cy="10" r="3" fill="#00daf3 animate-ping" />
                </svg>

                <div className="absolute top-2 left-2 text-[9px] font-mono text-on-surface-variant/70">W_ENTRY</div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-on-surface-variant/70">N_CROSS</div>
                
                <span className="font-mono text-[10px] text-primary/80 font-bold glass-hud px-2 py-1 rounded">Vector Path Loaded successfully</span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs border-b border-outline-variant/30 pb-1.5">
                  <span className="text-on-surface-variant">Entrance Point</span>
                  <span className="font-mono text-on-surface">34.908, -118.239 (08:02:11)</span>
                </div>
                <div className="flex justify-between text-xs border-b border-outline-variant/30 pb-1.5">
                  <span className="text-on-surface-variant">Exit Intersection</span>
                  <span className="font-mono text-on-surface">34.912, -118.243 (08:04:15)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Velocity mean</span>
                  <span className="font-mono text-on-surface">42.4 km/h (Stable tracking)</span>
                </div>
              </div>

              <button
                onClick={() => setActivePathId(null)}
                className="w-full py-2.5 bg-primary text-[#001f24] hover:brightness-105 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded"
              >
                CLOSE VECTOR PATH
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of detection cards */}
      {filteredDetections.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest">
          <Layers className="w-10 h-10 text-on-surface-variant animate-pulse mb-3" />
          <p className="text-sm font-semibold text-on-surface-variant">No matching tactical archival frames located</p>
          <span className="text-xs text-on-surface-variant/60 mt-1">Refine your active filters or clear search query.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fadeIn">
          {filteredDetections.map((d) => {
            const isAlert = d.status === 'ALERT';
            const isLost = d.status === 'LOST';
            
            let statusBadgeColor = 'border-primary text-primary';
            if (isAlert) statusBadgeColor = 'border-secondary-container text-secondary';
            if (isLost) statusBadgeColor = 'border-outline-variant text-on-surface-variant';

            return (
              <div 
                key={d.id}
                className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden group hover:border-primary/40 transition-all hover:shadow-[0_0_20px_rgba(195,245,255,0.02)]"
              >
                {/* Media Image area */}
                <div className="relative h-44 bg-surface-container overflow-hidden">
                  <img 
                    src={d.imageUrl} 
                    alt={d.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[0.25] group-hover:grayscale-0"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-[#001f24] font-mono text-[9px] font-black rounded uppercase">
                    ID: {d.id}
                  </div>
                  <div className="absolute bottom-3 right-3 glass-hud px-2 py-0.5 rounded border border-primary/20">
                    <span className="font-mono text-[9px] text-primary font-black">CONF: {d.confidence.toFixed(2)}</span>
                  </div>
                </div>

                {/* Content Actions block */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4 leading-none">
                    <div>
                      <h3 className="text-sm font-black text-on-surface mb-1.5">{d.type}</h3>
                      <p className="font-mono text-[10px] text-on-surface-variant flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-outline" />
                        {d.timestamp}
                      </p>
                    </div>
                    
                    <span className={`px-2 py-0.5 border rounded font-mono text-[9px] font-bold ${statusBadgeColor}`}>
                      {d.status}
                    </span>
                  </div>

                  <button 
                    onClick={() => setActivePathId(d.id)}
                    className="w-full py-2 bg-surface-container text-on-surface hover:text-[#001f24] hover:bg-primary transition-all font-mono text-[10px] tracking-widest border border-outline-variant group-hover:border-primary/40 flex items-center justify-center gap-2 cursor-pointer font-bold rounded"
                  >
                    <span>VIEW PATH</span>
                    <MapPin className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
