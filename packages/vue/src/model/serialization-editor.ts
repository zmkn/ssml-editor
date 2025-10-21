import type { BaseEditor } from 'slate-vue3/core';

export interface SerializationEditor extends BaseEditor {
  serialize: () => string[];
  serializeAndNormalize: () => string[];
}
