import type { EventListener } from '@/type';
import type { BaseEditor } from 'slate-vue3/core';
import { type Option } from 'typescript-event-emitter';

export interface EventEditor extends BaseEditor {
  on(event: string, listener: EventListener, option?: Option): void;
  once(event: string, listener: EventListener, option?: Option): void;
  off(event: string, listener: EventListener): void;
  emit(event: string, ...args: any[]): void;
}
