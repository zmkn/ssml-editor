<template>
  <popover v-model="popoverVisible" :show-footer="false">
    <template #reference>
      <Button icon-class="iconfont-ssml-editor icon-ssml-editor-yinbiao" @click="menuClickHandler">音标</Button>
    </template>
    <ul class="se-english">
      <li v-for="(item, index) in englishList" :key="index" @click="listItemClickHandler(item)">
        {{ item.label }}
      </li>
    </ul>
  </popover>
</template>

<script setup lang="ts">
import { Popover } from '@/component'
import { PHONEME_TYPE } from '@/module'
import { Alphabet } from '@/module/phoneme/alphabet.enum'
import type { Phoneme } from '@/module/phoneme/model'
import { Warning } from '@ssml-editor/base'
import type { LabelValue } from '@ssml-editor/core'
import { type BaseEditor, type BaseElement, Button, EditorUtils } from '@ssml-editor/vue'
import { dictionary } from 'cmu-pronouncing-dictionary'
import { onUnmounted, ref, shallowRef, watch } from 'vue'
import { EnglishMenuService } from './english-menu-service'

const props = defineProps<{ editor?: BaseEditor }>()
const popoverVisible = ref(false)
const englishList = ref<LabelValue[]>([])
const englishMenuService = shallowRef<EnglishMenuService>()

function show() {
  popoverVisible.value = true
}

function hide() {
  popoverVisible.value = false
}

async function menuClickHandler() {
  const editor = props.editor
  if (editor) {
    englishMenuService.value ??= new EnglishMenuService(editor)
    const node = EditorUtils.findSelectedNodeByType(editor, PHONEME_TYPE);
    if (node) {
      EditorUtils.selectByNode(editor, node)
    } else {
      EditorUtils.trimSelection(editor)
    }
    if (!englishMenuService.value.isDisabled()) {
      const text = englishMenuService.value.getText()
      if (text) {
        const phoneme = dictionary[text]
        if (phoneme) {
          englishList.value = [{
            label: phoneme,
            value: phoneme,
          }]
        } else {
          englishList.value = []
        }
        if (englishList.value.length > 0) {
          show()
        } else {
          throw new Warning('找不到单词的音标');
        }
      }
    }
  }
}

function listItemClickHandler(item: LabelValue) {
  englishMenuService.value?.setNode(item.value as string, item.label)
  hide()
}

function ssmlMarkClickHandler(_eventName: string, _editor: BaseEditor, element: BaseElement) {
  if (element.type === PHONEME_TYPE) {
    if ((element as Phoneme).alphabet === Alphabet.CMU) {
      englishMenuService.value = undefined
      menuClickHandler()
    }
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

.se-english {
  li {
    @apply hover:bg-(--color-li-hover-bg) p-2 cursor-pointer rounded-sm list-none
  }

  @apply flex flex-col justify-center p-0 m-0
}
</style>
