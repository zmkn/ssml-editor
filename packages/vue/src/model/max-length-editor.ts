import type { HtmlEditor } from './html-editor';

export interface MaxLengthEditor extends HtmlEditor {
  getLength(): number;
  getLeftLength(): number;
}
