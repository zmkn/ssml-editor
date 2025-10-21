<template>
  <Button ref="menu-bar-button" icon-class="iconfont-ssml-editor icon-ssml-editor-speaker"
    @click="menuClickHandler">属性</Button>
  <Dialog title="属性" width="calc(var(--el-dialog-padding-primary) * 2 + 43.75rem)" :destroyOnClose="true"
    :showFooter="false" v-model="dialogVisible" :style="{ margin: margin }">
    <speak-content v-model="speakContentData" v-bind="props" @submit="submitHandler"></speak-content>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from '@/component'
import { SPEAK_TYPE } from '@/module'
import { Button, EditorUtils, type BaseEditor, type BaseElement, type EditorConfig } from '@ssml-editor/vue'
import { useElementBounding } from '@vueuse/core'
import type { Property } from 'csstype'
import { onUnmounted, ref, shallowRef, useTemplateRef, watch, type Ref } from 'vue'
import { SpeakContentData } from './data'
import { type SpeakContentDataModal } from './model'
import SpeakContent from './speak-content.vue'
import { SpeakMenuService } from './speak-menu-service'
import type { SpeakProps } from './type'

const menuBarButtonRef = useTemplateRef('menu-bar-button')
const dialogVisible = ref(false)
const speakMenuService = shallowRef<SpeakMenuService>()
const speakContentData = ref<SpeakContentDataModal>(new SpeakContentData())
const { x, y, height } = useElementBounding(menuBarButtonRef as any)
const margin: Ref<Property.Margin<string>> = ref('');
const props = defineProps<SpeakProps & { editor?: BaseEditor, config?: EditorConfig }>()

function show() {
  margin.value = `${y.value + height.value}px 0 0 ${x.value}px`
  dialogVisible.value = true
}

function hide() {
  dialogVisible.value = false
}

function menuClickHandler() {
  const editor = props.editor
  if (editor) {
    speakMenuService.value ??= new SpeakMenuService(editor)
    EditorUtils.trimSelection(editor)
    if (!speakMenuService.value.isDisabled()) {
      const data = speakMenuService.value.getNodeAsSpeakContentData()
      data && (speakContentData.value = data)
      show()
    }
  }
}

function submitHandler(data: SpeakContentDataModal) {
  speakMenuService.value?.setNode(data)
  hide()
}

function ssmlMarkClickHandler(_eventName: string, _editor: BaseEditor, element: BaseElement) {
  if (element.type === SPEAK_TYPE) {
    speakMenuService.value = undefined
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

<style scoped></style>
