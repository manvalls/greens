var check = require('./check.js'),
    prefixes = ['','-webkit-','-moz-','-ms-','-o-'];

function hyphenize(m){
  return '-' + m.toLowerCase();
}

module.exports = function(key,value){
  var ret,prefix,original;

  if(value === null) value = '';
  key = String(key);
  value = String(value);
  original = value;

  if(check(key,value)) return value;
  value = value.replace(/[A-Z]/g,hyphenize);

  for(prefix of prefixes){
    ret = prefix + value;
    if(check(key,ret)) return ret;
  }

  return original;
};
