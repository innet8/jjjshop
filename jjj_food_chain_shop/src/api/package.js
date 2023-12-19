import request from '@/utils/request'

let PackageApi = {
  /*保存券包*/
  getPackage(data, errorback) {
    return request._get('/shop/plus.package/add', data, errorback);
  },
  /*保存券包*/
  savePackage(data, errorback) {
    return request._post('/shop/plus.package/add', data, errorback);
  },
  /*获取数据*/
  getData(data, errorback) {
    return request._post('/shop/plus.package/detail', data, errorback);
  },
  /*保存礼包*/
  EditPackage(data, errorback) {
    return request._post('/shop/plus.package/edit', data, errorback);
  },
  /*列表*/
  packageList(data, errorback) {
    return request._post('/shop/plus.package/index', data, errorback);
  },
  /*发布礼包*/
  send(data, errorback) {
    return request._post('/shop/plus.package/send', data, errorback);
  },
  /*终止礼包*/
  end(data, errorback) {
    return request._post('/shop/plus.package/end', data, errorback);
  },
  /*删除*/
  delpackage(data, errorback) {
    return request._post('/shop/plus.package/delete', data, errorback);
  },
  /*订单*/
  orderlist(data, errorback) {
    return request._post('/shop/plus.package/orderlist', data, errorback);
  },
}

export default PackageApi;
