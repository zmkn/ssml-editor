import type { StyleValue, VNode, VNodeChild } from 'vue';

export function text(
  children?: VNode | VNodeChild[] | null,
  classes?: string[],
  style?: StyleValue,
  fictionalClasses?: string[],
  fictionalStyle?: StyleValue,
): VNode {
  return (
    <span
      class={classes ? `se-text ${classes.join(' ')}` : 'se-text'}
      style={style}
    >
      <span
        class={
          fictionalClasses
            ? `se-fictional-text ${fictionalClasses.join(' ')}`
            : 'se-fictional-text'
        }
        contenteditable="false"
        data-text="{"
        style={fictionalStyle}
      ></span>
      {children}
      <span
        class={
          fictionalClasses
            ? `se-fictional-text ${fictionalClasses.join(' ')}`
            : 'se-fictional-text'
        }
        contenteditable="false"
        data-text="}"
        style={fictionalStyle}
      ></span>
    </span>
  );
}
