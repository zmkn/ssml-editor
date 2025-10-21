import { HtmlUtils as OHtmlUtils } from '@ssml-editor/utils';

function createElementAsString(
  nodeName: string,
  type: string,
  isInline: boolean,
  isVoid: boolean,
  dataAttributes: {
    [key: string]: string | number | boolean | undefined;
  },
  children?: string,
): string;
function createElementAsString(
  type: string,
  isInline: boolean,
  isVoid: boolean,
  dataAttributes: {
    [key: string]: string | number | boolean | undefined;
  },
  children?: string,
): string;
function createElementAsString(
  nodeName: string,
  type: string | boolean,
  isInline: boolean,
  isVoid:
    | boolean
    | {
        [key: string]: string | number | boolean | undefined;
      },
  dataAttributes?:
    | string
    | {
        [key: string]: string | number | boolean | undefined;
      },
  children?: string,
): string {
  if (typeof dataAttributes === 'string') {
    children = dataAttributes;
  }
  if (typeof isVoid === 'object') {
    dataAttributes = isVoid;
    isVoid = isInline;
  }
  if (typeof type === 'boolean') {
    isInline = type;
    type = nodeName;
    if (isInline) {
      nodeName = 'span';
    } else {
      nodeName = 'div';
    }
  }
  return OHtmlUtils.createElementAsString(
    nodeName,
    {
      'data-s-e-type': type as string,
      'data-s-e-inline': isInline as boolean,
      'data-s-e-void': isVoid as boolean,
      ...Object.fromEntries(
        Object.entries(dataAttributes as {}).map(([key, value]) => [
          `data-${key}`,
          value,
        ]),
      ),
    },
    children,
  );
}

function getDataAttribute(
  element: Element,
  attributeName: string,
  defaultValue: string,
): string;
function getDataAttribute(
  element: Element,
  attributeName: string,
  defaultValue: number,
): number;
function getDataAttribute(
  element: Element,
  attributeName: string,
  defaultValue: boolean,
): boolean;
function getDataAttribute(
  element: Element,
  attributeName: string,
): string | undefined;
function getDataAttribute(
  element: Element,
  attributeName: string,
  defaultValue?: string | number | boolean,
): string | number | boolean | undefined {
  return OHtmlUtils.getAttribute(
    element,
    `data-${attributeName}`,
    defaultValue as any,
  );
}

function getType(element: Element): string | undefined;
function getType(element: Element, defaultValue: string): string;
function getType(element: Element, defaultValue?: string): string | undefined {
  return OHtmlUtils.getAttribute(
    element,
    HtmlUtils.typeKey,
    defaultValue as any,
  );
}

export const HtmlUtils = {
  typeKey: 'data-s-e-type',
  voidKey: 'data-s-e-void',
  inlineKey: 'data-s-e-inline',
  createElementAsString,
  getDataAttribute,
  getType,
  isVoid(element: Element): boolean {
    return OHtmlUtils.getAttribute(element, this.voidKey, false);
  },
  isInline(element: Element): boolean {
    return OHtmlUtils.getAttribute(element, this.inlineKey, false);
  },
};
