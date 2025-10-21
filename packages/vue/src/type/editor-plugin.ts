import type { BaseEditor } from "./base-editor";

export type EditorPlugin = (editor: BaseEditor) => BaseEditor;
