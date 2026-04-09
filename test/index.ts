import NumberSystem from '../src';

const SUPPORTED_BASES: number[] = [2, 8, 10, 16];
const UNSUPPORTED_BASES: (number | string)[] = [0, 0.1, 99, 'x'];
const SUPPORTED_CONVERSIONS: { name: 'bin' | 'oct' | 'dec' | 'hex'; values: string[] }[] = [
  {
    name: 'bin',
    values: ['0', '1', '1100011', '11111111'],
  },
  {
    name: 'oct',
    values: ['00', '01', '0143', '0377'],
  },
  {
    name: 'dec',
    values: ['0', '1', '99', '255'],
  },
  {
    name: 'hex',
    values: ['0x0', '0x1', '0x63', '0xff'],
  },
];

describe('Number System Converter', () => {
  describe('Instance creation', () => {
    it('Creates a NumberSystem object with default base', () => {
      const ns = new NumberSystem();
      expect(ns.base).toBe(10);
    });

    SUPPORTED_BASES.forEach((base: number) => {
      it(`Creates a NumberSystem object with base ${base}`, () => {
        const ns = new NumberSystem(base);
        expect(ns.base).toBe(base);
      });
    });

    UNSUPPORTED_BASES.forEach((base: number | string) => {
      it(`Throws an error using ${base} as base for instance creation`, () => {
        expect(() => new NumberSystem(base as number)).toThrow(Error);
      });
    });
  });

  describe('Base assignment', () => {
    const ns = new NumberSystem();
    SUPPORTED_BASES.forEach((base: number) => {
      it(`Assigns base ${base} to existing NumberSystem object`, () => {
        ns.base = base;
        expect(ns.base).toBe(base);
      });
    });

    UNSUPPORTED_BASES.forEach((base: number | string) => {
      it(`Throws an error using ${base} for base assignment`, () => {
        expect(() => { ns.base = base as number; }).toThrow(Error);
      });
    });
  });

  describe('Conversion', () => {
    SUPPORTED_BASES.forEach((base: number, index: number) => {
      describe(`From base ${base}`, () => {
        const ns = new NumberSystem(base);

        SUPPORTED_CONVERSIONS.forEach((conv, convIndex) => {
          it(`Converts valid values to base ${SUPPORTED_BASES[convIndex]}`, () => {
            SUPPORTED_CONVERSIONS[index].values.forEach((value: string | number) => {
              let convertedValue: string;
              switch (conv.name) {
                case 'bin':
                  convertedValue = ns.bin(value);
                  break;
                case 'oct':
                  convertedValue = ns.oct(value);
                  break;
                case 'dec':
                  convertedValue = ns.dec(value);
                  break;
                case 'hex':
                  convertedValue = ns.hex(value);
                  break;
                default:
                  throw new Error(`Unknown conversion type: ${conv.name}`);
              }
              expect(convertedValue).toBe(SUPPORTED_CONVERSIONS[convIndex].values[SUPPORTED_CONVERSIONS[index].values.indexOf(value as string)]);
            });
          });
        });

        SUPPORTED_CONVERSIONS.forEach((conv, convIndex) => {
          it(`Throws an error converting invalid values to base ${SUPPORTED_BASES[convIndex]}`, () => {
            const invalidValues = ['x', 'fax', NaN, undefined];
            invalidValues.forEach((invalidValue) => {
              switch (conv.name) {
                case 'bin':
                  expect(() => ns.bin(invalidValue as string)).toThrow(Error);
                  break;
                case 'oct':
                  expect(() => ns.oct(invalidValue as string)).toThrow(Error);
                  break;
                case 'dec':
                  expect(() => ns.dec(invalidValue as string)).toThrow(Error);
                  break;
                case 'hex':
                  expect(() => ns.hex(invalidValue as string)).toThrow(Error);
                  break;
                default:
                  throw new Error(`Unknown conversion type: ${conv.name}`);
              }
            });
          });
        });
      });
    });
  });
});