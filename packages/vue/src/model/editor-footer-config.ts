import type { RowContainerAlign } from '@/component';
import type { EditorMenuConfig } from '@/type';
import type { Component, StyleValue } from 'vue';

export interface EditorFooterConfig {
  menus?: EditorMenuConfig<Component>[];
  align?: RowContainerAlign;
  style?: StyleValue;
}
