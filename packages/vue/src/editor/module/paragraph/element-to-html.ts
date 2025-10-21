import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@/type';
import { HtmlUtils } from '@ssml-editor/core';
import {
  PARAGRAPH_HTML_NODE_NAME,
  PARAGRAPH_MARK,
  PARAGRAPH_TYPE,
} from './constant';

export const paragraphElementToHtml: EditorElementToHtmlMethod = ({
  childrenHtml,
}: EditorElementToHtmlMethodProps): string => {
  return HtmlUtils.createElementAsString(
    PARAGRAPH_HTML_NODE_NAME,
    PARAGRAPH_TYPE,
    false,
    false,
    {
      mark: PARAGRAPH_MARK,
    },
    childrenHtml,
  );
};
