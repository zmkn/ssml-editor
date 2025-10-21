import type { FetchLabelValueFunction } from '@/index';
import type { LabelValue } from '@ssml-editor/core';

export type SpeakProps = {
  rates?: LabelValue[];
  pitches?: LabelValue[];
  effects?: LabelValue[];
  fetchBgms?: FetchLabelValueFunction;
};
