<template>
  <Button icon-class="iconfont-ssml-editor icon-ssml-editor-chexiao" @click="menuClickHandler">撤销</Button>
</template>

<script setup lang="ts">
import { type BaseEditor, Button } from '@ssml-editor/vue';

const { editor } = defineProps<{ editor?: BaseEditor }>()

function menuClickHandler() {
  if (editor) {
    editor.undo()
  }
}
</script>

<style scoped></style>
