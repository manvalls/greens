var Su = require('u-su'),
    unique = require('u-rand').unique,

    sheet = require('../sheet.js'),

    family = Su(),
    face = Su(),

    Font;

Font = module.exports = function Font(){
  var i;

  this[family] = 'font-' + unique();
  for(i = 0;i < arguments.length;i++) this.add(arguments[i]);
};

Object.defineProperties(Font.prototype,{

  toString: {value: function(){
    return this[family];
  }},

  add: {value: function(data){
    var ff = data[face],
        i = sheet.cssRules.length,
        txt;

    if(!ff){
      txt = '@font-face { ';
      txt += 'font-family: "' + this[family] + '"; ';
      txt += 'src: url("' + encodeURI(data.url) + '"); ';

      if(data.style)            txt += 'font-style: ' + data.style + '; ';
      if(data.weight)           txt += 'font-weight: ' + data.weight + '; ';
      if(data.stretch)          txt += 'font-stretch: ' + data.stretch + '; ';
      if(data.unicodeRange)     txt += 'unicode-range: ' + data.unicodeRange + '; ';
      if(data.variant)          txt += 'font-variant: ' + data.variant + '; ';
      if(data.featureSettings)  txt += 'font-feature-settings: ' + data.featureSettings + '; ';

      txt += '}';

      i = sheet.cssRules.length;
      sheet.insertRule(txt,i);

      data[face] = sheet.cssRules[i];
    }else sheet.insertRule(ff.cssText,i);


  }},

  delete: {value: function(data){
    var i;

    for(i = 0;i < sheet.cssRules.length;i++){
      if(sheet.cssRules[i] == data[face]) break;
    }

    sheet.deleteRule(i);
  }}

});
