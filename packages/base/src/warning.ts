export class Warning extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    // 设置正确的原型链
    Object.setPrototypeOf(this, Warning.prototype);

    // 设置名称，便于错误识别
    this.name = 'Warning';
  }

  static isWarning(warning: unknown): boolean {
    return warning instanceof Warning;
  }
}
