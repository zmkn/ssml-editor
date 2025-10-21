import type { EventEmitterListener } from './event-emitter.type';

export interface EventEmitterModel<Events extends Record<string, any[]>> {
  emit<K extends keyof Events>(type: K, ...args: Events[K]): void;
  off<K extends keyof Events>(
    type: K,
    listener: EventEmitterListener<K, Events>,
  ): void;
  on<K extends keyof Events>(
    type: K,
    listener: EventEmitterListener<K, Events>,
  ): void;
  once<K extends keyof Events>(
    type: K,
    listener: EventEmitterListener<K, Events>,
  ): void;
}
