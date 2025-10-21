import { HtmlUtils } from '@ssml-editor/core';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
} from '@ssml-editor/vue';
import { SOUND_EVENT_TYPE } from './constant';
import type { SoundEvent } from './model';

export const soundEventElementToHtml: EditorElementToHtmlMethod = ({
  element,
}: EditorElementToHtmlMethodProps): string => {
  const { mark, src } = element as SoundEvent;
  return HtmlUtils.createElementAsString(SOUND_EVENT_TYPE, true, true, {
    mark: mark,
    src: src,
  });
};
