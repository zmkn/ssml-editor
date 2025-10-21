import type { EditorSerializationMethod } from '@ssml-editor/vue';
import type { Phoneme } from './model';

export const phonemeSerializer = ((
  node: Phoneme,
  children?: string,
): string => {
  return `<phoneme alphabet="${node.alphabet}" ph="${node.ph}">${children}</phoneme>`;
}) as EditorSerializationMethod;
