<template>
  <div class="se-sound-event-content-search">
    <el-form @submit.prevent="searchSubmitHandler">
      <el-input v-model="searchInput" placeholder="搜索声音" clearable @input="searchInputHandler">
        <template #append>
          <el-button @click="searchSubmitHandler" :icon="Search" />
        </template>
      </el-input>
    </el-form>
    <div class="se-sound-event-content-search-result" v-if="showSearchResult">
      <select-list v-model="searchSound" :dataList="searchResult"></select-list>
    </div>
  </div>
  <div class="se-sound-event-content-body" :style="{ display: showSearchResult ? 'none' : 'flex' }">
    <list-wrapper title="类型">
      <infinite-scroll v-model="soundContentData.category" :pageSize="categoryPageSize" :load="fetchCategories"
        @update:modelValue="categoryValueChangeHandler" @change="categoryChangeHandler"></infinite-scroll>
    </list-wrapper>
    <list-wrapper title="声音">
      <infinite-scroll v-if="showSoundList" v-model="soundContentData.sound" :pageSize="soundPageSize"
        :load="fetchSoundList" @change="soundChangeHandler"></infinite-scroll>
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
import { SoundContentData } from './data';
import { type SoundContentDataModel, type SoundUsageDataModel } from './model';
import type { SoundEventProps } from './type';

const showSearchResult = ref(false);
const showSoundList = ref(false);
const searchInput = ref('');
const categoryDataList = ref<LabelValue[]>([]);
const soundDataList = ref<LabelValue[]>([]);
const searchResult = ref<LabelValue[]>([]);
const searchSound = ref<string>();
const soundContentData = defineModel<SoundContentDataModel>({
  default: new SoundContentData(),
});
const {
  categoryPageSize = 10,
  soundPageSize = 10,
  fetchSounds = () => Promise.resolve([]),
  fetchCategories = () => Promise.resolve([]),
  searchSounds = () => Promise.resolve([]),
} = defineProps<SoundEventProps>();

function generateMark(
  sound: string,
  soundDataList: LabelValue[],
): string | undefined {
  for (const s of soundDataList) {
    if (s.value === sound) {
      return s.label;
    }
  }
}

function searchInputHandler(value: string) {
  if (value.trim() === '') {
    showSearchResult.value = false;
    searchResult.value = [];
  } else {
    showSearchResult.value = true;
  }
}

function categoryValueChangeHandler() {
  showSoundList.value = false;
  nextTick(() => {
    showSoundList.value = true;
  });
}

async function fetchSoundList(): Promise<LabelValue[]> {
  const sounds = await fetchSounds({
    category: soundContentData.value.category,
  });
  return sounds.map((item) => ({
    label: item.name,
    value: item.src,
  }));
}

async function categoryChangeHandler(categoryData: LabelValue[]) {
  showSoundList.value = false;
  if (categoryData.length > 0) {
    categoryDataList.value = categoryData;
    soundContentData.value.category = categoryData[0].value as string;
    nextTick(() => {
      showSoundList.value = true;
    });
  }
}

async function soundChangeHandler(soundData: LabelValue[]) {
  if (soundData.length > 0) {
    soundDataList.value = soundData;
    soundContentData.value.sound = soundData[0].value as string;
  }
}

async function searchSubmitHandler() {
  searchSound.value = undefined;
  searchResult.value = [];
  const sounds = await searchSounds({
    word: searchInput.value,
  });
  if (sounds.length > 0) {
    searchResult.value = sounds.map((item) => ({
      label: item.name,
      value: item.src,
    }));
    searchSound.value = sounds[0].src;
  }
}

function getData(): SoundUsageDataModel {
  let mark: string | undefined = undefined;
  if (showSearchResult.value) {
    if (searchSound.value) {
      mark = generateMark(searchSound.value, searchResult.value);
    }
    return { sound: searchSound.value, mark };
  } else {
    const data = toRaw(soundContentData.value);
    if (data.sound) {
      mark = generateMark(data.sound, soundDataList.value);
    }
    return { ...data, mark };
  }
}

defineExpose({
  getData,
});
</script>

<style scoped>
@reference "tailwindcss";

.se-sound-event-content-search {
  .se-sound-event-content-search-result {
    @apply mt-2;
  }
}

.se-sound-event-content-body {
  >*:not(:last-child) {
    :deep(> *:last-child) {
      @apply border-r-0;
    }
  }

  @apply flex flex-row;
}
</style>
