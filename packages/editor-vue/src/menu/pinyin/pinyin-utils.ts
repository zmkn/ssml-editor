import { polyphonic } from 'pinyin-pro';

export const PinyinUtils = {
  /**
   * 判断拼音的音调是否是指定数字结尾
   * @param pinyin 带数字音调的拼音
   * @returns 是或否
   */
  isEndsWith(pinyin: string, end: string): boolean {
    return pinyin[pinyin.length - 1] === end;
  },

  /**
   * 将数字音调0转为5
   * @param pinyin 带数字音调的拼音
   * @returns 转换后的拼音
   */
  convert0To5(pinyin: string): string {
    return this.isEndsWith(pinyin, '0')
      ? `${pinyin.slice(0, pinyin.length - 1)}5`
      : pinyin;
  },

  /**
   * 去除数字音调0
   * @param pinyin 数字音调拼音
   * @returns
   */
  clearEnd5(pinyin: string) {
    return this.isEndsWith(pinyin, '5')
      ? pinyin.slice(0, pinyin.length - 1)
      : pinyin;
  },

  /**
   * 通过字获取拼音
   * @param word 单个字
   * @returns 拼音数组
   */
  getPinyin(word: string): string[] {
    if (word.length === 1) {
      return polyphonic(word, { type: 'array', toneType: 'num' })[0].map(
        (pinyin) => {
          return this.convert0To5(pinyin);
        },
      );
    } else {
      throw new Error('word必须是一个中文字符');
    }
  },
};
