<template>
  <el-popover popper-style="padding: 0px" :hide-after="0" :width="width" :placement="placement" trigger="contextmenu"
    v-model:visible="model">
    <template #reference>
      <slot name="reference"></slot>
    </template>
    <div class="se-popover-container" @mousedown.stop.prevent>
      <slot></slot>
      <slot name="footer" v-if="showFooter">
        <div class="se-popover-footer">
          <el-button type="primary" size="small" @click="submitHandler">确定</el-button>
        </div>
      </slot>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import type { Placement } from '@popperjs/core';
import { ElButton, ElPopover } from 'element-plus';

const model = defineModel<boolean>({ default: false });
const {
  width = 150,
  placement = 'bottom',
  showFooter = true,
} = defineProps<{
  width?: number;
  placement?: Placement;
  showFooter?: boolean;
}>();
const emit = defineEmits<{ submit: [] }>();

function submitHandler() {
  emit('submit');
}
</script>

<style scoped>
@reference "tailwindcss";

.se-popover-container {
  .se-popover-footer {
    @apply flex flex-row justify-end items-center mt-2;
  }

  @apply p-2;
}
</style>
