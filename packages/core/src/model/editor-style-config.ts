import type { Property } from 'csstype';

export interface EditorStyleConfig {
  height?: Property.Height<string>;
  minHeight?: Property.MinHeight<string>;
}
