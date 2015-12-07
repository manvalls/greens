/**/ 'use strict' /**/
var apply = require('u-proto/apply'),
    sheet = Symbol(),
    RE = /[A-Z]|(^(webkit|moz|ms|o)(?=[A-Z]))/g,
    atRE = /^(@[^ {]+)(.*)$/;

class CssGroup{

  constructor(sh,extra){
    var i,keys;

    this[sheet] = sh;
    if(extra){
      keys = Object.keys(extra);
      for(i=0;i<keys.length;i++) this.add(keys[i],extra[keys[i]]);
    }

  }

  addText(txt){
    var ret = addRule(this[sheet],txt);

    if(ret.style) return ret.style;
    else if(ret.cssRules) return new CssGroup(ret);
    else return ret;
  }

  add(selector,properties){
    var sh = this[sheet],
        rule,atSelector,rest,match,ret;

    properties = properties || {};
    match = selector.match(atRE);

    if(match){
      atSelector = match[1];
      rest = match[2];
    }else{
      atSelector = '';
      rest = selector;
    }

    switch(atSelector){
      case '@keyframes':

        try{
          rule = addRule(sh,'@keyframes' + rest + '{}');
        }catch(e){
          rule = addRule(sh,'@-webkit-keyframes' + rest + '{}');
        }

        return new CssGroup(rule,properties);
      case '@document':
      case '@media':
      case '@supports':
        return new CssGroup(addRule(sh,selector + '{}'),properties);
      case '@charset':
      case '@import':
      case '@namespace':
        return addRule(sh,selector + ';');
      case '@font-face':
        rule = addRule(sh,selector + '{' + JSONtoCSS(properties) + '}');
        return rule.style;
      default:
      // @page
        rule = addRule(sh,selector + '{}');
        rule.style[apply](properties);
        return rule.style;
    }

  }

  remove(r){
    var sh = this[sheet],
        rule = r[sheet] || r,
        rules = sh.cssRules,
        i;

    for(i = 0;i < rules.length;i++) if(rules[i] == rule || rules[i].style == rule) break;
    if(i == rules.length) return;
    sh.deleteRule(i);
  }

}

function addRule(sheet,rule){
  if(sheet.insertRule) sheet.insertRule(rule,sheet.cssRules.length);
  else sheet.appendRule(rule);
  return sheet.cssRules[sheet.cssRules.length - 1];
}

function hyphenize(m){
  return '-' + m.toLowerCase();
}

function JSONtoCSS(obj){
  var ret = '',i,
      keys = Object.keys(obj),j;

  for(i=0;i<keys.length;i++){
    j = keys[i];
    ret += j.replace(RE,hyphenize) + ': ' + obj[j] + '; ';
  }

  return ret;
}

module.exports = new CssGroup(require('./sheet.js'));
