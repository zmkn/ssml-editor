import { SPEAK_TYPE } from '@/module';
import type { Speak } from '@/module/speak/model';
import { EditorUtils, MenuBaseService } from '@ssml-editor/vue';
import { cloneDeep } from 'lodash';
import { Element, type Text } from 'slate-vue3/core';
import type { SpeakContentDataModal } from './model';

export class SpeakMenuService extends MenuBaseService {
  override isDisabled(): boolean {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    return false;
  }

  getNodeAsSpeakContentData(): SpeakContentDataModal | undefined {
    const node = EditorUtils.findSelectedNodeByType(this.editor, SPEAK_TYPE);
    if (node) {
      const speakNode = node as Speak;
      return {
        rate: speakNode.rate,
        pitch: speakNode.pitch,
        volume: speakNode.volume,
        bgmVolume: speakNode.bgmVolume || 100,
        effect: speakNode.effect,
        effectValue: speakNode.effectValue,
        bgm: speakNode.bgm,
      };
    }
  }

  setNode(data: SpeakContentDataModal) {
    if (!this.isDisabled()) {
      const textNode = EditorUtils.findSelectedTextNode(this.editor);
      if (textNode) {
        const value = (textNode as Text).text;
        if (value) {
          const element: Speak = {
            type: SPEAK_TYPE,
            mark: data.label || '',
            rate: data.rate,
            pitch: data.pitch,
            volume: data.volume,
            effect: data.effect,
            effectValue: data.effectValue,
            bgm: data.bgm,
            bgmVolume: data.bgmVolume,
            children: [],
          };
          const node = EditorUtils.findSelectedNodeByType(
            this.editor,
            SPEAK_TYPE,
          );
          if (node) {
            const partialElement = element as Partial<Speak>;
            delete partialElement.children;
            delete partialElement.type;
            EditorUtils.replaceNode(this.editor, node, partialElement);
          } else {
            const topNode = EditorUtils.findTopNode(this.editor, textNode);
            if (topNode) {
              element.children = cloneDeep((topNode as Element).children);
              EditorUtils.replaceNode(this.editor, topNode, element);
            }
          }
        }
      }
    }
  }
}
