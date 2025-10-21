<template>
  <el-slider height="6.25rem" vertical v-model="sliderModel" :min="1" :max="24000" />
</template>

<script setup lang="ts">
import { ElSlider } from 'element-plus';
import { computed } from 'vue';

const model = defineModel<string>({ default: '1' });
const sliderModel = computed({
  get() {
    return Number(model.value) || 1;
  },
  set(newValue: number) {
    model.value = newValue.toString();
  },
});
</script>

<style scoped></style>
