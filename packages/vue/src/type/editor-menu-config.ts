import type { Component } from 'vue';

export type EditorMenuConfig<T extends Component> = {
  component: T;
  props?: Record<string, any>;
};
