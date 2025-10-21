import type { HowlOptions } from 'howler';
import type { AudioPlayer } from './audio-player';

export interface AudioPlayerSingletonModel {
  player: AudioPlayer | undefined;
  init: (options: HowlOptions) => AudioPlayerSingletonModel;
  play: () => AudioPlayerSingletonModel;
  pause: () => AudioPlayerSingletonModel;
  stop: () => AudioPlayerSingletonModel;
  load: () => AudioPlayerSingletonModel;
  unload: () => AudioPlayerSingletonModel;
}
