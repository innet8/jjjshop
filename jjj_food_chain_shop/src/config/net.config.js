
var url = '/index.php';
if(localStorage.getItem('SHOP_BASIC_URL')){
    url = localStorage.getItem('SHOP_BASIC_URL') + url
}
export default {
	baseURL: process.env.NODE_ENV === 'development' ? '/api/index.php' : url,
	tokenName: 'token',
	strongToken: "jjjShopToken",
	renderMenu: "jjjShopRenderMenus",
	menu: "jjjShopMenus",
	isDev: process.env.NODE_ENV === 'development' ? true : false,
	contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
	requestTimeout: 50000,
	successCode: [200, 0, '200', '0'],
	statusName: 'code',
	messageName: 'msg',
	withCredentials: false,
	responseType: 'json',
    currency: 'currency',
};