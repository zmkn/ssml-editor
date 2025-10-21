import type {
  EditorHtmlToElementMethod,
  EditorHtmlToElementMethodProps,
} from '@/type';
import { PARAGRAPH_TYPE } from './constant';
import type { Paragraph } from './model';

export const paragraphHtmlToElement: EditorHtmlToElementMethod = ({
  children,
}: EditorHtmlToElementMethodProps): Paragraph => {
  return {
    type: PARAGRAPH_TYPE,
    children: children,
  };
};
