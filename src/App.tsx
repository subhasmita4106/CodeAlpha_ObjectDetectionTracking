/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import CabinetLayout from './components/CabinetLayout';
import MonitorView from './components/MonitorView';
import GalleryView from './components/GalleryView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import { AppTab, Detection, SystemConfig, TelemetryState } from './types';
import { INITIAL_DETECTIONS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('monitor');
  const [zoom, setZoom] = useState<number>(1.2);
  const [isFeedPaused, setIsFeedPaused] = useState<boolean>(false);
  const [activeStreamName, setActiveStreamName] = useState<string>('MAIN_ENTRY_WEST');
  const [recentDetections, setRecentDetections] = useState<Detection[]>(INITIAL_DETECTIONS);
  
  // Tactical feed URL: Decoupled to support webcam streams or direct user local configuration
  const [customFeedUrl, setCustomFeedUrl] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCoPqwX8rLfYVTmHUQIfVZ2mvjYBZZUGLgDn0xZLx6I_sdKfFuaD6FRwKhogISF14mKI5SPLrnyUfIcJoaRjwK-m3IuGWyj_i-pBsU5ruL_D8wG9__H0-2xTcnojKfgb9CeJKLcAOixnUj7LFD4hMp1ijACQATVSJGNnolLY3MoYu8R_n4b8U0hNbsi-qxKOFnRsC51u-5nFVEJH73XGLURp5MZY6jkgYxCot5-j6SnUGyxBOtggIozHpykQVhb79OOGiVV5LIjJy5E'
  );

  // Central configuration registry
  const [config, setConfig] = useState<SystemConfig>({
    neuralArchitecture: 'YOLO_v8',
    confidenceThreshold: 85,
    developerOverride: true,
    activeStreamId: 'webcam'
  });

  // Central hardware telemetry registry
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    fps: 30.0,
    latency: 12,
    drops: 0,
    gpuTemp: 64,
    gpuLoad: 42.8,
    memoryUsage: 4.2,
    vramAlloc: 2.4
  });

  // Live simulation: Occasionally trigger anomaly alerts or packet drops
  useEffect(() => {
    if (isFeedPaused) return;

    const interval = setInterval(() => {
      // 10% chance to simulate a momentary drop for telemetry accuracy
      if (Math.random() < 0.1) {
        setTelemetry(prev => ({
          ...prev,
          drops: prev.drops + 1
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isFeedPaused]);

  // Adjust recent detections mapping when stream changes
  useEffect(() => {
    if (config.activeStreamId === 'webcam') {
      setCustomFeedUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCoPqwX8rLfYVTmHUQIfVZ2mvjYBZZUGLgDn0xZLx6I_sdKfFuaD6FRwKhogISF14mKI5SPLrnyUfIcJoaRjwK-m3IuGWyj_i-pBsU5ruL_D8wG9__H0-2xTcnojKfgb9CeJKLcAOixnUj7LFD4hMp1ijACQATVSJGNnolLY3MoYu8R_n4b8U0hNbsi-qxKOFnRsC51u-5nFVEJH73XGLURp5MZY6jkgYxCot5-j6SnUGyxBOtggIozHpykQVhb79OOGiVV5LIjJy5E');
      setActiveStreamName('MAIN_ENTRY_WEST');
      setRecentDetections(INITIAL_DETECTIONS);
    } else if (config.activeStreamId === 'ip_camera') {
      setCustomFeedUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuDu5XcKOMKp2dP-_zAQqHA4VZDZDr8O5VCjZzli8mlUNmYwZ-5XduuLdBEhvK9SCx6n8fBT_YOkI81w37H77xZT1WCoiJkDGqXT80e77HhB2oedQkWUEdmVNtQXBIQ2dcWPNWMmQdobRExgxX9fKLYwi2QtJoSRPHDsmSz7rypTc9ptXf1w2sjQVIyPQqqOa8-rxmWPsgbfduA-HPi0yEhUaq6DFLaXXcyai0zpv2i_geoCY7ouAFm2sRYz7IbI2tjm8VMm4ACTIPkI');
      setActiveStreamName('IP_STREAM_SEC_04');
      // Shift recent detections filter mockups
      setRecentDetections(INITIAL_DETECTIONS.map(d => ({
        ...d,
        confidence: Math.min(0.99, d.confidence + 0.01)
      })));
    }
  }, [config.activeStreamId]);

  // Handle local uploaded files seamlessly
  const handleImageUploaded = (url: string) => {
    setCustomFeedUrl(url);
    // Insert custom temporary detection mapping for this specific feed upload
    const customUploadTrack: Detection = {
      id: '9045',
      type: 'Analyzed Feed',
      confidence: 0.963,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      imageUrl: url,
      status: 'TRACKING',
      boundingBox: { top: 20, left: 25, width: 50, height: 50 }
    };
    setRecentDetections([customUploadTrack, ...INITIAL_DETECTIONS]);
    setActiveTab('monitor');
  };

  return (
    <CabinetLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      telemetry={telemetry}
      isFeedPaused={isFeedPaused}
    >
      {activeTab === 'monitor' && (
        <MonitorView 
          zoom={zoom} 
          setZoom={setZoom}
          isFeedPaused={isFeedPaused}
          setIsFeedPaused={setIsFeedPaused}
          recentDetections={recentDetections}
          activeStreamName={activeStreamName}
          customFeedUrl={customFeedUrl}
        />
      )}

      {activeTab === 'gallery' && (
        <GalleryView />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView />
      )}

      {activeTab === 'settings' && (
        <SettingsView 
          config={config}
          setConfig={setConfig}
          setActiveStreamName={setActiveStreamName}
          onImageUploaded={handleImageUploaded}
        />
      )}
    </CabinetLayout>
  );
}
