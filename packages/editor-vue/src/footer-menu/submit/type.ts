import type { BaseEditor, EditorConfig } from '@ssml-editor/vue';

export type SubmitProps = {
  onClick?: (code: string, editor?: BaseEditor, config?: EditorConfig) => void;
};
