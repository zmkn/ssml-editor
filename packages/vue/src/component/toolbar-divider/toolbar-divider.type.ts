import type { Property } from 'csstype';

export type ToolbarDividerProps = {
  width?: Property.Width<string>;
  height?: Property.Height<string>;
  marginLeft?: Property.MarginLeft<string>;
  marginRight?: Property.MarginRight<string>;
  backgroundColor?: Property.BackgroundColor;
};
