import type { BaseEditor } from 'slate-vue3/core';

export interface ExtEditor extends BaseEditor {
  ext: Record<string, any>;
}
