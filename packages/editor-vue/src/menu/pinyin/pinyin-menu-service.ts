import { PHONEME_TYPE, SPEAK_TYPE, SUB_TYPE } from '@/module';
import { Alphabet } from '@/module/phoneme/alphabet.enum';
import type { Phoneme } from '@/module/phoneme/model';
import { Warning } from '@ssml-editor/base';
import { EditorUtils, MenuBaseService } from '@ssml-editor/vue';
import { Range } from 'slate-vue3/core';

export class PinyinMenuService extends MenuBaseService {
  override isDisabled(): boolean {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (Range.isCollapsed(selection)) {
      throw new Warning('请框选一个中文字符');
    }
    const value = this.getText();
    if (value.length != 1) {
      throw new Warning('请框选一个中文字符');
    }
    if (!/^[\u4E00-\u9FA5]$/gi.test(value)) {
      throw new Warning('请框选一个中文字符');
    }
    const speakNode = EditorUtils.findSelectedNodeByType(
      this.editor,
      SPEAK_TYPE,
    );
    if (!speakNode) {
      throw new Warning('只能为已设置了属性的段落中的中文字符设置拼音');
    }
    const subNode = EditorUtils.findSelectedNodeByType(this.editor, SUB_TYPE);
    if (subNode) {
      throw new Warning('不能为已设置了别名的文本设置拼音');
    }
    return false;
  }

  setNode(ph: string, mark: string) {
    if (!this.isDisabled()) {
      const value = this.getText();
      if (value) {
        const element: Phoneme = {
          type: PHONEME_TYPE,
          alphabet: Alphabet.PY,
          ph: ph,
          mark: mark,
          children: [{ text: value }],
        };
        const node = EditorUtils.findSelectedNodeByType(
          this.editor,
          PHONEME_TYPE,
        );
        if (node) {
          const partialElement = element as Partial<Phoneme>;
          delete partialElement.children;
          delete partialElement.type;
          EditorUtils.replaceNode(this.editor, node, partialElement);
        } else {
          this.editor.insertNode(element);
        }
      }
    }
  }
}
