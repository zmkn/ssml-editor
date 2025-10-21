export enum Alphabet {
  PY = 'py',
  CMU = 'cmu',
}

export namespace Alphabet {
  export function fromString(alphabet: string): Alphabet | undefined {
    switch (alphabet) {
      case 'py':
        return Alphabet.PY;
      case 'cmu':
        return Alphabet.CMU;
      default:
        return undefined;
    }
  }
}
