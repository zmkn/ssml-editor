import {
  type BaseEditor,
  type BaseElement,
  EditorUtils,
} from '@ssml-editor/vue';
import { DOMEditor } from 'slate-vue3/dom';

export function markClickHandler(editor: BaseEditor, node: BaseElement) {
  if (!DOMEditor.isFocused(editor)) {
    DOMEditor.focus(editor);
  }
  const path = EditorUtils.findPath(editor, node);
  if (path) {
    editor.select(path);
  }
  editor.emit('ssml-mark-click', editor, node);
}
