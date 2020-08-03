"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var NUM_TO_ALPHA_MAP = new Map([[15, 'f'], [14, 'e'], [13, 'd'], [12, 'c'], [11, 'b'], [10, 'a']]); // Adds prefix and replaces values greater than 9 with corresponding alphabet.

var hexProcessor = function hexProcessor(seq) {
  return [0, 'x'].concat(_toConsumableArray(seq.map(function (item) {
    return item < 10 ? item : NUM_TO_ALPHA_MAP.get(item);
  }))).join('');
}; // Converts decimal values its target base equivalent.


var decimalTo = function decimalTo(base) {
  return function (value) {
    var RESULT_SEQ = [];
    var returnValue = 0;
    var power = 0;
    var placeValue = 0;
    var originalValue = value;
    /*
    Finds the highest place value in the target base that is less than
    or equal to the original value.
    */

    while (originalValue >= base) {
      originalValue /= base;
      power += 1;
    }

    placeValue = Math.pow(base, power);
    originalValue = value;
    /*
    Determines the digit that belongs to the current place value and appends to
    the result sequence.
    */

    while (placeValue >= 1) {
      RESULT_SEQ.push(Math.floor(originalValue / placeValue));
      originalValue %= placeValue;
      placeValue /= base;
    } // Transforms the results to a single string of valid target base value.


    switch (base) {
      case 16:
        returnValue = hexProcessor(RESULT_SEQ);
        break;

      case 8:
        returnValue = [0].concat(RESULT_SEQ).join('');
        break;

      default:
        returnValue = RESULT_SEQ.join('');
    }

    return returnValue;
  };
}; // Checks the validity of input with respect to the target base.


var isValid = function isValid(base) {
  return function (value) {
    var regexPattern = /()/;

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
};
/*
  Wraps the decimalTo function converting the input value from a certain base
  to a decimal value.
*/


var converter = function converter(fromBase) {
  return function (toBase) {
    return function (value) {
      var TO_BASE = parseInt(toBase, 10);
      var num = 0;
      if (!isValid(fromBase)(value)) throw new Error('Invalid value.');
      num = parseInt(value, fromBase);
      if (Number.isNaN(num)) throw new Error('Invalid value.');
      return decimalTo(TO_BASE)(num);
    };
  };
}; // Wraps the conversion methods to single class / object.


var NumberSystem = /*#__PURE__*/function () {
  function NumberSystem() {
    var fromBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, NumberSystem);

    var SUPPORTED_BASES = [2, 8, 10, 16];
    var BASE = parseInt(fromBase, 10);

    if (Number.isNaN(BASE) || SUPPORTED_BASES.indexOf(BASE) < 0) {
      throw new Error('Base not supported. Use 2, 8, 10 or 16.');
    }

    this.fromBase = BASE;
  } // Converts a value from a certain base to binary (base 2).


  _createClass(NumberSystem, [{
    key: "bin",
    value: function bin(value) {
      return converter(this.fromBase)(2)(value);
    } // Converts a value from a certain base to octal (base 8).

  }, {
    key: "oct",
    value: function oct(value) {
      return converter(this.fromBase)(8)(value);
    } // Converts a value from a certain base to decimal (base 10).

  }, {
    key: "dec",
    value: function dec(value) {
      return converter(this.fromBase)(10)(value);
    } // Converts a value from a certain base to hexadecimal (base 16).

  }, {
    key: "hex",
    value: function hex(value) {
      return converter(this.fromBase)(16)(value);
    }
  }, {
    key: "base",
    set: function set(fromBase) {
      this.fromBase = fromBase;
    },
    get: function get() {
      return this.fromBase;
    }
  }]);

  return NumberSystem;
}();

module.exports = NumberSystem;
