import{r as s}from"./index-fed3ed55.js";let t={getOrderTotal:(t,e)=>s._post("/shop/statistics.sales/index",t,e),getOrderByDate:(t,e)=>s._post("/shop/statistics.sales/order",t,e),getProductByDate:(t,e)=>s._post("/shop/statistics.sales/product",t,e),getUserTotal:(t,e)=>s._post("/shop/statistics.user/index",t,e),getUserScale:(t,e)=>s._post("/shop/statistics.user/scale",t,e),getNewUser:(t,e)=>s._post("/shop/statistics.user/new_user",t,e),getPayUser:(t,e)=>s._post("/shop/statistics.user/pay_user",t,e),getSupplierTotal:(t,e)=>s._post("/shop/statistics.supplier/index",t,e),getSupplierByDate:(t,e)=>s._post("/shop/statistics.supplier/data",t,e),getAccessTotal:(t,e)=>s._post("/shop/statistics.access/index",t,e),getAccessByDate:(t,e)=>s._post("/shop/statistics.access/data",t,e),getOrderDate:(t,e)=>s._get("/shop/statistics.order/index",t,e),getProDate:(t,e)=>s._get("/shop/statistics.product/index",t,e),getUserShiftLog:(t,e)=>s._post("/shop/user.UserShiftLog/index",t,e),getUserShiftLogdDetail:(t,e)=>s._post("/shop/user.UserShiftLog/detail",t,e)};export{t as S};
