import { StorageType } from '@ssml-editor/core';
import {
  AliasMenu,
  BreakMenu,
  BreakModule,
  CodeMenu,
  CopyMenu,
  EnglishMenu,
  ExportMenu,
  fullScreenMenu,
  newLinePlugin,
  pastePlugin,
  PhonemeModule,
  PinyinMenu,
  RedoMenu,
  SaveMenu,
  SayAsMenu,
  SayAsModule,
  SoundEventModule,
  SoundMenu,
  speakEffectData,
  SpeakMenu,
  SpeakModule,
  SpeakNormalizer,
  speakPitcheData,
  speakRateData,
  SubmitMenu,
  SubModule,
  UndoMenu,
  VoiceMenu,
  voidElementPlugin,
  type SayAsProps,
  type SoundEventProps,
  type SpeakProps,
  type SubmitProps,
  type ValidateMethod,
  type VoiceProps,
} from '@ssml-editor/editor-vue';
import {
  RowContainerAlign,
  ToolbarDivider,
  type BaseEditor,
  type EditorConfig,
  type ToolbarDividerProps,
} from '@ssml-editor/vue';
import {
  bgms,
  searchSounds,
  searchVoices,
  soundCategories,
  sounds,
  voiceCategories,
  voices,
} from './api';

const sayAsValidateMethod: ValidateMethod = (text, defaultValidateMethod) =>
  defaultValidateMethod(text);

export default <EditorConfig>{
  storageName: 'abcdefg',
  scroll: true,
  placeholder: '请输入内容...',
  maxLength: 10,
  animation: { grayscale: true, zoom: true },
  html: {
    storageType: StorageType.LOCAL,
    storageName: '001',
  },
  toolbar: {
    menus: [
      {
        component: VoiceMenu,
        props: <VoiceProps>{
          fetchVoices: voices,
          fetchCategories: voiceCategories,
          searchVoices: searchVoices,
        },
      },
      {
        component: SpeakMenu,
        props: <SpeakProps>{
          rates: speakRateData,
          pitches: speakPitcheData,
          effects: speakEffectData,
          fetchBgms: bgms,
        },
      },
      {
        component: ToolbarDivider,
        props: <ToolbarDividerProps>{
          backgroundColor: 'var(--color-green-600)',
        },
      },
      {
        component: BreakMenu,
      },
      {
        component: SoundMenu,
        props: <SoundEventProps>{
          fetchSounds: sounds,
          fetchCategories: soundCategories,
          searchSounds: searchSounds,
        },
      },
      {
        component: ToolbarDivider,
        props: <ToolbarDividerProps>{
          backgroundColor: 'var(--color-cyan-600)',
        },
      },
      {
        component: AliasMenu,
      },
      {
        component: PinyinMenu,
      },
      {
        component: EnglishMenu,
      },
      {
        component: SayAsMenu,
        props: <SayAsProps>{
          cardinal: {
            validate: sayAsValidateMethod,
          },
          digits: {
            validate: sayAsValidateMethod,
          },
          telephone: {
            validate: sayAsValidateMethod,
          },
          name: {
            validate: sayAsValidateMethod,
          },
          address: {
            validate: sayAsValidateMethod,
          },
          id: {
            validate: sayAsValidateMethod,
          },
          characters: {
            validate: sayAsValidateMethod,
          },
          punctuation: {
            validate: sayAsValidateMethod,
          },
          date: {
            validate: sayAsValidateMethod,
          },
          time: {
            validate: sayAsValidateMethod,
          },
          currency: {
            validate: sayAsValidateMethod,
          },
          measure: {
            validate: sayAsValidateMethod,
          },
        },
      },
      {
        component: ToolbarDivider,
        props: <ToolbarDividerProps>{
          backgroundColor: 'var(--color-blue-600)',
        },
      },
      {
        component: UndoMenu,
      },
      {
        component: RedoMenu,
      },
      {
        component: fullScreenMenu,
      },
      {
        component: ToolbarDivider,
        props: <ToolbarDividerProps>{
          backgroundColor: 'var(--color-pink-600)',
        },
      },
      {
        component: SaveMenu,
      },
      {
        component: ExportMenu,
      },
      {
        component: CopyMenu,
      },
      {
        component: CodeMenu,
      },
    ],
    align: RowContainerAlign.CENTER,
  },
  footer: {
    menus: [
      {
        component: SubmitMenu,
        props: <SubmitProps>{
          onClick: (
            code: string,
            editor?: BaseEditor,
            config?: EditorConfig,
          ) => {
            console.log('onClick', code, editor, config);
          },
        },
      },
    ],
    align: RowContainerAlign.END,
    style: {
      marginTop: 'calc(var(--spacing, .25rem) * 2)',
    },
  },
  plugins: [voidElementPlugin, pastePlugin, newLinePlugin],
  modules: [
    SpeakModule,
    BreakModule,
    SoundEventModule,
    PhonemeModule,
    SayAsModule,
    SubModule,
  ],
  normalizers: [SpeakNormalizer],
};
