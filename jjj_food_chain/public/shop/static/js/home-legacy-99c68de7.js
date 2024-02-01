!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return o};var a,o={},r=Object.prototype,n=r.hasOwnProperty,i=Object.defineProperty||function(t,e,a){t[e]=a.value},l="function"==typeof Symbol?Symbol:{},d=l.iterator||"@@iterator",c=l.asyncIterator||"@@asyncIterator",s=l.toStringTag||"@@toStringTag";function f(t,e,a){return Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(a){f=function(t,e,a){return t[e]=a}}function p(t,e,a,o){var r=e&&e.prototype instanceof x?e:x,n=Object.create(r.prototype),l=new N(o||[]);return i(n,"_invoke",{value:L(t,a,l)}),n}function u(t,e,a){try{return{type:"normal",arg:t.call(e,a)}}catch(t){return{type:"throw",arg:t}}}o.wrap=p;var m="suspendedStart",h="suspendedYield",v="executing",g="completed",y={};function x(){}function b(){}function _(){}var w={};f(w,d,(function(){return this}));var j=Object.getPrototypeOf,k=j&&j(j(T([])));k&&k!==r&&n.call(k,d)&&(w=k);var F=_.prototype=x.prototype=Object.create(w);function E(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function z(e,a){function o(r,i,l,d){var c=u(e[r],e,i);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==t(f)&&n.call(f,"__await")?a.resolve(f.__await).then((function(t){o("next",t,l,d)}),(function(t){o("throw",t,l,d)})):a.resolve(f).then((function(t){s.value=t,l(s)}),(function(t){return o("throw",t,l,d)}))}d(c.arg)}var r;i(this,"_invoke",{value:function(t,e){function n(){return new a((function(a,r){o(t,e,a,r)}))}return r=r?r.then(n,n):n()}})}function L(t,e,o){var r=m;return function(n,i){if(r===v)throw new Error("Generator is already running");if(r===g){if("throw"===n)throw i;return{value:a,done:!0}}for(o.method=n,o.arg=i;;){var l=o.delegate;if(l){var d=$(l,o);if(d){if(d===y)continue;return d}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(r===m)throw r=g,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);r=v;var c=u(t,e,o);if("normal"===c.type){if(r=o.done?g:h,c.arg===y)continue;return{value:c.arg,done:o.done}}"throw"===c.type&&(r=g,o.method="throw",o.arg=c.arg)}}}function $(t,e){var o=e.method,r=t.iterator[o];if(r===a)return e.delegate=null,"throw"===o&&t.iterator.return&&(e.method="return",e.arg=a,$(t,e),"throw"===e.method)||"return"!==o&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+o+"' method")),y;var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,y;var i=n.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=a),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function T(e){if(e||""===e){var o=e[d];if(o)return o.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=a,t.done=!0,t};return i.next=i}}throw new TypeError(t(e)+" is not iterable")}return b.prototype=_,i(F,"constructor",{value:_,configurable:!0}),i(_,"constructor",{value:b,configurable:!0}),b.displayName=f(_,s,"GeneratorFunction"),o.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},o.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,f(t,s,"GeneratorFunction")),t.prototype=Object.create(F),t},o.awrap=function(t){return{__await:t}},E(z.prototype),f(z.prototype,c,(function(){return this})),o.AsyncIterator=z,o.async=function(t,e,a,r,n){void 0===n&&(n=Promise);var i=new z(p(t,e,a,r),n);return o.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(F),f(F,s,"Generator"),f(F,d,(function(){return this})),f(F,"toString",(function(){return"[object Generator]"})),o.keys=function(t){var e=Object(t),a=[];for(var o in e)a.push(o);return a.reverse(),function t(){for(;a.length;){var o=a.pop();if(o in e)return t.value=o,t.done=!1,t}return t.done=!0,t}},o.values=T,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=a,this.done=!1,this.delegate=null,this.method="next",this.arg=a,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=a)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(o,r){return l.type="throw",l.arg=t,e.next=o,r&&(e.method="next",e.arg=a),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],l=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var d=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(d&&c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(d){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var r=o;break}}r&&("break"===t||"continue"===t)&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var i=r?r.completion:{};return i.type=t,i.arg=e,r?(this.method="next",this.next=r.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.finallyLoc===t)return this.complete(a.completion,a.afterLoc),O(a),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.tryLoc===t){var o=a.completion;if("throw"===o.type){var r=o.arg;O(a)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,o){return this.delegate={iterator:T(t),resultName:e,nextLoc:o},"next"===this.method&&(this.arg=a),y}},o}function a(t,e,a,o,r,n,i){try{var l=t[n](i),d=l.value}catch(c){return void a(c)}l.done?e(d):Promise.resolve(d).then(o,r)}System.register(["./element-plus-legacy-ce5c473b.js","./SvgIcon-legacy-a874544e.js","./index-legacy-4e36a66a.js","./Ranking-legacy-53c3545c.js","./Transaction-legacy-a67d89ad.js","./index-legacy-b87a1ee0.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./echarts-legacy-41965509.js","./tslib-legacy-46756b30.js","./zrender-legacy-699e7e9c.js","./statistics-legacy-af3ddbb7.js","./DateTime-legacy-d9080f1c.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-ef5ed4ac.js","./side-channel-legacy-4a7c29a7.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js"],(function(t,o){"use strict";var r,n,i,l,d,c,s,f,p,u,m,h,v,g,y,x;return{setters:[function(t){r=t.v},function(t){n=t._},function(t){i=t.I},function(t){l=t.default},function(t){d=t.default},function(t){c=t.u},function(t){s=t._},function(t){f=t.af,p=t._,u=t.o,m=t.c,h=t.a,v=t.W,g=t.O,y=t.S,x=t.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var o=document.createElement("style");o.textContent='@charset "UTF-8";[data-v-425335df]:root{--el-color-primary:#FFBE00;--el-color-primary-light-3:#100A05 !important;--el-component-size-small: 32px !important;--el-color-black:#100A05 !important;--el-color-tips:#909399 !important;--el-color-border:#DCDFE6 !important;--el-color-primary-dark-2: #FFBE00;--el-color-primary-light-5: #FFBE00;--el-color-primary-light-8: #FFBE00;--el-color-primary-light-9: #FFFAEB}.common-seach-wrap .el-input__wrapper[data-v-425335df]{padding:0 15px}.common-seach-wrap .el-form-item__label[data-v-425335df]{--el-text-color-regular: #606266;font-weight:400}.common-seach-wrap .el-form--inline .el-form-item[data-v-425335df]{margin-right:16px}.el-form-item--small .el-form-item__label[data-v-425335df]{height:var(--el-component-size-small)!important;line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content[data-v-425335df]{line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content .el-radio__input[data-v-425335df],.el-form-item--small .el-form-item__content .el-radio__inner[data-v-425335df]{transform:scale(1.1)}.el-button--primary[data-v-425335df]{--el-button-text-color:var(--el-color-black)}.el-form-item__content[data-v-425335df],.el-form-item__content .gray9[data-v-425335df]{width:100%}.el-form-item__content .el-row .img[data-v-425335df]{width:100%;margin-top:10px}.el-form-item__content .el-date-editor[data-v-425335df]{--el-date-editor-width: auto}.el-form-item__content span[data-v-425335df]{margin:0 6px}.el-form-item__content label span[data-v-425335df]{margin:0!important}.el-form-item__content .el-input span[data-v-425335df]{margin:0}.el-form-item__content .el-color-picker--small[data-v-425335df]{height:auto!important}.el-form-item__content .el-color-picker--small .el-color-picker__trigger[data-v-425335df]{width:32px;height:32px}.el-form-item__content .el-color-picker--small .el-color-picker__trigger span[data-v-425335df]{margin:0!important}.el-table .cell[data-v-425335df]{line-height:32px!important;font-size:14px!important;text-transform:capitalize;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.el-table .cell.el-tooltip[data-v-425335df]{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.el-table thead[data-v-425335df]{color:var(--el-color-tips)!important}.el-table td.el-table__cell[data-v-425335df]{color:var(--el-color-black);font-weight:400}.el-button[data-v-425335df]{text-transform:capitalize}.el-button[data-v-425335df]:focus{outline:none}.el-button.el-button--small.el-button--text[data-v-425335df]{padding-left:0;padding-right:0}.el-button--small[data-v-425335df]{--el-button-size: var(--el-component-size-small);font-size:14px}.common-button-wrapper .el-button--small[data-v-425335df]{padding:5px 22px!important}.el-dialog__body[data-v-425335df]{overflow:hidden;padding:10px 20px!important}.el-dialog__body .dialog-footer[data-v-425335df]{float:right}.el-dialog__body .el-select[data-v-425335df]{width:100%}.el-dialog__headerbtn .el-icon svg[data-v-425335df]{width:auto!important;height:auto!important}.table-wrap[data-v-425335df]{padding:0}.el-tabs .el-tabs__item[data-v-425335df]{font-size:14px;font-weight:700!important}.el-tabs .el-tabs__item span[data-v-425335df]{font-weight:inherit}.el-table[data-v-425335df]{--el-table-border-color: #EEEEEE !important;--el-table-header-bg-color:#EAEDF4 !important;--el-table-header-text-color:#101010 !important;width:100%!important}.el-table .el-table__cell[data-v-425335df]{position:static!important}.el-form[data-v-425335df]{--el-text-color-regular:#333;--el-font-size-base: 12px !important;position:relative}.el-form-item[data-v-425335df]{--font-size: 14px !important}.el-form-item .el-form-item[data-v-425335df]{margin-bottom:18px}.el-form-item__label[data-v-425335df]{text-transform:capitalize;font-weight:400}.el-radio__input.is-checked+.el-radio__label span[data-v-425335df]{color:var(--el-text-color-regular)}.pagination[data-v-425335df]{overflow:hidden}.pagination .el-pagination[data-v-425335df],.upload-dialog .pagination-wrap[data-v-425335df]{float:right}.img-select .el-icon svg[data-v-425335df]{width:2em;height:2em}.el-image-viewer__canvas[data-v-425335df]{padding:20px;box-sizing:border-box}.el-tabs__item[data-v-425335df],.el-message-box__title[data-v-425335df],.el-dialog__title[data-v-425335df],.el-radio__label[data-v-425335df]{text-transform:capitalize}.el-input-number .el-input__inner[data-v-425335df]{text-align:left!important}.el-input-number--small[data-v-425335df]{width:100%!important}.el-button--primary.is-link.is-disabled[data-v-425335df],.el-button--primary.is-link.is-disabled[data-v-425335df]:hover{color:var(--el-color-tips)}.el-button--primary.el-button.is-disabled[data-v-425335df]{opacity:.8;background:var(--el-color-tips);border-color:var(--el-color-tips)}.el-dropdown-menu__item.is-disabled[data-v-425335df]{color:var(--el-color-primary)!important;background:#FFF6DE}.el-select-dropdown__item[data-v-425335df]{max-width:50vw}.draggable-list[data-v-425335df]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .wrapper[data-v-425335df]{display:flex}.draggable-list .wrapper>span[data-v-425335df]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .item[data-v-425335df]{position:relative;width:110px;height:110px;margin-top:10px;margin-right:10px;border-radius:8px;overflow:hidden;border:1px solid #dddddd}.draggable-list .delete-btn[data-v-425335df]{position:absolute;top:0;right:0;width:16px;height:16px;background:red;line-height:16px;font-size:16px;color:#fff;display:none}.draggable-list .item:hover .delete-btn[data-v-425335df]{display:block}.draggable-list .item img[data-v-425335df]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-height:100%;max-width:100%}.draggable-list .img-select[data-v-425335df]{display:flex;justify-content:center;align-items:center;border:1px dashed #dddddd;font-size:30px}.draggable-list .img-select i[data-v-425335df]{color:#409eff}.edit_container[data-v-425335df]{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;line-height:20px;color:#2c3e50;height:auto!important}.ql-editor[data-v-425335df]{height:400px}.tips[data-v-425335df]{color:#ccc;width:100%}.operation-wrap[data-v-425335df]{height:auto;width:100%;padding:16px;border-radius:8px;background-size:100% 100%;color:#fff}.operation-center[data-v-425335df]{width:100%;display:flex;gap:12px}.operation-center-l[data-v-425335df]{flex:7;border-radius:4px;padding:16px;background:#fff}.operation-today[data-v-425335df]{display:flex;flex-wrap:wrap;gap:12px}.grid-content[data-v-425335df]{border-radius:4px;padding:16px;background:#F7F9FB;flex:1;min-width:calc(33.3% - 8px);max-width:30%}.grid-content .des[data-v-425335df]{color:var(--el-color-black);font-size:16px;font-style:normal;font-weight:400;margin-bottom:16px;text-transform:capitalize}.grid-content h3[data-v-425335df]{color:var(--el-color-black);font-size:20px;font-style:normal;font-weight:700;margin-bottom:8px}.grid-content .yesterday[data-v-425335df]{color:var(--el-color-tips);font-size:12px;font-style:normal;font-weight:400}.operation-center-r[data-v-425335df]{flex:3;border-radius:4px;padding:16px;background:#fff}.center-r-box[data-v-425335df]{padding:16px;border-radius:4px;background:#FFF1EE}.center-r-box-t[data-v-425335df]{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:16px;text-transform:capitalize}.center-r-box-t h4[data-v-425335df]{color:var(--el-color-black);font-size:16px;font-weight:400}.center-r-box-t p[data-v-425335df]{color:var(--el-color-primary);font-size:14px;font-weight:400;cursor:pointer}.operation-title[data-v-425335df]{color:var(--el-color-black);font-size:20px;font-weight:500;text-transform:capitalize}.fb[data-v-425335df]{color:#ff6241;font-size:20px;font-style:normal;font-weight:700;line-height:normal}.operation-data[data-v-425335df]{display:flex;gap:12px;flex-wrap:wrap}.data-box[data-v-425335df]{flex:1;padding:16px;background:#FFF6DE;border-radius:4px}.data-box-title[data-v-425335df]{display:flex;justify-content:space-between;text-transform:capitalize}.data-box-title h3[data-v-425335df]{font-size:16px;font-weight:400;color:var(--el-color-black)}.data-box h4[data-v-425335df]{font-size:28px;font-weight:700;margin-top:20px;color:var(--el-color-black)}.data-box[data-v-425335df]:hover{background:#FFBE00}.data-box:hover .data-box-icon[data-v-425335df]{color:#fff}.data-box-icon[data-v-425335df]{width:24px;height:24px;color:#ffbe00}.home-index[data-v-425335df]{width:100%;display:-ms-flexbox;display:flex;gap:12px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;min-width:1000px;overflow-x:auto}.main-index[data-v-425335df]{flex:1;margin:20px}.matters-wrap[data-v-425335df]{padding:16px;border-radius:4px;background:#fff}.matters .box[data-v-425335df]{width:100%}.matters-wrap .matters[data-v-425335df]{display:-ms-flexbox;display:flex;-webkit-box-direction:column;-ms-flex-direction:column;flex-direction:column;justify-content:flex-start;align-items:flex-start;margin-bottom:30px}.matters-wrap .matters .title[data-v-425335df]{font-size:16px;color:#333;display:inline-block;height:20px;line-height:0;padding:11px;text-align:center;margin-bottom:20px}.matters-wrap .matters ul[data-v-425335df]{color:#999}.matters-wrap .matters ul span[data-v-425335df]{padding-right:6px;color:#3a8ee6}.border-b[data-v-425335df]{display:flex;flex-direction:column}.border-b-l[data-v-425335df]{flex-direction:initial}.matters_item[data-v-425335df]{display:flex;justify-content:flex-start;align-items:center}.matters_item li[data-v-425335df]{width:72px;display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:16px}.matters_box[data-v-425335df]{width:90%;border-top:1px solid #d9d9d9;padding-top:20px}.matters-wrap .matters_item li .fb[data-v-425335df]{font-size:16px;color:#5d75e3}\n',document.head.appendChild(o);var b=c().userInfo,_={components:{Ranking:l,Transaction:d,SvgIcon:n},data:function(){return{loading:!0,top_data:[],wait_data:{order:{},agent:{},supplier:{},activity:{},audit:{},stock:{}},today_data:{order_total_price:{},order_total:{},new_user_total:{},new_supplier_total:{},apply_supplier_total:{},order_user_total:{},income_money:{}},product_data:{salesMoneyRank:[],salesNumRank:[]},user_type:""}},provide:function(){return{dataRank:this.product_data}},mounted:function(){this.getData(),this.getBaseInof()},methods:{getBaseInof:function(){var t,o=this;return(t=e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o.user_type=b.user_type;case 1:case"end":return t.stop()}}),t)})),function(){var e=this,o=arguments;return new Promise((function(r,n){var i=t.apply(e,o);function l(t){a(i,r,n,l,d,"next",t)}function d(t){a(i,r,n,l,d,"throw",t)}l(void 0)}))})()},getData:function(){var t=this;t.loading=!0,i.getCount(!0).then((function(e){t.loading=!1,Object.assign(t.product_data,e.data.data.product_data),t.top_data=e.data.data.top_data,t.wait_data=e.data.data.wait_data,t.today_data=e.data.data.today_data})).catch((function(t){}))},lockStock:function(){this.$router.push({path:"product/store/index",query:{inventory:10}})}}},w={class:"home"},j={class:"operation-wrap",style:{"background-color":"#FFFFFF"}},k={class:"operation-title mb16"},F={class:"operation-data"},E={class:"data-box"},z={class:"data-box-title"},L={class:"data-box"},$={class:"data-box-title"},S={class:"data-box"},O={class:"data-box-title"},N={class:"data-box"},T={class:"data-box-title"},I={class:"data-box"},B={class:"data-box-title"},D={class:"operation-center mt12"},P={class:"operation-center-l"},A={class:"operation-title mb16"},G={class:"operation-today"},R={class:"grid-content"},C={class:"des"},q={class:"yesterday"},Y={class:"grid-content"},H={class:"des"},M={class:"yesterday"},U={class:"grid-content"},W={class:"des"},X={class:"yesterday"},Z={class:"grid-content"},J={class:"des"},K={class:"yesterday"},Q={class:"grid-content"},V={class:"des"},tt={class:"yesterday"},et={class:"operation-center-r"},at={class:"operation-title mb16"},ot={class:"center-r-box"},rt={class:"center-r-box-t"},nt={class:"fb"},it={class:"home-index mt12"},lt={class:"flex-1"},dt={class:"matters-wrap",style:{width:"100%"}},ct={class:"matters-wrap flex-1"};t("default",s(_,[["render",function(t,e,a,o,i,l){var d,c,s,b,_,st,ft,pt,ut,mt,ht=n,vt=f("Transaction"),gt=f("Ranking"),yt=r;return p((u(),m("div",w,[h("div",j,[h("h3",k,v(t.$t("数据总览")),1),h("div",F,[h("div",E,[h("div",z,[h("h3",null,v(t.$t("营业总额")),1),g(ht,{class:"data-box-icon",name:"icon1"})]),h("h4",null,v(Number(i.top_data.total_money||0).toFixed(2)),1)]),h("div",L,[h("div",$,[h("h3",null,v(t.$t("折扣总额")),1),g(ht,{class:"data-box-icon",name:"icon2"})]),h("h4",null,v(Number(i.top_data.total_discount_money||0).toFixed(2)),1)]),h("div",S,[h("div",O,[h("h3",null,v(t.$t("会员数")),1),g(ht,{class:"data-box-icon",name:"icon3"})]),h("h4",null,v(i.top_data.user_total),1)]),h("div",N,[h("div",T,[h("h3",null,v(t.$t("订单数")),1),g(ht,{class:"data-box-icon",name:"icon4"})]),h("h4",null,v(i.top_data.order_total),1)]),h("div",I,[h("div",B,[h("h3",null,v(t.$t("退款金额")),1),g(ht,{class:"data-box-icon",name:"icon5"})]),h("h4",null,v(Number(i.top_data.refund_money||0).toFixed(2)),1)])])]),h("div",D,[h("div",P,[h("h3",A,v(t.$t("今日概况")),1),h("div",G,[h("div",R,[h("p",C,v(t.$t("营业总额")),1),h("h3",null,v(null===(d=i.today_data.order_total_price)||void 0===d?void 0:d.tday),1),h("p",q,v(t.$t("昨日："))+v(Number((null===(c=i.today_data.order_total_price)||void 0===c?void 0:c.ytd)||0).toFixed(2)),1)]),h("div",Y,[h("p",H,v(t.$t("折扣总额")),1),h("h3",null,v(null===(s=i.today_data.order_discount_money)||void 0===s?void 0:s.tday),1),h("p",M,v(t.$t("昨日："))+v(Number((null===(b=i.today_data.order_discount_money)||void 0===b?void 0:b.ytd)||0).toFixed(2)),1)]),h("div",U,[h("p",W,v(t.$t("会员数")),1),h("h3",null,v(null===(_=i.today_data.new_user_total)||void 0===_?void 0:_.tday),1),h("p",X,v(t.$t("昨日："))+v(null===(st=i.today_data.new_user_total)||void 0===st?void 0:st.ytd),1)]),h("div",Z,[h("p",J,v(t.$t("订单数")),1),h("h3",null,v(null===(ft=i.today_data.order_total)||void 0===ft?void 0:ft.tday),1),h("p",K,v(t.$t("昨日："))+v(null===(pt=i.today_data.order_total)||void 0===pt?void 0:pt.ytd),1)]),h("div",Q,[h("p",V,v(t.$t("退款金额")),1),h("h3",null,v(null===(ut=i.today_data.order_refund_money)||void 0===ut?void 0:ut.tday),1),h("p",tt,v(t.$t("昨日："))+v(Number((null===(mt=i.today_data.order_refund_money)||void 0===mt?void 0:mt.ytd)||0).toFixed(2)),1)])])]),h("div",et,[h("h3",at,v(t.$t("待办事项")),1),h("div",ot,[h("div",rt,[h("h4",null,v(t.$t("库存告急")),1),h("p",{onClick:e[0]||(e[0]=function(){return l.lockStock&&l.lockStock.apply(l,arguments)})},v(t.$t("查看")),1)]),h("p",nt,v(i.wait_data.stock.product),1)])])]),h("div",it,[h("div",lt,[h("div",dt,[g(vt)])]),h("div",ct,[i.loading?x("",!0):(u(),y(gt,{key:0}))])])])),[[yt,i.loading]])}],["__scopeId","data-v-425335df"]]))}}}))}();
