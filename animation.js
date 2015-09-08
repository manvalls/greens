var Su = require('u-su'),
    unique = require('u-rand').unique,
    apply = require('u-proto/apply'),

    sheet = require('./sheet.js'),

    rule = Su(),
    name = Su(),

    Animation;

Animation = module.exports = function Animation(initial){
  var i = sheet.cssRules.length,
      keys,j;

  this[name] = 'anim-' + unique();

  try{ sheet.insertRule('@keyframes ' + this[name] + '{}',i); }
  catch(e){ sheet.insertRule('@-webkit-keyframes ' + this[name] + '{}',i); }

  this[rule] = sheet.cssRules[i];

  if(initial){

    keys = Object.keys(initial);
    for(j = 0;j < keys.length;j++){
      i = keys[j];
      this.set(i,initial[i]);
    }

  }

};

Object.defineProperties(Animation.prototype,{

  toString: {value: function(){
    return this[name];
  }},

  set: {value: function(key,obj){
    var kfr = this[rule].findRule(key);

    if(!kfr){
      this[rule].appendRule(key + ' {}');
      kfr = this[rule].findRule(key);
    }

    kfr.style[apply](obj);

    return this;
  }},

  delete: {value: function(key){
    this[rule].deleteRule(key);
  }}

});
