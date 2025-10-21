import xmlFormatter from 'xml-formatter';

export const CodeUtils = {
  format(code: string): string {
    return xmlFormatter(code, {
      indentation: '  ',
      collapseContent: false,
      lineSeparator: '\n',
      whiteSpaceAtEndOfSelfclosingTag: false,
    });
  },
};
