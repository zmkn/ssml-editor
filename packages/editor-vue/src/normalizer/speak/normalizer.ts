import type { EditorNormalization } from '@ssml-editor/vue';

export const SpeakNormalizer: EditorNormalization = (
  codes: string[],
): string[] => {
  for (const code of codes) {
    if (!code.startsWith('<speak')) {
      throw new Error('存在未设置属性的段落');
    }
  }
  return codes;
};
