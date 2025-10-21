<template>
  <div class="se-list-wrapper">
    <slot name="header" :title="title">
      <header class="se-list-wrapper-header">
        <h1 class="se-list-wrapper-header-title">{{ title }}</h1>
      </header>
    </slot>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const { title = '' } = defineProps<{ title?: string }>();
</script>

<style scoped>
@reference "tailwindcss";

.se-list-wrapper {
  .se-list-wrapper-header {
    .se-list-wrapper-header-title {
      @apply font-[inherit] text-sm;
    }

    @apply text-center flex flex-col justify-center h-10;
  }

  @apply w-25;
}
</style>
