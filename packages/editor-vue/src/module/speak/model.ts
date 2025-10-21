import type { BaseElement } from '@ssml-editor/vue';
import type { SPEAK_TYPE } from './constant';
import type { Effect } from './effect.enum';

export interface Speak extends BaseElement {
  type: typeof SPEAK_TYPE;
  rate: number;
  pitch: number;
  volume: number;
  effect?: Effect;
  effectValue?: string;
  bgm?: string;
  bgmVolume?: number;
}
