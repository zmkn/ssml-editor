import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorHtmlToElementMethod,
  EditorHtmlToElementMethodProps,
} from '@ssml-editor/vue';
import { Alphabet } from './alphabet.enum';
import { PHONEME_TYPE } from './constant';
import type { Phoneme } from './model';

export const phonemeHtmlToElement: EditorHtmlToElementMethod = ({
  element,
  children,
}: EditorHtmlToElementMethodProps): Phoneme => {
  const mark = HtmlUtils.getDataAttribute(element, 'mark', '');
  const alphabet =
    Alphabet.fromString(
      HtmlUtils.getDataAttribute(element, 'alphabet', 'py'),
    ) || Alphabet.PY;
  const ph = HtmlUtils.getDataAttribute(element, 'ph', '');
  return {
    type: PHONEME_TYPE,
    mark: mark,
    alphabet: alphabet,
    ph: ph,
    children: children,
  };
};
