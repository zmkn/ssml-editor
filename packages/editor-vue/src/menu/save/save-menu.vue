<template>
  <Button icon-class="iconfont-ssml-editor icon-ssml-editor-baocun" @click="saveHandler">保存</Button>
</template>

<script setup lang="ts">
import { EditorService } from '@ssml-editor/core';
import { type BaseEditor, type EditorConfig, Button } from '@ssml-editor/vue';
import { ElMessage } from 'element-plus';

const { config, editor } = defineProps<{ config?: EditorConfig, editor?: BaseEditor }>()
const editorService = config ? new EditorService(config.storageName, config.html) : undefined;

async function saveHandler() {
  try {
    if (editor && editorService && await editorService.saveHtml(editor.html)) {
      ElMessage.success({ message: '保存成功!', grouping: true })
    } else {
      ElMessage.error({ message: '保存失败!', grouping: true })
    }
  } catch (error) {
    ElMessage.error({ message: '保存失败!', grouping: true })
  }
}
</script>

<style scoped></style>
