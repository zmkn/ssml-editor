import { type BaseEditor, type EditorPlugin } from '@ssml-editor/vue';
import { Element, Node } from 'slate-vue3/core';

export const voidElementPlugin: EditorPlugin = (
  editor: BaseEditor,
): BaseEditor => {
  const { insertNode } = editor;
  const newEditor = editor;

  /**
   * 重写 insertNode 方法，在 void 元素被插入后移动光标至新插入的元素后。
   * @param node
   */
  newEditor.insertNode = (node: Node) => {
    insertNode(node);
    if (Element.isElement(node) && newEditor.isVoid(node)) {
      newEditor.move({ distance: 1 });
    }
  };

  return newEditor;
};
