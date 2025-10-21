import { cloneDeep } from 'lodash';
import {
  Editor,
  Element,
  Location,
  Node,
  Path,
  Range,
  Text,
  Transforms,
  type Ancestor,
  type Descendant,
  type EditorNodeOptions,
  type ElementEntry,
  type NodeEntry,
} from 'slate-vue3/core';
import { NodeUtils } from './node-utils';

export const EditorUtils = {
  findNode(
    editor: Editor,
    at: Location,
    options?: EditorNodeOptions,
  ): Node | null {
    try {
      const nodeEntry = editor.node(at, options);
      return nodeEntry ? nodeEntry[0] : null;
    } catch (_) {
      return null;
    }
  },
  findNodeEntries(editor: Editor, node?: Node): NodeEntry[] {
    let allNodeEntries = Array.from(Node.nodes(editor));
    if (node && node !== editor) {
      const nodes = Array.from(Node.nodes(node)).map((nodeEntry) => {
        return nodeEntry[0];
      });
      allNodeEntries = allNodeEntries.filter((nodeEntry) => {
        return nodes.includes(nodeEntry[0]);
      });
    }
    return allNodeEntries;
  },
  findElementEntries(editor: Editor, node?: Node): ElementEntry[] {
    let allElementEntries = Array.from(Node.elements(editor));
    if (node && node !== editor) {
      const elements = Array.from(Node.elements(node)).map((elementEntry) => {
        return elementEntry[0];
      });
      allElementEntries = allElementEntries.filter((elementEntry) => {
        return elements.includes(elementEntry[0]);
      });
    }
    return allElementEntries;
  },
  findTextEntries(editor: Editor, node?: Node): NodeEntry<Text>[] {
    let allTextEntries = Array.from(Node.texts(editor));
    if (node && node !== editor) {
      const texts = Array.from(Node.texts(node)).map((textEntry) => {
        return textEntry[0];
      });
      allTextEntries = allTextEntries.filter((textEntry) => {
        return texts.includes(textEntry[0]);
      });
    }
    return allTextEntries;
  },
  findPath(editor: Editor, node: Node): Path | null {
    for (const [n, path] of this.findNodeEntries(editor)) {
      if (n === node) {
        return path;
      }
    }
    return null;
  },
  findParentNodeEntry(editor: Editor, at: Location): NodeEntry<Ancestor> {
    return Editor.parent(editor, at);
  },
  findParent(editor: Editor, at: Location): Ancestor {
    return this.findParentNodeEntry(editor, at)[0];
  },
  findParentByNode(editor: Editor, node: Node): Ancestor | null {
    const path = this.findPath(editor, node);
    if (path) {
      return this.findParent(editor, path);
    } else {
      return null;
    }
  },
  findParentPath(editor: Editor, at: Location): Path {
    return this.findParentNodeEntry(editor, at)[1];
  },
  getText(editor: Editor, at: Location): string {
    return Editor.string(editor, at);
  },
  getLength(editor: Editor, at: Location): number {
    return this.getText(editor, at).replace(/\r|\n|(\r\n)/g, '').length;
  },
  replaceNode(editor: Editor, originalNode: Node, targetNode: Partial<Node>) {
    const path = this.findPath(editor, originalNode);
    if (path) {
      Transforms.setNodes<Node>(editor, targetNode, {
        at: path,
      });
      if (
        NodeUtils.isElementNode(originalNode) &&
        NodeUtils.isElementNode(targetNode as Node) &&
        !editor.isVoid(originalNode)
      ) {
        if ((targetNode as Element).children) {
          this.removeChildrenByNode(editor, originalNode);
          this.insertChildren(
            editor,
            originalNode,
            (targetNode as Element).children,
          );
        }
      }
    }
  },
  replaceChildren(editor: Editor, parentNode: Node, children: Node[]) {
    if (children.length > 0) {
      const parentPath = this.findPath(editor, parentNode);
      if (parentPath) {
        Editor.withoutNormalizing(editor, () => {
          const newParentNode = Object.assign({}, parentNode, {
            children: children,
          });
          Transforms.removeNodes(editor, {
            at: parentPath,
          });
          Transforms.insertNodes(editor, newParentNode, {
            at: parentPath,
          });
        });
      }
    }
  },
  unsetChildren(editor: Editor, node: Element) {
    this.replaceChildren(editor, node, NodeUtils.getUnsetChildren(node));
  },
  insertNode(editor: Editor, node: Node, at?: Location) {
    if (at) {
      Transforms.insertNodes(editor, node, {
        at: at,
      });
    } else {
      Editor.insertNode(editor, node);
    }
  },
  insertChildNode(editor: Editor, parentNode: Node, node: Node) {
    if (NodeUtils.isElementNode(parentNode)) {
      const parentNodePath = this.findPath(editor, parentNode);
      if (parentNodePath) {
        const childNodePath: Path = [
          ...parentNodePath,
          parentNode.children.length,
        ];
        this.insertNode(editor, node, childNodePath);
      }
    }
  },
  insertChildren(editor: Editor, parentNode: Node, children: Descendant[]) {
    cloneDeep(children).forEach((child) => {
      this.insertChildNode(editor, parentNode, child);
    });
  },
  select(editor: Editor, target: Location) {
    Transforms.select(editor, target);
  },
  selectByNode(editor: Editor, node: Node) {
    const path = this.findPath(editor, node);
    if (path) {
      this.select(editor, path);
    }
  },
  remove(editor: Editor, target: Location) {
    Transforms.removeNodes(editor, {
      at: target,
    });
  },
  removeByNode(editor: Editor, node: Node) {
    const path = this.findPath(editor, node);
    if (path) {
      this.remove(editor, path);
    }
  },
  removeChildrenByNode(editor: Editor, node: Node) {
    Editor.withoutNormalizing(editor, () => {
      if (NodeUtils.isElementNode(node)) {
        const children = node.children;
        while (children.length > 0) {
          this.removeByNode(editor, children[0]);
        }
      }
    });
  },
  unwrap(editor: Editor, target: Location) {
    Transforms.unwrapNodes(editor, {
      at: target,
    });
  },
  unwrapByNode(editor: Editor, node: Node) {
    const path = this.findPath(editor, node);
    if (path) {
      this.unwrap(editor, path);
    }
  },
  unwrapAllByNode(editor: Editor, node: Node, removeVoidNode: boolean = false) {
    Editor.withoutNormalizing(editor, () => {
      const elements = this.findElementEntries(editor, node).reverse();
      for (const [element, path] of elements) {
        if (removeVoidNode && editor.isVoid(element)) {
          this.remove(editor, path);
        } else {
          this.unwrap(editor, path);
        }
      }
    });
  },
  unwrapChildrenByNode(
    editor: Editor,
    node: Node,
    removeVoidNode: boolean = false,
  ) {
    Editor.withoutNormalizing(editor, () => {
      if (NodeUtils.isElementNode(node)) {
        node.children.forEach((child) => {
          this.unwrapAllByNode(editor, child, removeVoidNode);
        });
      }
    });
  },
  trimSelection(editor: Editor) {
    const { selection } = editor;
    if (selection) {
      let [start, end] = Range.edges(selection);
      const wordRange = Editor.range(editor, start, end);
      const wordText = Editor.string(editor, wordRange);
      const trimStartedText = wordText.trimStart();
      if (trimStartedText !== wordText) {
        const difference = wordText.length - trimStartedText.length;
        start = { ...start, offset: start.offset + difference };
      }
      const trimEndedText = wordText.trimEnd();
      if (trimEndedText !== wordText) {
        const difference = wordText.length - trimEndedText.length;
        end = { ...end, offset: end.offset - difference };
      }
      const newSelection = { ...selection, anchor: start, focus: end };
      this.select(editor, newSelection);
    }
  },
  insertSpace(editor: Editor, range: Range) {
    Editor.withoutNormalizing(editor, () => {
      const startPoint = Editor.start(editor, range);
      const endPoint = Editor.end(editor, range);
      Transforms.insertText(editor, ' ', { at: startPoint });
      Transforms.insertText(editor, ' ', {
        at: { path: endPoint.path, offset: endPoint.offset + 1 },
      });
      Transforms.select(editor, {
        anchor: { path: startPoint.path, offset: startPoint.offset + 1 },
        focus: { path: endPoint.path, offset: endPoint.offset + 1 },
      });
    });
  },
  removeSpace(editor: Editor, node: Node) {
    Editor.withoutNormalizing(editor, () => {
      const path = this.findPath(editor, node);
      if (path) {
        const startPoint = Editor.before(editor, path);
        const endPoint = Editor.after(editor, path);
        if (startPoint && endPoint) {
          const startRange = {
            anchor: { path: startPoint.path, offset: startPoint.offset - 1 },
            focus: { path: startPoint.path, offset: startPoint.offset },
          };
          const endRange = {
            anchor: { path: endPoint.path, offset: endPoint.offset },
            focus: { path: endPoint.path, offset: endPoint.offset + 1 },
          };
          if (Editor.string(editor, startRange) === ' ') {
            Transforms.delete(editor, { at: startRange });
          }
          if (Editor.string(editor, endRange) === ' ') {
            Transforms.delete(editor, { at: endRange });
          }
        }
      }
    });
  },
  findTopNode(editor: Editor, node: Node): Node | null {
    const path = this.findPath(editor, node);
    if (path) {
      const topPath = [path[0]];
      return Node.get(editor, topPath);
    } else {
      return null;
    }
  },
  findSelectedNodeByType(editor: Editor, type: string): Descendant | null {
    const [nodeEntry] = Editor.nodes(editor, {
      match: (node) => NodeUtils.checkNodeType(node, type),
      universal: true,
    });
    return nodeEntry ? nodeEntry[0] : null;
  },
  findSelectedTextNode(editor: Editor): Text | null {
    const [nodeEntry] = Editor.nodes(editor, {
      match: (node) => NodeUtils.isTextNode(node),
      universal: true,
    });
    return nodeEntry ? nodeEntry[0] : null;
  },
};
