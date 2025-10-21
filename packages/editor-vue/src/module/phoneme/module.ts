import type { EditorModule } from '@ssml-editor/vue';
import { PHONEME_TYPE } from './constant';
import { phonemeElementToHtml } from './element-to-html';
import { phonemeHtmlToElement } from './html-to-element';
import { phonemePlugin } from './plugin';
import { phonemeRenderElement } from './render-element';
import { phonemeSerializer } from './serializer';

export const PhonemeModule: EditorModule = {
  name: 'phoneme',
  type: PHONEME_TYPE,
  renderElement: phonemeRenderElement,
  elementToHtml: phonemeElementToHtml,
  htmlToElement: phonemeHtmlToElement,
  plugin: phonemePlugin,
  serializer: phonemeSerializer,
};
