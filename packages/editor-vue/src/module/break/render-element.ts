import {
  type EditorRenderElementMethod,
  type RenderElementProps,
  EditorUtils,
  icon,
  mark,
  wrapper,
} from '@ssml-editor/vue';
import type { VNode } from 'vue';
import type { Break } from './model';

export const breakRenderElement: EditorRenderElementMethod = ({
  element,
  children,
  attributes,
  editor,
}: RenderElementProps): VNode => {
  const node = element as Break;
  return wrapper(
    attributes,
    mark(
      node.mark,
      undefined,
      { 'background-color': 'var(--ssml-break)' },
      undefined,
      ['iconfont-ssml-editor', 'icon-ssml-editor-close-fill'],
      {
        onClick: (event: Event) => {
          event.stopPropagation();
          EditorUtils.removeByNode(editor, node);
        },
      },
    ),
    icon(children, ['iconfont-ssml-editor', 'icon-ssml-editor-tingdun-fill'], {
      color: 'var(--ssml-break)',
    }),
  );
};
