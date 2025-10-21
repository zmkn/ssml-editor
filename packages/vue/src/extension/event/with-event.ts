import type { EventEditor } from '@/model/event-editor';
import type { EventListener } from '@/type';
import { EventEmitter } from '@ssml-editor/modules';
import type { BaseEditor } from 'slate-vue3/core';
import { type Option } from 'typescript-event-emitter';

export const withEvent = <T extends BaseEditor>(editor: T): T & EventEditor => {
  const newEditor = editor as T & EventEditor;
  const eventEmitter = new EventEmitter();

  newEditor.on = (event: string, listener: EventListener, option?: Option) => {
    eventEmitter.on(event, listener, option);
  };

  newEditor.once = (
    event: string,
    listener: EventListener,
    option?: Option,
  ) => {
    eventEmitter.once(event, listener, option);
  };

  newEditor.off = (event: string, listener: EventListener) => {
    eventEmitter.off(event, listener);
  };

  newEditor.emit = (event: string, ...args: any[]) => {
    eventEmitter.emit(event, ...args);
  };

  return newEditor;
};
