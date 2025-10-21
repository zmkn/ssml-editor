export enum Effect {
  ROBOT = 'robot',
  LOLITA = 'lolita',
  LOWPASS = 'lowpass',
  ECHO = 'echo',
  EQ = 'eq',
  LPFILTER = 'lpfilter',
  HPFILTER = 'hpfilter',
}

export namespace Effect {
  export function fromString(effect: string): Effect | undefined {
    switch (effect) {
      case 'robot':
        return Effect.ROBOT;
      case 'lolita':
        return Effect.LOLITA;
      case 'lowpass':
        return Effect.LOWPASS;
      case 'echo':
        return Effect.ECHO;
      case 'eq':
        return Effect.EQ;
      case 'lpfilter':
        return Effect.LPFILTER;
      case 'hpfilter':
        return Effect.HPFILTER;
      default:
        return undefined;
    }
  }
}
