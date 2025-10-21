import type { EditorModule } from '@/type';
import { PARAGRAPH_TYPE } from './constant';
import { paragraphElementToHtml } from './element-to-html';
import { paragraphHtmlToElement } from './html-to-element';
import { paragraphPlugin } from './plugin';
import { paragraphRenderElement } from './render-element';
import { paragraphSerializer } from './serializer';

export const ParagraphModule: EditorModule = {
  name: 'paragraph',
  type: PARAGRAPH_TYPE,
  renderElement: paragraphRenderElement,
  elementToHtml: paragraphElementToHtml,
  htmlToElement: paragraphHtmlToElement,
  plugin: paragraphPlugin,
  serializer: paragraphSerializer,
};
