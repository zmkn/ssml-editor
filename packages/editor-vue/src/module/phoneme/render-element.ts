import { markClickHandler } from '@/menu/menu.method';
import {
  type EditorRenderElementMethod,
  type RenderElementProps,
  EditorUtils,
  mark,
  text,
  wrapper,
} from '@ssml-editor/vue';
import type { VNode } from 'vue';
import type { Phoneme } from './model';

export const phonemeRenderElement: EditorRenderElementMethod = ({
  element,
  children,
  attributes,
  editor,
}: RenderElementProps): VNode => {
  const node = element as Phoneme;
  return wrapper(
    attributes,
    mark(
      node.mark,
      undefined,
      { 'background-color': 'var(--ssml-phoneme)' },
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
          EditorUtils.removeSpace(editor, node);
          EditorUtils.unwrapAllByNode(editor, node);
        },
      },
    ),
    text(children, undefined, undefined, undefined, {
      color: 'var(--ssml-phoneme)',
    }),
  );
};
