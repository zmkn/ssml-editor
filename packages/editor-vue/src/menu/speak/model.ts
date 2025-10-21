import type { Effect } from '@/module/speak/effect.enum';

export interface SpeakContentDataModal {
  rate: number;
  pitch: number;
  volume: number;
  bgmVolume: number;
  effect?: Effect;
  effectValue?: string;
  bgm?: string;
  label?: string;
}
