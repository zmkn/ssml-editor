<template>
  <Button ref="menu-bar-button" icon-class="iconfont-ssml-editor icon-ssml-editor-shengyin"
    @click="menuClickHandler">插入声音</Button>
  <Dialog title="插入声音" width="calc(var(--el-dialog-padding-primary) * 2 + 12.5rem)" :destroyOnClose="true"
    v-model="dialogVisible" :style="{ margin: margin }" @submit="submitHandler">
    <sound-content ref="sound-content" v-model="soundContentData" v-bind="props"></sound-content>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from '@/component'
import { Button, type BaseEditor } from '@ssml-editor/vue'
import { useElementBounding } from '@vueuse/core'
import type { Property } from 'csstype'
import { ref, shallowRef, useTemplateRef, type Ref } from 'vue'
import { SoundContentData } from './data'
import type { SoundContentDataModel } from './model'
import SoundContent from './sound-event-content.vue'
import { SoundEventMenuService } from './sound-event-menu-service'
import type { SoundEventProps } from './type'

const menuBarButtonRef = useTemplateRef('menu-bar-button')
const soundContentRef = useTemplateRef('sound-content')
const dialogVisible = ref(false)
const soundMenuService = shallowRef<SoundEventMenuService>()
const soundContentData = ref<SoundContentDataModel>(new SoundContentData())
const { x, y, height } = useElementBounding(menuBarButtonRef as any)
const margin: Ref<Property.Margin<string>> = ref('');
const props = defineProps<SoundEventProps & { editor?: BaseEditor }>();

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
    soundMenuService.value ??= new SoundEventMenuService(editor)
    if (!soundMenuService.value.isDisabled()) {
      show()
    }
  }
}

function submitHandler() {
  const data = soundContentRef.value?.getData()
  if (data?.sound) {
    soundMenuService.value?.setNode(data.sound, data.mark)
  }
  hide()
}
</script>

<style scoped></style>
