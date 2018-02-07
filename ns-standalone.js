(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('./lib/converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberSystem = function () {
  function NumberSystem() {
    var fromBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, NumberSystem);

    var SUPPORTED_BASES = [2, 8, 10, 16];
    var BASE = parseInt(fromBase, 10);

    if (Number.isNaN(BASE) || SUPPORTED_BASES.indexOf(BASE) < 0) {
      throw new Error('Base not supported. Use 2, 8, 10 or 16.');
    }
    this.fromBase = BASE;
  }

  _createClass(NumberSystem, [{
    key: 'bin',
    value: function bin(val) {
      return (0, _converter2.default)(this.fromBase)(2)(val);
    }
  }, {
    key: 'oct',
    value: function oct(val) {
      return (0, _converter2.default)(this.fromBase)(8)(val);
    }
  }, {
    key: 'dec',
    value: function dec(val) {
      return (0, _converter2.default)(this.fromBase)(10)(val);
    }
  }, {
    key: 'hex',
    value: function hex(val) {
      return (0, _converter2.default)(this.fromBase)(16)(val);
    }
  }, {
    key: 'base',
    set: function set(fromBase) {
      this.fromBase = fromBase;
    },
    get: function get() {
      return this.fromBase;
    }
  }]);

  return NumberSystem;
}();

exports.default = NumberSystem;

},{"./lib/converter":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var NUM_TO_ALPHA_MAP = new Map([[15, 'f'], [14, 'e'], [13, 'd'], [12, 'c'], [11, 'b'], [10, 'a']]);

var hexProcessor = function hexProcessor(seq) {
  return [0, 'x'].concat(_toConsumableArray(seq.map(function (item) {
    return item < 10 ? item : NUM_TO_ALPHA_MAP.get(item);
  }))).join('');
};

var decimalTo = function decimalTo(base) {
  return function (val) {
    var RESULT_SEQ = [];
    var returnValue = 0;
    var power = 0;
    var divisor = 0;
    var dividend = val;

    while (dividend >= base) {
      dividend /= base;
      power += 1;
    }

    divisor = Math.pow(base, power);
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
        returnValue = [0].concat(RESULT_SEQ).join('');
        break;
      default:
        returnValue = RESULT_SEQ.join('');
    }

    return returnValue;
  };
};

var isValid = function isValid(base) {
  return function (val) {
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

    return val.toString().search(regexPattern) > -1;
  };
};

var converter = function converter(fromBase) {
  return function (toBase) {
    return function (val) {
      var TO_BASE = parseInt(toBase, 10);
      var num = 0;

      if (!isValid(fromBase)(val)) throw new Error('Invalid value.');

      num = parseInt(val, fromBase);
      if (Number.isNaN(num)) throw new Error('Invalid value.');

      return decimalTo(TO_BASE)(num);
    };
  };
};

exports.default = converter;

},{}]},{},[1]);
