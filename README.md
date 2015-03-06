# CSS

## Sample usage

```javascript
var Class = require('u-css/class'),
    elem = require('u-elem'),
    class,div;

class = new Class();
class.apply({color: 'red'});

div = elem(['div',
  'Hello world',
  {className: class}
]);

document.body.appendChild(div);
```

