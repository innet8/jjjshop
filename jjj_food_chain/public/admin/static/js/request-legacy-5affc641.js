System.register(["./axios-legacy-d06d9fd6.js","./qs-legacy-1fb74c88.js","./index-legacy-e9fe14d2.js","./element-plus-legacy-acb180c2.js"],(function(e,t){"use strict";var n,s,r,o,a,u;return{setters:[function(e){n=e.a},function(e){s=e.q},function(e){r=e.u,o=e.r,a=e.o},function(e){u=e.f}],execute:function(){var t=a,i=t.baseURL,c=t.tokenName,f=t.contentType,d=t.withCredentials,p=t.responseType;n.defaults.headers["Content-Type"]=f,n.defaults.baseURL=i,n.defaults.withCredentials=d,n.defaults.responseType=p,n.interceptors.request.use((function(e){var t=r().token;return e.headers[c]=t,"post"===e.method&&(e.data=s.stringify(e.data)),e}),(function(e){return Promise.reject(e)})),n.interceptors.response.use((function(e){return 1===e.data.code?e.data:0===e.data.code?(u({showClose:!0,message:e.data.msg,type:"error"}),Promise.reject(e.data)):((0,r().afterLogout)(),void o.push({path:"/login"}))}),(function(e){return u({showClose:!0,message:"接口请求异常，请稍后再试~",type:"error"}),Promise.reject(e)})),e("r",{_post:function(e,t,s){return new Promise((function(r,o){n.post(e,t).then((function(e){r(e)})).catch((function(e){s&&o(e)}))}))},_get:function(e,t,s){return new Promise((function(r,o){n.get(e,{params:t}).then((function(e){r(e)})).catch((function(e){s&&o(e)}))}))}})}}}));
