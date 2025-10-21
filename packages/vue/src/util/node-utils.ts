import { Element, Node, Text, type Descendant } from 'slate-vue3/core';

export const NodeUtils = {
  isElementNode(node: Node): node is Element {
    return Element.isElement(node);
  },
  isTextNode(node: Node): node is Text {
    return Text.isText(node);
  },
  isEmptyTextNode(node: Node): node is Text {
    return this.isTextNode(node) && (node as Text).text.trim() === '';
  },
  createTextNode(text: string, decoration?: number[]): Text {
    return { text, decoration };
  },
  getText(node: Node): string {
    return Node.string(node);
  },
  getNodeType(node: Node): string {
    if (this.isElementNode(node)) {
      return (node as any).type || '';
    }
    return '';
  },
  checkNodeType(node: Node, type: string): boolean {
    return this.getNodeType(node) === type;
  },
  getChildrenByType(node: Element, targetType: string): Element[] {
    const result: Element[] = [];
    for (const child of node.children) {
      if ((child as any).type === targetType) {
        result.push(child as Element);
      }
    }
    return result;
  },
  getUnsetChildren(node: Element): Descendant[] {
    let children: Descendant[] = [];
    node.children.forEach((child) => {
      if (this.isElementNode(child)) {
        if (
          (child as Element).children &&
          (child as Element).children.length > 0
        ) {
          children = children.concat(this.getUnsetChildren(child as Element));
        }
      } else {
        children.push(child);
      }
    });
    return children;
  },
};
