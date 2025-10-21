import type { EditorSerializationMethod } from '@ssml-editor/vue';
import type { SoundEvent } from './model';

export const soundEventSerializer = ((node: SoundEvent): string => {
  return `<soundEvent src="${node.src}"/>`;
}) as EditorSerializationMethod;
