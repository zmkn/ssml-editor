import type { BaseElement } from '@ssml-editor/vue';
import type { Alphabet } from './alphabet.enum';
import type { PHONEME_TYPE } from './constant';

export interface Phoneme extends BaseElement {
  type: typeof PHONEME_TYPE;
  alphabet: Alphabet;
  ph: string;
}
