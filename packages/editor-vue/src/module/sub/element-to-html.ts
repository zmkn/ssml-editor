import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@ssml-editor/vue';
import { SUB_TYPE } from './constant';
import type { Sub } from './model';

export const subElementToHtml: EditorElementToHtmlMethod = ({
  element,
  childrenHtml,
}: EditorElementToHtmlMethodProps): string => {
  const { mark, alias } = element as Sub;
  return HtmlUtils.createElementAsString(
    SUB_TYPE,
    true,
    false,
    {
      mark: mark,
      alias: alias,
    },
    childrenHtml,
  );
};
