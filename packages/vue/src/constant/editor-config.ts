import { StorageType } from '@ssml-editor/core';
import { type EditorConfig } from '@/model';

export const DefaultEditorConfig: Readonly<EditorConfig> = {
  storageName: 'storager',
  scroll: true,
  readOnly: false,
  autoFocus: false,
  animation: {
    zoom: true,
    grayscale: true,
  },
  html: {
    storageType: StorageType.NONE,
    storageName: 'html',
    reader: () => {
      return Promise.resolve('');
    },
    saver: () => {
      return Promise.resolve(true);
    },
    autoSave: true,
    autoSaveWait: 5000,
  },
  style: {
    height: '400px',
    minHeight: '400px',
  },
  toolbar: {
    menus: [],
  },
  normalizers: [],
};
