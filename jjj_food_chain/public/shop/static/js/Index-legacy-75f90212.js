!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t=function(){return r};var r={},a=Object.prototype,n=a.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},l="function"==typeof Symbol?Symbol:{},i=l.iterator||"@@iterator",c=l.asyncIterator||"@@asyncIterator",u=l.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(S){s=function(e,t,r){return e[t]=r}}function d(e,t,r,a){var n=t&&t.prototype instanceof m?t:m,l=Object.create(n.prototype),i=new L(a||[]);return o(l,"_invoke",{value:k(e,r,i)}),l}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(S){return{type:"throw",arg:S}}}r.wrap=d;var f={};function m(){}function h(){}function g(){}var v={};s(v,i,(function(){return this}));var y=Object.getPrototypeOf,_=y&&y(y(F([])));_&&_!==a&&n.call(_,i)&&(v=_);var b=g.prototype=m.prototype=Object.create(v);function w(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function x(t,r){function a(o,l,i,c){var u=p(t[o],t,l);if("throw"!==u.type){var s=u.arg,d=s.value;return d&&"object"==e(d)&&n.call(d,"__await")?r.resolve(d.__await).then((function(e){a("next",e,i,c)}),(function(e){a("throw",e,i,c)})):r.resolve(d).then((function(e){s.value=e,i(s)}),(function(e){return a("throw",e,i,c)}))}c(u.arg)}var l;o(this,"_invoke",{value:function(e,t){function n(){return new r((function(r,n){a(e,t,r,n)}))}return l=l?l.then(n,n):n()}})}function k(e,t,r){var a="suspendedStart";return function(n,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===n)throw o;return C()}for(r.method=n,r.arg=o;;){var l=r.delegate;if(l){var i=j(l,r);if(i){if(i===f)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===a)throw a="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a="executing";var c=p(e,t,r);if("normal"===c.type){if(a=r.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(a="completed",r.method="throw",r.arg=c.arg)}}}function j(e,t){var r=t.method,a=e.iterator[r];if(void 0===a)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,j(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var n=p(a,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,f;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function z(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function L(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(z,this),this.reset(!0)}function F(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,a=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:C}}function C(){return{value:void 0,done:!0}}return h.prototype=g,o(b,"constructor",{value:g,configurable:!0}),o(g,"constructor",{value:h,configurable:!0}),h.displayName=s(g,u,"GeneratorFunction"),r.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},r.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,s(e,u,"GeneratorFunction")),e.prototype=Object.create(b),e},r.awrap=function(e){return{__await:e}},w(x.prototype),s(x.prototype,c,(function(){return this})),r.AsyncIterator=x,r.async=function(e,t,a,n,o){void 0===o&&(o=Promise);var l=new x(d(e,t,a,n),o);return r.isGeneratorFunction(t)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},w(b),s(b,u,"Generator"),s(b,i,(function(){return this})),s(b,"toString",(function(){return"[object Generator]"})),r.keys=function(e){var t=Object(e),r=[];for(var a in t)r.push(a);return r.reverse(),function e(){for(;r.length;){var a=r.pop();if(a in t)return e.value=a,e.done=!1,e}return e.done=!0,e}},r.values=F,L.prototype={constructor:L,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,a){return l.type="throw",l.arg=e,t.next=r,a&&(t.method="next",t.arg=void 0),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],l=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(i&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var l=o?o.completion:{};return l.type=e,l.arg=t,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),E(r),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var a=r.completion;if("throw"===a.type){var n=a.arg;E(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:F(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},r}function r(e,t,r,a,n,o,l){try{var i=e[o](l),c=i.value}catch(u){return void r(u)}i.done?t(c):Promise.resolve(c).then(a,n)}System.register(["./element-plus-legacy-895ffe04.js","./group-legacy-ba02d034.js","./qs-legacy-65fc6596.js","./index-legacy-b161cc26.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-6076f203.js","./@vueuse-legacy-85324d63.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-d0a3b32c.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./vue-router-legacy-41bf3bcd.js","./pinia-legacy-68b9f062.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-6ef346ed.js","./vue-i18n-legacy-04918595.js","./@intlify-legacy-09ecf407.js"],(function(e,a){"use strict";var n,o,l,i,c,u,s,d,p,f,m,h,g,v,y,_,b,w,x,k,j,z,E,L,F,C,S,D,N,P,O,V,I,A=document.createElement("style");return A.textContent='@charset "UTF-8";[data-v-438e3068]:root{--el-color-primary:#FFBE00;--el-color-primary-light-3:#100A05 !important;--el-component-size-small: 32px !important;--el-color-black:#100A05 !important;--el-color-tips:#909399 !important;--el-color-border:#DCDFE6 !important;--el-color-primary-dark-2: #FFBE00;--el-color-primary-light-5: #FFBE00;--el-color-primary-light-8: #FFBE00;--el-color-primary-light-9: #FFFAEB}.common-seach-wrap .el-input__wrapper[data-v-438e3068]{padding:0 15px}.common-seach-wrap .el-form-item__label[data-v-438e3068]{--el-text-color-regular: #606266;font-weight:400}.common-seach-wrap .el-form--inline .el-form-item[data-v-438e3068]{margin-right:16px}.el-form-item--small .el-form-item__label[data-v-438e3068]{height:var(--el-component-size-small)!important;line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content[data-v-438e3068]{line-height:var(--el-component-size-small)!important}.el-form-item--small .el-form-item__content .el-radio__input[data-v-438e3068],.el-form-item--small .el-form-item__content .el-radio__inner[data-v-438e3068]{transform:scale(1.1)}.el-button--primary[data-v-438e3068]{--el-button-text-color:var(--el-color-black)}.el-form-item__content[data-v-438e3068],.el-form-item__content .gray9[data-v-438e3068]{width:100%}.el-form-item__content .el-row .img[data-v-438e3068]{width:100%;margin-top:10px}.el-form-item__content .el-date-editor[data-v-438e3068]{--el-date-editor-width: auto}.el-form-item__content span[data-v-438e3068]{margin:0 6px}.el-form-item__content label span[data-v-438e3068]{margin:0!important}.el-form-item__content .el-input span[data-v-438e3068]{margin:0}.el-form-item__content .el-color-picker--small[data-v-438e3068]{height:auto!important}.el-form-item__content .el-color-picker--small .el-color-picker__trigger[data-v-438e3068]{width:32px;height:32px}.el-form-item__content .el-color-picker--small .el-color-picker__trigger span[data-v-438e3068]{margin:0!important}.el-table .cell[data-v-438e3068]{line-height:32px!important;font-size:14px!important;text-transform:capitalize}.el-table thead[data-v-438e3068]{color:var(--el-color-tips)!important}.el-table td.el-table__cell[data-v-438e3068]{color:var(--el-color-black);font-weight:400}.el-button[data-v-438e3068]{text-transform:capitalize}.el-button.el-button--small.el-button--text[data-v-438e3068]{padding-left:0;padding-right:0}.el-button--small[data-v-438e3068]{--el-button-size: var(--el-component-size-small);font-size:14px}.common-button-wrapper .el-button--small[data-v-438e3068]{padding:5px 22px!important}.el-dialog__body[data-v-438e3068]{overflow:hidden;padding:10px 20px!important}.el-dialog__body .dialog-footer[data-v-438e3068]{float:right}.el-dialog__headerbtn .el-icon svg[data-v-438e3068]{width:auto!important;height:auto!important}.table-wrap[data-v-438e3068]{padding:0}.el-tabs .el-tabs__item[data-v-438e3068]{font-size:14px;font-weight:700!important}.el-tabs .el-tabs__item span[data-v-438e3068]{font-weight:inherit}.el-table[data-v-438e3068]{--el-table-border-color: #EEEEEE !important;--el-table-header-bg-color:#EAEDF4 !important;--el-table-header-text-color:#101010 !important;width:100%!important}.el-table .el-table__cell[data-v-438e3068]{position:static!important}.el-form[data-v-438e3068]{--el-text-color-regular:#333;--el-font-size-base: 12px !important;position:relative}.el-form-item[data-v-438e3068]{--font-size: 14px !important}.el-form-item .el-form-item[data-v-438e3068]{margin-bottom:18px}.el-form-item__label[data-v-438e3068]{text-transform:capitalize;font-weight:400}.el-radio__input.is-checked+.el-radio__label span[data-v-438e3068]{color:var(--el-text-color-regular)}.pagination[data-v-438e3068]{overflow:hidden}.pagination .el-pagination[data-v-438e3068],.upload-dialog .pagination-wrap[data-v-438e3068]{float:right}.img-select .el-icon svg[data-v-438e3068]{width:2em;height:2em}.el-image-viewer__canvas[data-v-438e3068]{padding:20px;box-sizing:border-box}.el-tabs__item[data-v-438e3068],.el-message-box__title[data-v-438e3068],.el-dialog__title[data-v-438e3068],.el-radio__label[data-v-438e3068]{text-transform:capitalize}.draggable-list[data-v-438e3068]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .wrapper[data-v-438e3068]{display:flex}.draggable-list .wrapper>span[data-v-438e3068]{display:flex;justify-content:flex-start;flex-wrap:wrap}.draggable-list .item[data-v-438e3068]{position:relative;width:110px;height:110px;margin-top:10px;margin-right:10px;border-radius:8px;overflow:hidden;border:1px solid #dddddd}.draggable-list .delete-btn[data-v-438e3068]{position:absolute;top:0;right:0;width:16px;height:16px;background:red;line-height:16px;font-size:16px;color:#fff;display:none}.draggable-list .item:hover .delete-btn[data-v-438e3068]{display:block}.draggable-list .item img[data-v-438e3068]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-height:100%;max-width:100%}.draggable-list .img-select[data-v-438e3068]{display:flex;justify-content:center;align-items:center;border:1px dashed #dddddd;font-size:30px}.draggable-list .img-select i[data-v-438e3068]{color:#409eff}.edit_container[data-v-438e3068]{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;line-height:20px;color:#2c3e50;height:auto!important}.ql-editor[data-v-438e3068]{height:400px}.tips[data-v-438e3068]{color:#ccc;width:100%}.product-info[data-v-438e3068]{padding:10px 0;border-top:1px solid #eeeeee}.order-code .state-text[data-v-438e3068]{padding:2px 4px;border-radius:4px;background:#808080;color:#fff}.order-code .state-text-red[data-v-438e3068]{background:red}.table-wrap .product-info[data-v-438e3068]:first-of-type{border-top:none}.table-wrap .el-table__body tbody .el-table__row[data-v-438e3068]:nth-child(odd){background:#f5f7fa}\n',document.head.appendChild(A),{setters:[function(e){n=e.e,o=e.f,l=e.q,i=e.r,c=e.G,u=e.g,s=e.h,d=e.D,p=e.H,f=e.I,m=e.m,h=e.n,g=e.A,v=e.v},function(e){y=e.G},function(e){_=e.l},function(e){b=e.u},function(e){w=e._},function(e){x=e.ap,k=e.o,j=e.c,z=e.a,E=e.P,L=e.S,F=e.T,C=e.Q,S=e.a8,D=e.Y,N=e.W,P=e.X,O=e.$,V=e.bb,I=e.b9},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var a=b().userInfo,A=b().token,G={components:{},data:function(){return{activeName:"all",loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{order_no:"",shop_supplier_id:"",create_time:""},supplierList:[],order_count:{all:0,payment:0,delivery:0,received:0,cancel:0,refund:0},user_type:"",token:A}},created:function(){this.getBaseInof(),this.getData()},methods:{getBaseInof:function(){var e,n=this;return(e=t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.user_type=a.user_type,0!=n.user_type&&(n.activeName="complete");case 2:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(n,o){var l=e.apply(t,a);function i(e){r(l,n,o,i,c,"next",e)}function c(e){r(l,n,o,i,c,"throw",e)}i(void 0)}))})()},arraySpanMethod:function(e){if(e.rowIndex%2==0&&0===e.columnIndex)return[1,8]},handleCurrentChange:function(e){this.curPage=e,this.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},handleClick:function(e,t){this.curPage=1,this.getData()},getData:function(){var e=this,t=this.searchForm;t.dataType=e.activeName,t.page=e.curPage,t.list_rows=e.pageSize,e.loading=!0,y.orderList(t,!0).then((function(t){for(var r=[],a=0;a<t.data.list.data.length;a++){var n=t.data.list.data[a],o={order_no:n.order_no,create_time:n.create_time,is_top_row:!0,order_status:n.order_status.value};r.push(o),r.push(n)}e.tableData.data=r,e.totalDataNumber=t.data.list.total,e.supplierList=t.data.supplierList,e.order_count=t.data.order_count.order_count,e.loading=!1})).catch((function(e){}))},addClick:function(e){var t=e.order_id;this.$router.push({path:"/plus/group/order/detail",query:{order_id:t}})},onSubmit:function(){this.curPage=1,this.tableData=[],this.getData()},onExport:function(){var e=window.location.protocol+"//"+window.location.host;this.searchForm.token=this.token,window.location.href=e+"/index.php/shop/plus.group.order/export?"+_.stringify(this.searchForm)}}},T={class:"user"},B={class:"common-seach-wrap"},Y={class:"block"},U=function(e){return V("data-v-438e3068"),e=e(),I(),e}((function(){return z("span",{class:"demonstration"},null,-1)})),q={class:"product-content"},M={class:"table-wrap"},H={key:0,class:"order-code"},W={class:"c_main"},$={class:"pl16"},Q={class:"pic"},X={alt:""},J={class:"info"},K={class:"name gray3 product-name"},R={class:"d-c-c d-c"},Z={class:"orange"},ee={class:"gray3"},te={key:0},re={class:"orange"},ae={key:0},ne={class:"gray9"},oe={key:0},le={key:0},ie={class:"gray9"},ce={key:0},ue={class:"pagination"};e("default",w(G,[["render",function(e,t,r,a,y,_){var b=n,w=o,V=l,I=i,A=c,G=u,se=s,de=d,pe=p,fe=f,me=m,he=h,ge=g,ve=x("img-url"),ye=x("auth"),_e=v;return k(),j("div",T,[z("div",B,[E(se,{size:"small",inline:!0,model:y.searchForm,class:"demo-form-inline"},{default:L((function(){return[E(w,{label:"订单号"},{default:L((function(){return[E(b,{size:"small",modelValue:y.searchForm.order_no,"onUpdate:modelValue":t[0]||(t[0]=function(e){return y.searchForm.order_no=e}),placeholder:"请输入订单号"},null,8,["modelValue"])]})),_:1}),0==y.user_type?(k(),F(w,{key:0,label:"使用门店"},{default:L((function(){return[E(I,{size:"small",modelValue:y.searchForm.shop_supplier_id,"onUpdate:modelValue":t[1]||(t[1]=function(e){return y.searchForm.shop_supplier_id=e}),placeholder:"请选择"},{default:L((function(){return[E(V,{label:"全部",value:""}),(k(!0),j(C,null,S(y.supplierList,(function(e,t){return k(),F(V,{key:t,label:e.name,value:e.shop_supplier_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1})):D("",!0),E(w,{label:"起始时间"},{default:L((function(){return[z("div",Y,[U,E(A,{size:"small",modelValue:y.searchForm.create_time,"onUpdate:modelValue":t[2]||(t[2]=function(e){return y.searchForm.create_time=e}),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])]})),_:1}),E(w,null,{default:L((function(){return[E(G,{size:"small",type:"primary",icon:"Search",onClick:_.onSubmit},{default:L((function(){return[N("查询")]})),_:1},8,["onClick"])]})),_:1}),E(w,null,{default:L((function(){return[E(G,{size:"small",type:"success",onClick:_.onExport},{default:L((function(){return[N("导出")]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])]),z("div",q,[z("div",M,[0==y.user_type?(k(),F(fe,{key:0,modelValue:y.activeName,"onUpdate:modelValue":t[3]||(t[3]=function(e){return y.activeName=e}),onTabChange:_.handleClick},{default:L((function(){return[E(pe,{label:"全部订单",name:"all"},{label:L((function(){return[z("span",null,[N(" 全部订单 "),E(de,{size:""},{default:L((function(){return[N(P(y.order_count.all),1)]})),_:1})])]})),_:1}),E(pe,{label:"待付款",name:"payment"},{label:L((function(){return[z("span",null,[N(" 待付款 "),E(de,{size:""},{default:L((function(){return[N(P(y.order_count.payment),1)]})),_:1})])]})),_:1}),E(pe,{label:"待使用",name:"process"},{label:L((function(){return[z("span",null,[N("待使用 "),E(de,{size:""},{default:L((function(){return[N(P(y.order_count.process),1)]})),_:1})])]})),_:1}),E(pe,{label:"已取消",name:"cancel"},{label:L((function(){return[z("span",null,[N("已取消 "),E(de,{size:""},{default:L((function(){return[N(P(y.order_count.cancel),1)]})),_:1})])]})),_:1}),E(pe,{label:"已退款",name:"refund"},{label:L((function(){return[z("span",null,[N("已退款 "),E(de,{size:""},{default:L((function(){return[N(P(y.order_count.refund),1)]})),_:1})])]})),_:1}),E(pe,{label:"已完成",name:"complete"},{label:L((function(){return[z("span",null,[N("已完成 "),E(de,{size:""},{default:L((function(){return[N(P(y.order_count.complete),1)]})),_:1})])]})),_:1})]})),_:1},8,["modelValue","onTabChange"])):D("",!0),O((k(),F(he,{size:"small",data:y.tableData.data,"span-method":_.arraySpanMethod,border:"",style:{width:"100%"}},{default:L((function(){return[E(me,{prop:"order_no",label:"订单信息",width:"400"},{default:L((function(e){return[e.row.is_top_row?(k(),j("div",H,[z("span",W,"订单号："+P(e.row.order_no),1),z("span",$,"下单时间："+P(e.row.create_time),1)])):(k(!0),j(C,{key:1},S(e.row.product,(function(e,t){return k(),j("div",{class:"product-info",key:t},[z("div",Q,[O(z("img",X,null,512),[[ve,e.image.file_path]])]),z("div",J,[z("div",K,[z("span",null,P(e.group_name),1)])]),z("div",R,[z("div",Z,"￥ "+P(e.group_price),1),z("div",ee,"x"+P(e.total_num),1)])])})),128))]})),_:1}),E(me,{prop:"pay_price",label:"实付款"},{default:L((function(e){return[e.row.is_top_row?D("",!0):(k(),j("div",te,[z("div",re,P(e.row.pay_price),1)]))]})),_:1}),E(me,{prop:"",label:"买家"},{default:L((function(e){return[!e.row.is_top_row&&e.row.user?(k(),j("div",ae,[z("div",null,P(e.row.user.nickName),1),z("div",ne,"ID：("+P(e.row.user.user_id)+")",1)])):D("",!0)]})),_:1}),E(me,{prop:"supplier.name",label:"使用门店"}),E(me,{prop:"state_text",label:"交易状态"},{default:L((function(e){return[e.row.is_top_row?D("",!0):(k(),j("div",oe,P(e.row.state_text),1))]})),_:1}),E(me,{prop:"pay_type.text",label:"支付方式"},{default:L((function(e){return[e.row.is_top_row?D("",!0):(k(),j("div",le,[z("span",ie,P(e.row.pay_type.text),1)]))]})),_:1}),E(me,{fixed:"right",label:"操作",width:"160"},{default:L((function(e){return[e.row.is_top_row?D("",!0):(k(),j("div",ce,[O((k(),F(G,{onClick:function(t){return _.addClick(e.row)},type:"primary",link:"",size:"small"},{default:L((function(){return[N("订单详情 ")]})),_:2},1032,["onClick"])),[[ye,"/store/order/detail"]])]))]})),_:1})]})),_:1},8,["data","span-method"])),[[_e,y.loading]])]),z("div",ue,[E(ge,{onSizeChange:_.handleSizeChange,onCurrentChange:_.handleCurrentChange,background:"","current-page":y.curPage,"page-size":y.pageSize,layout:"total, prev, pager, next, jumper",total:y.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}],["__scopeId","data-v-438e3068"]]))}}}))}();
