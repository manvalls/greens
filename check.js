var css,check,style;

check = module.exports = function check(key,value){
  var ret;

  if(!check.key(key)) return false;

  style[key] = value;
  ret = style[key] != '';
  style[key] = '';

  return ret;
};

check.key = function(key){
  return style[key] === '';
};

css = require('./main')();
style = css.addClass().style;
