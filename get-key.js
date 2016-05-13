var check = require('./check.js'),
    prefixes = ['','-webkit-','-moz-','-ms-','-o-'];

function hyphenize(m){
  return '-' + m.toLowerCase();
}

module.exports = function(key){
  var ret,prefix,original;

  key = String(key);
  original = key;

  if(check.key(key)) return key;
  key = key.replace(/[A-Z]/g,hyphenize);

  for(prefix of prefixes){
    ret = prefix + key;
    if(check.key(ret)) return ret;
  }

  return original;
};
