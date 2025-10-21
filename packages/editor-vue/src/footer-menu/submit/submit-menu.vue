<template>
  <el-button type="primary" @click="submitHandler">提交</el-button>
</template>

<script setup lang="ts">
import { type BaseEditor, type EditorConfig } from '@ssml-editor/vue';
import { ElButton } from 'element-plus';
import type { SubmitProps } from './type';

const { editor, config, onClick } = defineProps<
  SubmitProps & { editor?: BaseEditor; config?: EditorConfig }
>();

async function submitHandler() {
  if (editor) {
    const code = editor.serializeAndNormalize().join('');
    onClick && onClick(code, editor, config);
  }
}
</script>

<style scoped></style>
