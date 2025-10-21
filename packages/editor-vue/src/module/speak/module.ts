import type { EditorModule } from '@ssml-editor/vue';
import { SPEAK_TYPE } from './constant';
import { speakElementToHtml } from './element-to-html';
import { speakHtmlToElement } from './html-to-element';
import { speakPlugin } from './plugin';
import { speakRenderElement } from './render-element';
import { speakSerializer } from './serializer';

export const SpeakModule: EditorModule = {
  name: 'speak',
  type: SPEAK_TYPE,
  renderElement: speakRenderElement,
  elementToHtml: speakElementToHtml,
  htmlToElement: speakHtmlToElement,
  plugin: speakPlugin,
  serializer: speakSerializer,
};
