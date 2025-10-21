export const JsonUtils = {
  encode(json: string): any {
    return JSON.parse(json);
  },
  decode(object: any): string {
    return JSON.stringify(object);
  },
};
