<template>
  <div class="se-effect-eq">
    <el-slider size="small" v-model="values[0]" :min="-20" :max="20" @update:model-value="updateHandler()" />
    <el-slider size="small" v-model="values[1]" :min="-20" :max="20" @update:model-value="updateHandler()" />
    <el-slider size="small" v-model="values[2]" :min="-20" :max="20" @update:model-value="updateHandler()" />
    <el-slider size="small" v-model="values[3]" :min="-20" :max="20" @update:model-value="updateHandler()" />
    <el-slider size="small" v-model="values[4]" :min="-20" :max="20" @update:model-value="updateHandler()" />
    <el-slider size="small" v-model="values[5]" :min="-20" :max="20" @update:model-value="updateHandler()" />
    <el-slider size="small" v-model="values[6]" :min="-20" :max="20" @update:model-value="updateHandler()" />
    <el-slider size="small" v-model="values[7]" :min="-20" :max="20" @update:model-value="updateHandler()" />
  </div>
</template>

<script setup lang="ts">
import { ElSlider } from 'element-plus';
import { ref, watch, type Ref } from 'vue';

const model = defineModel<string>({ default: '' });
const values: Ref<number[]> = ref([]);

function generateValues() {
  const modelValues = model.value
    .split(' ')
    .filter((emelent: string) => {
      return emelent.trim().length > 0;
    })
    .map((emelent: string) => {
      return parseFloat(emelent);
    });
  values.value = [];
  for (let i = 0; i < 8; i++) {
    values.value.push(modelValues[i] || 0);
  }
}

function updateHandler() {
  model.value = values.value.join(' ');
}

watch(
  model,
  () => {
    generateValues();
  },
  {
    immediate: true,
  },
);
</script>

<style scoped>
@reference "tailwindcss";

.se-effect-eq {
  @apply pl-4 pr-4;
}
</style>
