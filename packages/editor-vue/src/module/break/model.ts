import type { BaseElement } from '@ssml-editor/vue';
import { BREAK_TYPE } from './constant';

export interface Break extends BaseElement {
  type: typeof BREAK_TYPE;
  time?: string;
}
