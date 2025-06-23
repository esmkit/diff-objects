# @esmkit/diff-objects

 Deep diff two JavaScript Objects

## Features

- 🚀 **High Performance**: optimized for performance.
- 📦 **Small Bundle Size**: small bundle size.
- 🎯 **Strong Type Annotations**: written in TypeScript with full types support.

## Installation

```bash
npm install @esmkit/diff-objects
# or
yarn add @esmkit/diff-objects
# or
bun add @esmkit/diff-objects
```

## Functions available

- [`diff(originalObj, updatedObj)`](#diff)
 returns the difference of the original and updated objects

- [`addedDiff(original, updatedObj)`](#addeddiff)
 returns only the values added to the updated object

- [`deletedDiff(original, updatedObj)`](#deleteddiff)
 returns only the values deleted in the updated object

- [`updatedDiff(original, updatedObj)`](#updateddiff)
 returns only the values that have been changed in the updated object

- [`detailedDiff(original, updatedObj)`](#detaileddiff)
 returns an object with the added, deleted and updated differences

## Importing

``` typescript
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from '@esmkit/diff-objects';
```

## Usage

### `diff`

```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(diff(lhs, rhs)); // =>
/*
{
  foo: {
    bar: {
      a: {
        '1': undefined
      },
      c: {
        '2': 'z'
      },
      d: 'Hello, world!',
      e: undefined
    }
  },
  buzz: 'fizz'
}
*/
```

### `addedDiff`

```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(addedDiff(lhs, rhs));

/*
{
  foo: {
    bar: {
      c: {
        '2': 'z'
      },
      d: 'Hello, world!'
    }
  }
}
*/
```

### `deletedDiff`

```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(deletedDiff(lhs, rhs));

/*
{
  foo: {
    bar: {
      a: {
        '1': undefined
      },
      e: undefined
    }
  }
}
*/
```

### `updatedDiff`

```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(updatedDiff(lhs, rhs));

/*
{
  buzz: 'fizz'
}
*/
```

### `detailedDiff`

```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(detailedDiff(lhs, rhs));

/*
{
  added: {
    foo: {
      bar: {
        c: {
          '2': 'z'
        },
        d: 'Hello, world!'
      }
    }
  },
  deleted: {
    foo: {
      bar: {
        a: {
          '1': undefined
        },
        e: undefined
      }
    }
  },
  updated: {
    buzz: 'fizz'
  }
}
*/
```
