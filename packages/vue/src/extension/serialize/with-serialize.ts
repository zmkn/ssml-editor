import type { SerializationEditor } from '@/model';
import type { EditorNormalization, EditorSerializationMethod } from '@/type';
import { SerializationUtils } from '@/util';
import type { BaseEditor } from 'slate-vue3/core';

export const withSerialization = <T extends BaseEditor>(
  editor: T,
  serializers: {
    type: string;
    serializer: EditorSerializationMethod;
  }[],
  normalizers: EditorNormalization[],
): T & SerializationEditor => {
  const newEditor = editor as T & SerializationEditor;

  newEditor.serialize = (): string[] => {
    const elements = SerializationUtils.getDirectChildElements(newEditor);
    const result = SerializationUtils.serializeNodes(elements, serializers);
    return result;
  };

  newEditor.serializeAndNormalize = (): string[] => {
    return normalizers.reduce(
      (codes, normalizer) => normalizer(codes),
      newEditor.serialize(),
    );
  };

  return newEditor;
};
