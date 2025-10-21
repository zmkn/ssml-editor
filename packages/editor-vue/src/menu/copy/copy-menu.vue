<template>
  <Button icon-class="iconfont-ssml-editor icon-ssml-editor-fuzhi" @click="menuClickHandler">复制</Button>
</template>

<script setup lang="ts">
import { type BaseEditor, type EditorConfig, Button } from '@ssml-editor/vue';
import { ElMessage } from 'element-plus';

const { editor } = defineProps<{ config?: EditorConfig, editor?: BaseEditor }>()

/**
 * 复制ssml到剪贴板
 * @param isFormat 是否格式化ssml(多余的空格和换行可能会导致意外的停顿)
 */
async function copy(code: string) {
  await navigator.clipboard.writeText(code)
  ElMessage.success({ message: '复制成功!', grouping: true })
}

function menuClickHandler() {
  if (editor) {
    const codes = editor.serializeAndNormalize()
    copy(codes.join(''))
  }
}
</script>

<style scoped></style>
