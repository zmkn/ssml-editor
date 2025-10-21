import type { DecoratedRange, NodeEntry } from 'slate-vue3/core';

export type EditorDecorate = (entry: NodeEntry) => DecoratedRange;
