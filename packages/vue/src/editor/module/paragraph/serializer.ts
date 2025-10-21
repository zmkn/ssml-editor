import type { EditorSerializationMethod } from '@/type';
import type { Paragraph } from './model';

export const paragraphSerializer = ((
  _: Paragraph,
  children?: string,
): string => {
  return `<p>${children}</p>`;
}) as EditorSerializationMethod;
