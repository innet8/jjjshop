import{r as t}from"./index-fed3ed55.js";let o={productList:(o,p)=>t._get("/shop/plus.points.product/index",o,p),getProduct:(o,p)=>t._get("/shop/plus.points.product/add",o,p),addProduct:(o,p)=>t._post("/shop/plus.points.product/add",o,p),getEditProduct:(o,p)=>t._get("/shop/plus.points.product/edit",o,p),editProduct:(o,p)=>t._post("/shop/plus.points.product/edit",o,p),categoryList:(o,p)=>t._get("/shop/plus.points.category/index",o,p),addCategory:(o,p)=>t._post("/shop/plus.points.category/add",o,p),editCategory:(o,p)=>t._post("/shop/plus.points.category/edit",o,p),deleteCategory:(o,p)=>t._post("/shop/plus.points.category/delete",o,p),getExchange:(o,p)=>t._post("/shop/plus.points.order/index",o,p),orderdetail:(o,p)=>t._post("/shop/plus.points.order/detail",o,p),delivery:(o,p)=>t._post("/shop/plus.points.order/delivery",o,p),extract:(o,p)=>t._post("/shop/plus.points.order/extract",o,p)};export{o as P};
