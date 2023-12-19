import request from '@/utils/request'

let InvitationGiftApi = {
  /*添加邀请有礼*/
  addInvitation(data, errorback) {
    return request._post('/shop/plus.invitation.active/add', data, errorback);
  },
  /*编辑邀请有礼*/
  editInvitation(data, errorback) {
    return request._post('/shop/plus.invitation.active/edit', data, errorback);
  },
  /*列表*/
  InvitationList(data, errorback) {
    return request._post('/shop/plus.invitation.active/lists', data, errorback);
  },
  /*发布*/
  send(data, errorback) {
    return request._post('/shop/plus.invitation.active/send', data, errorback);
  },
  /*终止*/
  end(data, errorback) {
    return request._post('/shop/plus.invitation.active/end', data, errorback);
  },
  /*删除*/
  del(data, errorback) {
    return request._post('/shop/plus.invitation.active/delete', data, errorback);
  },
  /*获取数据*/
  getInvitation(data, errorback) {
    return request._get('/shop/plus.invitation.active/edit', data, errorback);
  },
  /*推广二维码*/
  qrcode(data, errorback) {
      return request._post('/shop/plus.invitation.active/qrcode', data, errorback);
  },
  /*推广二维码*/
  partakelist(data, errorback) {
      return request._post('/shop/plus.invitation.active/partake', data, errorback);
  },
  /*礼品记录*/
  receivelist(data, errorback) {
      return request._post('/shop/plus.invitation.active/receive', data, errorback);
  },
}

export default InvitationGiftApi;
