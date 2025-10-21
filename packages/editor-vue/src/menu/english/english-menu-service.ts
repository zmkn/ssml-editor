import { PHONEME_TYPE, SPEAK_TYPE, SUB_TYPE } from '@/module';
import { Alphabet } from '@/module/phoneme/alphabet.enum';
import type { Phoneme } from '@/module/phoneme/model';
import { Warning } from '@ssml-editor/base';
import { EditorUtils, MenuBaseService } from '@ssml-editor/vue';
import { Editor, Range } from 'slate-vue3/core';

export class EnglishMenuService extends MenuBaseService {
  override isDisabled(): boolean {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (Range.isCollapsed(selection)) {
      throw new Warning('请框选英文单词');
    }
    const value = Editor.string(this.editor, selection);
    if (value.length <= 0) return true;
    if (!/^[A-Za-z]+$/gi.test(value)) {
      throw new Warning('请框选英文单词');
    }
    const speakNode = EditorUtils.findSelectedNodeByType(
      this.editor,
      SPEAK_TYPE,
    );
    if (!speakNode) {
      throw new Warning('只能为已设置了属性的段落中的英文单词设置音标');
    }
    const subNode = EditorUtils.findSelectedNodeByType(this.editor, SUB_TYPE);
    if (subNode) {
      throw new Warning('不能为已设置了别名的文本设置音标');
    }
    return false;
  }

  setNode(ph: string, mark: string) {
    if (!this.isDisabled()) {
      const value = this.getText();
      if (value) {
        const element: Phoneme = {
          type: PHONEME_TYPE,
          alphabet: Alphabet.CMU,
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
