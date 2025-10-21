import type { SoundContentDataModel } from './model';

export class SoundContentData implements SoundContentDataModel {
  constructor(category?: string, sound?: string) {
    this.category = category;
    this.sound = sound;
  }

  category?: string;
  sound?: string;
}
