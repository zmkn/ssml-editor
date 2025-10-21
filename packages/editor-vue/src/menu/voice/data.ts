import type { VoiceContentDataModel } from './model';

export class VoiceContentData implements VoiceContentDataModel {
  constructor(category?: string, voice?: string) {
    this.category = category;
    this.voice = voice;
  }

  category?: string;
  voice?: string;
}
