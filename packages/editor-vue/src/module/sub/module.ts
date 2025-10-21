import type { EditorModule } from '@ssml-editor/vue';
import { SUB_TYPE } from './constant';
import { subElementToHtml } from './element-to-html';
import { subHtmlToElement } from './html-to-element';
import { subPlugin } from './plugin';
import { subRenderElement } from './render-element';
import { subSerializer } from './serializer';

export const SubModule: EditorModule = {
  name: 'sub',
  type: SUB_TYPE,
  renderElement: subRenderElement,
  elementToHtml: subElementToHtml,
  htmlToElement: subHtmlToElement,
  plugin: subPlugin,
  serializer: subSerializer,
};
