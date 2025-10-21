import type { BaseElement } from '@ssml-editor/vue';
import type { SAY_AS_TYPE } from './constant';
import type { SayAsInterpretation } from './say-as-interpretation.enum';

export interface SayAs extends BaseElement {
  type: typeof SAY_AS_TYPE;
  interpretAs: SayAsInterpretation;
}
