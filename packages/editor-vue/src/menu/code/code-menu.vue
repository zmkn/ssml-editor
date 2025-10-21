<template>
  <Button icon-class="iconfont-ssml-editor icon-ssml-editor-code" @click="menuClickHandler">SSML</Button>
  <Dialog title="查看SSML" width="80%" :alignCenter="true" :destroyOnClose="true" v-model="dialogVisible">
    <div class="se-code-wrapper">
      <highlightjs language="xml" :code="code" />
    </div>
    <template #header>
      <el-button type="info" @click="copy(false)">复制+关闭</el-button>
      <el-button type="primary" @click="copy(true)">压缩+复制+关闭(推荐)</el-button>
    </template>
    <template #footer>
      <el-button type="info" @click="copy(false)">复制+关闭</el-button>
      <el-button type="primary" @click="copy(true)">压缩+复制+关闭(推荐)</el-button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from '@/component';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import { Button, type BaseEditor } from '@ssml-editor/vue';
import { ElButton, ElMessage } from 'element-plus';
import 'highlight.js/lib/common';
import { ref, type Ref } from 'vue';
import { CodeUtils } from './code-utils';

const highlightjs = hljsVuePlugin.component;
const { editor } = defineProps<{
  editor?: BaseEditor;
}>();
const dialogVisible = ref(false);
const code = ref('');
const codes: Ref<string[]> = ref([]);

function show() {
  dialogVisible.value = true;
}

function hide() {
  dialogVisible.value = false;
}

function formatCodes(codes: string[]): string {
  return codes
    .map((code) => {
      return CodeUtils.format(code);
    })
    .join('\n');
}

/**
 * 复制ssml到剪贴板
 * @param isFormat 是否格式化ssml(多余的空格和换行可能会导致意外的停顿)
 */
async function copy(isFormat: boolean) {
  await navigator.clipboard.writeText(
    isFormat ? codes.value.join('') : code.value,
  );
  hide();
  ElMessage.success({ message: '复制成功!', grouping: true });
}

function menuClickHandler() {
  if (editor) {
    codes.value = editor.serializeAndNormalize();
    code.value = formatCodes(codes.value);
    show();
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.se-code-wrapper {
  :deep(> pre) {
    @apply my-[0];
  }

  @apply border border-solid border-gray-200 rounded-sm overflow-x-auto overflow-y-auto whitespace-pre-wrap max-h-[50dvh];
}
</style>
