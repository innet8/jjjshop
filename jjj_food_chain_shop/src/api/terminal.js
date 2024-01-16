import request from '@/utils/request'

let Terminal = {
    /*获取收银机设置*/
    getTerminal(data, errorback) {
        return request._get('/shop/setting.Terminal/cashier', data, errorback);
    },
    /*设置收银机设置*/
    saveTerminal(data, errorback) {
        return request._post('/shop/setting.Terminal/cashier', data, errorback);
    },
}
export default Terminal;