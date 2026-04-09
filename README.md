# number-system [![NPM version](https://badge.fury.io/js/number-system.svg)](https://npmjs.org/package/number-system) [![Build Status](https://github.com/patzj/number-system/workflows/Release%20CI/badge.svg)](https://github.com/patzj/number-system/actions?query=workflow%3A%22Release+CI%22)

> A number system conversion library. Supports binary, octal, decimal and hexadecimal.

## Installation

```sh
$ npm install --save number-system
```

## Usage

### Creating Instance (TypeScript/JavaScript)

```ts
import NumberSystem from 'number-system';

// Creates a NumberSystem object that converts from decimal (base 10) to a target base
const ns = new NumberSystem(10);
```

#### Supported Bases

*   2 - Binary
*   8 - Octal
*   10 - Decimal
*   16 - Hexadecimal

### Basic Conversion

```ts
// Assuming ns is initialized as new NumberSystem(10)

// Returns '1100011'
ns.bin(99);

// Returns '1100011'
ns.bin('99');
```

#### Available Conversion Methods

| Method | Description | Parameter |
| :----- | :---------- | :-------- |
| `bin` | Converts argument to binary | `number` or `string` value |
| `oct` | Converts argument to octal | `number` or `string` value |
| `dec` | Converts argument to decimal | `number` or `string` value |
| `hex` | Converts argument to hexadecimal | `number` or `string` value |

_Note: Use `string` arguments when converting hexadecimal values with alpha characters (e.g., '0xff')._

### Changing Base

```ts
// Assuming ns is initialized as new NumberSystem(10)

// Returns 10
console.log(ns.base);

// Changes the original base to hexadecimal (base 16)
ns.base = 16;

// Returns 16
console.log(ns.base);

// Returns '0143' (63 in octal)
ns.oct('0x63'); // Input is hexadecimal '0x63' (decimal 99), converted to octal

// Returns '99' (99 in decimal)
ns.dec('0x63'); // Input is hexadecimal '0x63' (decimal 99), converted to decimal
```

## Development

### Setup

1.  Clone the repository:
    ```sh
    git clone https://github.com/patzj/number-system.git
    cd number-system
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```

### Building

To compile the TypeScript source code into JavaScript and generate type definitions:

```sh
npm run build
```

The compiled output will be in the `dist/` directory.

### Testing

To run the test suite:

```sh
npm test
```

## License

MIT