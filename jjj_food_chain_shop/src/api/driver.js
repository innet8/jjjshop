import request from '@/utils/request'

let DriverApi = {
  /*入驻申请列表*/
  applyList(data, errorback) {
    return request._post('/shop/plus.driver.apply/index', data, errorback);
  },
  /*配送员审核*/
  editApply(data, errorback) {
    return request._post('/shop/plus.driver.apply/edit', data, errorback);
  },
  /*配送员列表*/
  driverList(data, errorback) {
    return request._post('/shop/plus.driver.user/index', data, errorback);
  },
  /*修改配送员*/
  driverUserEdit(data, errorback) {
    return request._post('/shop/plus.driver.user/edit', data, errorback);
  },
  /*删除配送员*/
  deletedriver(data, errorback) {
    return request._post('/shop/plus.driver.user/delete', data, errorback);
  },
  /*配送员订单*/
  driverOrder(data, errorback) {
    return request._post('/shop/plus.driver.order/index', data, errorback);
  },
  /*提现申请*/
  cash(data, errorback) {
    return request._post('/shop/plus.driver.cash/index', data, errorback);
  },
  /*配送员提现审核*/
  cashSubmit(data, errorback) {
    return request._post('/shop/plus.driver.cash/submit', data, errorback);
  },
  /*微信打款*/
  WxPay(data, errorback) {
    return request._post('/shop/plus.driver.cash/wechat_pay', data, errorback);
  },
  /*配送员确认打款*/
  money(data, errorback) {
    return request._post('/shop/plus.driver.cash/money', data, errorback);
  },
  /*配送员设置*/
  driverSet(data, errorback) {
    return request._post('/shop/plus.driver.setting/index', data, errorback);
  },
  /*配送员设置-基础设置*/
  basic(data, errorback) {
    return request._post('/shop/plus.driver.setting/basic', data, errorback);
  },
  /*配送员设置-配送员条件*/
  condition(data, errorback) {
    return request._post('/shop/plus.driver.setting/condition', data, errorback);
  },
  /*配送员设置-配送员设置*/
  settlement(data, errorback) {
    return request._post('/shop/plus.driver.setting/settlement', data, errorback);
  },
  /*退出申请列表*/
  refundList(data, errorback) {
    return request._post('/shop/plus.driver.apply/refund', data, errorback);
  },
  /*退出审核*/
  editrefundStatus(data, errorback) {
    return request._post('/shop/plus.driver.apply/refundStatus', data, errorback);
  },
}

export default DriverApi;
