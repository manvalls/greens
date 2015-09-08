var unique = require('u-rand').unique,

    sheet = require('./sheet.js'),
    check,style;

sheet.insertRule('.test' + unique() + '{}',0);
style = sheet.cssRules[0].style;

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
