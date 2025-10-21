import type { EditorModule } from '@ssml-editor/vue';
import { BREAK_TYPE } from './constant';
import { breakElementToHtml } from './element-to-html';
import { breakHtmlToElement } from './html-to-element';
import { breakPlugin } from './plugin';
import { breakRenderElement } from './render-element';
import { breakSerializer } from './serializer';

export const BreakModule: EditorModule = {
  name: 'break',
  type: BREAK_TYPE,
  renderElement: breakRenderElement,
  elementToHtml: breakElementToHtml,
  htmlToElement: breakHtmlToElement,
  plugin: breakPlugin,
  serializer: breakSerializer,
};
