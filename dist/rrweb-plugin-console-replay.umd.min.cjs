(function (g, f) {
    if ("object" == typeof exports && "object" == typeof module) {
      module.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("rrwebPluginConsoleReplay", [], f);
    } else if ("object" == typeof exports) {
      exports["rrwebPluginConsoleReplay"] = f();
    } else {
      g["rrwebPluginConsoleReplay"] = f();
    }
  }(this, () => {
var exports = {};
var module = { exports };
"use strict";var f=Object.defineProperty,p=(o,l,t)=>l in o?f(o,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[l]=t,M=(o,l,t)=>p(o,typeof l!="symbol"?l+"":l,t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n="rrweb/console@1";var e=(o=>(o[o.DomContentLoaded=0]="DomContentLoaded",o[o.Load=1]="Load",o[o.FullSnapshot=2]="FullSnapshot",o[o.IncrementalSnapshot=3]="IncrementalSnapshot",o[o.Meta=4]="Meta",o[o.Custom=5]="Custom",o[o.Plugin=6]="Plugin",o))(e||{}),r=(o=>(o[o.Mutation=0]="Mutation",o[o.MouseMove=1]="MouseMove",o[o.MouseInteraction=2]="MouseInteraction",o[o.Scroll=3]="Scroll",o[o.ViewportResize=4]="ViewportResize",o[o.Input=5]="Input",o[o.TouchMove=6]="TouchMove",o[o.MediaInteraction=7]="MediaInteraction",o[o.StyleSheetRule=8]="StyleSheetRule",o[o.CanvasMutation=9]="CanvasMutation",o[o.Font=10]="Font",o[o.Log=11]="Log",o[o.Drag=12]="Drag",o[o.StyleDeclaration=13]="StyleDeclaration",o[o.Selection=14]="Selection",o[o.AdoptedStyleSheet=15]="AdoptedStyleSheet",o[o.CustomElement=16]="CustomElement",o))(r||{});const g="__rrweb_original__",u={level:["assert","clear","count","countReset","debug","dir","dirxml","error","group","groupCollapsed","groupEnd","info","log","table","time","timeEnd","timeLog","trace","warn"],replayLogger:void 0};class h{constructor(l){M(this,"config"),this.config=Object.assign(u,l)}getConsoleLogger(){const l={};for(const t of this.config.level)t==="trace"?l[t]=i=>{(console.log[g]?console.log[g]:console.log)(...i.payload.map(s=>JSON.parse(s)),this.formatMessage(i))}:l[t]=i=>{(console[t][g]?console[t][g]:console[t])(...i.payload.map(s=>JSON.parse(s)),this.formatMessage(i))};return l}formatMessage(l){if(l.trace.length===0)return"";const t=`
	at `;let i=t;return i+=l.trace.join(t),i}}const L=o=>{const l=(o==null?void 0:o.replayLogger)||new h(o).getConsoleLogger();return{handler(t,i,a){let s=null;if(t.type===e.IncrementalSnapshot&&t.data.source===r.Log?s=t.data:t.type===e.Plugin&&t.data.plugin===n&&(s=t.data.payload),s)try{typeof l[s.level]=="function"&&l[s.level](s)}catch(d){a.replayer.config.showWarning&&console.warn(d)}}}};exports.getReplayConsolePlugin=L;
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
//# sourceMappingURL=rrweb-plugin-console-replay.umd.min.cjs.map
