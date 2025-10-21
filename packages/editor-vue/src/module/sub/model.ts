import type { BaseElement } from '@ssml-editor/vue';
import type { SUB_TYPE } from './constant';

export interface Sub extends BaseElement {
  type: typeof SUB_TYPE;
  alias: string;
}
