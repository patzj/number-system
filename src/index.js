import converter from './lib/converter';

class NumberSystem {
  constructor(fromBase = 10) {
    const SUPPORTED_BASES = [2, 8, 10, 16];
    const BASE = parseInt(fromBase, 10);

    if (Number.isNaN(BASE) || SUPPORTED_BASES.indexOf(BASE) < 0) {
      throw new Error('Base not supported. Use 2, 8, 10 or 16.');
    }
    this.fromBase = BASE;
  }

  // Converts a value from a certain base to binary (base 2).
  bin(value) {
    return converter(this.fromBase)(2)(value);
  }

  // Converts a value from a certain base to octal (base 8).
  oct(value) {
    return converter(this.fromBase)(8)(value);
  }

  // Converts a value from a certain base to decimal (base 10).
  dec(value) {
    return converter(this.fromBase)(10)(value);
  }

  // Converts a value from a certain base to hexadecimal (base 16).
  hex(value) {
    return converter(this.fromBase)(16)(value);
  }

  set base(fromBase) {
    this.fromBase = fromBase;
  }

  get base() {
    return this.fromBase;
  }
}

module.exports = NumberSystem;
