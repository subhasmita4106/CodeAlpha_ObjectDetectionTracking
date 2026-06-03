/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTab = 'monitor' | 'gallery' | 'analytics' | 'settings';

export interface Detection {
  id: string;
  type: string;
  confidence: number;
  timestamp: string;
  imageUrl: string;
  status: 'TRACKING' | 'LOST' | 'ALERT';
  boundingBox?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface TelemetryState {
  fps: number;
  latency: number;
  drops: number;
  gpuTemp: number;
  gpuLoad: number;
  memoryUsage: number;
  vramAlloc: number;
}

export interface SystemConfig {
  neuralArchitecture: 'YOLO_v8' | 'FASTER_R_CNN';
  confidenceThreshold: number;
  developerOverride: boolean;
  activeStreamId: 'webcam' | 'local' | 'ip_camera';
}
