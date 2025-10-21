import { type BaseEditor, type EditorPlugin } from '@ssml-editor/vue';

export const newLinePlugin: EditorPlugin = (editor: BaseEditor): BaseEditor => {
  const { insertText } = editor;

  const newEditor = editor;

  const insertNewLine = () => {
    insertText('\n');
  };

  /**
   * 绑定 keydown 事件，当按下 shift + enter 键时插入 \n 换行符
   */
  editor.once(
    'created',
    (
      _eventName: string,
      _editor: BaseEditor,
      htmlElement: HTMLDivElement | null,
    ) => {
      htmlElement?.addEventListener('keydown', (event: KeyboardEvent) => {
        const isShift = event.shiftKey;
        if (event.key === 'Enter') {
          event.preventDefault();
          if (isShift) {
            insertNewLine();
          } else {
            newEditor.insertBreak();
          }
        }
      });
    },
  );

  return newEditor;
};
