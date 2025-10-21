import type { Effect } from '@/module';
import type { SpeakContentDataModal } from './model';

export class SpeakContentData implements SpeakContentDataModal {
  constructor(
    rate: number = 1.0,
    pitch: number = 1.0,
    volume: number = 100,
    bgmVolume: number = 30,
    effect?: Effect,
    effectValue?: string,
    bgm?: string,
    label?: string,
  ) {
    this.rate = rate;
    this.pitch = pitch;
    this.volume = volume;
    this.bgmVolume = bgmVolume;
    this.effect = effect;
    this.effectValue = effectValue;
    this.bgm = bgm;
    this.label = label;
  }

  rate: number;
  pitch: number;
  volume: number;
  bgmVolume: number;
  effect?: Effect;
  effectValue?: string;
  bgm?: string;
  label?: string;
}
