(function (g, f) {
    if ("object" == typeof exports && "object" == typeof module) {
      module.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("rrwebPluginConsoleRecord", [], f);
    } else if ("object" == typeof exports) {
      exports["rrwebPluginConsoleRecord"] = f();
    } else {
      g["rrwebPluginConsoleRecord"] = f();
    }
  }(this, () => {
var exports = {};
var module = { exports };
"use strict";var $=Object.defineProperty,k=(e,r,t)=>r in e?$(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,E=(e,r,t)=>k(e,typeof r!="symbol"?r+"":r,t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function _(e,r,t){try{if(!(r in e))return()=>{};const n=e[r],i=t(n);return typeof i=="function"&&(i.prototype=i.prototype||{},Object.defineProperties(i,{__rrweb_original__:{enumerable:!1,value:n}})),e[r]=i,()=>{e[r]=n}}catch(n){return()=>{}}}class d{constructor(r){E(this,"fileName"),E(this,"functionName"),E(this,"lineNumber"),E(this,"columnNumber"),this.fileName=r.fileName||"",this.functionName=r.functionName||"",this.lineNumber=r.lineNumber,this.columnNumber=r.columnNumber}toString(){const r=this.lineNumber||"",t=this.columnNumber||"";return this.functionName?`${this.functionName} (${this.fileName}:${r}:${t})`:`${this.fileName}:${r}:${t}`}}const C=/(^|@)\S+:\d+/,S=/^\s*at .*(\S+:\d+|\(native\))/m,F=/^(eval@)?(\[native code])?$/,b={parse:function(e){return e?typeof e.stacktrace!="undefined"||typeof e["opera#sourceloc"]!="undefined"?this.parseOpera(e):e.stack&&e.stack.match(S)?this.parseV8OrIE(e):e.stack?this.parseFFOrSafari(e):(console.warn("[console-record-plugin]: Failed to parse error object:",e),[]):[]},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];const t=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g,""));if(!t)throw new Error(`Cannot parse given url: ${e}`);return[t[1],t[2]||void 0,t[3]||void 0]},parseV8OrIE:function(e){return e.stack.split(`
`).filter(function(t){return!!t.match(S)},this).map(function(t){t.indexOf("(eval ")>-1&&(t=t.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(\),.*$)/g,""));let n=t.replace(/^\s+/,"").replace(/\(eval code/g,"(");const i=n.match(/ (\((.+):(\d+):(\d+)\)$)/);n=i?n.replace(i[0],""):n;const c=n.split(/\s+/).slice(1),s=this.extractLocation(i?i[1]:c.pop()),a=c.join(" ")||void 0,o=["eval","<anonymous>"].indexOf(s[0])>-1?void 0:s[0];return new d({functionName:a,fileName:o,lineNumber:s[1],columnNumber:s[2]})},this)},parseFFOrSafari:function(e){return e.stack.split(`
`).filter(function(t){return!t.match(F)},this).map(function(t){if(t.indexOf(" > eval")>-1&&(t=t.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),t.indexOf("@")===-1&&t.indexOf(":")===-1)return new d({functionName:t});{const n=/((.*".+"[^@]*)?[^@]*)(?:@)/,i=t.match(n),c=i&&i[1]?i[1]:void 0,s=this.extractLocation(t.replace(n,""));return new d({functionName:c,fileName:s[0],lineNumber:s[1],columnNumber:s[2]})}},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf(`
`)>-1&&e.message.split(`
`).length>e.stacktrace.split(`
`).length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(e){const r=/Line (\d+).*script (?:in )?(\S+)/i,t=e.message.split(`
`),n=[];for(let i=2,c=t.length;i<c;i+=2){const s=r.exec(t[i]);s&&n.push(new d({fileName:s[2],lineNumber:parseFloat(s[1])}))}return n},parseOpera10:function(e){const r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,t=e.stacktrace.split(`
`),n=[];for(let i=0,c=t.length;i<c;i+=2){const s=r.exec(t[i]);s&&n.push(new d({functionName:s[3]||void 0,fileName:s[2],lineNumber:parseFloat(s[1])}))}return n},parseOpera11:function(e){return e.stack.split(`
`).filter(function(t){return!!t.match(C)&&!t.match(/^Error created at/)},this).map(function(t){const n=t.split("@"),i=this.extractLocation(n.pop()),s=(n.shift()||"").replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0;return new d({functionName:s,fileName:i[0],lineNumber:i[1],columnNumber:i[2]})},this)}};function T(e){if(!e||!e.outerHTML)return"";let r="";for(;e.parentElement;){let t=e.localName;if(!t)break;t=t.toLowerCase();const n=e.parentElement,i=[];if(n.children&&n.children.length>0)for(let c=0;c<n.children.length;c++){const s=n.children[c];s.localName&&s.localName.toLowerCase&&s.localName.toLowerCase()===t&&i.push(s)}i.length>1&&(t+=`:eq(${i.indexOf(e)})`),r=t+(r?">"+r:""),e=n}return r}function L(e){return Object.prototype.toString.call(e)==="[object Object]"}function w(e,r){if(r===0)return!0;const t=Object.keys(e);for(const n of t)if(L(e[n])&&w(e[n],r-1))return!0;return!1}function g(e,r){const t={numOfKeysLimit:50,depthOfLimit:4};Object.assign(t,r);const n=[],i=[];return JSON.stringify(e,function(a,o){if(n.length>0){const p=n.indexOf(this);~p?n.splice(p+1):n.push(this),~p?i.splice(p,1/0,a):i.push(a),~n.indexOf(o)&&(n[0]===o?o="[Circular ~]":o="[Circular ~."+i.slice(0,n.indexOf(o)).join(".")+"]")}else n.push(o);if(o===null)return o;if(o===void 0)return"undefined";if(c(o))return s(o);if(typeof o=="bigint")return o.toString()+"n";if(o instanceof Event){const p={};for(const l in o){const f=o[l];Array.isArray(f)?p[l]=T(f.length?f[0]:null):p[l]=f}return p}else{if(o instanceof Node)return o instanceof HTMLElement?o?o.outerHTML:"":o.nodeName;if(o instanceof Error)return o.stack?o.stack+`
End of stack for Error object`:o.name+": "+o.message}return o});function c(a){return!!(L(a)&&Object.keys(a).length>t.numOfKeysLimit||typeof a=="function"||L(a)&&w(a,t.depthOfLimit))}function s(a){let o=a.toString();return t.stringLengthLimit&&o.length>t.stringLengthLimit&&(o=`${o.slice(0,t.stringLengthLimit)}...`),o}}const x={level:["assert","clear","count","countReset","debug","dir","dirxml","error","group","groupCollapsed","groupEnd","info","log","table","time","timeEnd","timeLog","trace","warn"],lengthThreshold:1e3,logger:"console"};function R(e,r,t){const n=t?Object.assign({},x,t):x,i=n.logger;if(!i)return()=>{};let c;typeof i=="string"?c=r[i]:c=i;let s=0,a=!1;const o=[];if(n.level.includes("error")){const l=m=>{const u=m.message,h=m.error,y=b.parse(h).map(O=>O.toString()),N=[g(u,n.stringifyOptions)];e({level:"error",trace:y,payload:N})};r.addEventListener("error",l),o.push(()=>{r.removeEventListener("error",l)});const f=m=>{let u,h;m.reason instanceof Error?(u=m.reason,h=[g(`Uncaught (in promise) ${u.name}: ${u.message}`,n.stringifyOptions)]):(u=new Error,h=[g("Uncaught (in promise)",n.stringifyOptions),g(m.reason,n.stringifyOptions)]);const y=b.parse(u).map(N=>N.toString());e({level:"error",trace:y,payload:h})};r.addEventListener("unhandledrejection",f),o.push(()=>{r.removeEventListener("unhandledrejection",f)})}for(const l of n.level)o.push(p(c,l));return()=>{o.forEach(l=>l())};function p(l,f){return l[f]?_(l,f,m=>(...u)=>{if(m.apply(this,u),!(f==="assert"&&u[0])&&!a){a=!0;try{const h=b.parse(new Error).map(O=>O.toString()).splice(1),N=(f==="assert"?u.slice(1):u).map(O=>g(O,n.stringifyOptions));s++,s<n.lengthThreshold?e({level:f,trace:h,payload:N}):s===n.lengthThreshold&&e({level:"warn",trace:[],payload:[g("The number of log records reached the threshold.")]})}catch(h){m("rrweb logger error:",h,...u)}finally{a=!1}}}):()=>{}}}const P="rrweb/console@1",I=e=>({name:P,observer:R,options:e});exports.PLUGIN_NAME=P;exports.getRecordConsolePlugin=I;
if (typeof module.exports == "object" && typeof exports == "object") {
  var __cp = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of Object.getOwnPropertyNames(from)) {
        if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
        Object.defineProperty(to, key, {
          get: () => from[key],
          enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
        });
      }
    }
    return to;
  };
  module.exports = __cp(module.exports, exports);
}
return module.exports;
}))
//# sourceMappingURL=rrweb-plugin-console-record.umd.min.cjs.map
