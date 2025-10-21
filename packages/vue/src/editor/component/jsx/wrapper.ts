import { h, type HTMLAttributes, type VNode, type VNodeRef } from 'vue';

function wrapper(
  attributes: HTMLAttributes & {
    'data-slate-node': 'element';
    'data-slate-inline'?: true;
    'data-slate-void'?: true;
    dir?: 'rtl';
    ref: VNodeRef;
  },
  ...children: Array<VNode | VNode[] | null | undefined>
): VNode;
function wrapper(
  nodeName: string,
  attributes: HTMLAttributes & {
    'data-slate-node': 'element';
    'data-slate-inline'?: true;
    'data-slate-void'?: true;
    dir?: 'rtl';
    ref: VNodeRef;
  },
  ...children: Array<VNode | VNode[] | null | undefined>
): VNode;
function wrapper(
  nodeName:
    | string
    | (HTMLAttributes & {
        'data-slate-node': 'element';
        'data-slate-inline'?: true;
        'data-slate-void'?: true;
        dir?: 'rtl';
        ref: VNodeRef;
      }),
  attributes:
    | (HTMLAttributes & {
        'data-slate-node': 'element';
        'data-slate-inline'?: true;
        'data-slate-void'?: true;
        dir?: 'rtl';
        ref: VNodeRef;
      })
    | VNode
    | VNode[]
    | null
    | undefined,
  ...children: Array<VNode | VNode[] | null | undefined>
): VNode {
  if (typeof nodeName === 'object') {
    children.unshift(attributes as any);
    attributes = nodeName;
    nodeName = 'span';
  }
  return h(
    nodeName,
    {
      ...(attributes as HTMLAttributes),
      class: (attributes as HTMLAttributes).class
        ? `se-element-wrapper ${(attributes as HTMLAttributes).class}`
        : 'se-element-wrapper',
    },
    children,
  );
}

export { wrapper };
