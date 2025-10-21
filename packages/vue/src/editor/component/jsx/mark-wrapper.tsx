import type { Events, StyleValue, VNode } from 'vue';
import type { EventHandlers } from './index.type';

export function markWrapper(
  icon?: VNode | VNode[] | null,
  text?: VNode | VNode[] | null,
  classes?: string[],
  style?: StyleValue,
  on?: EventHandlers<Events>,
): VNode {
  return (
    <span
      contenteditable="false"
      class={classes ? `se-mark ${classes.join(' ')}` : 'se-mark'}
      style={style}
      {...on}
    >
      {icon}
      {text}
    </span>
  );
}
