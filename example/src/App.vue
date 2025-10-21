<template>
  <div class="editor-view-container">
    <Editor ref="editor" :config="config" @created="createdHandler" @change="changeHandler"
      @selection-change="selectionChangeHandler" @value-change="valueChangeHandler" @destroyed="destroyedHandler"
      @focus="focusHandler" @blur="blurHandler" @max-length="maxLengthHandler" @warning="warningHandler"
      @error="errorHandler"></Editor>
  </div>
</template>

<script setup lang="ts">
import type { Warning } from '@ssml-editor/base';
import { type BaseEditor, Editor } from '@ssml-editor/vue';
import { ElMessage } from 'element-plus';
import type { Operation } from 'slate-vue3/core';
import { useTemplateRef } from 'vue';
import config from './config';

const editorRef = useTemplateRef('editor');

function createdHandler(
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) {
  console.log('createdHandler', editorRef.value?.editor, editor, htmlElement);
}

function changeHandler(
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
  options?: { operation?: Operation },
) {
  console.log('changeHandler', editor, htmlElement, options);
}

function selectionChangeHandler(
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
  options?: { operation?: Operation },
) {
  console.log('selectionChangeHandler', editor, htmlElement, options);
}

function valueChangeHandler(
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
  options?: { operation?: Operation },
) {
  console.log('valueChangeHandler', editor, htmlElement, options);
}

function destroyedHandler(
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) {
  console.log('destroyedHandler', editor, htmlElement);
}

function focusHandler(editor: BaseEditor, htmlElement: HTMLDivElement | null) {
  console.log('focusHandler', editor, htmlElement);
}

function blurHandler(editor: BaseEditor, htmlElement: HTMLDivElement | null) {
  console.log('blurHandler', editor, htmlElement);
}

function maxLengthHandler(
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) {
  console.log('maxLengthHandler', editor, htmlElement);
}

function warningHandler(warning: Warning) {
  ElMessage.warning({ message: warning.message, grouping: true });
}

function errorHandler(error: Error) {
  ElMessage.error({ message: error.message, grouping: true });
}
</script>

<style scoped>
.editor-view-container {
  padding: 20px;
}
</style>
