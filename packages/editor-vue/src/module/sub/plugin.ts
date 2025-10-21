import {
  type BaseEditor,
  type EditorPlugin,
  EditorUtils,
  NodeUtils,
} from '@ssml-editor/vue';
import type { Element, Node } from 'slate-vue3/core';
import { SUB_TYPE } from './constant';

export const subPlugin: EditorPlugin = (editor: BaseEditor): BaseEditor => {
  const { isInline, isVoid, insertNode } = editor;
  const newEditor = editor;

  newEditor.isInline = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === SUB_TYPE) return true;
    return isInline(element);
  };

  newEditor.isVoid = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === SUB_TYPE) return false;
    return isVoid(element);
  };

  newEditor.insertNode = (node: Node) => {
    const type = NodeUtils.getNodeType(node);
    if (type === SUB_TYPE && newEditor.selection) {
      EditorUtils.insertSpace(newEditor, newEditor.selection);
    }
    insertNode(node);
  };

  return newEditor;
};
