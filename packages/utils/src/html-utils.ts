function createElementAsString(
  nodeName: string,
  attributes: {
    [key: string]: string | number | boolean | undefined;
  },
  children?: string,
): string {
  let htmlParts: string[] = [`<${nodeName}`];
  if (typeof attributes === 'object') {
    for (const key in attributes) {
      const value = attributes[key];
      if (typeof value !== 'undefined') {
        if (typeof value === 'string' || typeof value === 'number') {
          htmlParts.push(` ${key}="${value}"`);
        } else if (value) {
          htmlParts.push(` ${key}`);
        }
      }
    }
  }
  htmlParts.push('>');
  if (typeof children === 'string') {
    htmlParts.push(children);
  }
  htmlParts.push(`</${nodeName}>`);
  return htmlParts.join('');
}

function getAttribute(
  element: Element,
  attributeName: string,
  defaultValue: string,
): string;
function getAttribute(
  element: Element,
  attributeName: string,
  defaultValue: number,
): number;
function getAttribute(
  element: Element,
  attributeName: string,
  defaultValue: boolean,
): boolean;
function getAttribute(
  element: Element,
  attributeName: string,
): string | undefined;
function getAttribute(
  element: Element,
  attributeName: string,
  defaultValue?: string | number | boolean,
): string | number | boolean | undefined {
  const value = element.getAttribute(`${attributeName}`);
  if (typeof defaultValue === 'number') {
    if (value) {
      return +value;
    } else {
      return defaultValue;
    }
  } else if (typeof defaultValue === 'boolean') {
    if (value) {
      if (value === 'false') {
        return false;
      } else {
        return true;
      }
    } else {
      if (element.hasAttribute(`${attributeName}`)) {
        return true;
      } else {
        return defaultValue;
      }
    }
  }
  return value || defaultValue;
}

export const HtmlUtils = {
  createElementAsString,
  getAttribute,
};
