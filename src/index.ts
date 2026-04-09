const NUM_TO_ALPHA_MAP: Map<number, string> = new Map([
  [15, 'f'], [14, 'e'], [13, 'd'], [12, 'c'], [11, 'b'], [10, 'a'],
]);

// Adds prefix and replaces values greater than 9 with corresponding alphabet.
const hexProcessor = (seq: number[]): string => (
  [
    0, 'x', ...seq
      .map((item: number) => ((item < 10) ? item : NUM_TO_ALPHA_MAP.get(item))),
  ].join('')
);

// Converts decimal values its target base equivalent.
const decimalTo = (base: number) => (value: number): string => {
  const RESULT_SEQ: number[] = [];
  let returnValue: string | number = 0;
  let power: number = 0;
  let placeValue: number = 0;
  let originalValue: number = value;

  /*
  Finds the highest place value in the target base that is less than
  or equal to the original value.
  */
  while (originalValue >= base) {
    originalValue /= base;
    power += 1;
  }

  placeValue = base ** power;
  originalValue = value;

  /*
  Determines the digit that belongs to the current place value and appends to
  the result sequence.
  */
  while (placeValue >= 1) {
    RESULT_SEQ.push(Math.floor(originalValue / placeValue));
    originalValue %= placeValue;
    placeValue /= base;
  }

  // Transforms the results to a single string of valid target base value.
  switch (base) {
    case 16:
      returnValue = hexProcessor(RESULT_SEQ);
      break;
    case 8:
      returnValue = [0, ...RESULT_SEQ].join('');
      break;
    default:
      returnValue = RESULT_SEQ.join('');
  }

  return returnValue.toString();
};

// Checks the validity of input with respect to the target base.
const isValid = (base: number) => (value: string | number): boolean => {
  let regexPattern: RegExp = /()/;

  switch (base) {
    case 16:
      regexPattern = /^(0x)?[abcdef0-9]+$/i;
      break;
    case 10:
    case 8:
      regexPattern = /^[0-9]+$/i;
      break;
    default:
      regexPattern = /^[01]+$/i;
  }

  return regexPattern.test(value.toString());
};

/*
  Wraps the decimalTo function converting the input value from a certain base
  to a decimal value.
*/
const converter = (fromBase: number) => (toBase: number) => (value: string | number): string => {
  const TO_BASE: number = parseInt(toBase.toString(), 10);
  let num: number = 0;

  if (!isValid(fromBase)(value)) throw new Error(`Value '${value}' is not a valid number for base ${fromBase}.`);

  num = parseInt(value.toString(), fromBase);
  if (Number.isNaN(num)) throw new Error(`Value '${value}' cannot be parsed as a number in base ${fromBase}.`);

  return decimalTo(TO_BASE)(num);
};

// Wraps the conversion methods to single class / object.
class NumberSystem {
  private _fromBase: number;

  private _validateBase(base: number): number {
    const SUPPORTED_BASES: number[] = [2, 8, 10, 16];
    const parsedBase: number = parseInt(base.toString(), 10);

    if (Number.isNaN(parsedBase) || SUPPORTED_BASES.indexOf(parsedBase) < 0) {
      throw new Error(`Base '${base}' not supported. Use 2, 8, 10 or 16.`);
    }
    return parsedBase;
  }

  constructor(fromBase: number = 10) {
    this._fromBase = this._validateBase(fromBase);
  }

  // Converts a value from a certain base to binary (base 2).
  bin(value: string | number): string {
    return converter(this._fromBase)(2)(value);
  }

  // Converts a value from a certain base to octal (base 8).
  oct(value: string | number): string {
    return converter(this._fromBase)(8)(value);
  }

  // Converts a value from a certain base to decimal (base 10).
  dec(value: string | number): string {
    return converter(this._fromBase)(10)(value);
  }

  // Converts a value from a certain base to hexadecimal (base 16).
  hex(value: string | number): string {
    return converter(this._fromBase)(16)(value);
  }

  set base(fromBase: number) {
    this._fromBase = this._validateBase(fromBase);
  }

  get base(): number {
    return this._fromBase;
  }
}

export default NumberSystem;
