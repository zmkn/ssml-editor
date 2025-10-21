import type { LabelValue } from '@ssml-editor/core';

export type FetchLabelValueFunction = (page?: number) => Promise<LabelValue[]>;
