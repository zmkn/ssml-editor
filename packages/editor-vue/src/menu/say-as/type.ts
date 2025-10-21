export type ValidateMethod = (
  text: string,
  defaultValidateMethod: (text: string) => boolean,
) => boolean;

export type SayAsInterpretationValues =
  | 'cardinal'
  | 'digits'
  | 'telephone'
  | 'name'
  | 'address'
  | 'id'
  | 'characters'
  | 'punctuation'
  | 'date'
  | 'time'
  | 'currency'
  | 'measure';

export type SayAsProps = {
  [K in SayAsInterpretationValues]: {
    validate?: ValidateMethod;
  };
};
