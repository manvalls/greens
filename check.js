var check,style;

check = module.exports = function check(key,value){
  var ret;

  if(!check.key(key)) return false;

  style = style || require('./main')().addClass().style;
  style.setProperty(key,value);
  ret = style[key] != '';
  style[key] = '';

  return ret;
};

check.key = function(key){
  style = style || require('./main')().addClass().style;
  return style[key] === '';
};
