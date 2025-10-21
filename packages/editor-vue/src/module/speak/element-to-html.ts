import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@ssml-editor/vue';
import { SPEAK_HTML_NODE_NAME, SPEAK_TYPE } from './constant';
import type { Speak } from './model';

export const speakElementToHtml: EditorElementToHtmlMethod = ({
  element,
  childrenHtml,
}: EditorElementToHtmlMethodProps): string => {
  const { mark, rate, pitch, volume, effect, effectValue, bgm, bgmVolume } =
    element as Speak;
  return HtmlUtils.createElementAsString(
    SPEAK_HTML_NODE_NAME,
    SPEAK_TYPE,
    false,
    false,
    {
      mark: mark,
      rate: rate,
      pitch: pitch,
      volume: volume,
      effect: effect,
      'effect-value': effectValue,
      bgm: bgm,
      'bgm-volume': bgmVolume,
    },
    childrenHtml,
  );
};
