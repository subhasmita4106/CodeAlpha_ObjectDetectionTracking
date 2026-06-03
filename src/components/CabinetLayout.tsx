/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Settings, 
  Shield, 
  Activity, 
  Terminal, 
  Bell, 
  Sliders, 
  User,
  Monitor,
  Image,
  TrendingUp,
  SlidersHorizontal,
  CircleDot
} from 'lucide-react';
import { AppTab, TelemetryState } from '../types';

interface CabinetLayoutProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  children: React.ReactNode;
  telemetry: TelemetryState;
  isFeedPaused: boolean;
}

export default function CabinetLayout({
  activeTab,
  setActiveTab,
  children,
  telemetry,
  isFeedPaused
}: CabinetLayoutProps) {
  const [animatedFps, setAnimatedFps] = useState<number>(30.0);
  const [animatedLatency, setAnimatedLatency] = useState<number>(12);

  // Stats jitter simulation for a realistic, sensory real-time tactical monitor
  useEffect(() => {
    if (isFeedPaused) {
      setAnimatedFps(0.0);
      return;
    }
    const interval = setInterval(() => {
      setAnimatedFps(30.0 + (Math.random() * 0.4 - 0.2));
      setAnimatedLatency(Math.max(8, Math.min(20, 12 + Math.floor(Math.random() * 5 - 2))));
    }, 1000);
    return () => clearInterval(interval);
  }, [isFeedPaused]);

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col overflow-hidden">
      {/* Top Application Bar */}
      <header className="flex justify-between items-center w-full px-4 h-16 bg-surface border-b border-outline-variant fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            id="drawer-toggle-btn"
            className="text-primary hover:bg-surface-container-high transition-colors p-2 rounded-full cursor-pointer focus:outline-none"
            title="Menu Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="font-mono text-xs font-bold text-primary tracking-widest leading-none">VIGILANT OPS</h1>
            <span className="text-[9px] text-on-surface-variant tracking-wider uppercase font-semibold hidden md:block">Tactical Surveillance</span>
          </div>
        </div>

        {/* Real-time Telemetry Stats Widget */}
        <div className="hidden md:flex items-center gap-6 px-5 py-1.5 glass-hud rounded-full select-none">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isFeedPaused ? 'bg-outline' : 'bg-primary animate-pulse'}`}></span>
            <span className="font-mono text-[9px] text-on-surface-variant font-bold">FPS:</span>
            <span className="font-mono text-xs text-primary font-bold">
              {animatedFps.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant pl-4">
            <span className="font-mono text-[9px] text-on-surface-variant font-bold">LATENCY:</span>
            <span className="font-mono text-xs text-primary font-bold">
              {isFeedPaused ? '--' : `${animatedLatency}ms`}
            </span>
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant pl-4">
            <span className="font-mono text-[9px] text-on-surface-variant font-bold">DROPS:</span>
            <span className={`font-mono text-xs font-bold ${telemetry.drops > 0 ? 'text-error' : 'text-primary'}`}>
              {telemetry.drops}
            </span>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-3">
          <button 
            id="live-mode-indicator"
            className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-primary/30 rounded-full cursor-default"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isFeedPaused ? 'bg-orange-400' : 'bg-red-500 animate-ping'}`} />
            <span className="font-mono text-[10px] text-primary tracking-wider font-bold">
              {isFeedPaused ? 'PAUSED' : 'LIVE'}
            </span>
          </button>
          
          <button 
            id="settings-tab-btn"
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-primary/20 text-primary' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'}`}
            title="System Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex flex-1 pt-16 pb-16 md:pb-0">
        
        {/* Navigation Sidebar (Desktop view) */}
        <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-[250px] fixed left-0 top-16 bg-surface-container-low border-r border-outline-variant z-40 select-none">
          <div className="p-4 border-b border-outline-variant">
            <p className="font-mono text-[10px] text-on-surface-variant font-bold tracking-widest uppercase">MONITORING CONFIG</p>
          </div>
          
          <nav className="flex-1 py-4 space-y-1">
            <button
              onClick={() => setActiveTab('monitor')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                activeTab === 'monitor' 
                  ? 'border-l-4 border-primary bg-surface-container-high text-primary font-bold' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border-l-4 border-transparent'
              }`}
            >
              <Monitor className="w-5 h-5" />
              <span className="text-xs tracking-wider uppercase font-semibold">Live Monitor</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                activeTab === 'gallery' 
                  ? 'border-l-4 border-primary bg-surface-container-high text-primary font-bold' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border-l-4 border-transparent'
              }`}
            >
              <Image className="w-5 h-5" />
              <span className="text-xs tracking-wider uppercase font-semibold">Object Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                activeTab === 'analytics' 
                  ? 'border-l-4 border-primary bg-surface-container-high text-primary font-bold' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border-l-4 border-transparent'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs tracking-wider uppercase font-semibold">Vision Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                activeTab === 'settings' 
                  ? 'border-l-4 border-primary bg-surface-container-high text-primary font-bold' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border-l-4 border-transparent'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-xs tracking-wider uppercase font-semibold">System Settings</span>
            </button>
          </nav>

          {/* Operator Meta footer */}
          <div className="p-4 border-t border-outline-variant bg-surface-container-lowest">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div className="truncate">
                <p className="font-mono text-[9px] text-on-surface-variant leading-none font-bold">OPERATOR</p>
                <p className="text-xs text-on-surface truncate font-semibold">Admin_01</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Area Workspace Render (Responsive offset on desktop) */}
        <main className="flex-1 md:pl-[250px] flex flex-col h-[calc(100vh-64px)] bg-black overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Navigation Bar container */}
      <nav className="md:hidden flex justify-around items-center bg-surface-container border-t border-outline-variant fixed bottom-0 w-full z-50 h-16 pb-safe px-2">
        <button
          onClick={() => setActiveTab('monitor')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'monitor' 
              ? 'bg-primary/20 text-primary font-bold' 
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <Monitor className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-1 uppercase font-bold tracking-wider">Monitor</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'gallery' 
              ? 'bg-primary/20 text-primary font-bold' 
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <Image className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-1 uppercase font-bold tracking-wider">Gallery</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'analytics' 
              ? 'bg-primary/20 text-primary font-bold' 
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-1 uppercase font-bold tracking-wider">Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'settings' 
              ? 'bg-primary/20 text-primary font-bold' 
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-1 uppercase font-bold tracking-wider">Settings</span>
        </button>
      </nav>
    </div>
  );
}
