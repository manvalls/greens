var unique = require('u-rand').unique,
    Su = require('u-su'),
    apply = require('u-proto/apply'),
    
    sheet = require('./sheet.js'),
    
    active = Su(),
    rule = Su(),
    name = Su(),
    selector = Su(),
    
    canAnd = Su(),
    canPs = Su(),
    
    Class;

function init(cl,n,s){
  var i = sheet.cssRules.length;
  
  sheet.insertRule(selector + '{}',i);
  
  cl[rule] = sheet.cssRules.item(i);
  cl[name] = n;
  cl[selector] = s;
  
  if(!this[active]) sheet.deleteRule(i);
}

Class = module.exports = function Class(){
  var name = 'css-' + unique();
  
  this[active] = true;
  
  this[canAnd] = true;
  this[canPs] = true;
  
  init(this,name,'.' + name);
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
  
  and: {value: function(addition){
    var s,cl;
    
    if(!this[canAnd]) return;
    
    s = (addition.toString()).replace(/[^\-a-zA-Z0-9_]/g,'') + this[selector];
    cl = Object.create(Class.prototype);
    
    cl[active] = true;
    
    cl[canAnd] = false;
    cl[canPs] = this[canPs];
    
    init(cl,this[name],s);
    
    return cl;
  }},
  
  sub: {value: function(other){
    var s,cl;
    
    s = this[selector] + ' ' + other[selector];
    cl = Object.create(Class.prototype);
    
    cl[active] = true;
    
    cl[canAnd] = false;
    cl[canPs] = false;
    
    init(cl,this[name] + ' ' + other[name],s);
    
    return cl;
  }},
  
  or: {value: function(other){
    var s,cl;
    
    s = this[selector] + ', ' + other[selector];
    cl = Object.create(Class.prototype);
    
    cl[active] = true;
    
    cl[canAnd] = false;
    cl[canPs] = false;
    
    init(cl,this[name] + ' ' + other[name],s);
    
    return cl;
  }},
  
  psc: {value: function(psc){
    var s,cl;
    
    if(!this[canPs]) return;
    
    s = this[selector] + ':' + (psc.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    cl = Object.create(Class.prototype);
    
    cl[active] = true;
    
    cl[canAnd] = this[canAnd];
    cl[canPs] = true;
    
    init(cl,this[name],s);
    
    return cl;
  }},
  
  pse: {value: function(pse){
    var s,cl;
    
    if(!this[canPs]) return;
    
    s = this[selector] + '::' + (pse.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    cl = Object.create(Class.prototype);
    
    cl[active] = true;
    
    cl[canAnd] = this[canAnd];
    cl[canPs] = false;
    
    init(cl,this[name],s);
    
    return cl;
  }},
  
  attr: {value: function(key,test,value){
    var s,cl;
    
    if(!this[canPs]) return;
    
    key = (key.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    test = (test.toString()).replace(/[\[\]]/g,'');
    value = (value.toString()).replace(/(\\*)"/g,quoteRepl);
    
    s = this[selector] + '[' + key + test + '"' + value + '"]';
    cl = Object.create(Class.prototype);
    
    cl[active] = true;
    
    cl[canAnd] = this[canAnd];
    cl[canPs] = true;
    
    init(cl,this[name],s);
    
    return cl;
  }},
  
  active: {
    get: function(){
      return this[active];
    },
    set: function(a){
      var i;
      
      a = !!a;
      if(a == this[active]) return;
      
      if(a){
        i = sheet.cssRules.length;
        sheet.insertRule(this[rule].cssText,i);
        this[rule] = sheet.cssRules.item(i);
      }else{
        for(i = 0;i < sheet.cssRules.length;i++) if(sheet.cssRules.item(i) == this[rule]) break;
        sheet.deleteRule(i);
      }
      
      this[active] = a;
    }
  }
  
});

function quoteRepl(m,s1){
  if(!(s1.length % 2)) return '\\' + m;
  return m;
}

