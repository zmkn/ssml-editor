import type { Events, StyleValue, VNode, VNodeChild } from 'vue';
import type { EventHandlers } from './index.type';

export function icon(
  children?: VNode | VNodeChild[] | null,
  classes?: string[],
  style?: StyleValue,
  on?: EventHandlers<Events>,
): VNode {
  return (
    <span
      contenteditable="false"
      class={classes ? `se-icon ${classes.join(' ')}` : 'se-icon'}
      style={style}
      {...on}
    >
      {children}
    </span>
  );
}
