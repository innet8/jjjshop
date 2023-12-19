import request from '@/utils/request'

let TableApi = {

  /*基础配置*/
  getCategory(data, errorback) {
    return request._post('/cashier/store.table/area', data, errorback);
  },
  /*基础配置*/
  getTable(data, errorback) {
    return request._post('/cashier/store.table/table', data, errorback);
  },
  /*基础配置*/
  getHallCart(data, errorback) {
    return request._post('/cashier/order.HallCart/detail', data, errorback);
  },
  cancelHallCart(data, errorback) {
    return request._post('/cashier/order.HallCart/cancel', data, errorback);
  },
  payFunc(data, errorback) {
    return request._post('/cashier/order.Order/pay', data, errorback);
  },
  /* 折扣抹零*/
  changeMoney(data, errorback) {
    return request._post('/cashier/order.HallCart/changeMoney', data, errorback);
  },
  /* 折扣抹零*/
  getchangeTable(data, errorback) {
    return request._post('/cashier/store.table/changeTable', data, errorback);
  },
  /* 折扣抹零*/
  changeTable(data, errorback) {
    return request._post('/cashier/order.Order/changeTable', data, errorback);
  },
  /* 折扣抹零*/
  printFunc(data, errorback) {
    return request._post('/cashier/order.Order/print', data, errorback);
  },
}

export default TableApi;
