System.register(["./index-legacy-f1bb0cca.js"],(function(t,s){"use strict";var e;return{setters:[function(t){e=t.r}],execute:function(){t("S",{getOrderTotal:function(t,s){return e._post("/shop/statistics.sales/index",t,s)},getOrderByDate:function(t,s){return e._post("/shop/statistics.sales/order",t,s)},getProductByDate:function(t,s){return e._post("/shop/statistics.sales/product",t,s)},getUserTotal:function(t,s){return e._post("/shop/statistics.user/index",t,s)},getUserScale:function(t,s){return e._post("/shop/statistics.user/scale",t,s)},getNewUser:function(t,s){return e._post("/shop/statistics.user/new_user",t,s)},getPayUser:function(t,s){return e._post("/shop/statistics.user/pay_user",t,s)},getSupplierTotal:function(t,s){return e._post("/shop/statistics.supplier/index",t,s)},getSupplierByDate:function(t,s){return e._post("/shop/statistics.supplier/data",t,s)},getAccessTotal:function(t,s){return e._post("/shop/statistics.access/index",t,s)},getAccessByDate:function(t,s){return e._post("/shop/statistics.access/data",t,s)},getOrderDate:function(t,s){return e._get("/shop/statistics.order/index",t,s)},getProDate:function(t,s){return e._get("/shop/statistics.product/index",t,s)},getUserShiftLog:function(t,s){return e._post("/shop/user.UserShiftLog/index",t,s)},getUserShiftLogdDetail:function(t,s){return e._post("/shop/user.UserShiftLog/detail",t,s)}})}}}));