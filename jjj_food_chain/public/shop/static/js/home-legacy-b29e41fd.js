!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return a};var a={},o=Object.prototype,r=o.hasOwnProperty,n=Object.defineProperty||function(t,e,a){t[e]=a.value},i="function"==typeof Symbol?Symbol:{},l=i.iterator||"@@iterator",d=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,e,a){return Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(S){s=function(t,e,a){return t[e]=a}}function f(t,e,a,o){var r=e&&e.prototype instanceof m?e:m,i=Object.create(r.prototype),l=new z(o||[]);return n(i,"_invoke",{value:k(t,a,l)}),i}function p(t,e,a){try{return{type:"normal",arg:t.call(e,a)}}catch(S){return{type:"throw",arg:S}}}a.wrap=f;var u={};function m(){}function v(){}function h(){}var g={};s(g,l,(function(){return this}));var y=Object.getPrototypeOf,x=y&&y(y(L([])));x&&x!==o&&r.call(x,l)&&(g=x);var b=h.prototype=m.prototype=Object.create(g);function _(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function w(e,a){function o(n,i,l,d){var c=p(e[n],e,i);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==t(f)&&r.call(f,"__await")?a.resolve(f.__await).then((function(t){o("next",t,l,d)}),(function(t){o("throw",t,l,d)})):a.resolve(f).then((function(t){s.value=t,l(s)}),(function(t){return o("throw",t,l,d)}))}d(c.arg)}var i;n(this,"_invoke",{value:function(t,e){function r(){return new a((function(a,r){o(t,e,a,r)}))}return i=i?i.then(r,r):r()}})}function k(t,e,a){var o="suspendedStart";return function(r,n){if("executing"===o)throw new Error("Generator is already running");if("completed"===o){if("throw"===r)throw n;return $()}for(a.method=r,a.arg=n;;){var i=a.delegate;if(i){var l=j(i,a);if(l){if(l===u)continue;return l}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if("suspendedStart"===o)throw o="completed",a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);o="executing";var d=p(t,e,a);if("normal"===d.type){if(o=a.done?"completed":"suspendedYield",d.arg===u)continue;return{value:d.arg,done:a.done}}"throw"===d.type&&(o="completed",a.method="throw",a.arg=d.arg)}}}function j(t,e){var a=e.method,o=t.iterator[a];if(void 0===o)return e.delegate=null,"throw"===a&&t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method)||"return"!==a&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+a+"' method")),u;var r=p(o,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,u;var n=r.arg;return n?n.done?(e[t.resultName]=n.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):n:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function F(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function z(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(F,this),this.reset(!0)}function L(t){if(t){var e=t[l];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function e(){for(;++a<t.length;)if(r.call(t,a))return e.value=t[a],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:$}}function $(){return{value:void 0,done:!0}}return v.prototype=h,n(b,"constructor",{value:h,configurable:!0}),n(h,"constructor",{value:v,configurable:!0}),v.displayName=s(h,c,"GeneratorFunction"),a.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,s(t,c,"GeneratorFunction")),t.prototype=Object.create(b),t},a.awrap=function(t){return{__await:t}},_(w.prototype),s(w.prototype,d,(function(){return this})),a.AsyncIterator=w,a.async=function(t,e,o,r,n){void 0===n&&(n=Promise);var i=new w(f(t,e,o,r),n);return a.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(b),s(b,c,"Generator"),s(b,l,(function(){return this})),s(b,"toString",(function(){return"[object Generator]"})),a.keys=function(t){var e=Object(t),a=[];for(var o in e)a.push(o);return a.reverse(),function t(){for(;a.length;){var o=a.pop();if(o in e)return t.value=o,t.done=!1,t}return t.done=!0,t}},a.values=L,z.prototype={constructor:z,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function a(a,o){return i.type="throw",i.arg=t,e.next=a,o&&(e.method="next",e.arg=void 0),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var n=this.tryEntries[o],i=n.completion;if("root"===n.tryLoc)return a("end");if(n.tryLoc<=this.prev){var l=r.call(n,"catchLoc"),d=r.call(n,"finallyLoc");if(l&&d){if(this.prev<n.catchLoc)return a(n.catchLoc,!0);if(this.prev<n.finallyLoc)return a(n.finallyLoc)}else if(l){if(this.prev<n.catchLoc)return a(n.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<n.finallyLoc)return a(n.finallyLoc)}}}},abrupt:function(t,e){for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}}n&&("break"===t||"continue"===t)&&n.tryLoc<=e&&e<=n.finallyLoc&&(n=null);var i=n?n.completion:{};return i.type=t,i.arg=e,n?(this.method="next",this.next=n.finallyLoc,u):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.finallyLoc===t)return this.complete(a.completion,a.afterLoc),E(a),u}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.tryLoc===t){var o=a.completion;if("throw"===o.type){var r=o.arg;E(a)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,a){return this.delegate={iterator:L(t),resultName:e,nextLoc:a},"next"===this.method&&(this.arg=void 0),u}},a}function a(t,e,a,o,r,n,i){try{var l=t[n](i),d=l.value}catch(c){return void a(c)}l.done?e(d):Promise.resolve(d).then(o,r)}System.register(["./element-plus-legacy-c476e0a4.js","./SvgIcon-legacy-c2b74fcb.js","./index-legacy-089a458b.js","./Ranking-legacy-fd705493.js","./Transaction-legacy-e03a2992.js","./index-legacy-c8dd18f2.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./echarts-legacy-41965509.js","./tslib-legacy-46756b30.js","./zrender-legacy-699e7e9c.js","./statistics-legacy-171ef929.js","./DateTime-legacy-d9080f1c.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(t,o){"use strict";var r,n,i,l,d,c,s,f,p,u,m,v,h,g,y,x,b=document.createElement("style");return b.textContent='@charset "UTF-8";[data-v-425335df]:root{--el-color-primary:#FFBE00;--el-color-primary-light-3:#100A05 !important;--el-component-size-small: 32px !important;--el-color-black:#100A05 !important;--el-color-tips:#909399 !important;--el-color-border:#DCDFE6 !important;--el-color-primary-dark-2: #FFBE00;--el-color-primary-light-5: #FFBE00;--el-color-primary-light-8: #FFBE00;--el-color-primary-light-9: #FFFAEB}.common-seach-wrap .el-input__wrapper[data-v-425335df]{padding:0 15px}.common-seach-wrap .el-form-item__label[data-v-425335df]{--el-text-color-regular: #606266;font-weight:400}.common-seach-wrap .el-form--inline .el-form-item[data-v-425335df]{margin-right:16px}.el-form-item--small .el-form-item__label[data-v-425335df]{height:var(--el-component-size-small)!important;line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content[data-v-425335df]{line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content .el-radio__input[data-v-425335df],.el-form-item--small .el-form-item__content .el-radio__inner[data-v-425335df]{transform:scale(1.1)}.el-button--primary[data-v-425335df]{--el-button-text-color:var(--el-color-black)}.el-form-item__content[data-v-425335df],.el-form-item__content .gray9[data-v-425335df]{width:100%}.el-form-item__content .el-row .img[data-v-425335df]{width:100%;margin-top:10px}.el-form-item__content .el-date-editor[data-v-425335df]{--el-date-editor-width: auto}.el-form-item__content span[data-v-425335df]{margin:0 6px}.el-form-item__content label span[data-v-425335df]{margin:0!important}.el-form-item__content .el-input span[data-v-425335df]{margin:0}.el-form-item__content .el-color-picker--small[data-v-425335df]{height:auto!important}.el-form-item__content .el-color-picker--small .el-color-picker__trigger[data-v-425335df]{width:32px;height:32px}.el-form-item__content .el-color-picker--small .el-color-picker__trigger span[data-v-425335df]{margin:0!important}.el-table .cell[data-v-425335df]{line-height:32px!important;font-size:14px!important;text-transform:capitalize;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.el-table .cell.el-tooltip[data-v-425335df]{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.el-table thead[data-v-425335df]{color:var(--el-color-tips)!important}.el-table td.el-table__cell[data-v-425335df]{color:var(--el-color-black);font-weight:400}.el-button[data-v-425335df]{text-transform:capitalize}.el-button[data-v-425335df]:focus{outline:none}.el-button.el-button--small.el-button--text[data-v-425335df]{padding-left:0;padding-right:0}.el-button--small[data-v-425335df]{--el-button-size: var(--el-component-size-small);font-size:14px}.common-button-wrapper .el-button--small[data-v-425335df]{padding:5px 22px!important}.el-dialog__body[data-v-425335df]{overflow:hidden;padding:10px 20px!important}.el-dialog__body .dialog-footer[data-v-425335df]{float:right}.el-dialog__body .el-select[data-v-425335df]{width:100%}.el-dialog__headerbtn .el-icon svg[data-v-425335df]{width:auto!important;height:auto!important}.table-wrap[data-v-425335df]{padding:0}.el-tabs .el-tabs__item[data-v-425335df]{font-size:14px;font-weight:700!important}.el-tabs .el-tabs__item span[data-v-425335df]{font-weight:inherit}.el-table[data-v-425335df]{--el-table-border-color: #EEEEEE !important;--el-table-header-bg-color:#EAEDF4 !important;--el-table-header-text-color:#101010 !important;width:100%!important}.el-table .el-table__cell[data-v-425335df]{position:static!important}.el-form[data-v-425335df]{--el-text-color-regular:#333;--el-font-size-base: 12px !important;position:relative}.el-form-item[data-v-425335df]{--font-size: 14px !important}.el-form-item .el-form-item[data-v-425335df]{margin-bottom:18px}.el-form-item__label[data-v-425335df]{text-transform:capitalize;font-weight:400}.el-radio__input.is-checked+.el-radio__label span[data-v-425335df]{color:var(--el-text-color-regular)}.pagination[data-v-425335df]{overflow:hidden}.pagination .el-pagination[data-v-425335df],.upload-dialog .pagination-wrap[data-v-425335df]{float:right}.img-select .el-icon svg[data-v-425335df]{width:2em;height:2em}.el-image-viewer__canvas[data-v-425335df]{padding:20px;box-sizing:border-box}.el-tabs__item[data-v-425335df],.el-message-box__title[data-v-425335df],.el-dialog__title[data-v-425335df],.el-radio__label[data-v-425335df]{text-transform:capitalize}.el-input-number .el-input__inner[data-v-425335df]{text-align:left!important}.el-input-number--small[data-v-425335df]{width:100%!important}.el-button--primary.is-link.is-disabled[data-v-425335df],.el-button--primary.is-link.is-disabled[data-v-425335df]:hover{color:var(--el-color-tips)}.el-button--primary.el-button.is-disabled[data-v-425335df]{opacity:.8;background:var(--el-color-tips);border-color:var(--el-color-tips)}.el-dropdown-menu__item.is-disabled[data-v-425335df]{color:var(--el-color-primary)!important;background:#FFF6DE}.draggable-list[data-v-425335df]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .wrapper[data-v-425335df]{display:flex}.draggable-list .wrapper>span[data-v-425335df]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .item[data-v-425335df]{position:relative;width:110px;height:110px;margin-top:10px;margin-right:10px;border-radius:8px;overflow:hidden;border:1px solid #dddddd}.draggable-list .delete-btn[data-v-425335df]{position:absolute;top:0;right:0;width:16px;height:16px;background:red;line-height:16px;font-size:16px;color:#fff;display:none}.draggable-list .item:hover .delete-btn[data-v-425335df]{display:block}.draggable-list .item img[data-v-425335df]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-height:100%;max-width:100%}.draggable-list .img-select[data-v-425335df]{display:flex;justify-content:center;align-items:center;border:1px dashed #dddddd;font-size:30px}.draggable-list .img-select i[data-v-425335df]{color:#409eff}.edit_container[data-v-425335df]{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;line-height:20px;color:#2c3e50;height:auto!important}.ql-editor[data-v-425335df]{height:400px}.tips[data-v-425335df]{color:#ccc;width:100%}.operation-wrap[data-v-425335df]{height:auto;width:100%;padding:16px;border-radius:8px;background-size:100% 100%;color:#fff}.operation-center[data-v-425335df]{width:100%;display:flex;gap:12px}.operation-center-l[data-v-425335df]{flex:7;border-radius:4px;padding:16px;background:#fff}.operation-today[data-v-425335df]{display:flex;flex-wrap:wrap;gap:12px}.grid-content[data-v-425335df]{border-radius:4px;padding:16px;background:#F7F9FB;flex:1;min-width:calc(33.3% - 8px);max-width:30%}.grid-content .des[data-v-425335df]{color:var(--el-color-black);font-size:16px;font-style:normal;font-weight:400;margin-bottom:16px;text-transform:capitalize}.grid-content h3[data-v-425335df]{color:var(--el-color-black);font-size:20px;font-style:normal;font-weight:700;margin-bottom:8px}.grid-content .yesterday[data-v-425335df]{color:var(--el-color-tips);font-size:12px;font-style:normal;font-weight:400}.operation-center-r[data-v-425335df]{flex:3;border-radius:4px;padding:16px;background:#fff}.center-r-box[data-v-425335df]{padding:16px;border-radius:4px;background:#FFF1EE}.center-r-box-t[data-v-425335df]{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:16px;text-transform:capitalize}.center-r-box-t h4[data-v-425335df]{color:var(--el-color-black);font-size:16px;font-weight:400}.center-r-box-t p[data-v-425335df]{color:var(--el-color-primary);font-size:14px;font-weight:400;cursor:pointer}.operation-title[data-v-425335df]{color:var(--el-color-black);font-size:20px;font-weight:500;text-transform:capitalize}.fb[data-v-425335df]{color:#ff6241;font-size:20px;font-style:normal;font-weight:700;line-height:normal}.operation-data[data-v-425335df]{display:flex;gap:12px;flex-wrap:wrap}.data-box[data-v-425335df]{flex:1;padding:16px;background:#FFF6DE;border-radius:4px}.data-box-title[data-v-425335df]{display:flex;justify-content:space-between;text-transform:capitalize}.data-box-title h3[data-v-425335df]{font-size:16px;font-weight:400;color:var(--el-color-black)}.data-box h4[data-v-425335df]{font-size:28px;font-weight:700;margin-top:20px;color:var(--el-color-black)}.data-box[data-v-425335df]:hover{background:#FFBE00}.data-box:hover .data-box-icon[data-v-425335df]{color:#fff}.data-box-icon[data-v-425335df]{width:24px;height:24px;color:#ffbe00}.home-index[data-v-425335df]{width:100%;display:-ms-flexbox;display:flex;gap:12px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;min-width:1000px;overflow-x:auto}.main-index[data-v-425335df]{flex:1;margin:20px}.matters-wrap[data-v-425335df]{padding:16px;border-radius:4px;background:#fff}.matters .box[data-v-425335df]{width:100%}.matters-wrap .matters[data-v-425335df]{display:-ms-flexbox;display:flex;-webkit-box-direction:column;-ms-flex-direction:column;flex-direction:column;justify-content:flex-start;align-items:flex-start;margin-bottom:30px}.matters-wrap .matters .title[data-v-425335df]{font-size:16px;color:#333;display:inline-block;height:20px;line-height:0;padding:11px;text-align:center;margin-bottom:20px}.matters-wrap .matters ul[data-v-425335df]{color:#999}.matters-wrap .matters ul span[data-v-425335df]{padding-right:6px;color:#3a8ee6}.border-b[data-v-425335df]{display:flex;flex-direction:column}.border-b-l[data-v-425335df]{flex-direction:initial}.matters_item[data-v-425335df]{display:flex;justify-content:flex-start;align-items:center}.matters_item li[data-v-425335df]{width:72px;display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:16px}.matters_box[data-v-425335df]{width:90%;border-top:1px solid #d9d9d9;padding-top:20px}.matters-wrap .matters_item li .fb[data-v-425335df]{font-size:16px;color:#5d75e3}\n',document.head.appendChild(b),{setters:[function(t){r=t.v},function(t){n=t._},function(t){i=t.I},function(t){l=t.default},function(t){d=t.default},function(t){c=t.u},function(t){s=t._},function(t){f=t.ag,p=t.$,u=t.o,m=t.c,v=t.a,h=t.X,g=t.P,y=t.T,x=t.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var o=c().userInfo,b={components:{Ranking:l,Transaction:d,SvgIcon:n},data:function(){return{loading:!0,top_data:[],wait_data:{order:{},agent:{},supplier:{},activity:{},audit:{},stock:{}},today_data:{order_total_price:{},order_total:{},new_user_total:{},new_supplier_total:{},apply_supplier_total:{},order_user_total:{},income_money:{}},product_data:{salesMoneyRank:[],salesNumRank:[]},user_type:""}},provide:function(){return{dataRank:this.product_data}},mounted:function(){this.getData(),this.getBaseInof()},methods:{getBaseInof:function(){var t,r=this;return(t=e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.user_type=o.user_type;case 1:case"end":return t.stop()}}),t)})),function(){var e=this,o=arguments;return new Promise((function(r,n){var i=t.apply(e,o);function l(t){a(i,r,n,l,d,"next",t)}function d(t){a(i,r,n,l,d,"throw",t)}l(void 0)}))})()},getData:function(){var t=this;t.loading=!0,i.getCount(!0).then((function(e){t.loading=!1,Object.assign(t.product_data,e.data.data.product_data),t.top_data=e.data.data.top_data,t.wait_data=e.data.data.wait_data,t.today_data=e.data.data.today_data})).catch((function(t){}))},lockStock:function(){this.$router.push({path:"product/store/index",query:{inventory:10}})}}},_={class:"home"},w={class:"operation-wrap",style:{"background-color":"#FFFFFF"}},k={class:"operation-title mb16"},j={class:"operation-data"},F={class:"data-box"},E={class:"data-box-title"},z={class:"data-box"},L={class:"data-box-title"},$={class:"data-box"},S={class:"data-box-title"},N={class:"data-box"},O={class:"data-box-title"},T={class:"data-box"},B={class:"data-box-title"},I={class:"operation-center mt12"},P={class:"operation-center-l"},A={class:"operation-title mb16"},D={class:"operation-today"},G={class:"grid-content"},C={class:"des"},R={class:"yesterday"},q={class:"grid-content"},Y={class:"des"},X={class:"yesterday"},H={class:"grid-content"},M={class:"des"},U={class:"yesterday"},W={class:"grid-content"},J={class:"des"},K={class:"yesterday"},Q={class:"grid-content"},V={class:"des"},Z={class:"yesterday"},tt={class:"operation-center-r"},et={class:"operation-title mb16"},at={class:"center-r-box"},ot={class:"center-r-box-t"},rt={class:"fb"},nt={class:"home-index mt12"},it={class:"flex-1"},lt={class:"matters-wrap",style:{width:"100%"}},dt={class:"matters-wrap flex-1"};t("default",s(b,[["render",function(t,e,a,o,i,l){var d,c,s,b,ct,st,ft,pt,ut,mt,vt=n,ht=f("Transaction"),gt=f("Ranking"),yt=r;return p((u(),m("div",_,[v("div",w,[v("h3",k,h(t.$t("数据总览")),1),v("div",j,[v("div",F,[v("div",E,[v("h3",null,h(t.$t("营业总额")),1),g(vt,{class:"data-box-icon",name:"icon1"})]),v("h4",null,h(Number(i.top_data.total_money||0).toFixed(2)),1)]),v("div",z,[v("div",L,[v("h3",null,h(t.$t("折扣总额")),1),g(vt,{class:"data-box-icon",name:"icon2"})]),v("h4",null,h(Number(i.top_data.total_discount_money||0).toFixed(2)),1)]),v("div",$,[v("div",S,[v("h3",null,h(t.$t("会员数")),1),g(vt,{class:"data-box-icon",name:"icon3"})]),v("h4",null,h(i.top_data.user_total),1)]),v("div",N,[v("div",O,[v("h3",null,h(t.$t("订单数")),1),g(vt,{class:"data-box-icon",name:"icon4"})]),v("h4",null,h(i.top_data.order_total),1)]),v("div",T,[v("div",B,[v("h3",null,h(t.$t("退款金额")),1),g(vt,{class:"data-box-icon",name:"icon5"})]),v("h4",null,h(Number(i.top_data.refund_money||0).toFixed(2)),1)])])]),v("div",I,[v("div",P,[v("h3",A,h(t.$t("今日概况")),1),v("div",D,[v("div",G,[v("p",C,h(t.$t("营业总额")),1),v("h3",null,h(null===(d=i.today_data.order_total_price)||void 0===d?void 0:d.tday),1),v("p",R,h(t.$t("昨日："))+h(Number((null===(c=i.today_data.order_total_price)||void 0===c?void 0:c.ytd)||0).toFixed(2)),1)]),v("div",q,[v("p",Y,h(t.$t("折扣总额")),1),v("h3",null,h(null===(s=i.today_data.order_discount_money)||void 0===s?void 0:s.tday),1),v("p",X,h(t.$t("昨日："))+h(Number((null===(b=i.today_data.order_discount_money)||void 0===b?void 0:b.ytd)||0).toFixed(2)),1)]),v("div",H,[v("p",M,h(t.$t("会员数")),1),v("h3",null,h(null===(ct=i.today_data.new_user_total)||void 0===ct?void 0:ct.tday),1),v("p",U,h(t.$t("昨日："))+h(null===(st=i.today_data.new_user_total)||void 0===st?void 0:st.ytd),1)]),v("div",W,[v("p",J,h(t.$t("订单数")),1),v("h3",null,h(null===(ft=i.today_data.order_total)||void 0===ft?void 0:ft.tday),1),v("p",K,h(t.$t("昨日："))+h(null===(pt=i.today_data.order_total)||void 0===pt?void 0:pt.ytd),1)]),v("div",Q,[v("p",V,h(t.$t("退款金额")),1),v("h3",null,h(null===(ut=i.today_data.order_refund_money)||void 0===ut?void 0:ut.tday),1),v("p",Z,h(t.$t("昨日："))+h(Number((null===(mt=i.today_data.order_refund_money)||void 0===mt?void 0:mt.ytd)||0).toFixed(2)),1)])])]),v("div",tt,[v("h3",et,h(t.$t("待办事项")),1),v("div",at,[v("div",ot,[v("h4",null,h(t.$t("库存告急")),1),v("p",{onClick:e[0]||(e[0]=function(){return l.lockStock&&l.lockStock.apply(l,arguments)})},h(t.$t("查看")),1)]),v("p",rt,h(i.wait_data.stock.product),1)])])]),v("div",nt,[v("div",it,[v("div",lt,[g(ht)])]),v("div",dt,[i.loading?x("",!0):(u(),y(gt,{key:0}))])])])),[[yt,i.loading]])}],["__scopeId","data-v-425335df"]]))}}}))}();
