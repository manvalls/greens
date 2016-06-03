var t = require('u-test'),
    assert = require('assert'),
    getKey = require('../get-key.js'),
    getValue = require('../get-value.js'),
    getPair = require('../get-pair.js'),
    css = require('../main.js');

t('Basic class',function(){
  var div = document.createElement('div'),
      rule;

  css.add('.nm',{
    marginTop: '-2px'
  });

  rule = css.addText('.pm{ margin-top: 2px; }');

  assert.strictEqual(rule.marginTop,'2px');
  document.body.appendChild(div);

  div.className = 'nm';
  assert.strictEqual(getComputedStyle(div).marginTop,'-2px');
  div.className = 'pm';
  assert.strictEqual(getComputedStyle(div).marginTop,'2px');

  css.remove(rule);
  assert.strictEqual(getComputedStyle(div).marginTop,'0px');
  css.remove(rule);
});

t('@font-face',function(){
  var div = document.createElement('div');

  css.add('@font-face',{
    fontFamily: "\"Open Sans\"",
    fontStyle: 'normal',
    fontWeight: '400',
    src: "local('Open Sans'), local('OpenSans'), url(https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3VtXRa8TVwTICgirnJhmVJw.woff2) format('woff2')",
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
  });

  document.body.appendChild(div);
  div.style.fontFamily = "\"Open Sans\"";
  assert.strictEqual(getComputedStyle(div).fontFamily,"\"Open Sans\"");
});

t('@keyframes',function(){
  var div = document.createElement('div');

  css.add('@keyframes test',{
    '0%': {
      marginTop: '5px'
    },
    '100%': {
      marginTop: '5px'
    }
  });

  css.addText(`@keyframes test2{
    0% {
      margin-top: 20px;
    }
    100% {
      margin-top: 20px;
    }
  }`);

  document.body.appendChild(div);
  div.style.animationDuration = '5s';
  div.style.animationName = 'test';
  assert.strictEqual(getComputedStyle(div).marginTop,'5px');

  div.style.animationName = 'test2';
  assert.strictEqual(getComputedStyle(div).marginTop,'20px');
});

t('@supports',function(){
  var div = document.createElement('div'),
      rule;

  css.add('@supports (margin-top: 2px)',{
    '.margin': {
      marginTop: '2px'
    }
  });

  div.className = 'margin';
  document.body.appendChild(div);
  assert.strictEqual(getComputedStyle(div).marginTop,'2px');
});

t('getKey, getValue & getPair',function(){
  var value,key;

  assert.strictEqual(getKey('color'),'color');
  assert.strictEqual(getKey('colorFoobar'),'colorFoobar');
  assert.strictEqual(getValue('color','black'),'black');
  assert.strictEqual(getValue('color','blllLack'),'blllLack');
  assert.deepEqual(getPair('color','black'),['color','black']);
  assert.deepEqual(getPair('coloRrr','black'),['coloRrr','black']);

});
