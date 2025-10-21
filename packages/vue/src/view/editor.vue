<template>
  <div class="se-editor">
    <slot name="header" :config="newConfig" :editor="editorRef"></slot>
    <slot name="toolbar" :config="newConfig" :editor="editorRef">
      <editor-toolbar :config="newConfig" :editor="editorRef"></editor-toolbar>
    </slot>
    <slot name="textArea" :config="newConfig" :on-created="editorTextAreaOnCreatedHandler"
      :on-change="editorTextAreaOnChangeHandler" :on-selection-change="editorTextAreaOnSelectionChangeHandler"
      :on-value-change="editorTextAreaOnValueChangeHandler" :on-destroyed="editorTextAreaOnDestroyedHandler"
      :on-focus="editorTextAreaOnFocusHandler" :on-blur="editorTextAreaOnBlurHandler"
      :on-max-length="editorTextAreaOnMaxLengthHandler">
      <editor-text-area :config="newConfig" @created="editorTextAreaOnCreatedHandler"
        @change="editorTextAreaOnChangeHandler" @selection-change="editorTextAreaOnSelectionChangeHandler"
        @value-change="editorTextAreaOnValueChangeHandler" @destroyed="editorTextAreaOnDestroyedHandler"
        @focus="editorTextAreaOnFocusHandler" @blur="editorTextAreaOnBlurHandler"
        @max-length="editorTextAreaOnMaxLengthHandler"></editor-text-area>
    </slot>
    <slot name="footer" :config="newConfig" :editor="editorRef">
      <editor-footer :config="newConfig" :editor="editorRef"></editor-footer>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { EditorConfig } from '@/model';
import { type BaseEditor } from '@/type';
import { Warning } from '@ssml-editor/base';
import type { Operation } from 'slate-vue3/core';
import { computed, onErrorCaptured, shallowRef } from 'vue';
import EditorFooter from './editor-footer.vue';
import EditorTextArea from './editor-text-area.vue';
import EditorToolbar from './editor-toolbar.vue';

const { config } = defineProps<{ config?: EditorConfig }>();
const emit = defineEmits<{
  created: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  change: [
    editor: BaseEditor,
    htmlElement: HTMLDivElement | null,
    options?: { operation?: Operation },
  ];
  selectionChange: [
    editor: BaseEditor,
    htmlElement: HTMLDivElement | null,
    options?: { operation?: Operation },
  ];
  valueChange: [
    editor: BaseEditor,
    htmlElement: HTMLDivElement | null,
    options?: { operation?: Operation },
  ];
  destroyed: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  focus: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  blur: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  maxLength: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  error: [error: Error];
  warning: [warning: Warning];
}>();
const editorRef = shallowRef<BaseEditor>();
const newConfig = computed(() => generateConfig(config));

const editorTextAreaOnCreatedHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) => {
  editorRef.value = editor;
  emit('created', editor, htmlElement);
};

const editorTextAreaOnChangeHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
  options?: { operation?: Operation },
) => {
  emit('change', editor, htmlElement, options);
};

const editorTextAreaOnSelectionChangeHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
  options?: { operation?: Operation },
) => {
  emit('selectionChange', editor, htmlElement, options);
};

const editorTextAreaOnValueChangeHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
  options?: { operation?: Operation },
) => {
  emit('valueChange', editor, htmlElement, options);
};

const editorTextAreaOnDestroyedHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) => {
  editorRef.value = undefined;
  emit('destroyed', editor, htmlElement);
};

const editorTextAreaOnFocusHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) => {
  emit('focus', editor, htmlElement);
};

const editorTextAreaOnBlurHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) => {
  emit('blur', editor, htmlElement);
};

const editorTextAreaOnMaxLengthHandler = (
  editor: BaseEditor,
  htmlElement: HTMLDivElement | null,
) => {
  emit('maxLength', editor, htmlElement);
};

defineExpose({
  editor: editorRef,
});

onErrorCaptured((error: Error): boolean => {
  if (Warning.isWarning(error)) {
    emit('warning', error);
    return false;
  } else if (Error.isError(error)) {
    emit('error', error);
    return false;
  }
  return true;
});
</script>

<script lang="ts">
import { DefaultEditorConfig } from '@/constant';
import { ParagraphModule } from '@/editor';
import { type EditorModule } from '@/type';
import { assign, merge } from 'lodash';

export const generateConfig = (
  config?: EditorConfig,
): Readonly<EditorConfig & { modules: EditorModule[] }> => {
  return assign(merge({}, DefaultEditorConfig, config), {
    modules: [ParagraphModule, ...(config?.modules || [])],
  });
};
</script>
