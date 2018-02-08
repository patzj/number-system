const NUM_TO_ALPHA_MAP = new Map([
  [15, 'f'], [14, 'e'], [13, 'd'], [12, 'c'], [11, 'b'], [10, 'a'],
]);

// Adds prefix and replaces values greater than 9 with corresponding alphabet.
const hexProcessor = seq => (
  [
    0, 'x', ...seq
      .map(item => ((item < 10) ? item : NUM_TO_ALPHA_MAP.get(item))),
  ].join('')
);

// Converts decimal values its target base equivalent.
const decimalTo = base => (value) => {
  const RESULT_SEQ = [];
  let returnValue = 0;
  let power = 0;
  let placeValue = 0;
  let originalValue = value;

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

  return returnValue;
};

// Checks the validity of input with respect to the target base.
const isValid = base => (value) => {
  let regexPattern = /()/;

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

  return value.toString().search(regexPattern) > -1;
};

/*
  Wraps the decimalTo function converting the input value from a certain base
  to a decimal value.
*/
const converter = fromBase => toBase => (value) => {
  const TO_BASE = parseInt(toBase, 10);
  let num = 0;

  if (!isValid(fromBase)(value)) throw new Error('Invalid value.');

  num = parseInt(value, fromBase);
  if (Number.isNaN(num)) throw new Error('Invalid value.');

  return decimalTo(TO_BASE)(num);
};

module.exports = converter;
