<template>
  <popover v-model="popoverVisible" :width="200" @submit="submitHandler">
    <template #reference>
      <Button icon-class="iconfont-ssml-editor icon-ssml-editor-bieming" @click="menuClickHandler">别名</Button>
    </template>
    <el-form @submit.prevent="submitHandler">
      <el-input type="text" ref="alias-input" v-model="aliasInputValue"></el-input>
    </el-form>
  </popover>
</template>

<script setup lang="ts">
import { Popover } from '@/component';
import { SUB_TYPE } from '@/module';
import {
  type BaseEditor,
  type BaseElement,
  Button,
  EditorUtils,
} from '@ssml-editor/vue';
import { ElForm, ElInput } from 'element-plus';
import { Editor as SlateEditor } from 'slate-vue3/core';
import {
  nextTick,
  onUnmounted,
  ref,
  shallowRef,
  useTemplateRef,
  watch,
} from 'vue';
import { AliasMenuService } from './alias-menu-service';

const props = defineProps<{ editor?: BaseEditor }>();
const popoverVisible = ref(false);
const aliasInputValue = ref('');
const aliasMenuService = shallowRef<AliasMenuService>();
const aliasInputRef = useTemplateRef('alias-input');

function show(callback?: () => void) {
  popoverVisible.value = true;
  callback && nextTick(callback);
}

function hide(callback?: () => void) {
  popoverVisible.value = false;
  callback && nextTick(callback);
}

async function menuClickHandler() {
  const editor = props.editor;
  if (editor) {
    aliasMenuService.value ??= new AliasMenuService(editor);
    EditorUtils.trimSelection(editor);
    if (!aliasMenuService.value.isDisabled()) {
      const data = aliasMenuService.value.getSerializedNode();
      if (data) {
        aliasInputValue.value = data.alias;
      } else {
        aliasInputValue.value = '';
      }
      show(() => {
        aliasInputRef.value?.focus();
      });
    }
  }
}

function submitHandler() {
  const node = aliasMenuService.value?.setNode(aliasInputValue.value);
  hide(() => {
    setTimeout(() => {
      const editor = props.editor;
      if (node && editor) {
        const path = EditorUtils.findPath(editor, node);
        if (path) {
          const point = SlateEditor.end(editor, path);
          editor.select(point);
        }
      }
    });
  });
}

function ssmlMarkClickHandler(
  _eventName: string,
  _editor: BaseEditor,
  elem: BaseElement,
) {
  if (elem.type === SUB_TYPE) {
    aliasMenuService.value = undefined;
    menuClickHandler();
  }
}

watch(
  () => props.editor,
  (newValue, oldValue) => {
    oldValue?.off('ssml-mark-click', ssmlMarkClickHandler);
    newValue?.on('ssml-mark-click', ssmlMarkClickHandler);
  },
  {
    immediate: true,
  },
);

onUnmounted(() => {
  props.editor?.off('ssml-mark-click', ssmlMarkClickHandler);
});
</script>

<style scoped></style>
