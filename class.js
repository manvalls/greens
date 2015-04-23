var unique = require('u-rand').unique,
    Su = require('u-su'),
    apply = require('u-proto/apply'),
    
    sheet = require('./sheet.js'),
    
    rule = Su(),
    name = Su(),
    selector = Su(),
    
    canElem = Su(),
    canPs = Su(),
    
    Class;

function init(cl,n,s){
  var i = sheet.cssRules.length;
  
  sheet.insertRule(s + '{}',i);
  
  cl[rule] = sheet.cssRules.item(i);
  cl[name] = n;
  cl[selector] = s;
}

Class = module.exports = function Class(initial){
  var name = 'css-' + unique();
  
  this[canElem] = true;
  this[canPs] = true;
  
  init(this,name,'.' + name);
  if(initial) this.apply(initial);
};

Object.defineProperties(Class.prototype,{
  
  apply: {value: function(obj){
    this[rule].style[apply](obj);
    return this;
  }},
  
  toString: {value: function(){
    return ' ' + this[name] + ' ';
  }},
  
  get: {value: function(key){
    return this[rule].style[key];
  }},
  
  elem: {value: function(addition,initial){
    var s,cl;
    
    if(!this[canElem]) throw new Error('You can\'t add an element to this declaration');
    
    s = (addition.toString()).replace(/[^\-a-zA-Z0-9_]/g,'') + this[selector];
    cl = Object.create(Class.prototype);
    
    cl[canElem] = false;
    cl[canPs] = this[canPs];
    
    init(cl,this[name],s);
    if(initial) cl.apply(initial);
    
    return cl;
  }},
  
  and: {value: function(other,initial){
    var s,cl;
    
    s = this[selector] + ' ' + other[selector];
    cl = Object.create(Class.prototype);
    
    cl[canElem] = false;
    cl[canPs] = false;
    
    init(cl,this[name] + ' ' + other[name],s);
    if(initial) cl.apply(initial);
    
    return cl;
  }},
  
  or: {value: function(other,initial){
    var s,cl;
    
    s = this[selector] + ', ' + other[selector];
    cl = Object.create(Class.prototype);
    
    cl[canElem] = false;
    cl[canPs] = false;
    
    init(cl,this[name] + ' ' + other[name],s);
    if(initial) cl.apply(initial);
    
    return cl;
  }},
  
  psc: {value: function(psc,initial){
    var s,cl;
    
    if(!this[canPs]) throw new Error('You can\'t add a pseudoclass to this declaration');
    
    s = this[selector] + ':' + (psc.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    cl = Object.create(Class.prototype);
    
    cl[canElem] = this[canElem];
    cl[canPs] = true;
    
    init(cl,this[name],s);
    if(initial) cl.apply(initial);
    
    return cl;
  }},
  
  pse: {value: function(pse,initial){
    var s,cl;
    
    if(!this[canPs]) throw new Error('You can\'t add a pseudoelement to this declaration');
    
    s = this[selector] + '::' + (pse.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    cl = Object.create(Class.prototype);
    
    cl[canElem] = this[canElem];
    cl[canPs] = false;
    
    init(cl,this[name],s);
    if(initial) cl.apply(initial);
    
    return cl;
  }},
  
  attr: {value: function(key,test,value,initial){
    var s,cl;
    
    if(!this[canPs]) throw new Error('You can\'t add attributes to this declaration');
    
    key = (key.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    test = (test.toString()).replace(/[\[\]]/g,'');
    value = (value.toString()).replace(/(\\*)"/g,quoteRepl);
    
    s = this[selector] + '[' + key + test + '"' + value + '"]';
    cl = Object.create(Class.prototype);
    
    cl[canElem] = this[canElem];
    cl[canPs] = true;
    
    init(cl,this[name],s);
    if(initial) cl.apply(initial);
    
    return cl;
  }},
  
  destroy: {value: function(){
    var i;
    
    for(i = 0;i < sheet.cssRules.length;i++) if(sheet.cssRules.item(i) == this[rule]) break;
    sheet.deleteRule(i);
  }}
  
});

function quoteRepl(m,s1){
  if(!(s1.length % 2)) return '\\' + m;
  return m;
}

