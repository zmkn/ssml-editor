import type {
  EventEditor,
  ExtEditor,
  HtmlEditor,
  MaxLengthEditor,
  SerializationEditor,
} from '@/model';
import type { BaseEditor as SlateBaseEditor } from 'slate-vue3/core';
import type { DOMEditor } from 'slate-vue3/dom';
import type { HistoryEditor } from 'slate-vue3/history';

export type BaseEditor = SlateBaseEditor &
  DOMEditor &
  HistoryEditor &
  SerializationEditor &
  ExtEditor &
  HtmlEditor &
  MaxLengthEditor &
  EventEditor;
