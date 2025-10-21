import type { Events, StyleValue, VNode } from 'vue';
import { icon } from './icon';
import type { EventHandlers } from './index.type';
import { markText } from './mark-text';
import { markWrapper } from './mark-wrapper';

export function mark(
  mark: string,
  classes?: string[],
  style?: StyleValue,
  on?: EventHandlers<Events>,
  closeClasses?: string[],
  closeOn?: EventHandlers<Events>,
): VNode {
  return markWrapper(
    icon(null, closeClasses, undefined, closeOn),
    markText(mark),
    classes,
    style,
    on,
  );
}
