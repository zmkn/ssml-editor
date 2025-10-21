import type { HtmlEditor, MaxLengthEditor } from '@/model';
import { EditorUtils } from '@/util';

export const withMaxLength = <T extends HtmlEditor>(
  editor: T,
  maxLength?: number,
): T & MaxLengthEditor => {
  const newEditor = editor as T & MaxLengthEditor;

  newEditor.getLength = (): number => {
    if (editor.children.length > 0) {
      return EditorUtils.getLength(editor, []);
    } else {
      return 0;
    }
  };

  newEditor.getLeftLength = (): number => {
    if (maxLength && maxLength > 0) {
      return maxLength - newEditor.getLength();
    } else {
      return Infinity;
    }
  };

  return newEditor;
};
