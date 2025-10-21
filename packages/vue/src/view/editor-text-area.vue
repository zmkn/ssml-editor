<template>
  <Slate :editor="editor" :decorate="config.decorate" :render-element="renderElement" :render-leaf="renderLeaf"
    :render-placeholder="renderPlaceholder" :render-text="config.renderText ? renderText : undefined"
    :render-chunk="config.renderChunk ? renderChunk : undefined" @change="changeHandler"
    @selectionchange="selectionChangeHandler" @valuechange="valueChangeHandler">
    <Editable ref="editor-text-area" class="se-editor-text-area" :read-only="config.readOnly"
      :placeholder="config.placeholder" :auto-focus="config.autoFocus" :class="{
        'allow-zoom': config?.animation?.zoom,
        'allow-grayscale': config?.animation?.grayscale,
      }" :style="{
        minHeight: config.style?.minHeight,
        height:
          config.style?.height && config.scroll !== false
            ? config.style.height
            : 'auto',
      }" @focus="focusHandler" @blur="blurHandler" @mouseover="editorOnMouseoverHandler" />
  </Slate>
  <span class="se-count">
    <i :class="{ 'se-weight': editorLeftLength <= 0 }">{{ editorLength }}</i>
    <template v-if="config.maxLength && config.maxLength > 0">/<i>{{ config.maxLength }}</i></template>
  </span>
</template>

<script setup lang="ts">
import { ParagraphModule } from '@/editor';
import {
  withEvent,
  withExt,
  withHtml,
  withMaxLength,
  withSerialization,
} from '@/extension';
import type { BaseElement, EditorConfig } from '@/model';
import {
  type BaseEditor,
  type EditorModule,
  type EditorPlugin,
  type EditorRenderElementMethod,
} from '@/type';
import { EditorService } from '@ssml-editor/core';
import { throttle } from 'lodash';
import {
  Editable,
  Slate,
  type RenderChunkProps,
  type RenderElementProps,
  type RenderLeafProps,
  type RenderPlaceholderProps,
  type RenderTextProps,
} from 'slate-vue3';
import { createEditor, Operation } from 'slate-vue3/core';
import { withDOM } from 'slate-vue3/dom';
import { withHistory } from 'slate-vue3/history';
import {
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  type VNode,
} from 'vue';

const { config } = defineProps<{ config: EditorConfig }>();
const emit = defineEmits<{
  created: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  change: [
    editor: BaseEditor,
    htmlElement: HTMLDivElement | null,
    options?: { operation?: Operation },
  ];
  selectionChange: [
    editor: BaseEditor,
    htmlElement: HTMLDivElement | null,
    options?: { operation?: Operation },
  ];
  valueChange: [
    editor: BaseEditor,
    htmlElement: HTMLDivElement | null,
    options?: { operation?: Operation },
  ];
  destroyed: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  focus: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  blur: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
  maxLength: [editor: BaseEditor, htmlElement: HTMLDivElement | null];
}>();
const editorTextAreaRef = useTemplateRef('editor-text-area');
const editorLength = ref(0);
const editorLeftLength = ref(Infinity);
const editorService = new EditorService(config.storageName, config.html);

const htmlSerializers =
  config.modules
    ?.filter((module) => {
      return typeof module.elementToHtml !== 'undefined';
    })
    .map((module) => {
      return {
        type: module.type,
        serializer: module.elementToHtml!!,
      };
    }) || [];

const htmlDeserializers =
  config.modules
    ?.filter((module) => {
      return typeof module.htmlToElement !== 'undefined';
    })
    .map((module) => {
      return {
        type: module.type,
        deserializer: module.htmlToElement!!,
      };
    }) || [];

const plugins: EditorPlugin[] = [
  ...(config.plugins || []),
  ...(config.modules
    ?.filter((module) => {
      return typeof module.plugin !== 'undefined';
    })
    .map((module) => {
      return module.plugin!!;
    }) || []),
];

const serializers =
  config.modules
    ?.filter((module) => {
      return typeof module.serializer !== 'undefined';
    })
    .map((module) => {
      return {
        type: module.type,
        serializer: module.serializer!!,
      };
    }) || [];

const normalizers = config.normalizers || [];

const applyPlugins = (
  editor: BaseEditor,
  plugins: EditorPlugin[],
): BaseEditor => {
  plugins.forEach((plugin) => {
    editor = plugin(editor);
  });
  return editor;
};

const editor = applyPlugins(
  withMaxLength(
    withHtml(
      withSerialization(
        withExt(
          withEvent(withHistory(withDOM(createEditor()))),
          config.ext || {},
        ),
        serializers,
        normalizers,
      ),
      htmlSerializers,
      htmlDeserializers,
    ),
    config.maxLength,
  ),
  plugins,
);

const renderElement: EditorRenderElementMethod = (
  props: RenderElementProps,
): VNode => {
  const editorModules: EditorModule[] = config.modules || [];
  const type = (props.element as BaseElement).type;
  for (const module of editorModules) {
    if (module.renderElement && module.type === type) {
      return module.renderElement({ ...props, editor: editor });
    }
  }
  return ParagraphModule.renderElement!!({ ...props, editor: editor });
};

