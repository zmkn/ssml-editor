<template>
  <div class="se-row-container" :class="{
    'se-row-container-start': align === RowContainerAlign.START,
    'se-row-container-end': align === RowContainerAlign.END,
    'se-row-container-center': align === RowContainerAlign.CENTER,
    'se-row-container-between': align === RowContainerAlign.BETWEEN,
    'se-row-container-around': align === RowContainerAlign.AROUND,
    'se-row-container-evenly': align === RowContainerAlign.EVENLY,
  }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { RowContainerAlign } from './row-container-align.enum';

const { align = RowContainerAlign.CENTER } = defineProps<{
  align?: RowContainerAlign;
}>();
</script>

<style scoped>
@reference "tailwindcss";

.se-row-container {
  &.se-row-container-start {
    @apply justify-start;
  }

  &.se-row-container-end {
    @apply justify-end;
  }

  &.se-row-container-center {
    @apply justify-center;
  }

  &.se-row-container-between {
    @apply justify-between;
  }

  &.se-row-container-around {
    @apply justify-around;
  }

  &.se-row-container-evenly {
    @apply justify-evenly;
  }

  @apply flex flex-row items-center pt-1 pb-1;
}
</style>
