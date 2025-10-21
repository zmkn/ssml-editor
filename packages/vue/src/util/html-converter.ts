import { PARAGRAPH_RENDERED_NODE_NAME, PARAGRAPH_TYPE } from '@/editor';
import type {
  EditorElementToHtmlMethod,
  EditorElementToHtmlMethodProps,
  EditorHtmlToElementMethod,
} from '@/type';
import { HtmlUtils } from '@ssml-editor/core';
import {
  Element as SlateElement,
  Text as SlateText,
  type Descendant,
} from 'slate-vue3/core';
import { NodeUtils } from './node-utils';

export const HtmlConverter = {
  slateElementToHtml(
    props: EditorElementToHtmlMethodProps,
    serializers: {
      type: string;
      serializer: EditorElementToHtmlMethod;
    }[],
  ): string {
    for (const serializer of serializers) {
      if (NodeUtils.getNodeType(props.element) === serializer.type) {
        return serializer.serializer(props);
      }
    }
    return '';
  },
  slateNodeToHtml(
    nodes: Descendant[],
    serializers: {
      type: string;
      serializer: EditorElementToHtmlMethod;
    }[],
  ): string {
    const htmlPart: string[] = [];
    for (const node of nodes) {
      if (SlateText.isText(node)) {
        htmlPart.push(node.text);
      } else if (SlateElement.isElement(node)) {
        htmlPart.push(
          this.slateElementToHtml(
            {
              element: node,
              childrenHtml: this.slateNodeToHtml(node.children, serializers),
            },
            serializers,
          ),
        );
      }
    }
    return htmlPart.join('');
  },
  textToSlateNode(
    text: string,
    deserializers: {
      type: string;
      deserializer: EditorHtmlToElementMethod;
    }[],
  ): Descendant | null {
    const type: string = PARAGRAPH_TYPE;
    const element: Element = window.document.createElement(
      PARAGRAPH_RENDERED_NODE_NAME,
    );
    const children: Descendant[] = [{ text }];
    for (const deserializer of deserializers) {
      if (type === deserializer.type) {
        return deserializer.deserializer({ element, children });
      }
    }
    return null;
  },
  elementToSlateNode(
    element: Element,
    deserializers: {
      type: string;
      deserializer: EditorHtmlToElementMethod;
    }[],
  ): Descendant | null {
    const type = HtmlUtils.getType(element, PARAGRAPH_TYPE);
    const children = this.nodesToSlateNodes(
      [...element.childNodes],
      deserializers,
    );
    // 当 children 为空时需要添加空文本元素，否则会导致编辑器异常
    if (children.length === 0) {
      children.push({ text: '' });
    }
    for (const deserializer of deserializers) {
      if (type === deserializer.type) {
        return deserializer.deserializer({ element, children });
      }
    }
    return null;
  },
  nodesToSlateNodes(
    nodes: Node[],
    deserializers: {
      type: string;
      deserializer: EditorHtmlToElementMethod;
    }[],
  ): Descendant[] {
    const result: Descendant[] = [];
    for (const node of nodes) {
      let slateNode: Descendant | null = null;
      if (node instanceof Element) {
        slateNode = this.elementToSlateNode(node, deserializers);
      } else if (node instanceof Text) {
        slateNode = NodeUtils.createTextNode(node.textContent);
      }
      if (slateNode) {
        result.push(slateNode);
      }
    }
    return result;
  },
  htmlToSlateNodes(
    html: string,
    deserializers: {
      type: string;
      deserializer: EditorHtmlToElementMethod;
    }[],
  ): Descendant[] {
    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');
    const nodes = [...document.body.childNodes];
    return this.nodesToSlateNodes(nodes, deserializers);
  },
};
