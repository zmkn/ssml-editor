import type { FetchLabelValueFunction } from '@/index.type';
import type { FetchSoundParams, SearchSoundParams, Sound } from './model';

export type FetchSoundFunction = (params: FetchSoundParams) => Promise<Sound[]>;

export type SearchSoundFunction = (
  params: SearchSoundParams,
) => Promise<Sound[]>;

export type SoundEventProps = {
  categoryPageSize?: number;
  soundPageSize?: number;
  fetchSounds?: FetchSoundFunction;
  fetchCategories?: FetchLabelValueFunction;
  searchSounds?: SearchSoundFunction;
};
