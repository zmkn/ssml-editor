import type { EditorSerializationMethod } from '@ssml-editor/vue';
import type { SayAs } from './model';

export const sayAsSerializer = ((node: SayAs, children?: string): string => {
  return `<say-as interpret-as="${node.interpretAs}">${children}</say-as>`;
}) as EditorSerializationMethod;
