<template>
  <div class="se-bgm-container">
    <el-select v-model="model" clearable placeholder="Select" size="small">
      <el-option v-for="item in dataList" :key="item.value" :label="item.label" :value="item.value as string" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import type { LabelValue } from '@ssml-editor/core';
import { ElOption, ElSelect } from 'element-plus';

const model = defineModel<string>({ default: '' });
const { dataList = [] } = defineProps<{ dataList?: LabelValue[] }>();
</script>

<style scoped>
@reference "tailwindcss";

.se-bgm-container {
  @apply box-border border border-(--el-border-color) border-solid text-center overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center pl-2 pr-2 h-50;
}
</style>
