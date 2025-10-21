import type { FetchLabelValueFunction } from '@/index.type';
import type {
  FetchVoiceParams,
  ResponseVoice,
  SearchVoiceParams,
} from './model';

export type FetchVoiceFunction = (
  params: FetchVoiceParams,
) => Promise<ResponseVoice[]>;

export type SearchVoiceFunction = (
  params: SearchVoiceParams,
) => Promise<ResponseVoice[]>;

export type VoiceProps = {
  categoryPageSize?: number;
  voicePageSize?: number;
  fetchVoices?: FetchVoiceFunction;
  fetchCategories?: FetchLabelValueFunction;
  searchVoices?: SearchVoiceFunction;
};
