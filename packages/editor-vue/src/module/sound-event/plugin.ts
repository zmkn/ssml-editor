import {
  type BaseEditor,
  type EditorPlugin,
  NodeUtils,
} from '@ssml-editor/vue';
import type { Element } from 'slate-vue3/core';
import { SOUND_EVENT_TYPE } from './constant';

export const soundEventPlugin: EditorPlugin = (
  editor: BaseEditor,
): BaseEditor => {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === SOUND_EVENT_TYPE) return true;
    return isInline(element);
  };

  newEditor.isVoid = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === SOUND_EVENT_TYPE) return true;
    return isVoid(element);
  };

  return newEditor;
};
