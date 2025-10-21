import type { BaseEditor } from 'slate-vue3/core';

export interface HtmlEditor extends BaseEditor {
  html: string;
  htmlElement: HTMLDivElement | null;
  setHtml(html: string): void;
}
