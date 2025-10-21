import { evaluate } from 'mathjs';

export const ValidatorUtils = {
  cardinalRegex:
    /^((-?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?)(?:\s*-\s*))?(-?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?)$/,
  digitsRegex: /^(\d+)(?:\s*-\s*\d+)*$/,
  telephoneRegex:
    /^((\(\+?\d+\))+|\+?\d+)(?:\s*[-\u8F6C\u5206\u673A\u53F7]*\s*\d+)*$/u,
  nameRegex: /^\S+$/,
  addressRegex: /^\S+$/,
  idRegex: /^[a-zA-Z0-9_]+$/,
  charactersRegex: /^\S+$/,
  punctuationRegex:
    /^[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\u3000-\u303F\uFF00-\uFFEF\u2010-\u2017\u2018-\u201F]+$/u,
  dateRegex: /^([a-zA-Z0-9]+|\d+).*$/,
  timeRegex:
    /^(\d|\u4E0A\u5348|\u4E0B\u5348)[a-zA-Z0-9.-~:\u4E0A\u4E0B\u5348\u70B9\u5206\u6BEB\u79D2\s]*[a-zA-Z0-9.]$/u,
  currencyRegex:
    /^(Fr|kr|£|€|(US|CA|AU|SG|HK|C|A)?\$|CN?¥|CNY|RMB|AUD|CAD|CHF|DKK|EUR|GBP|HKD|JPY|NOK|SEK|SGD|USD)?\s*((?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?\s*(thousand|million|billion|trillion|(M|m|B|b)il|(B|b|T|t)n|K|k|M|m|MM)?\s*(CN(¥|Y)|RMB|AUD|CAD|CHF|DKK|EUR|GBP|HKD|JPY|NOK|SEK|SGD|USD)?)$/,
  measureRegex: /^\S+$/,

  isCardinal(text: string): boolean {
    const testResult = this.cardinalRegex.test(text);
    if (testResult) {
      return true;
    } else {
      try {
        const cleanText = text.replace(/,?\.?\s?/g, '');
        const evaluateResult = evaluate(cleanText);
        return typeof evaluateResult === 'number' && !isNaN(evaluateResult);
      } catch (error) {
        return false;
      }
    }
  },
  isDigits(text: string): boolean {
    return this.digitsRegex.test(text);
  },
  isTelephone(text: string): boolean {
    return this.telephoneRegex.test(text);
  },
  isName(text: string): boolean {
    return this.nameRegex.test(text);
  },
  isAddress(text: string): boolean {
    return this.addressRegex.test(text);
  },
  isId(text: string): boolean {
    return this.idRegex.test(text);
  },
  isCharacters(text: string): boolean {
    return this.charactersRegex.test(text);
  },
  isPunctuation(text: string): boolean {
    return this.punctuationRegex.test(text);
  },
  isDate(text: string): boolean {
    return this.dateRegex.test(text);
  },
  isTime(text: string): boolean {
    return this.timeRegex.test(text);
  },
  isCurrency(text: string): boolean {
    return this.currencyRegex.test(text);
  },
  isMeasure(text: string): boolean {
    return this.measureRegex.test(text);
  },
};
