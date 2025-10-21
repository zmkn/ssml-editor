<template>
  <span class="iconfont-ssml-editor-public"
    :class="{ 'icon-ssml-editor-public-kongliebiao': type === BlankType.LIST }"></span>
</template>

<script setup lang="ts">
import { BlankType } from './blank-type.enum';

const { type } = defineProps<{
  type: BlankType;
}>();
</script>

<style scoped>
@reference "tailwindcss";

@import url('../../style/iconfont/ssml-editor-public/iconfont.css');

.iconfont-ssml-editor-public {
  @apply text-5xl text-gray-300;
}
</style>
