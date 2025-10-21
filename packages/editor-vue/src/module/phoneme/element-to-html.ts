import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@ssml-editor/vue';
import { PHONEME_TYPE } from './constant';
import type { Phoneme } from './model';

export const phonemeElementToHtml: EditorElementToHtmlMethod = ({
  element,
  childrenHtml,
}: EditorElementToHtmlMethodProps): string => {
  const { mark, alphabet, ph } = element as Phoneme;
  return HtmlUtils.createElementAsString(
    PHONEME_TYPE,
    true,
    false,
    {
      mark: mark,
      alphabet: alphabet,
      ph: ph,
    },
    childrenHtml,
  );
};
