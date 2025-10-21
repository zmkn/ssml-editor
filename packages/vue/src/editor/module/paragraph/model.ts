import { type BaseElement } from 'slate-vue3/core';
import type { PARAGRAPH_TYPE } from './constant';

export interface Paragraph extends BaseElement {
  type: typeof PARAGRAPH_TYPE;
}
