import {
  EventEmitter as TEventEmitter,
  type GlobalOption,
  type Option,
} from 'typescript-event-emitter';
import type { EventEmitterModel } from './event-emitter.model';
import type { EventEmitterListener } from './event-emitter.type';

export class EventEmitter<Events extends Record<string, any[]>>
  implements EventEmitterModel<Events>
{
  constructor(globalOption?: GlobalOption) {
    this._eventEmitter = new TEventEmitter(globalOption);
  }

  private _eventEmitter: TEventEmitter;

  on<K extends keyof Events>(
    event: K,
    listener: EventEmitterListener<K, Events>,
    option?: Option,
  ): void {
    this._eventEmitter.on(event as string, listener, option);
  }

  once<K extends keyof Events>(
    event: K,
    listener: EventEmitterListener<K, Events>,
    option?: Option,
  ): void {
    const wrappedListener: EventEmitterListener<K, Events> = (
      eventName: string,
      ...args: Events[K]
    ) => {
      listener(eventName, ...args);
      this._eventEmitter.off(event as string, wrappedListener);
    };
    this._eventEmitter.on(event as string, listener, option);
  }

  off<K extends keyof Events>(
    event: K,
    listener: EventEmitterListener<K, Events>,
  ): void {
    this._eventEmitter.off(event as string, listener);
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    this._eventEmitter.emit(event as string, ...args);
  }
}
