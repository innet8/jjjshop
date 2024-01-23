import{i as t}from"./vue-demi-71ba0ef2.js";import{au as e,r as n,av as s,h as o,A as a,w as c,K as r,B as i,aw as u,ac as f,g as p,f as l,n as h,L as d,j as y}from"./@vue-e72ffbb6.js";
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */let v;const b=t=>v=t,_=Symbol();function j(t){return t&&"object"==typeof t&&"[object Object]"===Object.prototype.toString.call(t)&&"function"!=typeof t.toJSON}var m,O;function $(){const o=e(!0),a=o.run((()=>n({})));let c=[],r=[];const i=s({install(t){b(i),i._a=t,t.provide(_,i),t.config.globalProperties.$pinia=i,r.forEach((t=>c.push(t))),r=[]},use(e){return this._a||t?c.push(e):r.push(e),this},_p:c,_a:null,_e:o,_s:new Map,state:a});return i}(O=m||(m={})).direct="direct",O.patchObject="patch object",O.patchFunction="patch function";const g=()=>{};function w(t,e,n,s=g){t.push(e);const o=()=>{const n=t.indexOf(e);n>-1&&(t.splice(n,1),s())};return!n&&p()&&l(o),o}function P(t,...e){t.slice().forEach((t=>{t(...e)}))}function S(t,e){t instanceof Map&&e instanceof Map&&e.forEach(((e,n)=>t.set(n,e))),t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],o=t[n];j(o)&&j(s)&&t.hasOwnProperty(n)&&!i(s)&&!u(s)?t[n]=S(o,s):t[n]=s}return t}const E=Symbol();const{assign:A}=Object;function I(t,o,a={},p,l,d){let y;const v=A({actions:{}},a),_={deep:!0};let O,$,I,M=s([]),x=s([]);const F=p.state.value[t];let k;function B(e){let n;O=$=!1,"function"==typeof e?(e(p.state.value[t]),n={type:m.patchFunction,storeId:t,events:I}):(S(p.state.value[t],e),n={type:m.patchObject,payload:e,storeId:t,events:I});const s=k=Symbol();h().then((()=>{k===s&&(O=!0)})),$=!0,P(M,n,p.state.value[t])}d||F||(p.state.value[t]={}),n({});const J=d?function(){const{state:t}=a,e=t?t():{};this.$patch((t=>{A(t,e)}))}:g;function K(e,n){return function(){b(p);const s=Array.from(arguments),o=[],a=[];let c;P(x,{args:s,name:e,store:N,after:function(t){o.push(t)},onError:function(t){a.push(t)}});try{c=n.apply(this&&this.$id===t?this:N,s)}catch(r){throw P(a,r),r}return c instanceof Promise?c.then((t=>(P(o,t),t))).catch((t=>(P(a,t),Promise.reject(t)))):(P(o,c),c)}}const L={_p:p,$id:t,$onAction:w.bind(null,x),$patch:B,$reset:J,$subscribe(e,n={}){const s=w(M,e,n.detached,(()=>o())),o=y.run((()=>c((()=>p.state.value[t]),(s=>{("sync"===n.flush?$:O)&&e({storeId:t,type:m.direct,events:I},s)}),A({},_,n))));return s},$dispose:function(){y.stop(),M=[],x=[],p._s.delete(t)}},N=r(L);p._s.set(t,N);const q=p._e.run((()=>(y=e(),y.run((()=>o())))));for(const e in q){const n=q[e];if(i(n)&&(!i(C=n)||!C.effect)||u(n))d||(!F||j(z=n)&&z.hasOwnProperty(E)||(i(n)?n.value=F[e]:S(n,F[e])),p.state.value[t][e]=n);else if("function"==typeof n){const t=K(e,n);q[e]=t,v.actions[e]=n}}var z,C;return A(N,q),A(f(N),q),Object.defineProperty(N,"$state",{get:()=>p.state.value[t],set:t=>{B((e=>{A(e,t)}))}}),p._p.forEach((t=>{A(N,y.run((()=>t({store:N,app:p._a,pinia:p,options:v}))))})),F&&d&&a.hydrate&&a.hydrate(N.$state,F),O=!0,$=!0,N}function M(t,e,n){let c,r;const i="function"==typeof e;function u(t,n){const u=o();(t=t||u&&a(_,null))&&b(t),(t=v)._s.has(c)||(i?I(c,e,r,t):function(t,e,n,o){const{state:a,actions:c,getters:r}=e,i=n.state.value[t];let u;u=I(t,(function(){i||(n.state.value[t]=a?a():{});const e=d(n.state.value[t]);return A(e,c,Object.keys(r||{}).reduce(((e,o)=>(e[o]=s(y((()=>{b(n);const e=n._s.get(t);return r[o].call(e,e)}))),e)),{}))}),e,n,0,!0)}(c,r,t));return t._s.get(c)}return"string"==typeof t?(c=t,r=i?n:e):(r=t,c=t.id),u.$id=c,u}export{$ as c,M as d};