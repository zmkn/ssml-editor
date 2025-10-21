import { BREAK_TYPE, SPEAK_TYPE, SUB_TYPE } from '@/module';
import type { Break } from '@/module/break/model';
import { Warning } from '@ssml-editor/base';
import { EditorUtils, MenuBaseService } from '@ssml-editor/vue';
import { Range } from 'slate-vue3/core';

export class BreakMenuService extends MenuBaseService {
  override isDisabled(): boolean {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (Range.isExpanded(selection)) {
      throw new Warning('不能框选文本');
    }
    const speakNode = EditorUtils.findSelectedNodeByType(
      this.editor,
      SPEAK_TYPE,
    );
    if (!speakNode) {
      throw new Warning('只能插入到已设置了属性的段落中');
    }
    const subNode = EditorUtils.findSelectedNodeByType(this.editor, SUB_TYPE);
    if (subNode) {
      throw new Warning('不能插入到已设置别名的文本中');
    }
    return false;
  }

  setNode(time: number) {
    if (this.isDisabled()) return;
    const value = `${time}ms`;
    const node: Break = {
      type: BREAK_TYPE,
      time: value,
      mark: value,
      children: [{ text: '' }],
    };
    this.editor.insertNode(node);
  }
}
