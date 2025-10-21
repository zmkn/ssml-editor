import type { Element } from 'slate-vue3/core';

export interface BaseElement extends Element {
  type: string;
  mark: string;
}
