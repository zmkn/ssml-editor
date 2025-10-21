import type { BaseEditor, EditorPlugin } from '@/type';
import { NodeUtils } from '@/util';
import type { Element } from 'slate-vue3/core';
import { PARAGRAPH_TYPE } from './constant';

export const paragraphPlugin: EditorPlugin = (
  editor: BaseEditor,
): BaseEditor => {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === PARAGRAPH_TYPE) return false;
    return isInline(element);
  };

  newEditor.isVoid = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === PARAGRAPH_TYPE) return false;
    return isVoid(element);
  };

  return newEditor;
};
