<template>
  <div class="se-select-list">
    <ul ref="select-list-ul" v-if="dataList.length > 0">
      <li :class="{ activated: item.value === model }" v-for="(item, index) in dataList" :key="index"
        @click="selectHandler(item)">
        {{ item.label }}
      </li>
    </ul>
    <Blank :type="BlankType.LIST" v-else />
  </div>
</template>

<script setup lang="ts">
import { Blank, BlankType } from '@/component';
import type { LabelValue } from '@ssml-editor/core';
import { useTemplateRef } from 'vue';

const selectListUlRef = useTemplateRef('select-list-ul');
const model = defineModel<string | number | undefined>({ default: undefined });
const { dataList = [] } = defineProps<{ dataList?: LabelValue[] }>();

function selectHandler(item: LabelValue) {
  model.value = item.value;
}

function scrollIntoView() {
  if (selectListUlRef.value) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].value === model.value) {
        selectListUlRef.value.children[i]?.scrollIntoView({
          behavior: 'smooth',
        });
        return;
      }
    }
  }
}

defineExpose({
  scrollIntoView: scrollIntoView,
});
</script>

<style scoped>
@reference "tailwindcss";

@plugin 'tailwind-scrollbar' {
  nocompatible: true;
}

.se-select-list {
  ul {
    li {
      &.activated {
        @apply text-blue-500;
      }

      &:hover {
        @apply bg-(--color-li-hover-bg);
      }

      @apply text-xs pt-1 pb-1 cursor-pointer;
    }

    @apply w-full h-full list-none m-0 p-0 overflow-x-hidden overflow-y-auto scrollbar-thin;
  }

  @apply flex flex-col justify-center items-center box-border border border-(--el-border-color) border-solid text-center h-50 overflow-hidden;
}
</style>
