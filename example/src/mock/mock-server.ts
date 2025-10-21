import type { LabelValue } from '@ssml-editor/core';
import type {
  FetchSoundParams,
  FetchVoiceParams,
  SearchSoundParams,
  SearchVoiceParams,
} from '@ssml-editor/editor-vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import sounds from './sounds';
import voiceBgms from './voice-bgms';
import voiceCategories from './voice-categories';
import voices from './voices';

const mock = new MockAdapter(axios);

mock.onGet('/voice/category').reply(() => {
  const data: LabelValue[] = voiceCategories;
  return [200, data];
});

mock.onGet('/voices').reply((config) => {
  const params = config.params as FetchVoiceParams & SearchVoiceParams;
  let data = voices;
  if (typeof params.word === 'string') {
    data = data.filter((v) => v.name.includes(params.word as string));
  }

  if (params.category === 'public') {
    return [200, data.slice(0, 5)];
  }
  if (params.category === 'my') {
    return [200, data.slice(5, 10)];
  }
  return [200, data];
});

mock.onGet('/sound/category').reply(() => {
  const data: LabelValue[] = voiceCategories;
  return [200, data];
});

mock.onGet('/sounds').reply((config) => {
  const params = config.params as FetchSoundParams & SearchSoundParams;
  let data = sounds;
  if (typeof params.word === 'string') {
    data = data.filter((v) => v.name.includes(params.word as string));
  }

  if (params.category === 'public') {
    return [200, data.slice(0, 5)];
  }
  if (params.category === 'my') {
    return [200, data.slice(5, 10)];
  }
  return [200, data];
});

mock.onGet('/bgms').reply((config) => {
  const { page } = config.params as { page: number };
  let data: LabelValue[];
  if (page === 1) {
    data = voiceBgms.slice(0, 3);
  } else {
    data = voiceBgms.slice(3);
  }
  return [200, data];
});
