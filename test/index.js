const { expect } = require('chai');
const NumberSystem = require('../dist');

const SUPPORTED_BASES = [2, 8, 10, 16];
const UNSUPPORTED_BASES = [0, 0.1, 99, 'x'];
const SUPPORTED_CONVERSIONS = [
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
      expect(ns.base).to.equal(10);
    });

    SUPPORTED_BASES.forEach((base) => {
      it(`Creates a NumberSystem object with base ${base}`, () => {
        const ns = new NumberSystem(base);
        expect(ns.base).to.equal(base);
      });
    });

    UNSUPPORTED_BASES.forEach((base) => {
      it(`Throws an error using ${base} as base for instance creation`, () => {
        expect(() => new NumberSystem(base)).to.throw(Error);
      });
    });
  });

  describe('Base assignment', () => {
    const ns = new NumberSystem();
    SUPPORTED_BASES.forEach((base) => {
      it(`Assigns base ${base} to existing NumberSystem object`, () => {
        ns.base = base;
        expect(ns.base).to.equal(base);
      });
    });

    UNSUPPORTED_BASES.forEach((base) => {
      it(`Throws an error using ${base} for base assignment`, () => {
        expect(() => new NumberSystem(base)).to.throw(Error);
      });
    });
  });

  describe('Conversion', () => {
    SUPPORTED_BASES.forEach((base, index) => {
      describe(`From base ${base}`, () => {
        const ns = new NumberSystem(base);

        SUPPORTED_CONVERSIONS.forEach((conv, convIndex) => {
          it(`Converts valid values to base ${SUPPORTED_BASES[convIndex]}`, () => {
            SUPPORTED_CONVERSIONS[index].values.forEach((value, valueIndex) => {
              expect(ns[conv.name](value))
                .to.equal(SUPPORTED_CONVERSIONS[convIndex].values[valueIndex]);
            });
          });
        });

        SUPPORTED_CONVERSIONS.forEach((conv, convIndex) => {
          it(`Throws an error converting invalid values to base ${SUPPORTED_BASES[convIndex]}`, () => {
            expect(() => ns[conv.name]('x')).to.throw(Error);
            expect(() => ns[conv.name]('fax')).to.throw(Error);
            expect(() => ns[conv.name](NaN)).to.throw(Error);
            expect(() => ns[conv.name](undefined)).to.throw(Error);
          });
        });
      });
    });
  });
});
