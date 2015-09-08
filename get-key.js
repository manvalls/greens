var check = require('./check.js');

function hyphenize(m){
  return '-' + m.toLowerCase();
}

module.exports = function(key){
  var fl,ret;

  key = key.toString();
  if(check.key(key)) return key;

  key = key.replace(/[A-Z]/g,hyphenize);

  ret = '-webkit-' + key;
  if(check.key(ret)) return ret;

  ret = '-moz-' + key;
  if(check.key(ret)) return ret;

  ret = '-ms-' + key;
  if(check.key(ret)) return ret;

  ret = '-o-' + key;
  if(check.key(ret)) return ret;

  return key;
};
