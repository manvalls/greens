# CSS

## Sample usage

```javascript
var Class = require('u-css/class'),
    elem = require('u-elem'),
    class,div;

class = new Class({color: 'red'});

elem([document.body,
  ['div',
    'Hello world',
    {className: class}
  ]
]);

```

