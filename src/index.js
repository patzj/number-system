import converter from './lib/converter';

export default class NumberSystem {
  constructor(fromBase = 10) {
    const SUPPORTED_BASES = [2, 8, 10, 16];
    const BASE = parseInt(fromBase, 10);

    if (Number.isNaN(BASE) || SUPPORTED_BASES.indexOf(BASE) < 0) {
      throw new Error('Base not supported. Use 2, 8, 10 or 16.');
    }
    this.fromBase = BASE;
  }

  bin(val) {
    return converter(this.fromBase)(2)(val);
  }

  oct(val) {
    return converter(this.fromBase)(8)(val);
  }

  dec(val) {
    return converter(this.fromBase)(10)(val);
  }

  hex(val) {
    return converter(this.fromBase)(16)(val);
  }

  set base(fromBase) {
    this.fromBase = fromBase;
  }

  get base() {
    return this.fromBase;
  }
}
