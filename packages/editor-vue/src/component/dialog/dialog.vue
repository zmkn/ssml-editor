<template>
  <el-dialog v-model="model" :modal="modal" :title="title" :width="width" :align-center="alignCenter"
    :show-close="showClose" :destroy-on-close="destroyOnClose" draggable @open="openHandler" @opened="openedHandler"
    @close="closeHandler" @closed="closedHandler" @open-auto-focus="openAutoFocusHandler"
    @close-auto-focus="closeAutoFocusHandler">
    <slot></slot>
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #footer v-if="showFooter">
      <slot name="footer">
        <el-button type="primary" @click="submitHandler">确定</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog } from 'element-plus';

const model = defineModel<boolean>({ default: false });
const {
  modal = false,
  title = '',
  width = '50%',
  showClose = true,
  showFooter = true,
  alignCenter = false,
  destroyOnClose = false,
} = defineProps<{
  modal?: boolean;
  title?: string;
  width?: string | number;
  showClose?: boolean;
  showFooter?: boolean;
  alignCenter?: boolean;
  destroyOnClose?: boolean;
}>();
const emit = defineEmits<{
  open: [];
  opened: [];
  close: [];
  closed: [];
  openAutoFocus: [];
  closeAutoFocus: [];
  submit: [];
}>();

function submitHandler() {
  emit('submit');
}

function openHandler() {
  emit('open');
}

function openedHandler() {
  emit('opened');
}

function closeHandler() {
  emit('close');
}

function closedHandler() {
  emit('closed');
}

function openAutoFocusHandler() {
  emit('openAutoFocus');
}

function closeAutoFocusHandler() {
  emit('closeAutoFocus');
}
</script>

<style scoped></style>
