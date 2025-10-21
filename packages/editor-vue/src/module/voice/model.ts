import type { BaseElement } from '@ssml-editor/vue';
import type { VOICE_TYPE } from './constant';

export interface Voice extends BaseElement {
  type: typeof VOICE_TYPE;
  name: string;
  effect?: string;
}
