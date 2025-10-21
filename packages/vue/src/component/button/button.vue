<template>
  <button type="button" :disabled="disabled" class="se-button" @click="buttonClickHandler" @mousedown.prevent>
    <div class="se-button-icon">
      <slot name="icon">
        <span :class="iconClass"></span>
      </slot>
    </div>
    <div class="se-button-text">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
const { disabled = false, iconClass = '' } = defineProps<{
  disabled?: boolean;
  iconClass?: string;
}>();
const emit = defineEmits<{ click: [] }>();

function buttonClickHandler() {
  emit('click');
}
</script>

<style scoped>
@reference "tailwindcss";

.se-button {
  &:not(.disabled) {
    @apply cursor-pointer;
  }

  &:hover {
    @apply bg-(--color-button-hover-bg);
  }

  .se-button-icon {
    @apply flex justify-center items-center;
  }

  .se-button-text {
    @apply text-sm mt-1;
  }

  @apply border-0 border-none bg-transparent flex flex-col justify-center items-center rounded-sm pt-2 pb-2 pr-2 pl-2;
}
</style>
