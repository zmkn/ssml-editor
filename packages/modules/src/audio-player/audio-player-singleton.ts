import { type HowlOptions } from 'howler';
import { AudioPlayer } from './audio-player';
import type { AudioPlayerSingletonModel } from './audio-player-singleton.model';

export const AudioPlayerSingleton: AudioPlayerSingletonModel = {
  player: undefined,

  init(options: HowlOptions): AudioPlayerSingletonModel {
    if (this.player) {
      this.player.stop().unload();
    }
    this.player = new AudioPlayer(options);
    return this;
  },
  play(): AudioPlayerSingletonModel {
    this.player?.play();
    return this;
  },
  pause(): AudioPlayerSingletonModel {
    this.player?.pause();
    return this;
  },
  stop(): AudioPlayerSingletonModel {
    this.player?.stop();
    return this;
  },
  load(): AudioPlayerSingletonModel {
    this.player?.load();
    return this;
  },
  unload(): AudioPlayerSingletonModel {
    this.player?.unload();
    return this;
  },
};
