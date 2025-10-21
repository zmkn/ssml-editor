import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorHtmlToElementMethod,
  EditorHtmlToElementMethodProps,
} from '@ssml-editor/vue';
import { VOICE_TYPE } from './constant';
import type { Voice } from './model';

export const voiceHtmlToElement: EditorHtmlToElementMethod = ({
  element,
  children,
}: EditorHtmlToElementMethodProps): Voice => {
  const mark = HtmlUtils.getDataAttribute(element, 'mark', '');
  const name = HtmlUtils.getDataAttribute(element, 'name', '');
  const effect = HtmlUtils.getDataAttribute(element, 'effect', '');
  return {
    type: VOICE_TYPE,
    mark: mark,
    name: name,
    effect: effect,
    children: children,
  };
};
