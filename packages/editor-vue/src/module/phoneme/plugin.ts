import {
  type BaseEditor,
  type EditorPlugin,
  EditorUtils,
  NodeUtils,
} from '@ssml-editor/vue';
import type { Element, Node } from 'slate-vue3/core';
import { PHONEME_TYPE } from './constant';

export const phonemePlugin: EditorPlugin = (editor: BaseEditor): BaseEditor => {
  const { isInline, isVoid, insertNode } = editor;
  const newEditor = editor;

  newEditor.isInline = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === PHONEME_TYPE) return true;
    return isInline(element);
  };

  newEditor.isVoid = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === PHONEME_TYPE) return false;
    return isVoid(element);
  };

  newEditor.insertNode = (node: Node) => {
    const type = NodeUtils.getNodeType(node);
    if (type === PHONEME_TYPE && newEditor.selection) {
      EditorUtils.insertSpace(newEditor, newEditor.selection);
    }
    insertNode(node);
  };

  return newEditor;
};
