import type { EditorSerializationMethod } from '@/type';
import { cloneDeep, escape } from 'lodash';
import { Editor, Element, type Descendant, type Node } from 'slate-vue3/core';
import { NodeUtils } from './node-utils';

export const SerializationUtils = {
  escapeText(text: string): string {
    return escape(text);
  },

  /**
   * 获取直接的子元素
   * @param editor Editor对象
   * @returns 子元素集合
   */
  getDirectChildElements(editor: Editor): Element[] {
    return cloneDeep(editor.children).filter(
      (node: Descendant) =>
        Element.isElement(node) && !Editor.isEmpty(editor, node),
    ) as Element[];
  },

  serializeNode(
    node: Node,
    serializers: {
      type: string;
      serializer: EditorSerializationMethod;
    }[],
  ): string {
    if (NodeUtils.isTextNode(node)) {
      return this.escapeText(node.text.trim());
    } else if (NodeUtils.isElementNode(node)) {
      const type = NodeUtils.getNodeType(node);
      const children = node.children
        .map((n) => this.serializeNode(n, serializers))
        .join('');
      for (const serializationMethod of serializers) {
        if (type === serializationMethod.type) {
          return serializationMethod.serializer(node, children);
        }
      }
      return children;
    }
    return '';
  },

  serializeNodes(
    nodes: Node[],
    serializers: {
      type: string;
      serializer: EditorSerializationMethod;
    }[],
  ): string[] {
    return nodes
      .map((node) => {
        return this.serializeNode(node, serializers);
      })
      .filter((text) => {
        return text.trim();
      });
  },

  existTextNode(nodes: Descendant[]): boolean {
    for (const node of nodes) {
      if (NodeUtils.isTextNode(node)) {
        return true;
      }
    }
    return false;
  },
};
