<template>
  <Button icon-class="iconfont-ssml-editor icon-ssml-editor-chongzuo" @click="menuClickHandler">重做</Button>
</template>

<script setup lang="ts">
import { type BaseEditor, Button } from '@ssml-editor/vue';

const { editor } = defineProps<{ editor?: BaseEditor }>()

function menuClickHandler() {
  if (editor) {
    editor.redo()
  }
}
</script>

<style scoped></style>
