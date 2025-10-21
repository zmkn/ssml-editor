import type { StyleValue, VNode } from 'vue';

export function markText(
  mark: string,
  classes?: string[],
  style?: StyleValue,
): VNode {
  return (
    <span
      class={
        classes ? `se-fictional-text ${classes.join(' ')}` : 'se-fictional-text'
      }
      style={style}
      data-text={mark}
    ></span>
  );
}
