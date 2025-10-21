export interface ResponseVoice {
  id: string;
  name: string;
}

export interface FetchVoiceParams {
  category?: string;
}

export interface SearchVoiceParams {
  word?: string;
}

export interface VoiceContentDataModel {
  category?: string;
  voice?: string;
}
