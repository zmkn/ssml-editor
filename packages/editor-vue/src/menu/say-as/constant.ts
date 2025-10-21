import { SayAsInterpretation } from '@/module/say-as/say-as-interpretation.enum';

export const SayAsInterpretationData = {
  [SayAsInterpretation.CARDINAL]: '读数值',
  [SayAsInterpretation.DIGITS]: '读数字',
  [SayAsInterpretation.TELEPHONE]: '读手机号',
  [SayAsInterpretation.NAME]: '读人名',
  [SayAsInterpretation.ADDRESS]: '读地址',
  [SayAsInterpretation.ID]: '读账号',
  [SayAsInterpretation.CHARACTERS]: '读字符',
  [SayAsInterpretation.PUNCTUATION]: '读符号',
  [SayAsInterpretation.DATE]: '读日期',
  [SayAsInterpretation.TIME]: '读时间',
  [SayAsInterpretation.CURRENCY]: '读金额',
  [SayAsInterpretation.MEASURE]: '读单位',
};
