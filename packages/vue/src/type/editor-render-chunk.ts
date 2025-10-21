import type { RenderChunkProps } from 'slate-vue3';
import type { VNode } from 'vue';

export type EditorRenderChunk = (props: RenderChunkProps) => VNode;
