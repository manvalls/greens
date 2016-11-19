var prefixes = ['','-webkit-','-moz-','-ms-','-o-'],
    check;

module.exports = function(key,value){
  var ret,prefix,original;

  if(value === null) value = '';
  key = String(key);
  value = String(value);
  original = value;

  if(check(key,value)) return value;

  for(prefix of prefixes){
    ret = prefix + value;
    if(check(key,ret)) return ret;
  }

  return original;
};

check = require('./check.js');
