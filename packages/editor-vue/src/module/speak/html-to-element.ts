import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorHtmlToElementMethod,
  EditorHtmlToElementMethodProps,
} from '@ssml-editor/vue';
import { SPEAK_TYPE } from './constant';
import { Effect } from './effect.enum';
import type { Speak } from './model';

export const speakHtmlToElement: EditorHtmlToElementMethod = ({
  element,
  children,
}: EditorHtmlToElementMethodProps): Speak => {
  const mark = HtmlUtils.getDataAttribute(element, 'mark', '');
  const rate = HtmlUtils.getDataAttribute(element, 'rate', 1);
  const pitch = HtmlUtils.getDataAttribute(element, 'pitch', 1);
  const volume = HtmlUtils.getDataAttribute(element, 'volume', 100);
  const effect = HtmlUtils.getDataAttribute(element, 'effect')
    ? Effect.fromString(HtmlUtils.getDataAttribute(element, 'effect')!!)
    : undefined;
  const effectValue = HtmlUtils.getDataAttribute(element, 'effect-value');
  const bgm = HtmlUtils.getDataAttribute(element, 'bgm');
  const bgmVolume = HtmlUtils.getDataAttribute(element, 'bgm-volume')
    ? +HtmlUtils.getDataAttribute(element, 'bgm-volume')!!
    : undefined;
  return {
    type: SPEAK_TYPE,
    mark: mark,
    rate: rate,
    pitch: pitch,
    volume: volume,
    effect: effect,
    effectValue: effectValue,
    bgm: bgm,
    bgmVolume: bgmVolume,
    children: children,
  };
};
