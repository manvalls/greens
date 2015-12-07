# CSS [![Build Status][ci-img]][ci-url] [![Coverage Status][cover-img]][cover-url]

## Sample usage

```javascript
var css = require('u-css'),

    bodyRule = css.add('body',{
      backgroundColor: 'black',
      fontSize: 'big'
    }),

    rotation = css.add('@keyframes rotation',{
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    }),

    rot50;

bodyRule.set({
  fontSize: 'small' // Dynamically change the rules
});

css.remove(bodyRule); // Remove rule

rot50 = rotation.add('50%',{
  transform: 'rotate(90deg)' // Dynamically add a rule to an @rule
});

rotation.remove(rot50); // Remove the rule
```

[ci-img]: https://circleci.com/gh/manvalls/u-css.svg?style=shield
[ci-url]: https://circleci.com/gh/manvalls/u-css
[cover-img]: https://coveralls.io/repos/manvalls/u-css/badge.svg?branch=master&service=github
[cover-url]: https://coveralls.io/github/manvalls/u-css?branch=master
