import type { EditorNormalization } from '@ssml-editor/vue';

export const XMLNormalizer: EditorNormalization = (
  codes: string[],
): string[] => {
  return codes.map((code: string) => `<xml>${code}</xml>`);
};
