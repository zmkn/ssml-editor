<template>
  <div class="se-voice-content-search">
    <el-form @submit.prevent="searchSubmitHandler">
      <el-input v-model="searchInput" placeholder="搜索音色" clearable @input="searchInputHandler">
        <template #append>
          <el-button @click="searchSubmitHandler" :icon="Search" />
        </template>
      </el-input>
    </el-form>
    <div class="se-voice-content-search-result" v-if="showSearchResult">
      <select-list v-model="searchVoice" :dataList="searchResult"></select-list>
    </div>
  </div>
  <div class="se-voice-content-body" :style="{ display: showSearchResult ? 'none' : 'flex' }">
    <list-wrapper title="类型">
      <infinite-scroll v-model="voiceContentData.category" :pageSize="categoryPageSize" :load="fetchCategories"
        @update:modelValue="categoryValueChangeHandler" @change="categoryChangeHandler"></infinite-scroll>
    </list-wrapper>
    <list-wrapper title="音色">
      <infinite-scroll v-if="showVoiceList" v-model="voiceContentData.voice" :pageSize="voicePageSize"
        :load="fetchVoiceList" @change="voiceChangeHandler"></infinite-scroll>
    </list-wrapper>
  </div>
</template>

<script setup lang="ts">
import { InfiniteScroll } from '@/component';
import { Search } from '@element-plus/icons-vue';
import type { LabelValue } from '@ssml-editor/core';
import { ListWrapper, SelectList } from '@ssml-editor/vue';
import { ElButton, ElForm, ElInput } from 'element-plus';
import { nextTick, ref, toRaw } from 'vue';
import { VoiceContentData } from './data';
import { type VoiceContentDataModel } from './model';
import type { VoiceProps } from './type';

const showSearchResult = ref(false);
const showVoiceList = ref(false);
const searchInput = ref('');
const categoryDataList = ref<LabelValue[]>([]);
const voiceDataList = ref<LabelValue[]>([]);
const searchResult = ref<LabelValue[]>([]);
const searchVoice = ref<string>();
const voiceContentData = defineModel<VoiceContentDataModel>({
  default: new VoiceContentData(),
});
const {
  categoryPageSize = 10,
  voicePageSize = 10,
  fetchVoices = () => Promise.resolve([]),
  fetchCategories = () => Promise.resolve([]),
  searchVoices = () => Promise.resolve([]),
} = defineProps<VoiceProps>();

function searchInputHandler(value: string) {
  if (value.trim() === '') {
    showSearchResult.value = false;
    searchResult.value = [];
  } else {
    showSearchResult.value = true;
  }
}

function categoryValueChangeHandler() {
  showVoiceList.value = false;
  nextTick(() => {
    showVoiceList.value = true;
  });
}

async function fetchVoiceList(): Promise<LabelValue[]> {
  const voices = await fetchVoices({
    category: voiceContentData.value.category,
  });
  return voices.map((item) => ({
    label: item.name,
    value: item.id,
  }));
}

async function categoryChangeHandler(categoryData: LabelValue[]) {
  showVoiceList.value = false;
  if (categoryData.length > 0) {
    categoryDataList.value = categoryData;
    if (
      !voiceContentData.value.category ||
      !categoryData.some(
        (item) => item.value === voiceContentData.value.category,
      )
    ) {
      voiceContentData.value.category = categoryData[0].value as string;
    }
    nextTick(() => {
      showVoiceList.value = true;
    });
  }
}

async function voiceChangeHandler(voiceData: LabelValue[]) {
  if (voiceData.length > 0) {
    voiceDataList.value = voiceData;
    if (
      !voiceContentData.value.voice ||
      !voiceData.some((item) => item.value === voiceContentData.value.voice)
    ) {
      voiceContentData.value.voice = voiceData[0].value as string;
    }
  }
}

async function searchSubmitHandler() {
  searchVoice.value = undefined;
  searchResult.value = [];
  const voices = await searchVoices({
    word: searchInput.value,
  });
  if (voices.length > 0) {
    searchResult.value = voices.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    searchVoice.value = voices[0].id;
  }
}

function getData(): VoiceContentDataModel {
  if (showSearchResult.value) {
    return { voice: searchVoice.value };
  } else {
    return toRaw(voiceContentData.value);
  }
}

defineExpose({
  getData,
});
</script>

<style scoped>
@reference "tailwindcss";

.se-voice-content-search {
  .se-voice-content-search-result {
    @apply mt-2;
  }
}

.se-voice-content-body {
  >*:not(:last-child) {
    :deep(> *:last-child) {
      @apply border-r-0;
    }
  }

  @apply flex flex-row;
}
</style>
