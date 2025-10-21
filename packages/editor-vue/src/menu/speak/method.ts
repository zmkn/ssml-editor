import type { Effect } from '@/module';
import type { LabelValue } from '@ssml-editor/core';

export function generateSpeakUsageRecordLabel(
  dataListRate: LabelValue[],
  dataListPitch: LabelValue[],
  dataListBgm: LabelValue[],
  rate: number,
  pitch: number,
  volume: number,
  bgmVolume: number,
  effect?: Effect,
  effectValue?: string,
  bgm?: string,
): string {
  let rateName = '';
  for (const r of dataListRate) {
    if (r.value === rate) {
      rateName = r.label;
      break;
    }
  }
  let pitchName = '';
  for (const p of dataListPitch) {
    if (p.value === pitch) {
      pitchName = p.label;
      break;
    }
  }
  const part: string[] = [];
  part.push(rateName);
  part.push(pitchName);
  part.push(volume.toString());
  if (effect) {
    part.push(effect);
  }
  if (effectValue) {
    part.push(effectValue);
  }
  if (bgm) {
    for (const b of dataListBgm) {
      if (b.value === bgm) {
        part.push(b.label);
        break;
      }
    }
  }
  part.push(bgmVolume.toString());
  return part.join('-');
}
