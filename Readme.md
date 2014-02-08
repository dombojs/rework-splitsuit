
# rework-splitsuit

  split SUIT stylesheets into responsive/IE rework objects

## Installation

    $ npm install rework-splitsuit

## Example

```

var rework = require('rework'),
    splitsuit = require('rework-splitsuit');

// customize breakpoints
var bp = [,
    '(max-width: 25em)',
    '(min-width: 25em) and (max-width: 50em)',
    '(min-width: 50em)'
];

// set IE breakpoint
var iebp = 2;

var original = rework(css)
    .use(splitsuit(bp, iebp));

original.toString();
original.responsive.toString();
original.ie.toString();

```

The `.responsive` and `.ie` properties are independent rework objects, 
so you can apply further transformations with `.use()`.


## License

  MIT
