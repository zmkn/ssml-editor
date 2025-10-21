export const CharUtils = {
  encode(text: string): string {
    return encodeURIComponent(text);
  },
  decode(text: string): string {
    return decodeURIComponent(text);
  },
};
