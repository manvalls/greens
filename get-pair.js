var prefixes = ['','-webkit-','-moz-','-ms-','-o-'],
    check;

function hyphenize(m){
  return '-' + m.toLowerCase();
}

module.exports = function(key,value){
  var retKey,retValue,prefix,original;

  if(value === null) value = '';
  key = String(key);
  value = String(value);
  original = [key,value];

  if(check(key,value)) return [key,value];
  key = key.replace(/[A-Z]/g,hyphenize);

  for(prefix of prefixes){
    retValue = prefix + value;
    for(prefix of prefixes){
      retKey = prefix + key;
      if(check(retKey,retValue)) return [retKey,retValue];
    }
  }

  return original;
};

check = require('./check.js');
