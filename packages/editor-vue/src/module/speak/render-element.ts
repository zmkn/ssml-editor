import { markClickHandler } from '@/menu/menu.method';
import type {
  EditorRenderElementMethod,
  Paragraph,
  RenderElementProps,
} from '@ssml-editor/vue';
import {
  createParagraph,
  EditorUtils,
  mark,
  NodeUtils,
  text,
  wrapper,
} from '@ssml-editor/vue';
import { Element, Text, type BaseEditor } from 'slate-vue3/core';
import type { VNode } from 'vue';
import type { Speak } from './model';
import styles from './render-element.module.css';

function createParagraphByElement(element: Element): Paragraph {
  const textElement: Text = {
    text: NodeUtils.getText(element),
  };
  return createParagraph([textElement]);
}

function replaceNode(editor: BaseEditor, node: Element) {
  const targetNode = createParagraphByElement(node);
  EditorUtils.replaceNode(editor, node, targetNode);
}

export const speakRenderElement: EditorRenderElementMethod = ({
  element,
  children,
  attributes,
  editor,
}: RenderElementProps): VNode => {
  const node = element as Speak;
  return wrapper(
    'div',
    attributes,
    mark(
      node.mark,
      undefined,
      { 'background-color': 'var(--ssml-speak)' },
      {
        onClick: (event: Event) => {
          event.stopPropagation();
          markClickHandler(editor, node);
        },
      },
      ['iconfont-ssml-editor', 'icon-ssml-editor-close-fill'],
      {
        onClick: (event: Event) => {
          event.stopPropagation();
          replaceNode(editor, node);
        },
      },
    ),
    text(children, [styles.seSpeakText], undefined, undefined, {
      color: 'var(--ssml-speak)',
    }),
  );
};