const renderLeaf = (props: RenderLeafProps): VNode => {
  if (config.renderLeaf) {
    return config.renderLeaf(props);
  } else {
    return h('span', props.attributes, props.children);
  }
};

const renderText = (props: RenderTextProps): VNode => {
  if (config.renderText) {
    return config.renderText(props);
  } else {
    return h('span', props.attributes, props.children);
  }
};

const renderChunk = (props: RenderChunkProps): VNode => {
  if (config.renderChunk) {
    return config.renderChunk(props);
  } else {
    return h('div', props.attributes, props.children);
  }
};

const renderPlaceholder = (props: RenderPlaceholderProps) => {
  if (config.renderPlaceholder) {
    return config.renderPlaceholder(props);
  }
  const attributes = props.attributes;
  const style = attributes.style;
  if (style) {
    attributes.style = Object.assign({}, style, {
      whiteSpace: 'nowrap',
      left: '0',
    });
  }
  return h('span', attributes, props.children);
};

const getHtml = (): string => {
  return editor.html;
};

const saveHtmlHandler = async (): Promise<boolean> => {
  return await editorService.saveHtml(getHtml());
};

const throttleSaveHtml = throttle(
  saveHtmlHandler,
  config.html?.autoSaveWait || 0,
  {
    leading: false,
    trailing: true,
  },
);

const calculateEditorLength = () => {
  editorLength.value = editor.getLength();
  if (config.maxLength && config.maxLength > 0) {
    editorLeftLength.value = editor.getLeftLength();
    if (editorLeftLength.value <= 0) {
      emit('maxLength', editor, editor.htmlElement);
    }
  }
};

const changeHandler = (options?: { operation?: Operation }) => {
  editor.emit('change', editor, editorTextAreaRef.value?.$el || null, options);
  emit('change', editor, editorTextAreaRef.value?.$el || null, options);
};

const selectionChangeHandler = (options?: { operation?: Operation }) => {
  editor.emit(
    'selectionChange',
    editor,
    editorTextAreaRef.value?.$el || null,
    options,
  );
  emit(
    'selectionChange',
    editor,
    editorTextAreaRef.value?.$el || null,
    options,
  );
};

const valueChangeHandler = (options?: { operation?: Operation }) => {
  if (config.html?.autoSave === true) {
    throttleSaveHtml();
  }
  editor.emit(
    'valueChange',
    editor,
    editorTextAreaRef.value?.$el || null,
    options,
  );
  emit('valueChange', editor, editorTextAreaRef.value?.$el || null, options);
  calculateEditorLength();
};

const focusHandler = () => {
  editor.emit('focus', editor, editorTextAreaRef.value?.$el || null);
  emit('focus', editor, editorTextAreaRef.value?.$el || null);
};

const blurHandler = () => {
  editor.emit('blur', editor, editorTextAreaRef.value?.$el || null);
  emit('blur', editor, editorTextAreaRef.value?.$el || null);
};

const editorOnMouseoverHandler = (event: MouseEvent) => {
  const target = event.target as Element | null;
  const currentTarget = event.currentTarget as Element | null;
  if (currentTarget && target && target.classList.contains('se-mark')) {
    currentTarget.querySelectorAll('.hovered').forEach((element) => {
      element.classList.remove('hovered');
    });
    let slateNodeElement = target.parentElement;
    while (
      slateNodeElement &&
      slateNodeElement.dataset.slateNode !== 'element'
    ) {
      slateNodeElement = slateNodeElement.parentElement;
    }
    slateNodeElement?.classList.add('hovered');
  }
  event.stopPropagation();
};

const readHtml = async (): Promise<string> => {
  return await editorService.readHtml();
};

defineExpose({
  editor,
});

onMounted(async () => {
  const html = await readHtml();
  editor.setHtml(html);
  const element: HTMLDivElement = editorTextAreaRef.value?.$el || null;
  editor.htmlElement = element;
  nextTick(() => {
    editor.emit('created', editor, element);
    emit('created', editor, element);
    calculateEditorLength();
  });
});

onUnmounted(() => {
  editor.htmlElement = null;
  editor.emit('destroyed', editor, editorTextAreaRef.value?.$el || null);
  emit('destroyed', editor, editorTextAreaRef.value?.$el || null);
});
</script>

<style scoped>
@reference "tailwindcss";

.se-editor-text-area {
  &:focus-visible {
    @apply outline-none;
  }

  :deep() {
    p {
      @apply relative;
    }
  }

  @apply flow-root overflow-y-auto pl-(--editor-text-area-padding-left) pr-(--editor-text-area-padding-right) pt-(--editor-text-area-padding-top) pb-(--editor-text-area-padding-bottom) shadow-(--editor-text-area-box-shadow);
}

.se-count {
  i {
    @apply not-italic;
  }

  .se-weight {
    @apply text-red-500;
  }

  @apply h-6 text-sm leading-6 text-gray-300 text-right block -mt-6 pr-(--editor-text-area-padding-right);
}
</style>
