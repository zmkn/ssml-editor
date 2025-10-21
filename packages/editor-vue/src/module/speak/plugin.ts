import {
  type BaseEditor,
  type EditorPlugin,
  NodeUtils,
} from '@ssml-editor/vue';
import type { Element } from 'slate-vue3/core';
import { SPEAK_TYPE } from './constant';

function setTextFromPlaceholder(htmlElement: HTMLDivElement | null) {
  if (htmlElement) {
    const placeholderElement = htmlElement.querySelector(
      '[data-slate-placeholder="true"]',
    );
    if (placeholderElement) {
      placeholderElement.parentElement
        ?.querySelector('[data-slate-length="0"]')
        ?.setAttribute('data-text', placeholderElement.textContent);
    }
  }
}

export const speakPlugin: EditorPlugin = (editor: BaseEditor): BaseEditor => {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === SPEAK_TYPE) return false;
    return isInline(element);
  };

  newEditor.isVoid = (element: Element) => {
    const type = NodeUtils.getNodeType(element);
    if (type === SPEAK_TYPE) return false;
    return isVoid(element);
  };

  newEditor.once(
    'created',
    (
      _eventName: string,
      _editor: BaseEditor,
      htmlElement: HTMLDivElement | null,
    ) => {
      setTextFromPlaceholder(htmlElement);
    },
  );

  newEditor.on(
    'valueChange',
    (
      _eventName: string,
      _editor: BaseEditor,
      htmlElement: HTMLDivElement | null,
    ) => {
      setTextFromPlaceholder(htmlElement);
    },
  );

  return newEditor;
};
