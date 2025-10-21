import type { RenderElementProps as SlateRenderElementProps } from 'slate-vue3';
import type { BaseElement, Descendant } from 'slate-vue3/core';
import type { VNode } from 'vue';
import type { BaseEditor } from './base-editor';
import type { EditorPlugin } from './editor-plugin';

export type RenderElementProps = Omit<SlateRenderElementProps, 'editor'> & {
  editor: BaseEditor;
};

export type EditorRenderElementMethod = (props: RenderElementProps) => VNode;

export type EditorElementToHtmlMethodProps = {
  element: BaseElement;
  childrenHtml: string;
};

export type EditorElementToHtmlMethod = (
  props: EditorElementToHtmlMethodProps,
) => string;

export type EditorHtmlToElementMethodProps = {
  element: Element;
  children: Descendant[];
};

export type EditorHtmlToElementMethod = (
  props: EditorHtmlToElementMethodProps,
) => BaseElement;

export type EditorSerializationMethod = <T extends BaseElement>(
  node: T,
  children?: string,
) => string;

export type EditorModule = {
  name: string;
  type: string;
  renderElement?: EditorRenderElementMethod;
  elementToHtml?: EditorElementToHtmlMethod;
  htmlToElement?: EditorHtmlToElementMethod;
  plugin?: EditorPlugin;
  serializer?: EditorSerializationMethod;
};
