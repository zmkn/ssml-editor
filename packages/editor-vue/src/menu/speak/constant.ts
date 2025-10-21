import type { LabelValue } from '@ssml-editor/core';

export const speakRateData: ReadonlyArray<LabelValue> = [
  { label: '0.5x', value: 0.5 },
  { label: '0.6x', value: 0.6 },
  { label: '0.7x', value: 0.7 },
  { label: '0.8x', value: 0.8 },
  { label: '0.9x', value: 0.9 },
  { label: '1.0x', value: 1.0 },
  { label: '1.1x', value: 1.1 },
  { label: '1.2x', value: 1.2 },
  { label: '1.3x', value: 1.3 },
  { label: '1.4x', value: 1.4 },
  { label: '1.5x', value: 1.5 },
  { label: '1.6x', value: 1.6 },
  { label: '1.7x', value: 1.7 },
  { label: '1.8x', value: 1.8 },
  { label: '1.9x', value: 1.9 },
  { label: '2.0x', value: 2.0 },
];

export const speakPitcheData: ReadonlyArray<LabelValue> = [
  { label: '-5', value: 0.5 },
  { label: '-4', value: 0.6 },
  { label: '-3', value: 0.7 },
  { label: '-2', value: 0.8 },
  { label: '-1', value: 0.9 },
  { label: '0', value: 1.0 },
  { label: '1', value: 1.1 },
  { label: '2', value: 1.2 },
  { label: '3', value: 1.3 },
  { label: '4', value: 1.4 },
  { label: '5', value: 1.5 },
  { label: '6', value: 1.6 },
  { label: '7', value: 1.7 },
  { label: '8', value: 1.8 },
  { label: '9', value: 1.9 },
  { label: '10', value: 2.0 },
];

export const speakEffectData: ReadonlyArray<LabelValue> = [
  { label: '无', value: undefined },
  { label: '机器人', value: 'robot' },
  { label: '萝莉', value: 'lolita' },
  { label: '低通', value: 'lowpass' },
  { label: '回声', value: 'echo' },
  { label: '均衡器', value: 'eq' },
  { label: '低通滤波器', value: 'lpfilter' },
  { label: '高通滤波器', value: 'hpfilter' },
];
