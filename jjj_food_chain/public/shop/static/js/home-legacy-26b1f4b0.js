!function(){function t(a){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(a)}function a(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */a=function(){return e};var e={},o=Object.prototype,r=o.hasOwnProperty,n=Object.defineProperty||function(t,a,e){t[a]=e.value},i="function"==typeof Symbol?Symbol:{},l=i.iterator||"@@iterator",d=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,a,e){return Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[a]}try{s({},"")}catch(S){s=function(t,a,e){return t[a]=e}}function p(t,a,e,o){var r=a&&a.prototype instanceof m?a:m,i=Object.create(r.prototype),l=new F(o||[]);return n(i,"_invoke",{value:k(t,e,l)}),i}function u(t,a,e){try{return{type:"normal",arg:t.call(a,e)}}catch(S){return{type:"throw",arg:S}}}e.wrap=p;var f={};function m(){}function h(){}function v(){}var g={};s(g,l,(function(){return this}));var y=Object.getPrototypeOf,x=y&&y(y(L([])));x&&x!==o&&r.call(x,l)&&(g=x);var b=v.prototype=m.prototype=Object.create(g);function _(t){["next","throw","return"].forEach((function(a){s(t,a,(function(t){return this._invoke(a,t)}))}))}function w(a,e){function o(n,i,l,d){var c=u(a[n],a,i);if("throw"!==c.type){var s=c.arg,p=s.value;return p&&"object"==t(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){o("next",t,l,d)}),(function(t){o("throw",t,l,d)})):e.resolve(p).then((function(t){s.value=t,l(s)}),(function(t){return o("throw",t,l,d)}))}d(c.arg)}var i;n(this,"_invoke",{value:function(t,a){function r(){return new e((function(e,r){o(t,a,e,r)}))}return i=i?i.then(r,r):r()}})}function k(t,a,e){var o="suspendedStart";return function(r,n){if("executing"===o)throw new Error("Generator is already running");if("completed"===o){if("throw"===r)throw n;return $()}for(e.method=r,e.arg=n;;){var i=e.delegate;if(i){var l=j(i,e);if(l){if(l===f)continue;return l}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===o)throw o="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);o="executing";var d=u(t,a,e);if("normal"===d.type){if(o=e.done?"completed":"suspendedYield",d.arg===f)continue;return{value:d.arg,done:e.done}}"throw"===d.type&&(o="completed",e.method="throw",e.arg=d.arg)}}}function j(t,a){var e=a.method,o=t.iterator[e];if(void 0===o)return a.delegate=null,"throw"===e&&t.iterator.return&&(a.method="return",a.arg=void 0,j(t,a),"throw"===a.method)||"return"!==e&&(a.method="throw",a.arg=new TypeError("The iterator does not provide a '"+e+"' method")),f;var r=u(o,t.iterator,a.arg);if("throw"===r.type)return a.method="throw",a.arg=r.arg,a.delegate=null,f;var n=r.arg;return n?n.done?(a[t.resultName]=n.value,a.next=t.nextLoc,"return"!==a.method&&(a.method="next",a.arg=void 0),a.delegate=null,f):n:(a.method="throw",a.arg=new TypeError("iterator result is not an object"),a.delegate=null,f)}function E(t){var a={tryLoc:t[0]};1 in t&&(a.catchLoc=t[1]),2 in t&&(a.finallyLoc=t[2],a.afterLoc=t[3]),this.tryEntries.push(a)}function z(t){var a=t.completion||{};a.type="normal",delete a.arg,t.completion=a}function F(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function L(t){if(t){var a=t[l];if(a)return a.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,o=function a(){for(;++e<t.length;)if(r.call(t,e))return a.value=t[e],a.done=!1,a;return a.value=void 0,a.done=!0,a};return o.next=o}}return{next:$}}function $(){return{value:void 0,done:!0}}return h.prototype=v,n(b,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:h,configurable:!0}),h.displayName=s(v,c,"GeneratorFunction"),e.isGeneratorFunction=function(t){var a="function"==typeof t&&t.constructor;return!!a&&(a===h||"GeneratorFunction"===(a.displayName||a.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,s(t,c,"GeneratorFunction")),t.prototype=Object.create(b),t},e.awrap=function(t){return{__await:t}},_(w.prototype),s(w.prototype,d,(function(){return this})),e.AsyncIterator=w,e.async=function(t,a,o,r,n){void 0===n&&(n=Promise);var i=new w(p(t,a,o,r),n);return e.isGeneratorFunction(a)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(b),s(b,c,"Generator"),s(b,l,(function(){return this})),s(b,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var a=Object(t),e=[];for(var o in a)e.push(o);return e.reverse(),function t(){for(;e.length;){var o=e.pop();if(o in a)return t.value=o,t.done=!1,t}return t.done=!0,t}},e.values=L,F.prototype={constructor:F,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(z),!t)for(var a in this)"t"===a.charAt(0)&&r.call(this,a)&&!isNaN(+a.slice(1))&&(this[a]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var a=this;function e(e,o){return i.type="throw",i.arg=t,a.next=e,o&&(a.method="next",a.arg=void 0),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var n=this.tryEntries[o],i=n.completion;if("root"===n.tryLoc)return e("end");if(n.tryLoc<=this.prev){var l=r.call(n,"catchLoc"),d=r.call(n,"finallyLoc");if(l&&d){if(this.prev<n.catchLoc)return e(n.catchLoc,!0);if(this.prev<n.finallyLoc)return e(n.finallyLoc)}else if(l){if(this.prev<n.catchLoc)return e(n.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<n.finallyLoc)return e(n.finallyLoc)}}}},abrupt:function(t,a){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}}n&&("break"===t||"continue"===t)&&n.tryLoc<=a&&a<=n.finallyLoc&&(n=null);var i=n?n.completion:{};return i.type=t,i.arg=a,n?(this.method="next",this.next=n.finallyLoc,f):this.complete(i)},complete:function(t,a){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&a&&(this.next=a),f},finish:function(t){for(var a=this.tryEntries.length-1;a>=0;--a){var e=this.tryEntries[a];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),z(e),f}},catch:function(t){for(var a=this.tryEntries.length-1;a>=0;--a){var e=this.tryEntries[a];if(e.tryLoc===t){var o=e.completion;if("throw"===o.type){var r=o.arg;z(e)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,a,e){return this.delegate={iterator:L(t),resultName:a,nextLoc:e},"next"===this.method&&(this.arg=void 0),f}},e}function e(t,a,e,o,r,n,i){try{var l=t[n](i),d=l.value}catch(c){return void e(c)}l.done?a(d):Promise.resolve(d).then(o,r)}System.register(["./element-plus-legacy-1289937f.js","./SvgIcon-legacy-c2b74fcb.js","./index-legacy-33e00376.js","./Ranking-legacy-1ae30a67.js","./Transaction-legacy-d18c2ecc.js","./index-legacy-6652bd07.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./echarts-legacy-41965509.js","./tslib-legacy-46756b30.js","./zrender-legacy-699e7e9c.js","./statistics-legacy-30ac98da.js","./DateTime-legacy-d9080f1c.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(t,o){"use strict";var r,n,i,l,d,c,s,p,u,f,m,h,v,g,y,x,b=document.createElement("style");return b.textContent='@charset "UTF-8";[data-v-dc32ae9a]:root{--el-color-primary:#FFBE00;--el-color-primary-light-3:#100A05 !important;--el-component-size-small: 32px !important;--el-color-black:#100A05 !important;--el-color-tips:#909399 !important;--el-color-border:#DCDFE6 !important;--el-color-primary-dark-2: #FFBE00;--el-color-primary-light-5: #FFBE00;--el-color-primary-light-8: #FFBE00;--el-color-primary-light-9: #FFFAEB}.common-seach-wrap .el-input__wrapper[data-v-dc32ae9a]{padding:0 15px}.common-seach-wrap .el-form-item__label[data-v-dc32ae9a]{--el-text-color-regular: #606266;font-weight:400}.common-seach-wrap .el-form--inline .el-form-item[data-v-dc32ae9a]{margin-right:16px}.el-form-item--small .el-form-item__label[data-v-dc32ae9a]{height:var(--el-component-size-small)!important;line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content[data-v-dc32ae9a]{line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content .el-radio__input[data-v-dc32ae9a],.el-form-item--small .el-form-item__content .el-radio__inner[data-v-dc32ae9a]{transform:scale(1.1)}.el-button--primary[data-v-dc32ae9a]{--el-button-text-color:var(--el-color-black)}.el-form-item__content[data-v-dc32ae9a],.el-form-item__content .gray9[data-v-dc32ae9a]{width:100%}.el-form-item__content .el-row .img[data-v-dc32ae9a]{width:100%;margin-top:10px}.el-form-item__content .el-date-editor[data-v-dc32ae9a]{--el-date-editor-width: auto}.el-form-item__content span[data-v-dc32ae9a]{margin:0 6px}.el-form-item__content label span[data-v-dc32ae9a]{margin:0!important}.el-form-item__content .el-input span[data-v-dc32ae9a]{margin:0}.el-form-item__content .el-color-picker--small[data-v-dc32ae9a]{height:auto!important}.el-form-item__content .el-color-picker--small .el-color-picker__trigger[data-v-dc32ae9a]{width:32px;height:32px}.el-form-item__content .el-color-picker--small .el-color-picker__trigger span[data-v-dc32ae9a]{margin:0!important}.el-table .cell[data-v-dc32ae9a]{line-height:32px!important;font-size:14px!important;text-transform:capitalize;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.el-table thead[data-v-dc32ae9a]{color:var(--el-color-tips)!important}.el-table td.el-table__cell[data-v-dc32ae9a]{color:var(--el-color-black);font-weight:400}.el-button[data-v-dc32ae9a]{text-transform:capitalize}.el-button.el-button--small.el-button--text[data-v-dc32ae9a]{padding-left:0;padding-right:0}.el-button--small[data-v-dc32ae9a]{--el-button-size: var(--el-component-size-small);font-size:14px}.common-button-wrapper .el-button--small[data-v-dc32ae9a]{padding:5px 22px!important}.el-dialog__body[data-v-dc32ae9a]{overflow:hidden;padding:10px 20px!important}.el-dialog__body .dialog-footer[data-v-dc32ae9a]{float:right}.el-dialog__body .el-select[data-v-dc32ae9a]{width:100%}.el-dialog__headerbtn .el-icon svg[data-v-dc32ae9a]{width:auto!important;height:auto!important}.table-wrap[data-v-dc32ae9a]{padding:0}.el-tabs .el-tabs__item[data-v-dc32ae9a]{font-size:14px;font-weight:700!important}.el-tabs .el-tabs__item span[data-v-dc32ae9a]{font-weight:inherit}.el-table[data-v-dc32ae9a]{--el-table-border-color: #EEEEEE !important;--el-table-header-bg-color:#EAEDF4 !important;--el-table-header-text-color:#101010 !important;width:100%!important}.el-table .el-table__cell[data-v-dc32ae9a]{position:static!important}.el-form[data-v-dc32ae9a]{--el-text-color-regular:#333;--el-font-size-base: 12px !important;position:relative}.el-form-item[data-v-dc32ae9a]{--font-size: 14px !important}.el-form-item .el-form-item[data-v-dc32ae9a]{margin-bottom:18px}.el-form-item__label[data-v-dc32ae9a]{text-transform:capitalize;font-weight:400}.el-radio__input.is-checked+.el-radio__label span[data-v-dc32ae9a]{color:var(--el-text-color-regular)}.pagination[data-v-dc32ae9a]{overflow:hidden}.pagination .el-pagination[data-v-dc32ae9a],.upload-dialog .pagination-wrap[data-v-dc32ae9a]{float:right}.img-select .el-icon svg[data-v-dc32ae9a]{width:2em;height:2em}.el-image-viewer__canvas[data-v-dc32ae9a]{padding:20px;box-sizing:border-box}.el-tabs__item[data-v-dc32ae9a],.el-message-box__title[data-v-dc32ae9a],.el-dialog__title[data-v-dc32ae9a],.el-radio__label[data-v-dc32ae9a]{text-transform:capitalize}.el-input-number .el-input__inner[data-v-dc32ae9a]{text-align:left!important}.el-input-number--small[data-v-dc32ae9a]{width:100%!important}.el-button--primary.is-link.is-disabled[data-v-dc32ae9a],.el-button--primary.is-link.is-disabled[data-v-dc32ae9a]:hover{color:var(--el-color-tips)}.draggable-list[data-v-dc32ae9a]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .wrapper[data-v-dc32ae9a]{display:flex}.draggable-list .wrapper>span[data-v-dc32ae9a]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .item[data-v-dc32ae9a]{position:relative;width:110px;height:110px;margin-top:10px;margin-right:10px;border-radius:8px;overflow:hidden;border:1px solid #dddddd}.draggable-list .delete-btn[data-v-dc32ae9a]{position:absolute;top:0;right:0;width:16px;height:16px;background:red;line-height:16px;font-size:16px;color:#fff;display:none}.draggable-list .item:hover .delete-btn[data-v-dc32ae9a]{display:block}.draggable-list .item img[data-v-dc32ae9a]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-height:100%;max-width:100%}.draggable-list .img-select[data-v-dc32ae9a]{display:flex;justify-content:center;align-items:center;border:1px dashed #dddddd;font-size:30px}.draggable-list .img-select i[data-v-dc32ae9a]{color:#409eff}.edit_container[data-v-dc32ae9a]{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;line-height:20px;color:#2c3e50;height:auto!important}.ql-editor[data-v-dc32ae9a]{height:400px}.tips[data-v-dc32ae9a]{color:#ccc;width:100%}.operation-wrap[data-v-dc32ae9a]{height:auto;width:100%;padding:16px;border-radius:8px;background-size:100% 100%;color:#fff}.operation-center[data-v-dc32ae9a]{width:100%;display:flex;gap:12px}.operation-center-l[data-v-dc32ae9a]{flex:7;border-radius:4px;padding:16px;background:#fff}.operation-today[data-v-dc32ae9a]{display:flex;flex-wrap:wrap;gap:12px}.grid-content[data-v-dc32ae9a]{border-radius:4px;padding:16px;background:#F7F9FB;flex:1;min-width:calc(33.3% - 8px);max-width:30%}.grid-content .des[data-v-dc32ae9a]{color:var(--el-color-black);font-size:16px;font-style:normal;font-weight:400;margin-bottom:16px;text-transform:capitalize}.grid-content h3[data-v-dc32ae9a]{color:var(--el-color-black);font-size:20px;font-style:normal;font-weight:700;margin-bottom:8px}.grid-content .yesterday[data-v-dc32ae9a]{color:var(--el-color-tips);font-size:12px;font-style:normal;font-weight:400}.operation-center-r[data-v-dc32ae9a]{flex:3;border-radius:4px;padding:16px;background:#fff}.center-r-box[data-v-dc32ae9a]{padding:16px;border-radius:4px;background:#FFF1EE}.center-r-box-t[data-v-dc32ae9a]{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:16px;text-transform:capitalize}.center-r-box-t h4[data-v-dc32ae9a]{color:var(--el-color-black);font-size:16px;font-weight:400}.center-r-box-t p[data-v-dc32ae9a]{color:var(--el-color-primary);font-size:14px;font-weight:400;cursor:pointer}.operation-title[data-v-dc32ae9a]{color:var(--el-color-black);font-size:20px;font-weight:500;text-transform:capitalize}.fb[data-v-dc32ae9a]{color:#ff6241;font-size:20px;font-style:normal;font-weight:700;line-height:normal}.operation-data[data-v-dc32ae9a]{display:flex;gap:12px;flex-wrap:wrap}.data-box[data-v-dc32ae9a]{flex:1;padding:16px;background:#FFF6DE;border-radius:4px}.data-box-title[data-v-dc32ae9a]{display:flex;justify-content:space-between;text-transform:capitalize}.data-box-title h3[data-v-dc32ae9a]{font-size:16px;font-weight:400;color:var(--el-color-black)}.data-box h4[data-v-dc32ae9a]{font-size:28px;font-weight:700;margin-top:20px;color:var(--el-color-black)}.data-box[data-v-dc32ae9a]:hover{background:#FFBE00}.data-box:hover .data-box-icon[data-v-dc32ae9a]{color:#fff}.data-box-icon[data-v-dc32ae9a]{width:24px;height:24px;color:#ffbe00}.home-index[data-v-dc32ae9a]{width:100%;display:-ms-flexbox;display:flex;gap:12px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;min-width:1000px;overflow-x:auto}.main-index[data-v-dc32ae9a]{flex:1;margin:20px}.matters-wrap[data-v-dc32ae9a]{padding:16px;border-radius:4px;background:#fff}.matters .box[data-v-dc32ae9a]{width:100%}.matters-wrap .matters[data-v-dc32ae9a]{display:-ms-flexbox;display:flex;-webkit-box-direction:column;-ms-flex-direction:column;flex-direction:column;justify-content:flex-start;align-items:flex-start;margin-bottom:30px}.matters-wrap .matters .title[data-v-dc32ae9a]{font-size:16px;color:#333;display:inline-block;height:20px;line-height:0;padding:11px;text-align:center;margin-bottom:20px}.matters-wrap .matters ul[data-v-dc32ae9a]{color:#999}.matters-wrap .matters ul span[data-v-dc32ae9a]{padding-right:6px;color:#3a8ee6}.border-b[data-v-dc32ae9a]{display:flex;flex-direction:column}.border-b-l[data-v-dc32ae9a]{flex-direction:initial}.matters_item[data-v-dc32ae9a]{display:flex;justify-content:flex-start;align-items:center}.matters_item li[data-v-dc32ae9a]{width:72px;display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:16px}.matters_box[data-v-dc32ae9a]{width:90%;border-top:1px solid #d9d9d9;padding-top:20px}.matters-wrap .matters_item li .fb[data-v-dc32ae9a]{font-size:16px;color:#5d75e3}\n',document.head.appendChild(b),{setters:[function(t){r=t.v},function(t){n=t._},function(t){i=t.I},function(t){l=t.default},function(t){d=t.default},function(t){c=t.u},function(t){s=t._},function(t){p=t.ag,u=t.$,f=t.o,m=t.c,h=t.a,v=t.X,g=t.P,y=t.T,x=t.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var o=c().userInfo,b={components:{Ranking:l,Transaction:d,SvgIcon:n},data:function(){return{loading:!0,top_data:[],wait_data:{order:{},agent:{},supplier:{},activity:{},audit:{},stock:{}},today_data:{order_total_price:{},order_total:{},new_user_total:{},new_supplier_total:{},apply_supplier_total:{},order_user_total:{},income_money:{}},product_data:{salesMoneyRank:[],salesNumRank:[]},user_type:""}},provide:function(){return{dataRank:this.product_data}},mounted:function(){this.getData(),this.getBaseInof()},methods:{getBaseInof:function(){var t,r=this;return(t=a().mark((function t(){return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.user_type=o.user_type;case 1:case"end":return t.stop()}}),t)})),function(){var a=this,o=arguments;return new Promise((function(r,n){var i=t.apply(a,o);function l(t){e(i,r,n,l,d,"next",t)}function d(t){e(i,r,n,l,d,"throw",t)}l(void 0)}))})()},getData:function(){var t=this;t.loading=!0,i.getCount(!0).then((function(a){t.loading=!1,Object.assign(t.product_data,a.data.data.product_data),t.top_data=a.data.data.top_data,t.wait_data=a.data.data.wait_data,t.today_data=a.data.data.today_data})).catch((function(t){}))},lockStock:function(){this.$router.push({path:"product/store/index",query:{inventory:10}})}}},_={class:"home"},w={class:"operation-wrap",style:{"background-color":"#FFFFFF"}},k={class:"operation-title mb16"},j={class:"operation-data"},E={class:"data-box"},z={class:"data-box-title"},F={class:"data-box"},L={class:"data-box-title"},$={class:"data-box"},S={class:"data-box-title"},O={class:"data-box"},T={class:"data-box-title"},B={class:"data-box"},I={class:"data-box-title"},P={class:"operation-center mt12"},A={class:"operation-center-l"},N={class:"operation-title mb16"},G={class:"operation-today"},D={class:"grid-content"},C={class:"des"},R={class:"yesterday"},q={class:"grid-content"},Y={class:"des"},X={class:"yesterday"},H={class:"grid-content"},M={class:"des"},U={class:"yesterday"},V={class:"grid-content"},W={class:"des"},Z={class:"yesterday"},J={class:"grid-content"},K={class:"des"},Q={class:"yesterday"},tt={class:"operation-center-r"},at={class:"operation-title mb16"},et={class:"center-r-box"},ot={class:"center-r-box-t"},rt={class:"fb"},nt={class:"home-index mt12"},it={class:"flex-1"},lt={class:"matters-wrap",style:{width:"100%"}},dt={class:"matters-wrap flex-1"};t("default",s(b,[["render",function(t,a,e,o,i,l){var d,c,s,b,ct,st,pt,ut,ft,mt,ht=n,vt=p("Transaction"),gt=p("Ranking"),yt=r;return u((f(),m("div",_,[h("div",w,[h("h3",k,v(t.$t("数据总览")),1),h("div",j,[h("div",E,[h("div",z,[h("h3",null,v(t.$t("营业总额")),1),g(ht,{class:"data-box-icon",name:"icon1"})]),h("h4",null,v(i.top_data.total_money),1)]),h("div",F,[h("div",L,[h("h3",null,v(t.$t("折扣总额")),1),g(ht,{class:"data-box-icon",name:"icon2"})]),h("h4",null,v(i.top_data.total_discount_money),1)]),h("div",$,[h("div",S,[h("h3",null,v(t.$t("会员数")),1),g(ht,{class:"data-box-icon",name:"icon3"})]),h("h4",null,v(i.top_data.user_total),1)]),h("div",O,[h("div",T,[h("h3",null,v(t.$t("订单数")),1),g(ht,{class:"data-box-icon",name:"icon4"})]),h("h4",null,v(i.top_data.order_total),1)]),h("div",B,[h("div",I,[h("h3",null,v(t.$t("退款金额")),1),g(ht,{class:"data-box-icon",name:"icon5"})]),h("h4",null,v(i.top_data.refund_money),1)])])]),h("div",P,[h("div",A,[h("h3",N,v(t.$t("今日概况")),1),h("div",G,[h("div",D,[h("p",C,v(t.$t("营业总额")),1),h("h3",null,v(null===(d=i.today_data.order_total_price)||void 0===d?void 0:d.tday),1),h("p",R,v(t.$t("昨日："))+v(null===(c=i.today_data.order_total_price)||void 0===c?void 0:c.ytd),1)]),h("div",q,[h("p",Y,v(t.$t("折扣总额")),1),h("h3",null,v(null===(s=i.today_data.order_discount_money)||void 0===s?void 0:s.tday),1),h("p",X,v(t.$t("昨日："))+v(null===(b=i.today_data.order_discount_money)||void 0===b?void 0:b.ytd),1)]),h("div",H,[h("p",M,v(t.$t("会员数（人）")),1),h("h3",null,v(null===(ct=i.today_data.new_user_total)||void 0===ct?void 0:ct.tday),1),h("p",U,v(t.$t("昨日："))+v(null===(st=i.today_data.new_user_total)||void 0===st?void 0:st.ytd),1)]),h("div",V,[h("p",W,v(t.$t("订单数")),1),h("h3",null,v(null===(pt=i.today_data.order_total)||void 0===pt?void 0:pt.tday),1),h("p",Z,v(t.$t("昨日："))+v(null===(ut=i.today_data.order_total)||void 0===ut?void 0:ut.ytd),1)]),h("div",J,[h("p",K,v(t.$t("退款金额")),1),h("h3",null,v(null===(ft=i.today_data.order_refund_money)||void 0===ft?void 0:ft.tday),1),h("p",Q,v(t.$t("昨日："))+v(null===(mt=i.today_data.order_refund_money)||void 0===mt?void 0:mt.ytd),1)])])]),h("div",tt,[h("h3",at,v(t.$t("待办事项")),1),h("div",et,[h("div",ot,[h("h4",null,v(t.$t("库存告急")),1),h("p",{onClick:a[0]||(a[0]=function(){return l.lockStock&&l.lockStock.apply(l,arguments)})},v(t.$t("查看")),1)]),h("p",rt,v(i.wait_data.stock.product),1)])])]),h("div",nt,[h("div",it,[h("div",lt,[g(vt)])]),h("div",dt,[i.loading?x("",!0):(f(),y(gt,{key:0}))])])])),[[yt,i.loading]])}],["__scopeId","data-v-dc32ae9a"]]))}}}))}();
