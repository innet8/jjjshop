import request from '@/utils/request'

let HomeApi = {

  /*基础配置*/
  getCategory(data, errorback) {
    return request._post('/cashier/product.category/index', data, errorback);
  },
  /*基础配置*/
  getProduct(data, errorback) {
    return request._post('/cashier/product.product/index', data, errorback);
  },
  /*基础配置*/
  cartList(data, errorback) {
    return request._post('/cashier/order.cart/list', data, errorback);
  },
  /*基础配置*/
  addCart(data, errorback) {
    return request._post('/cashier/order.cart/add', data, errorback);
  },
  /*基础配置*/
  subProduct(data, errorback) {
    return request._post('/cashier/order.cart/sub', data, errorback);
  },
  /*基础配置*/
  orderBuy(data, errorback) {
    return request._post('/cashier/order.order/buy', data, errorback);
  },
  /*基础配置*/
  delProduct(data, errorback) {
    return request._post('/cashier/order.cart/delProduct', data, errorback);
  },
  /*基础配置*/
  delStay(data, errorback) {
    return request._post('/cashier/order.cart/delStay', data, errorback);
  },
  /* 修改价格*/
  changePrice(data, errorback) {
    return request._post('/cashier/order.cart/changePrice', data, errorback);
  },
  /* 折扣抹零*/
  changeMoney(data, errorback) {
    return request._post('/cashier/order.cart/changeMoney', data, errorback);
  },
  /* 挂单*/
  stay(data, errorback) {
    return request._post('/cashier/order.cart/stay', data, errorback);
  },
  /* 挂单列表*/
  stayList(data, errorback) {
    return request._post('/cashier/order.cart/stayList', data, errorback);
  },
  /* 取单*/
  pick(data, errorback) {
    return request._post('/cashier/order.cart/pick', data, errorback);
  },
  /* 删除挂单*/
  delCart(data, errorback) {
    return request._post('/cashier/order.cart/delCart', data, errorback);
  },
  /*基础配置*/
  HallCartList(data, errorback) {
    return request._post('/cashier/order.HallCart/list', data, errorback);
  },
  /*基础配置*/
  addHallCart(data, errorback) {
    return request._post('/cashier/order.HallCart/add', data, errorback);
  },
  /*基础配置*/
  subHallCart(data, errorback) {
    return request._post('/cashier/order.HallCart/sub', data, errorback);
  },
  tableBuy(data, errorback) {
    return request._post('/cashier/order.Order/tableBuy', data, errorback);
  },
  addMeal(data, errorback) {
    return request._post('/cashier/order.Order/addMeal', data, errorback);
  },
 
}

export default HomeApi;
