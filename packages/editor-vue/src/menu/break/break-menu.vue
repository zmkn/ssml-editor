<template>
  <popover v-model="popoverVisible" :width="400" @submit="submitHandler">
    <template #reference>
      <Button icon-class="iconfont-ssml-editor icon-ssml-editor-tingdun" @click="menuClickHandler">插入停顿</Button>
    </template>
    <div class="se-break">
      <el-slider show-input size="small" v-model="time" :min="50" :max="10000" />
    </div>
  </popover>
</template>

<script setup lang="ts">
import { Popover } from '@/component';
import { type BaseEditor, Button } from '@ssml-editor/vue';
import { ElSlider } from 'element-plus';
import { ref, shallowRef } from 'vue';
import { BreakMenuService } from './break-menu-service';

const { editor } = defineProps<{ editor?: BaseEditor }>();
const breakMenuService = shallowRef<BreakMenuService>();
const popoverVisible = ref(false);
const time = ref(50);

function show() {
  popoverVisible.value = true;
}

function hide() {
  popoverVisible.value = false;
}

function menuClickHandler() {
  if (editor) {
    breakMenuService.value ??= new BreakMenuService(editor);
    if (!breakMenuService.value.isDisabled()) {
      show();
    }
  }
}

function submitHandler() {
  breakMenuService.value?.setNode(time.value);
  hide();
}
</script>

<style scoped>
@reference "tailwindcss";

.se-break {
  @apply flex flex-col pl-2 pr-2;
}
</style>
