import type { EditorSerializationMethod } from '@ssml-editor/vue';
import type { Voice } from './model';

export const voiceSerializer = ((node: Voice, children?: string): string => {
  const effect = node.effect ? ` effect="${node.effect}"` : '';
  return `<voice name="${node.name}${effect}">${children}</voice>`;
}) as EditorSerializationMethod;
