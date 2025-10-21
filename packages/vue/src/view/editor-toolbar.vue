<template>
  <row-container v-if="config?.toolbar" :align="config?.toolbar?.align" :style="config?.toolbar?.style">
    <component v-for="(menu, index) in config?.toolbar?.menus" :key="index" :is="menu.component" v-bind="menu.props"
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
