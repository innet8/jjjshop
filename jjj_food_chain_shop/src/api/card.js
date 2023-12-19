import request from '@/utils/request'

let CardApi = {
  /*会员卡列表*/
  cardlist(data, errorback) {
    return request._post('/shop/card.card/index', data, errorback);
  },
  /*添加会员卡*/
  getBaseData(data, errorback) {
    return request._get('/shop/card.card/add', data, errorback);
  },
  /*添加会员卡*/
  addcard(data, errorback) {
    return request._post('/shop/card.card/add', data, errorback);
  },
  /*修改会员卡*/
  getEditData(data, errorback) {
    return request._get('/shop/card.card/edit', data, errorback);
  },
  /*修改会员卡*/
  editcard(data, errorback) {
    return request._post('/shop/card.card/edit', data, errorback);
  },
  /*删除会员卡*/
  deletecard(data, errorback) {
    return request._post('/shop/card.card/delete', data, errorback);
  },
  /*会员卡类型列表*/
  cardtypelist(data, errorback) {
    return request._post('/shop/card.CardType/index', data, errorback);
  },
  /*添加类型*/
  addcardtype(data, errorback) {
    return request._post('/shop/card.CardType/add', data, errorback);
  },
  /*修改类型*/
  editcardtype(data, errorback) {
    return request._post('/shop/card.CardType/edit', data, errorback);
  },
  /*删除类型*/
  deletecardtype(data, errorback) {
    return request._post('/shop/card.CardType/delete', data, errorback);
  },
  /*会员卡领取列表*/
  recordlist(data, errorback) {
    return request._post('/shop/card.card/record', data, errorback);
  },
  /*会员卡领取列表*/
  deleterecordlist(data, errorback) {
    return request._post('/shop/card.card/deleterecord', data, errorback);
  },
  /*发卡*/
  putcard(data, errorback) {
    return request._post('/shop/card.card/put', data, errorback);
  },
  /*延期*/
  delay(data, errorback) {
    return request._post('/shop/card.card/delay', data, errorback);
  },
  cancelcard(data, errorback) {
    return request._post('/shop/card.card/cancel', data, errorback);
  },
}

export default CardApi;
