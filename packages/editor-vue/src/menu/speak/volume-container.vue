<template>
  <div class="se-volume-container">
    <el-slider height="6.25rem" vertical v-model="model" :min="0" :max="100" />
  </div>
</template>

<script setup lang="ts">
import { ElSlider } from 'element-plus';

const model = defineModel<number>({ default: 100 });
</script>

<style scoped>
@reference "tailwindcss";

.se-volume-container {
  @apply box-border border border-(--el-border-color) border-solid text-center overflow-x-hidden overflow-y-auto h-50;
}
</style>
