import type { LabelValue } from '@ssml-editor/core';
import type {
  FetchSoundParams,
  ResponseVoice,
  SearchSoundParams,
  SearchVoiceParams,
  Sound,
} from '@ssml-editor/editor-vue';
import axios from 'axios';
import '../mock';

export async function voiceCategories(): Promise<LabelValue[]> {
  const resp = await axios.get('/voice/category');
  return resp.data;
}

export async function voices(filter: any): Promise<ResponseVoice[]> {
  const resp = await axios.get('/voices', { params: { ...filter } });
  return resp.data;
}

export async function searchVoices(
  params: SearchVoiceParams,
): Promise<ResponseVoice[]> {
  const resp = await axios.get('/voices', { params });
  return resp.data;
}

export async function soundCategories(): Promise<LabelValue[]> {
  const resp = await axios.get('/sound/category');
  return resp.data;
}

export async function sounds(params: FetchSoundParams): Promise<Sound[]> {
  const resp = await axios.get('/sounds', { params });
  return resp.data;
}

export async function searchSounds(
  params: SearchSoundParams,
): Promise<Sound[]> {
  const resp = await axios.get('/sounds', { params });
  return resp.data;
}

export async function bgms(page: number): Promise<LabelValue[]> {
  const resp = await axios.get('/bgms', { params: { page } });
  return resp.data;
}
