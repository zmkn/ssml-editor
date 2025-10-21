<template>
  <div class="se-infinite-scroll">
    <ul ref="infinite-scroll-ul" v-infinite-scroll="scrollLoad" :class="{ 'se-empty': dataList.length === 0 }"
      :infinite-scroll-disabled="disabled" :infinite-scroll-distance="1" :infinite-scroll-delay="200">
      <li :class="{ activated: item.value === model }" v-if="dataList.length > 0" v-for="(item, index) in dataList"
        :key="index" @click="selectHandler(item)">
        {{ item.label }}
      </li>
      <li class="se-blank" v-else>
        <Blank :type="BlankType.LIST" />
      </li>
    </ul>
    <div class="se-loading" v-if="loadingShowed">Loading...</div>
    <div class="se-no-more" v-if="dataList.length > 0 && showNoMore && noMoreShowed">- No more -</div>
  </div>
</template>

<script setup lang="ts">
import { type LabelValue } from '@ssml-editor/core';
import { Blank, BlankType } from '@ssml-editor/vue';
import { ElInfiniteScroll as vInfiniteScroll } from 'element-plus';
import { computed, ref, toRaw, useTemplateRef, watch } from 'vue';

const infiniteScrollUlRef = useTemplateRef('infinite-scroll-ul');
const model = defineModel<string | number | undefined>({ default: undefined });
const {
  pageSize = undefined,
  showNoMore = false,
  load = () => [],
} = defineProps<{
  pageSize?: number;
  showNoMore?: boolean;
  load: (page: number) => LabelValue[] | Promise<LabelValue[]>;
}>();
const emit = defineEmits<{ change: [dataList: LabelValue[]] }>();
const loadingShowed = ref(false);
const noMoreShowed = ref(false);
const disabled = computed(() => loadingShowed.value || noMoreShowed.value);
const dataList = ref<LabelValue[]>([]);
const page = ref(1);

async function scrollLoad() {
  loadingShowed.value = true;
  const result = await load(page.value);
  loadingShowed.value = false;
  if (result.length > 0) {
    dataList.value = [...dataList.value, ...result];
    if (pageSize && pageSize > 0) {
      if (result.length < pageSize) {
        noMoreShowed.value = true;
      } else {
        page.value += 1;
      }
    } else {
      page.value += 1;
    }
  } else {
    noMoreShowed.value = true;
  }
}

function selectHandler(item: LabelValue) {
  model.value = item.value;
}

function scrollIntoView() {
  if (infiniteScrollUlRef.value) {
    for (let i = 0; i < dataList.value.length; i++) {
      if (dataList.value[i].value === model.value) {
        infiniteScrollUlRef.value.children[i]?.scrollIntoView({
          behavior: 'smooth',
        });
        return;
      }
    }
  }
}

watch(dataList, (newValue) => {
  emit('change', toRaw(newValue));
}, {
  deep: true,
  immediate: true
});

defineExpose({
  scrollIntoView: scrollIntoView,
});
</script>

<style scoped>
@reference "tailwindcss";

@plugin 'tailwind-scrollbar' {
  nocompatible: true;
}

.se-infinite-scroll {
  ul {
    &.se-empty {
      @apply w-full h-full;
    }

    li {
      &.activated {
        @apply text-blue-500;
      }

      &:not(.se-blank):hover {
        @apply bg-(--color-li-hover-bg);
      }

      &.se-blank {
        @apply w-full h-full pt-[0] pb-[0] flex flex-col justify-center items-center cursor-default;
      }

      @apply text-xs pt-1 pb-1 cursor-pointer;
    }

    @apply list-none m-0 p-0 overflow-hidden;
  }

  .se-loading {
    @apply text-gray-300 text-(length:--text-xxs) leading-(--text-xxs--line-height);
  }

  .se-no-more {
    @apply text-gray-300 text-(length:--text-xxs) leading-(--text-xxs--line-height);
  }

  @apply box-border border border-(--el-border-color) border-solid text-center h-50 overflow-x-hidden overflow-y-auto;
}
</style>
