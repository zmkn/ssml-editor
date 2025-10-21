import type { ExtEditor } from '@/model';
import type { EditorExt } from '@/type';
import type { BaseEditor } from 'slate-vue3/core';

export const withExt = <T extends BaseEditor>(
  editor: T,
  ext: EditorExt,
): T & ExtEditor => {
  const newEditor = editor as T & ExtEditor;

  newEditor.ext = ext;

  return newEditor;
};
