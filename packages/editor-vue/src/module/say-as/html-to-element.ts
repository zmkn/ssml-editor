import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorHtmlToElementMethod,
  EditorHtmlToElementMethodProps,
} from '@ssml-editor/vue';
import { SAY_AS_TYPE } from './constant';
import type { SayAs } from './model';
import { SayAsInterpretation } from './say-as-interpretation.enum';

export const sayAsHtmlToElement: EditorHtmlToElementMethod = ({
  element,
  children,
}: EditorHtmlToElementMethodProps): SayAs => {
  const mark = HtmlUtils.getDataAttribute(element, 'mark', '');
  const interpretAs =
    SayAsInterpretation.fromString(
      HtmlUtils.getDataAttribute(element, 'interpret-as', 'id'),
    ) || SayAsInterpretation.ID;
  return {
    type: SAY_AS_TYPE,
    mark: mark,
    interpretAs: interpretAs,
    children: children,
  };
};
