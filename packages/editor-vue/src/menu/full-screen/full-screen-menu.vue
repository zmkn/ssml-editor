<template>
  <Button icon-class="iconfont-ssml-editor icon-ssml-editor-quanping" @click="menuClickHandler">全屏</Button>
</template>

<script setup lang="ts">
import { type BaseEditor, Button } from '@ssml-editor/vue';

const { editor } = defineProps<{ editor?: BaseEditor }>()

function menuClickHandler() {
  if (editor) {
    const htmlElement = editor.htmlElement
    if (htmlElement) {
      const fullScreenEditor = htmlElement.closest('.se-editor-full-screen')
      if (fullScreenEditor) {
        fullScreenEditor.classList.remove("se-editor-full-screen")
      } else {
        htmlElement.closest('.se-editor')?.classList.add("se-editor-full-screen")
      }
    }
  }
}
</script>

<style>
.se-editor-full-screen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;

  .se-editor-text-area {
    flex: 1 !important;
    min-height: auto !important;
  }
}
</style>
