import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@ssml-editor/vue';
import { SAY_AS_TYPE } from './constant';
import type { SayAs } from './model';

export const sayAsElementToHtml: EditorElementToHtmlMethod = ({
  element,
  childrenHtml,
}: EditorElementToHtmlMethodProps): string => {
  const { mark, interpretAs } = element as SayAs;
  return HtmlUtils.createElementAsString(
    SAY_AS_TYPE,
    true,
    false,
    {
      mark: mark,
      'interpret-as': interpretAs,
    },
    childrenHtml,
  );
};
