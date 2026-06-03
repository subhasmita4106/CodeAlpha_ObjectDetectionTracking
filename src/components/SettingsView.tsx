/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  Terminal, 
  UploadCloud, 
  Camera, 
  Network, 
  RefreshCw, 
  Sliders, 
  Layout, 
  VolumeX, 
  Video, 
  FolderPlus,
  Play
} from 'lucide-react';
import { SystemConfig } from '../types';

interface SettingsViewProps {
  config: SystemConfig;
  setConfig: React.Dispatch<React.SetStateAction<SystemConfig>>;
  setActiveStreamName: (name: string) => void;
  onImageUploaded: (url: string) => void;
}

export default function SettingsView({
  config,
  setConfig,
  setActiveStreamName,
  onImageUploaded
}: SettingsViewProps) {
  const [isRebooting, setIsRebooting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [rebootCounter, setRebootCounter] = useState(0);

  // Simulated Reboot countdown thread
  useEffect(() => {
    if (!isRebooting) return;
    const interval = setTimeout(() => {
      setIsRebooting(false);
      setRebootCounter(prev => prev + 1);
    }, 2000);
    return () => clearTimeout(interval);
  }, [isRebooting]);

  // Handle uploaded files securely
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Invalid selection. System only validates and processes image surveillance feeds.");
      return;
    }
    const fakeUrl = URL.createObjectURL(file);
    onImageUploaded(fakeUrl);
    setActiveStreamName(file.name.toUpperCase());
    setConfig(prev => ({ ...prev, activeStreamId: 'local' }));
    alert(`SURVEILLANCE STREAM ROUTED: Connected to ${file.name}`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 select-none relative overflow-y-auto">
      
      {/* Absolute Loading overlay during Reboot */}
      {isRebooting && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-black animate-pulse">REBOOTING NEURAL NETWORK ENG...</span>
          <p className="text-[10px] text-on-surface-variant font-medium mt-1">Recalibrating high-speed weights. Ops offline temporarily.</p>
        </div>
      )}

      {/* Screen Title */}
      <header className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">System Configuration</h1>
        <p className="text-xs text-on-surface-variant font-sans mt-0.5">Calibrate neural engine parameters and stream orchestrator.</p>
      </header>

      {/* Dual column configurations grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Area Layout column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Neural Architecture Selection */}
          <section className="bg-surface-container-low border border-outline-variant p-5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-[9px] text-primary font-bold tracking-widest uppercase">NEURAL ARCHITECTURE</h2>
              <Cpu className="w-4 h-4 text-on-surface-variant" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setConfig(prev => ({ ...prev, neuralArchitecture: 'YOLO_v8' }))}
                className={`flex flex-col items-start p-4 border rounded font-mono transition-all text-left cursor-pointer ${
                  config.neuralArchitecture === 'YOLO_v8' 
                    ? 'border-primary bg-primary/5 text-primary text-xs font-bold' 
                    : 'border-outline-variant hover:bg-surface-container-high text-on-surface-variant text-xs font-medium'
                }`}
              >
                <span className="font-bold mb-1 block uppercase">YOLO v8</span>
                <span className="text-[9px] opacity-75">High Speed / Real-time tracking</span>
              </button>

              <button 
                onClick={() => setConfig(prev => ({ ...prev, neuralArchitecture: 'FASTER_R_CNN' }))}
                className={`flex flex-col items-start p-4 border rounded font-mono transition-all text-left cursor-pointer ${
                  config.neuralArchitecture === 'FASTER_R_CNN' 
                    ? 'border-primary bg-primary/5 text-primary text-xs font-bold' 
                    : 'border-outline-variant hover:bg-surface-container-high text-on-surface-variant text-xs font-medium'
                }`}
              >
                <span className="font-bold mb-1 block uppercase">Faster R-CNN</span>
                <span className="text-[9px] opacity-75">High Precision / Heavy Regional</span>
              </button>
            </div>
          </section>

          {/* Slider for confidence setting */}
          <section className="bg-surface-container-low border border-outline-variant p-5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-[9px] text-primary font-bold tracking-widest uppercase">CONFIDENCE THRESHOLD</h2>
              <span className="font-mono text-sm text-primary font-bold">{config.confidenceThreshold}%</span>
            </div>

            <input 
              id="confidence-range-setting"
              type="range"
              min="10"
              max="95"
              step="5"
              value={config.confidenceThreshold}
              onChange={(e) => setConfig(prev => ({ ...prev, confidenceThreshold: parseInt(e.target.value) }))}
              className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
            />
            
            <div className="flex justify-between mt-2 font-mono text-[9px] font-bold text-on-surface-variant select-none">
              <span>RELAXED</span>
              <span>STRICT</span>
            </div>

            <p className="mt-4 text-[11px] text-on-surface-variant leading-relaxed">
              Higher thresholds reduce false positives but may miss fast-moving or partially obscured objects. Recommended operational balance lies at 80% to 85%.
            </p>
          </section>

          {/* Live Developer telemetry monitor */}
          <section className="bg-surface-container-low border border-outline-variant p-5 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-mono text-[9px] text-primary font-bold tracking-widest uppercase mb-1">DEVELOPER OVERRIDE</h2>
                <p className="text-[11px] text-on-surface-variant">Enable raw telemetry and JSON stream visualization.</p>
              </div>

              {/* Switch Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={config.developerOverride}
                  onChange={(e) => setConfig(prev => ({ ...prev, developerOverride: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-on-surface-variant after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/25 border border-outline-variant" />
              </label>
            </div>

            {config.developerOverride && (
              <div className="mt-5 font-mono text-xs bg-black p-4 border border-outline-variant text-primary/80 overflow-x-auto rounded">
                <pre>{JSON.stringify({
                  system: "vigilant_ops_v4",
                  engine_status: isRebooting ? "rebooting" : "stable_ready",
                  gpu_temp_c: 64,
                  active_latency_ms: "12ms",
                  reboots_total: rebootCounter,
                  selected_neural_net: config.neuralArchitecture,
                  detection_threshold: `${config.confidenceThreshold}%`,
                  selected_stream_id: config.activeStreamId
                }, null, 2)}</pre>
              </div>
            )}
          </section>

        </div>

        {/* Right Area Layout Column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Stream orchestrator input picker */}
          <section className="bg-surface-container-low border border-outline-variant p-5 rounded-xl">
            <h2 className="font-mono text-[9px] text-primary font-bold tracking-widest uppercase mb-4">INPUT STREAM ORCHESTRATOR</h2>

            <div className="space-y-2">
              <div 
                onClick={() => {
                  setConfig(prev => ({ ...prev, activeStreamId: 'webcam' }));
                  setActiveStreamName('Integrated Webcam');
                }}
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${
                  config.activeStreamId === 'webcam' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-outline-variant hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs font-semibold">Integrated Webcam</span>
                </div>
                {config.activeStreamId === 'webcam' && (
                  <span className="text-[9px] font-mono font-bold uppercase">ACTIVE</span>
                )}
              </div>

              {/* Secure Drag Drop/Manual click file upload wrapper */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded p-3 transition-colors ${
                  dragOver ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant'
                } ${config.activeStreamId === 'local' ? 'border-primary' : ''}`}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <UploadCloud className="w-4 h-4 text-on-surface-variant" />
                    <div className="text-left">
                      <p className="text-xs font-semibold">Local File Upload</p>
                      <span className="text-[10px] text-on-surface-variant/75">Drag image cam feed here / click</span>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileSelect}
                    className="hidden" 
                  />
                  {config.activeStreamId === 'local' && (
                    <span className="text-[9px] font-mono text-primary font-bold uppercase">ROUTED</span>
                  )}
                </label>
              </div>

              <div 
                onClick={() => {
                  setConfig(prev => ({ ...prev, activeStreamId: 'ip_camera' }));
                  setActiveStreamName('IP Camera Network');
                }}
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${
                  config.activeStreamId === 'ip_camera' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-outline-variant hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Network className="w-4 h-4" />
                  <span className="text-xs font-semibold">IP Camera Network</span>
                </div>
                {config.activeStreamId === 'ip_camera' && (
                  <span className="text-[9px] font-mono font-bold uppercase">ACTIVE</span>
                )}
              </div>
            </div>
          </section>

          {/* Engine telemetry parameters diagnostics */}
          <section className="glass-hud p-5 rounded-xl border border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
            
            <div className="relative z-10 space-y-4">
              <h2 className="font-mono text-[9px] text-primary font-bold tracking-widest uppercase">ENGINE TELEMETRY</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 leading-none">
                  <p className="text-[9px] font-mono text-on-surface-variant font-bold uppercase">GPU LOAD</p>
                  <p className="font-mono text-sm text-primary font-black">42.8%</p>
                  <div className="w-full bg-outline-variant h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '42.8%' }} />
                  </div>
                </div>

                <div className="space-y-1 leading-none">
                  <p className="text-[9px] font-mono text-on-surface-variant font-bold uppercase font-bold">VRAM ALLOC</p>
                  <p className="font-mono text-sm text-primary font-black">2.4 GB</p>
                  <div className="w-full bg-outline-variant h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-4 select-none">
                <div className="flex-1">
                  <p className="text-[9px] font-mono text-on-surface-variant font-black mb-1.5 uppercase leading-none">THERMAL PROFILE</p>
                  <div className="flex gap-1.5">
                    <div className="h-4 w-1.5 bg-primary rounded-sm" />
                    <div className="h-4 w-1.5 bg-primary rounded-sm" />
                    <div className="h-4 w-1.5 bg-primary rounded-sm" />
                    <div className="h-4 w-1.5 bg-primary/30 rounded-sm" />
                    <div className="h-4 w-1.5 bg-primary/10 rounded-sm" />
                  </div>
                </div>

                <button 
                  onClick={() => setIsRebooting(true)}
                  className="px-4 py-2 bg-primary hover:brightness-105 active:scale-95 text-[#001f24] font-mono text-[9px] font-black tracking-widest uppercase rounded cursor-pointer transition-transform"
                >
                  REBOOT ENGINE
                </button>
              </div>
            </div>
          </section>

          {/* Dark Room server room diagnostic imagery decoration card */}
          <div className="rounded-xl border border-outline-variant overflow-hidden bg-black/60 aspect-[2/1] relative select-none">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzda08DJ0gFEU0Cc24Kg8YYyMMcDrD00wjjDBJWTrWGiqkl6yNmQUrnSxblhK0nb1KVNI84koLzxwfi7G_G5A5glNeNnSsEv8WY0LvgVxBQ0uAUqlIO1USilMplgAwE6Ih6X_lvuEVKiXAKTrEpR0Tz1t-4MzbY4n8lm8SjEcZG_tolMNGfjmP00oTTp1uHpRHy4NDFQiVVFl2XXdgYGYCys16KR_7DW7n-_IMrAPprEIUmgtIACkiA2IiTnm_pzcDUt75rLJecKcW" 
              alt="Telemetry visualization room" 
              className="w-full h-full object-cover opacity-45 grayscale hover:opacity-75 hover:grayscale-0 transition-opacity duration-500 ease-in-out"
            />
            
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-3 text-left">
              <span className="font-mono text-[9px] tracking-widest text-primary font-bold">TACTICAL_NODE_04</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
