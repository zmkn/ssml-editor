import type { EditorModule } from '@ssml-editor/vue';
import { SOUND_EVENT_TYPE } from './constant';
import { soundEventElementToHtml } from './element-to-html';
import { soundEventHtmlToElement } from './html-to-element';
import { soundEventPlugin } from './plugin';
import { soundEventRenderElement } from './render-element';
import { soundEventSerializer } from './serializer';

export const SoundEventModule: EditorModule = {
  name: 'sound-event',
  type: SOUND_EVENT_TYPE,
  renderElement: soundEventRenderElement,
  elementToHtml: soundEventElementToHtml,
  htmlToElement: soundEventHtmlToElement,
  plugin: soundEventPlugin,
  serializer: soundEventSerializer,
};
