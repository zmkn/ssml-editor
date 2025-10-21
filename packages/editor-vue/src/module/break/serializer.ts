import type { EditorSerializationMethod } from '@ssml-editor/vue';
import type { Break } from './model';

export const breakSerializer = ((node: Break): string => {
  if (node.time) {
    return `<break time="${node.time}"/>`;
  }
  return `<break/>`;
}) as EditorSerializationMethod;
