import type { EditorRenderElementMethod } from '@/type';
import type { RenderElementProps } from 'slate-vue3';
import { type VNode, h } from 'vue';
import { PARAGRAPH_RENDERED_NODE_NAME } from './constant';

export const paragraphRenderElement: EditorRenderElementMethod = ({
  children,
  attributes,
}: RenderElementProps): VNode => {
  return h(
    PARAGRAPH_RENDERED_NODE_NAME,
    {
      ...attributes,
      class: 'se-paragraph',
    },
    children,
  );
};
