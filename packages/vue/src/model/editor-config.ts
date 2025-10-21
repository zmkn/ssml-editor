import type {
  EditorDecorate,
  EditorExt,
  EditorModule,
  EditorNormalization,
  EditorPlugin,
  EditorRenderChunk,
  EditorRenderLeaf,
  EditorRenderPlaceholder,
  EditorRenderText,
} from '@/type';
import type {
  EditorAnimationConfig,
  EditorHtmlConfig,
  EditorStyleConfig,
} from '@ssml-editor/core';
import type { EditorFooterConfig } from './editor-footer-config';
import type { EditorToolbarConfig } from './editor-toolbar-config';

export interface EditorConfig {
  storageName?: string;
  scroll?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  animation?: EditorAnimationConfig;
  html?: EditorHtmlConfig;
  style?: EditorStyleConfig;
  toolbar?: EditorToolbarConfig;
  footer?: EditorFooterConfig;
  plugins?: EditorPlugin[];
  modules?: EditorModule[];
  ext?: EditorExt;
  decorate?: EditorDecorate;
  renderLeaf?: EditorRenderLeaf;
  renderText?: EditorRenderText;
  renderChunk?: EditorRenderChunk;
  renderPlaceholder?: EditorRenderPlaceholder;
  normalizers?: EditorNormalization[];
}
