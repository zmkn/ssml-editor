import type { BaseElement } from '@ssml-editor/vue';
import type { SOUND_EVENT_TYPE } from './constant';

export interface SoundEvent extends BaseElement {
  type: typeof SOUND_EVENT_TYPE;
  src: string;
}
