export type EventEmitterListener<
  K extends keyof Events,
  Events extends Record<string, any[]>,
> = (eventName: string, ...args: Events[K]) => void | Promise<void>;
