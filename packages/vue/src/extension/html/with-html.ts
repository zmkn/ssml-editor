import type { HtmlEditor } from '@/model';
import type {
  EditorElementToHtmlMethod,
  EditorHtmlToElementMethod,
} from '@/type';
import { HtmlConverter } from '@/util';
import { cloneDeep } from 'lodash';
import type { BaseEditor } from 'slate-vue3/core';

export const withHtml = <T extends BaseEditor>(
  editor: T,
  serializers: {
    type: string;
    serializer: EditorElementToHtmlMethod;
  }[],
  deserializers: {
    type: string;
    deserializer: EditorHtmlToElementMethod;
  }[],
): T & HtmlEditor => {
  const newEditor = editor as T & HtmlEditor;

  newEditor.htmlElement = null;

  newEditor.setHtml = (html: string) => {
    if (html.trim() === '') {
      const node = HtmlConverter.textToSlateNode('', deserializers);
      if (node) {
        newEditor.children = [node];
      }
    } else {
      const nodes = HtmlConverter.htmlToSlateNodes(html, deserializers);
      newEditor.children = nodes;
    }
  };

  Object.defineProperty(newEditor, 'html', {
    get() {
      const children = cloneDeep(newEditor.children);
      const html = HtmlConverter.slateNodeToHtml(children, serializers);
      return html;
    },
    set(html: string) {
      newEditor.setHtml(html);
    },
    enumerable: true,
    configurable: true,
  });

  return newEditor;
};
