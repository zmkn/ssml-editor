import { SPEAK_HTML_NODE_NAME, SPEAK_TYPE } from '@/module';
import { HtmlUtils } from '@ssml-editor/core';
import {
  PARAGRAPH_HTML_NODE_NAME,
  PARAGRAPH_MARK,
  PARAGRAPH_TYPE,
  type BaseEditor,
  type EditorPlugin,
} from '@ssml-editor/vue';

export const pastePlugin: EditorPlugin = (editor: BaseEditor): BaseEditor => {
  const { insertData } = editor;

  const newEditor = editor;

  /**
   * 自定义剪贴板粘贴行为
   * 1. 放行编辑器自身的粘贴行为
   * 2. 本编辑器生成的html使用text/html格式粘贴
   * 3. 其他粘贴行为一律使用文本粘贴
   */
  newEditor.insertData = (data: DataTransfer) => {
    if (!data.types.includes('application/x-slate-fragment')) {
      const text = data.getData('text/plain').trim();
      // 判断是否为本编辑器生成的html
      if (
        text.startsWith(
          `<${PARAGRAPH_HTML_NODE_NAME} ${HtmlUtils.typeKey}="${PARAGRAPH_TYPE}" data-mark="${PARAGRAPH_MARK}">`,
        ) ||
        text.startsWith(
          `<${SPEAK_HTML_NODE_NAME} ${HtmlUtils.typeKey}="${SPEAK_TYPE}"`,
        )
      ) {
        data.setData('text/html', text);
      }
    }
    insertData(data);
  };

  return newEditor;
};
