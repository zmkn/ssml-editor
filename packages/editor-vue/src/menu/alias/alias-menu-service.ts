import { SPEAK_TYPE, SUB_TYPE } from '@/module';
import type { Sub } from '@/module/sub/model';
import { Warning } from '@ssml-editor/base';
import { EditorUtils, MenuBaseService } from '@ssml-editor/vue';
import { Range, type Descendant } from 'slate-vue3/core';

export class AliasMenuService extends MenuBaseService {
  override isDisabled(): boolean {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (Range.isCollapsed(selection)) {
      throw new Warning('请框选要设置别名的文本');
    }
    const speakNode = EditorUtils.findSelectedNodeByType(
      this.editor,
      SPEAK_TYPE,
    );
    if (!speakNode) {
      throw new Warning('只能为已设置了属性的段落中的文本设置别名');
    }
    return false;
  }

  getSerializedNode(): Sub | undefined {
    const node = EditorUtils.findSelectedNodeByType(this.editor, SUB_TYPE);
    if (node) {
      return node as Sub;
    }
  }

  setNode(alias: string): Descendant | null {
    if (!this.isDisabled()) {
      const value = this.getText();
      if (value) {
        const element: Sub = {
          type: SUB_TYPE,
          mark: alias,
          alias: alias,
          children: [{ text: value }],
        };
        const node = EditorUtils.findSelectedNodeByType(this.editor, SUB_TYPE);
        if (node) {
          const partialElement = element as Partial<Sub>;
          delete partialElement.children;
          delete partialElement.type;
          EditorUtils.replaceNode(this.editor, node, partialElement);
          return node;
        } else {
          this.editor.insertNode(element);
          return EditorUtils.findSelectedNodeByType(this.editor, SUB_TYPE);
        }
      }
    }
    return null;
  }
}
