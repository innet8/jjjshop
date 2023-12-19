import request from '@/utils/request'

let AccessApi = {
  /*商城列表*/
  shopList(data, errorback) {
    return request._post('/cashier/shop/index', data, errorback);
  },
  /*添加商城*/
  addShop(data, errorback) {
    return request._post('/cashier/shop/add', data, errorback);
  },
  /*修改商城*/
  editShop(data, errorback) {
    return request._post('/cashier/shop/edit', data, errorback);
  },
  /*启用商城*/
  updateStatus(data, errorback) {
    return request._post('/cashier/shop/updateStatus', data, errorback);
  },
  /*进入商城*/
  storeEnter(data, errorback) {
    return request._post('/cashier/shop/enter', data, errorback);
  },
  /*删除商城*/
  deleteShop(data, errorback) {
    return request._post('/cashier/shop/delete', data, errorback);
  },
}

export default AccessApi;
