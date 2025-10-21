<template>
  <Button ref="menu-bar-button" icon-class="iconfont-ssml-editor icon-ssml-editor-duoren"
    @click="menuClickHandler">音色</Button>
  <Dialog title="音色" width="calc(var(--el-dialog-padding-primary) * 2 + 12.5rem)" :destroyOnClose="true"
    v-model="dialogVisible" :style="{ margin: margin }" @submit="submitHandler">
    <voice-content ref="voice-content" v-model="voiceContentData" v-bind="props"></voice-content>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from '@/component';
import { Button, type BaseEditor, type EditorConfig } from '@ssml-editor/vue';
import { useElementBounding } from '@vueuse/core';
import type { Property } from 'csstype';
import { ref, shallowRef, useTemplateRef, type Ref } from 'vue';
import { VoiceContentData } from './data';
import { type VoiceContentDataModel } from './model';
import type { VoiceProps } from './type';
import VoiceContent from './voice-content.vue';
import { VoiceMenuService } from './voice-menu-service';

const menuBarButtonRef = useTemplateRef('menu-bar-button');
const voiceContentRef = useTemplateRef('voice-content');
const dialogVisible = ref(false);
const voiceMenuService = shallowRef<VoiceMenuService>();
const voiceContentData = ref<VoiceContentDataModel>(new VoiceContentData());
const { x, y, height } = useElementBounding(menuBarButtonRef as any);
const margin: Ref<Property.Margin<string>> = ref('');
const props = defineProps<
  VoiceProps & { config?: EditorConfig; editor?: BaseEditor }
>();

function show() {
  margin.value = `${y.value + height.value}px 0 0 ${x.value}px`;
  dialogVisible.value = true;
}

function hide() {
  dialogVisible.value = false;
}

async function menuClickHandler() {
  const { config, editor } = props;
  if (config && editor) {
    voiceMenuService.value ??= new VoiceMenuService(editor, config);
    const data = await voiceMenuService.value.fetchConfig();
    data && (voiceContentData.value = data);
    show();
  }
}

async function submitHandler() {
  const data = voiceContentRef.value?.getData();
  if (data) {
    await voiceMenuService.value?.saveConfig(data);
  }
  hide();
}
</script>

<style scoped></style>
