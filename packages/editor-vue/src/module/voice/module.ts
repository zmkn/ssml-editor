import type { EditorModule } from '@ssml-editor/vue';
import { VOICE_TYPE } from './constant';
import { voiceElementToHtml } from './element-to-html';
import { voiceHtmlToElement } from './html-to-element';
import { voicePlugin } from './plugin';
import { voiceRenderElement } from './render-element';
import { voiceSerializer } from './serializer';

export const VoiceModule: EditorModule = {
  name: 'voice',
  type: VOICE_TYPE,
  renderElement: voiceRenderElement,
  elementToHtml: voiceElementToHtml,
  htmlToElement: voiceHtmlToElement,
  plugin: voicePlugin,
  serializer: voiceSerializer,
};
