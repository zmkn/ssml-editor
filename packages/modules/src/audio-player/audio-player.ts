import {
  Howl,
  Howler,
  type HowlCallback,
  type HowlErrorCallback,
  type HowlOptions,
} from 'howler';
import { isFunction } from 'is-what';
import { AudioPlayerStatus } from './audio-player.enum';
import type {
  ErrorChangeListener,
  ExtEvent,
  ExtListener,
  HowlEvent,
  HowlListener,
  StatusChangeListener,
} from './audio-player.type';

Howler.html5PoolSize = 100;

export class AudioPlayer extends Howl {
  constructor(options: HowlOptions) {
    options = { ...AudioPlayer.DefaultOptions, ...options };
    super(options);
    this.options = options;
    this.initEvents();
  }

  private _error: unknown = undefined;
  private _status: AudioPlayerStatus = AudioPlayerStatus.UNLOADED;
  private _soundId: number | undefined = undefined;
  private _eventListeners: Record<ExtEvent, ExtListener[]> = {
    errorchange: [],
    statuschange: [],
  };

  options: HowlOptions;

  get error(): unknown {
    return this._error;
  }

  set error(value: unknown) {
    if (value !== this._error) {
      this._error = value;
      this._eventListeners['errorchange'].forEach((callback: ExtListener) => {
        (callback as ErrorChangeListener)(value, this._soundId);
      });
    }
  }

  get status(): AudioPlayerStatus {
    return this._status;
  }

  set status(value: AudioPlayerStatus) {
    if (value !== this._status) {
      this._status = value;
      this._eventListeners['statuschange'].forEach((callback: ExtListener) => {
        (callback as StatusChangeListener)(value, this._soundId);
      });
    }
  }

  get soundId(): number | undefined {
    return this._soundId;
  }

  set soundId(value: number | undefined) {
    if (value !== this._soundId) {
      this._soundId = value;
    }
  }

  private initEvents() {
    this.on('loaderror', (soundId: number, error: unknown) => {
      this.soundId = soundId;
      this.error = error;
      this.status = AudioPlayerStatus.LOAD_ERROR;
    });
    this.on('playerror', (soundId: number, error: unknown) => {
      this.soundId = soundId;
      this.error = error;
      this.status = AudioPlayerStatus.PLAY_ERROR;
    });
    this.on('load', () => {
      const status = AudioPlayerStatus.fromString(this.state());
      if (status) {
        this.status = status;
      }
    });
    this.on('play', (soundId: number) => {
      this.soundId = soundId;
      this.status = AudioPlayerStatus.PLAYING;
    });
    this.on('pause', (soundId: number) => {
      this.soundId = soundId;
      this.status = AudioPlayerStatus.PAUSING;
    });
    this.on('stop', (soundId: number) => {
      this.soundId = soundId;
      this.status = AudioPlayerStatus.STOPPING;
    });
    this.on('end', (soundId: number) => {
      this.soundId = soundId;
      this.status = AudioPlayerStatus.ENDED;
    });
  }

  override on(event: 'errorchange', callback: ErrorChangeListener): this;
  override on(event: 'statuschange', callback: StatusChangeListener): this;
  override on(event: 'load', callback: () => void, id?: number): this;
  override on(
    event: 'loaderror' | 'playerror',
    callback: HowlErrorCallback,
    id?: number,
  ): this;
  override on(
    event:
      | 'play'
      | 'end'
      | 'pause'
      | 'stop'
      | 'mute'
      | 'volume'
      | 'rate'
      | 'seek'
      | 'fade'
      | 'unlock',
    callback: HowlCallback,
    id?: number,
  ): this;
  override on(
    event: HowlEvent | ExtEvent,
    callback: HowlListener | ExtListener,
    id?: number,
  ): this {
    if (event === 'errorchange' || event === 'statuschange') {
      this._eventListeners[event].unshift(callback as any);
      return this;
    } else {
      return super.on(event, callback as HowlListener, id);
    }
  }

  override off(): this;
  override off(event: 'errorchange', callback?: ErrorChangeListener): this;
  override off(event: 'statuschange', callback?: StatusChangeListener): this;
  override off(event: 'load', callback?: () => void, id?: number): this;
  override off(
    event: 'loaderror' | 'playerror',
    callback?: HowlErrorCallback,
    id?: number,
  ): this;
  override off(
    event:
      | 'play'
      | 'end'
      | 'pause'
      | 'stop'
      | 'mute'
      | 'volume'
      | 'rate'
      | 'seek'
      | 'fade'
      | 'unlock',
    callback?: HowlCallback,
    id?: number,
  ): this;
  override off(event: HowlEvent, id: number): this;
  override off(
    event?: HowlEvent | ExtEvent,
    callback?: number | HowlListener | ExtListener,
    id?: number,
  ): this {
    if (event) {
      if (event === 'errorchange' || event === 'statuschange') {
        if (!callback) {
          this._eventListeners[event] = [];
        } else if (isFunction(callback)) {
          this._eventListeners[event] = this._eventListeners[event].filter(
            (item) => {
              return item !== callback;
            },
          );
        }
        return this;
      } else {
        return super.off(event, callback as HowlListener, id);
      }
    } else {
      this._eventListeners['errorchange'] = [];
      this._eventListeners['statuschange'] = [];
      return super.off(event, callback as HowlListener, id);
    }
  }

  override once(event: 'errorchange', callback: ErrorChangeListener): this;
  override once(event: 'statuschange', callback: StatusChangeListener): this;
  override once(event: 'load', callback: () => void, id?: number): this;
  override once(
    event: 'loaderror' | 'playerror',
    callback: HowlErrorCallback,
    id?: number,
  ): this;
  override once(
    event:
      | 'play'
      | 'end'
      | 'pause'
      | 'stop'
      | 'mute'
      | 'volume'
      | 'rate'
      | 'seek'
      | 'fade'
      | 'unlock',
    callback: HowlCallback,
    id?: number,
  ): this;
  override once(
    event: HowlEvent | ExtEvent,
    callback: HowlListener | ExtListener,
    id?: number,
  ): this {
    if (event === 'errorchange' || event === 'statuschange') {
      const wrapper = (...args: any[]) => {
        (callback as any).apply(this, args);
        this.off(event as 'errorchange', wrapper);
      };
      this._eventListeners[event].unshift(wrapper);
      return this;
    } else {
      return super.once(event, callback as HowlListener, id);
    }
  }

  static DefaultOptions: HowlOptions = {
    src: [],
    html5: true,
    preload: 'metadata',
  };
}
