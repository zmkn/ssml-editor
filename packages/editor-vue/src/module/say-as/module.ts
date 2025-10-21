import type { EditorModule } from '@ssml-editor/vue';
import { SAY_AS_TYPE } from './constant';
import { sayAsElementToHtml } from './element-to-html';
import { sayAsHtmlToElement } from './html-to-element';
import { sayAsPlugin } from './plugin';
import { sayAsRenderElement } from './render-element';
import { sayAsSerializer } from './serializer';

export const SayAsModule: EditorModule = {
  name: 'say-as',
  type: SAY_AS_TYPE,
  renderElement: sayAsRenderElement,
  elementToHtml: sayAsElementToHtml,
  htmlToElement: sayAsHtmlToElement,
  plugin: sayAsPlugin,
  serializer: sayAsSerializer,
};
