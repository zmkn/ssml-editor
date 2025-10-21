<template>
  <row-container v-if="config?.footer" :align="config?.footer?.align" :style="config?.footer?.style">
    <component v-for="(menu, index) in config?.footer?.menus" :key="index" :is="menu.component" v-bind="menu.props"
      :editor="editor" :config="config" />
  </row-container>
</template>

<script setup lang="ts">
import { RowContainer } from '@/component';
import { type EditorConfig } from '@/model';
import type { BaseEditor } from '@/type';

const { config, editor } = defineProps<{
  config?: EditorConfig;
  editor?: BaseEditor;
}>();
</script>
