import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@ssml-editor/vue';
import { BREAK_TYPE } from './constant';
import type { Break } from './model';

export const breakElementToHtml: EditorElementToHtmlMethod = ({
  element,
}: EditorElementToHtmlMethodProps): string => {
  const { mark = '', time = '' } = element as Break;
  return HtmlUtils.createElementAsString(BREAK_TYPE, true, true, {
    mark: mark,
    time: time,
  });
};
