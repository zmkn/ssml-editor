export enum SayAsInterpretation {
  CARDINAL = 'cardinal',
  DIGITS = 'digits',
  TELEPHONE = 'telephone',
  NAME = 'name',
  ADDRESS = 'address',
  ID = 'id',
  CHARACTERS = 'characters',
  PUNCTUATION = 'punctuation',
  DATE = 'date',
  TIME = 'time',
  CURRENCY = 'currency',
  MEASURE = 'measure',
}

export namespace SayAsInterpretation {
  export function fromString(
    interpret: string,
  ): SayAsInterpretation | undefined {
    switch (interpret) {
      case 'cardinal':
        return SayAsInterpretation.CARDINAL;
      case 'digits':
        return SayAsInterpretation.DIGITS;
      case 'telephone':
        return SayAsInterpretation.TELEPHONE;
      case 'name':
        return SayAsInterpretation.NAME;
      case 'address':
        return SayAsInterpretation.ADDRESS;
      case 'id':
        return SayAsInterpretation.ID;
      case 'characters':
        return SayAsInterpretation.CHARACTERS;
      case 'punctuation':
        return SayAsInterpretation.PUNCTUATION;
      case 'date':
        return SayAsInterpretation.DATE;
      case 'time':
        return SayAsInterpretation.TIME;
      case 'currency':
        return SayAsInterpretation.CURRENCY;
      case 'measure':
        return SayAsInterpretation.MEASURE;
      default:
        return undefined;
    }
  }
}
