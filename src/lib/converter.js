const NUM_TO_ALPHA_MAP = new Map([
  [15, 'f'], [14, 'e'], [13, 'd'], [12, 'c'], [11, 'b'], [10, 'a'],
]);

const hexProcessor = seq => (
  [
    0, 'x', ...seq
      .map(item => ((item < 10) ? item : NUM_TO_ALPHA_MAP.get(item))),
  ].join('')
);

const decimalTo = base => (val) => {
  const RESULT_SEQ = [];
  let returnValue = 0;
  let power = 0;
  let divisor = 0;
  let dividend = val;

  while (dividend >= base) {
    dividend /= base;
    power += 1;
  }

  divisor = base ** power;
  dividend = val;

  while (divisor >= 1) {
    RESULT_SEQ.push(Math.floor(dividend / divisor));
    dividend %= divisor;
    divisor /= base;
  }

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

const isValid = base => (val) => {
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

  return val.toString().search(regexPattern) > -1;
};

const converter = fromBase => toBase => (val) => {
  const TO_BASE = parseInt(toBase, 10);
  let num = 0;

  if (!isValid(fromBase)(val)) throw new Error('Invalid value.');

  num = parseInt(val, fromBase);
  if (Number.isNaN(num)) throw new Error('Invalid value.');

  return decimalTo(TO_BASE)(num);
};

export default converter;
