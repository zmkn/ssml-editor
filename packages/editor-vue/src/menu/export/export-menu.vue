<template>
  <Button icon-class="iconfont-ssml-editor icon-ssml-editor-daochu" @click="menuClickHandler">导出</Button>
</template>

<script setup lang="ts">
import { type BaseEditor, type EditorConfig, Button } from '@ssml-editor/vue';
import dayjs from 'dayjs';
import { CodeUtils } from '../code/code-utils';
import { FileUtils } from './file-utils';

const { editor } = defineProps<{ config?: EditorConfig, editor?: BaseEditor }>()

function formatCodes(codes: string[]): string {
  return codes.map(code => {
    return CodeUtils.format(code)
  }).join('\n')
}

function menuClickHandler() {
  if (editor) {
    const codes = editor.serializeAndNormalize()
    const code = formatCodes(codes)
    const fileName = `ssml-raw-${dayjs().format('YYYY-MM-DDTHH:mm:ss')}.txt`
    FileUtils.export(fileName, code)
  }
}
</script>

<style scoped></style>
