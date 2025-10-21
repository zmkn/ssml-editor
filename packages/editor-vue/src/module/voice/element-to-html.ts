import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@ssml-editor/vue';
import { VOICE_TYPE } from './constant';
import type { Voice } from './model';

export const voiceElementToHtml: EditorElementToHtmlMethod = ({
  element,
  childrenHtml,
}: EditorElementToHtmlMethodProps): string => {
  const { mark, name, effect = '' } = element as Voice;
  return HtmlUtils.createElementAsString(
    VOICE_TYPE,
    true,
    false,
    {
      mark: mark,
      name: name,
      effect: effect,
    },
    childrenHtml,
  );
};
