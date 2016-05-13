var check = require('./check.js'),
    prefixes = ['','-webkit-','-moz-','-ms-','-o-'];

function hyphenize(m){
  return '-' + m.toLowerCase();
}

module.exports = function(key,value){
  var retKey,retValue,prefix;

  if(value === null) value = '';
  key = String(key);
  value = String(value);
  original = [key,value];

  if(check(key,value)) return [key,value];
  key = key.replace(/[A-Z]/g,hyphenize);
  value = value.replace(/[A-Z]/g,hyphenize);

  for(prefix of prefixes){
    retValue = prefix + value;
    for(prefix of prefixes){
      retKey = prefix + key;
      if(check(retKey,retValue)) return [retKey,retValue];
    }
  }

  return original;
};
