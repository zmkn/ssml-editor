import type { HowlCallback, HowlErrorCallback } from 'howler';
import type { AudioPlayerStatus } from './audio-player.enum';

export type ErrorChangeListener = (error: unknown, soundId?: number) => void;
export type StatusChangeListener = (
  status: AudioPlayerStatus,
  soundId?: number,
) => void;
export type ExtListener = ErrorChangeListener | StatusChangeListener;
export type HowlListener = HowlCallback | HowlErrorCallback;
export type ExtEvent = 'statuschange' | 'errorchange';
export type HowlEvent =
  | 'load'
  | 'loaderror'
  | 'playerror'
  | 'play'
  | 'end'
  | 'pause'
  | 'stop'
  | 'mute'
  | 'volume'
  | 'rate'
  | 'seek'
  | 'fade'
  | 'unlock';
