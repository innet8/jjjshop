import request from '@/utils/request'

let UserApi = {
  /*用户登录*/
  login(data, errorback) {
    return request._post('/cashier/passport/login', data, errorback);
  },
  /*修改密码*/
  editPassword(data, errorback) {
    return request._post('/cashier/admin.user/renew', data, errorback);
  },
  /*退出登录*/
  loginOut(data, errorback) {
    return request._post('/cashier/passport/logout', data, errorback);
  },
  /*获取版本*/
  getVersion(data, errorback) {
    return request._post('/cashier/index/index', data, errorback);
  },
  /*获取版本*/
  getMenber(data, errorback) {
    return request._post('/cashier/user.User/index', data, errorback);
  },
}

export default UserApi;
