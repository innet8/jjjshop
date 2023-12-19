import request from '@/utils/request'

let orderApi = {

  /*基础配置*/
  getList(data, errorback) {
    return request._post('/cashier/order.order/index', data, errorback);
  },
  /*基础配置*/
  settle(data, errorback) {
    return request._post('/cashier/order.order/settle', data, errorback);
  },
  /*基础配置*/
  refund(data, errorback) {
    return request._post('/cashier/order.order/refund', data, errorback);
  },
  print(data, errorback) {
    return request._post('/cashier/order.order/print', data, errorback);
  },
  /*退菜*/
  moveProduct(data, errorback) {
    return request._post('/cashier/order.order/moveProduct', data, errorback);
  },
}

export default orderApi;
