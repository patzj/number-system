# number-system [![NPM version](https://badge.fury.io/js/number-system.svg)](https://npmjs.org/package/number-system) [![Build Status](https://travis-ci.org/patzj/number-system.svg?branch=master)](https://travis-ci.org/patzj/number-system)

> A number system conversion library. Supports binary, octal, decimal and hexadecimal.

## Installation

```sh
$ npm install --save number-system
```

## Usage

### Creating Instance

```js
var NumberSystem = require('number-system');

// Creates a NumberSystem object that converts from decimal to target base
var ns = new NumberSystem(10);
```

#### Supported Bases

* 2 - Binary
* 8 - Octal
* 10 - Decimal
* 16 - Hexadecimal

### Basic Conversion

```js
// Returns '1100011'
ns.bin(99);

// Returns '1100011'
ns.bin('99');
```

#### Available Conversion Methods

| Method | Description | Parameter |
| ------ | ----------- | --------- |
| bin    | Converts argument to binary | Number or String value |
| oct    | Converts argument to octal | Number or String value |
| dec    | Converts argument to decimal | Number or String value |
| hex    | Converts argument to hexadecimal | Number or String value |

_Note: Use String arguments when converting hexadecimal values with alpha characters (e.g. 0xff)._

### Changing Base

```js
// Returns 10
ns.base;

// Changes the original base to hexadecimal
ns.base = 16

// Returns 16
ns.base;

// Returns '0143'
ns.oct(63);

// Returns '99'
ns.dec('0x63');
```

## License

MIT
