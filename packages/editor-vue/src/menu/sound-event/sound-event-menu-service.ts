import { SOUND_EVENT_TYPE, SPEAK_TYPE } from '@/module';
import type { SoundEvent } from '@/module/sound-event/model';
import { Warning } from '@ssml-editor/base';
import { EditorUtils, MenuBaseService } from '@ssml-editor/vue';
import { Range } from 'slate-vue3/core';

export class SoundEventMenuService extends MenuBaseService {
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
    return false;
  }

  setNode(src: string, mark: string = 'Sound') {
    if (!this.isDisabled()) {
      const node: SoundEvent = {
        type: SOUND_EVENT_TYPE,
        src: src,
        mark,
        children: [{ text: '' }],
      };
      this.editor.insertNode(node);
    }
  }
}
