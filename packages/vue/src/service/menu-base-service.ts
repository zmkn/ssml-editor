import type { BaseEditor } from '@/type';
import { EditorUtils } from '@/util';
import { Warning } from '@ssml-editor/base';
import { DOMEditor } from 'slate-vue3/dom';

export class MenuBaseService {
  protected readonly editor: BaseEditor;

  constructor(editor: BaseEditor) {
    this.editor = editor;
  }

  getText(): string {
    const { selection } = this.editor;
    if (selection) {
      return EditorUtils.getText(this.editor, selection);
    } else {
      return '';
    }
  }

  isDisabled(): boolean {
    const { selection } = this.editor;
    if (!selection) {
      DOMEditor.focus(this.editor);
      throw new Warning('未选中编辑器');
    }
    return false;
  }
}
