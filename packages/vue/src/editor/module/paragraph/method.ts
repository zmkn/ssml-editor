import type { Descendant } from 'slate-vue3/core';
import { PARAGRAPH_TYPE } from './constant';
import type { Paragraph } from './model';

export function createParagraph(children: Descendant[] = []): Paragraph {
  return <Paragraph>{
    type: PARAGRAPH_TYPE,
    children,
  };
}
