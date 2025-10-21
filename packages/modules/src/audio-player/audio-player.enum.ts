export enum AudioPlayerStatus {
  LOAD_ERROR = 'loadError',
  PLAY_ERROR = 'playError',
  UNLOADED = 'unloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  PLAYING = 'playing',
  PAUSING = 'pausing',
  STOPPING = 'stopping',
  ENDED = 'ended',
}

export namespace AudioPlayerStatus {
  export function fromString(
    audioPlayerStatus: string,
  ): AudioPlayerStatus | undefined {
    switch (audioPlayerStatus) {
      case 'loadError':
        return AudioPlayerStatus.LOAD_ERROR;
      case 'playError':
        return AudioPlayerStatus.PLAY_ERROR;
      case 'unloaded':
        return AudioPlayerStatus.UNLOADED;
      case 'loading':
        return AudioPlayerStatus.LOADING;
      case 'loaded':
        return AudioPlayerStatus.LOADED;
      case 'playing':
        return AudioPlayerStatus.PLAYING;
      case 'pausing':
        return AudioPlayerStatus.PAUSING;
      case 'stopping':
        return AudioPlayerStatus.STOPPING;
      case 'ended':
        return AudioPlayerStatus.ENDED;
      default:
        return undefined;
    }
  }
}
