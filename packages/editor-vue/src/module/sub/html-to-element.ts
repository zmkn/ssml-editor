import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorHtmlToElementMethod,
  EditorHtmlToElementMethodProps,
} from '@ssml-editor/vue';
import { SUB_TYPE } from './constant';
import type { Sub } from './model';

export const subHtmlToElement: EditorHtmlToElementMethod = ({
  element,
  children,
}: EditorHtmlToElementMethodProps): Sub => {
  const mark = HtmlUtils.getDataAttribute(element, 'mark', '');
  const alias = HtmlUtils.getDataAttribute(element, 'alias', '');
  return {
    type: SUB_TYPE,
    mark: mark,
    alias: alias,
    children,
  };
};
