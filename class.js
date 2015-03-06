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

function init(class,n,s){
  var i = sheet.cssRules.length;
  
  sheet.insertRule(selector + '{}',i);
  
  class[rule] = sheet.cssRules.item(i);
  class[name] = n;
  class[selector] = s;
  
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
    var s,class;
    
    if(!this[canAnd]) return;
    
    s = (addition.toString()).replace(/[^\-a-zA-Z0-9_]/g,'') + this[selector];
    class = Object.create(Class.prototype);
    
    class[active] = true;
    
    class[canAnd] = false;
    class[canPs] = this[canPs];
    
    init(class,this[name],s);
    
    return class;
  }},
  
  sub: {value: function(other){
    var s,class;
    
    s = this[selector] + ' ' + other[selector];
    class = Object.create(Class.prototype);
    
    class[active] = true;
    
    class[canAnd] = false;
    class[canPs] = false;
    
    init(class,this[name] + ' ' + other[name],s);
    
    return class;
  }},
  
  or: {value: function(other){
    var s,class;
    
    s = this[selector] + ', ' + other[selector];
    class = Object.create(Class.prototype);
    
    class[active] = true;
    
    class[canAnd] = false;
    class[canPs] = false;
    
    init(class,this[name] + ' ' + other[name],s);
    
    return class;
  }},
  
  psc: {value: function(psc){
    var s,class;
    
    if(!this[canPs]) return;
    
    s = this[selector] + ':' + (psc.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    class = Object.create(Class.prototype);
    
    class[active] = true;
    
    class[canAnd] = this[canAnd];
    class[canPs] = true;
    
    init(class,this[name],s);
    
    return class;
  }},
  
  pse: {value: function(pse){
    var s,class;
    
    if(!this[canPs]) return;
    
    s = this[selector] + '::' + (pse.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    class = Object.create(Class.prototype);
    
    class[active] = true;
    
    class[canAnd] = this[canAnd];
    class[canPs] = false;
    
    init(class,this[name],s);
    
    return class;
  }},
  
  attr: {value: function(key,test,value){
    var s,class;
    
    if(!this[canPs]) return;
    
    key = (key.toString()).replace(/[^\-a-zA-Z0-9_()]/g,'');
    test = (test.toString()).replace(/[\[\]]/g,'');
    value = (value.toString()).replace(/(\\*)"/g,quoteRepl);
    
    s = this[selector] + '[' + key + test + '"' + value + '"]';
    class = Object.create(Class.prototype);
    
    class[active] = true;
    
    class[canAnd] = this[canAnd];
    class[canPs] = true;
    
    init(class,this[name],s);
    
    return class;
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

