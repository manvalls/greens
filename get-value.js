var check = require('./check.js');

function hyphenize(m){
  return '-' + m.toLowerCase();
}

module.exports = function(key,value){
  var fl,ret;

  if(check(key,value)) return value;
  value = String(value).replace(/[A-Z]/g,hyphenize);

  ret = '-webkit-' + value;
  if(check(key,ret)) return ret;

  ret = '-moz-' + value;
  if(check(key,ret)) return ret;

  ret = '-ms-' + value;
  if(check(key,ret)) return ret;

  ret = '-o-' + value;
  if(check(key,ret)) return ret;

  return value;
};
