import type { EditorSerializationMethod } from '@ssml-editor/vue';
import type { Sub } from './model';

export const subSerializer = ((node: Sub, children?: string): string => {
  return `<sub alias="${node.alias}">${children}</sub>`;
}) as EditorSerializationMethod;
