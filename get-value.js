var check = require('./check.js');

function hyphenize(m){
  return '-' + m.toLowerCase();
}

module.exports = function(key,value){
  var fl,ret,v;

  if(check(key,value)) return value;
  v = String(value).replace(/[A-Z]/g,hyphenize);

  ret = '-webkit-' + v;
  if(check(key,ret)) return ret;

  ret = '-moz-' + v;
  if(check(key,ret)) return ret;

  ret = '-ms-' + v;
  if(check(key,ret)) return ret;

  ret = '-o-' + v;
  if(check(key,ret)) return ret;

  return value;
};
