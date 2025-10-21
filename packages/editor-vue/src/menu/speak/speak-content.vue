<template>
  <div class="se-speak-content" :class="{ 'se-usage-record-showed': showAllUsageRecord }">
    <div class="se-usage-record">
      <el-button size="small" class="se-usage-record-more" :icon="More" @click="usageRecordMoreClickHandler">
      </el-button>
      <ul class="se-usage-record-list">
        <li class="se-usage-record-list-name">近期使用:</li>
        <li v-for="(item, index) in speakUsageRecords" @click="usageRecordsItemClickHandler(item)" :key="index">
          <el-tag type="info" @close="deleteUsageRecordsHandler(item)" closable>
            {{ item.label }}
          </el-tag>
        </li>
      </ul>
    </div>
    <div class="se-speak-content-body" v-show="!showAllUsageRecord">
      <list-wrapper title="语速">
        <select-list v-model="speakContentData.rate" :dataList="dataListRate"></select-list>
      </list-wrapper>
      <list-wrapper title="语调">
        <select-list v-model="speakContentData.pitch" :dataList="dataListPitch"></select-list>
      </list-wrapper>
      <list-wrapper title="音量" style="width: 5rem">
        <volume-container v-model="speakContentData.volume"></volume-container>
      </list-wrapper>
      <list-wrapper title="音效">
        <select-list v-model="speakContentData.effect" :dataList="dataListEffect"></select-list>
      </list-wrapper>
      <list-wrapper title="音效效果" style="width: 7.5rem">
        <effect-value-container v-model="speakContentData.effectValue"
          :effect="speakContentData.effect"></effect-value-container>
      </list-wrapper>
      <list-wrapper title="背景" style="width: 7.5rem">
        <infinite-scroll v-model="speakContentData.bgm" :pageSize="10" :load="fetchBgms"></infinite-scroll>
      </list-wrapper>
      <list-wrapper title="背景音量" style="width: 5rem">
        <volume-container v-model="speakContentData.bgmVolume"></volume-container>
      </list-wrapper>
    </div>
    <div class="se-speak-content-footer">
      <el-button v-show="!showAllUsageRecord" @click="submitHandler" type="primary">确定</el-button>
      <el-button v-show="showAllUsageRecord" @click="clearUsageRecordsHandler" type="primary">全部清空</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InfiniteScroll } from '@/component';
import { More } from '@element-plus/icons-vue';
import { EditorStorageService, type LabelValue } from '@ssml-editor/core';
import { ListWrapper, SelectList, type EditorConfig } from '@ssml-editor/vue';
import { ElButton, ElTag } from 'element-plus';
import { onMounted, ref, toRaw } from 'vue';
import { SpeakContentData } from './data';
import EffectValueContainer from './effect-value-container.vue';
import { generateSpeakUsageRecordLabel } from './method';
import { type SpeakContentDataModal } from './model';
import type { SpeakProps } from './type';
import VolumeContainer from './volume-container.vue';

const storeKey = 'speak';
const showAllUsageRecord = ref(false);
const speakUsageRecords = ref<SpeakContentDataModal[]>([]);
const dataListRate = ref<LabelValue[]>([]);
const dataListPitch = ref<LabelValue[]>([]);
const dataListEffect = ref<LabelValue[]>([]);
const dataListBgm = ref<LabelValue[]>([]);
const speakContentData = defineModel<SpeakContentDataModal>({
  default: new SpeakContentData(),
});
const {
  rates,
  pitches,
  effects,
  config,
  fetchBgms = () => Promise.resolve([]),
} = defineProps<SpeakProps & { config?: EditorConfig }>();
const emit = defineEmits<{ submit: [data: SpeakContentDataModal] }>();
const editorStorageService = new EditorStorageService(config?.storageName);

function usageRecordsItemClickHandler(item: SpeakContentDataModal) {
  speakContentData.value.rate = item.rate;
  speakContentData.value.pitch = item.pitch;
  speakContentData.value.volume = item.volume;
  speakContentData.value.bgmVolume = item.bgmVolume;
  speakContentData.value.effect = item.effect;
  speakContentData.value.effectValue = item.effectValue;
  speakContentData.value.bgm = item.bgm;
  submitHandler();
}

function usageRecordMoreClickHandler() {
  showAllUsageRecord.value = !showAllUsageRecord.value;
}

async function readSpeakUsageRecords(): Promise<SpeakContentDataModal[]> {
  return (
    (await editorStorageService.read<SpeakContentDataModal[]>(storeKey)) || []
  );
}

async function saveSpeakUsageRecords(
  speakContentDataList: SpeakContentDataModal[],
): Promise<boolean> {
  return await editorStorageService.save(
    storeKey,
    speakContentDataList.slice(0, 40),
  );
}

async function fetchSpeakUsageRecords() {
  const speakContentDataList = await readSpeakUsageRecords();
  speakUsageRecords.value = speakContentDataList;
}

async function pushUsageRecords(label: string) {
  let speakContentDataList = await readSpeakUsageRecords();
  speakContentDataList = speakContentDataList.filter((speakContentData) => {
    return speakContentData.label !== label;
  });
  speakContentDataList.unshift({ ...toRaw(speakContentData.value), label });
  await saveSpeakUsageRecords(speakContentDataList);
  speakUsageRecords.value = speakContentDataList;
}

async function deleteUsageRecordsHandler(item: SpeakContentDataModal) {
  const speakContentDataList = toRaw(speakUsageRecords.value).filter(
    (speakContentData) => {
      return speakContentData.label !== item.label;
    },
  );
  await saveSpeakUsageRecords(speakContentDataList);
  speakUsageRecords.value = speakContentDataList;
}

async function clearUsageRecordsHandler() {
  await editorStorageService.remove(storeKey);
  speakUsageRecords.value = [];
}

async function submitHandler() {
  const label = generateSpeakUsageRecordLabel(
    dataListRate.value,
    dataListPitch.value,
    dataListBgm.value,
    speakContentData.value.rate,
    speakContentData.value.pitch,
    speakContentData.value.volume,
    speakContentData.value.bgmVolume,
    speakContentData.value.effect,
    speakContentData.value.effectValue,
    speakContentData.value.bgm,
  );
  await pushUsageRecords(label);
  emit('submit', { ...toRaw(speakContentData.value), label });
}

onMounted(async () => {
  rates && (dataListRate.value = rates);
  pitches && (dataListPitch.value = pitches);
  effects && (dataListEffect.value = effects);
  await fetchSpeakUsageRecords();
});
</script>

<style scoped>
@reference "tailwindcss";

.se-speak-content {
  .se-usage-record {
    .se-usage-record-more {
      @apply absolute top-0 right-0;
    }

    .se-usage-record-list {
      li {
        &.se-usage-record-list-name {
          @apply text-nowrap text-sm cursor-auto;
        }

        @apply flex flex-row justify-center items-center text-nowrap text-sm cursor-pointer;
      }

      @apply flex flex-row justify-start items-center flex-wrap gap-x-2 gap-y-1 m-0 p-0 overflow-x-hidden overflow-y-hidden h-6;
    }

    @apply relative pr-11.5;
  }

  .se-speak-content-body {
    >*:not(:last-child) {
      :deep(> *:last-child) {
        @apply border-r-0;
      }
    }

    @apply flex flex-row;
  }

  .se-speak-content-footer {
    @apply flex flex-row justify-end items-center mt-2.5;
  }

  &.se-usage-record-showed {
    .se-usage-record {
      .se-usage-record-list {
        @apply overflow-y-auto h-auto;
      }

      @apply h-66;
    }
  }
}
</style>
