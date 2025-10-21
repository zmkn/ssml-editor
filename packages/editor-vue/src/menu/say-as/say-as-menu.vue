<template>
  <popover v-model="popoverVisible" :show-footer="false">
    <template #reference>
      <Button icon-class="iconfont-ssml-editor icon-ssml-editor-dancidufa" @click="menuClickHandler">读法</Button>
    </template>
    <ul class="se-say-as">
      <li v-for="(item, index) in sayAsInterpretationOptions" :key="index" :class="{ 'disabled': item.disabled }"
        @click="listItemClickHandler(item)">
        {{ item.label }}
      </li>
    </ul>
  </popover>
</template>

<script setup lang="ts">
import { Popover } from '@/component'
import { SAY_AS_TYPE } from '@/module'
import { SayAsInterpretation } from '@/module/say-as/say-as-interpretation.enum'
import { Button, EditorUtils, type BaseEditor, type BaseElement } from '@ssml-editor/vue'
import { onUnmounted, ref, shallowRef, watch, type Ref } from 'vue'
import { SayAsInterpretationData } from './constant'
import { SayAsMenuService } from './say-as-menu-service'
import type { SayAsProps } from './type'

const popoverVisible = ref(false)
const sayAsInterpretationOptions: Ref<{ label: string, value: keyof typeof SayAsInterpretationData, disabled: boolean }[]> = ref([])
const sayAsMenuService = shallowRef<SayAsMenuService>()
const props = defineProps<SayAsProps & { editor?: BaseEditor }>()

function show() {
  popoverVisible.value = true
}

function hide() {
  popoverVisible.value = false
}

function generateSayAsInterpretationOptions(text: string): { label: string, value: keyof typeof SayAsInterpretationData, disabled: boolean }[] {
  const result: { label: string, value: keyof typeof SayAsInterpretationData, disabled: boolean }[] = [];
  (Object.keys(SayAsInterpretationData) as Array<keyof typeof SayAsInterpretationData>).forEach((key) => {
    if (props[key]) {
      let disabled: boolean = true
      const validate = props[key]?.validate
      if (validate && sayAsMenuService.value && validate(text, sayAsMenuService.value.getDefaultValidateMethod(key))) {
        disabled = false
      }
      result.push({
        label: SayAsInterpretationData[key],
        value: key,
        disabled: disabled,
      });
    }
  })
  return result;
}

function menuClickHandler() {
  const editor = props.editor
  if (editor) {
    sayAsMenuService.value ??= new SayAsMenuService(editor)
    const node = EditorUtils.findSelectedNodeByType(editor, SAY_AS_TYPE);
    if (node) {
      EditorUtils.selectByNode(editor, node)
    } else {
      EditorUtils.trimSelection(editor)
    }
    if (!sayAsMenuService.value.isDisabled()) {
      if (editor.selection) {
        const text = EditorUtils.getText(editor, editor.selection)
        sayAsInterpretationOptions.value = generateSayAsInterpretationOptions(text)
      }
      show()
    }
  }
}

function listItemClickHandler({ label, value, disabled }: { label: string, value: keyof typeof SayAsInterpretationData, disabled: boolean }) {
  if (!disabled) {
    sayAsMenuService.value?.setNode(SayAsInterpretation.fromString(value)!!, label)
    hide()
  }
}

function ssmlMarkClickHandler(_eventName: string, _editor: BaseEditor, elem: BaseElement) {
  if (elem.type === SAY_AS_TYPE) {
    sayAsMenuService.value = undefined
    menuClickHandler()
  }
}

watch(() => props.editor, (newValue, oldValue) => {
  oldValue?.off('ssml-mark-click', ssmlMarkClickHandler)
  newValue?.on('ssml-mark-click', ssmlMarkClickHandler)
}, {
  immediate: true
})

onUnmounted(() => {
  props.editor?.off('ssml-mark-click', ssmlMarkClickHandler)
})
</script>

<style scoped>
@reference "tailwindcss";

.se-say-as {
  li {
    &.disabled {
      @apply text-gray-300 cursor-default hover:bg-transparent
    }

    @apply p-2 rounded-sm cursor-pointer hover:bg-(--color-li-hover-bg) list-none
  }

  @apply flex flex-col justify-center p-0 m-0
}
</style>
