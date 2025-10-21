<template>
  <div class="se-toolbar-divider" :style="{
    width: width,
    height: height,
    marginLeft: marginLeft,
    marginRight: marginRight,
    backgroundColor: backgroundColor,
  }"></div>
</template>

<script setup lang="ts">
import type { ToolbarDividerProps } from './toolbar-divider.type';

const { width, height, marginLeft, marginRight, backgroundColor } =
  defineProps<ToolbarDividerProps>();
</script>

<style scoped>
@reference "tailwindcss";

.se-toolbar-divider {
  @apply overflow-hidden w-0.75 h-10 ml-2 mr-2 bg-gray-300;
}
</style>
