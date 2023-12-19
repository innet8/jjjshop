import { defineStore } from 'pinia';
import { setCookie, getCookie, delCookie, setSessionStorage, getSessionStorage, deleteSessionStorage } from '@/utils/base.js';
import configObj from "@/config";  
import { info } from 'sass';
let { strongToken } = configObj;
export const useUserStore = defineStore('main', {
	state: () => {
		return {
			token: getSessionStorage(strongToken),
			userInfo: getSessionStorage('userInfo'),
			list: {},
			memberInfo: getSessionStorage('menber'),
		};
	},
	getters: {},
	actions: {
		bus_on(name, fn) {
			let self = this;
			self.list[name] = self.list[name] || [];
			self.list[name].push(fn);
		},
		// 发布
		bus_emit(name, data) {
			let self = this;
			if (self.list[name]) {
				self.list[name].forEach((fn) => {
					fn(data);
				});
			}
		},
		// 取消订阅
		bus_off(name) {
			let self = this;
			if (self.list[name]) {
				delete self.list[name];
			}
		},
		/**
		 * @description 设置会员
		 * @param {*}
		 */
		setMember(info){
			console.log("info",info)
			this.memberInfo = info;
			setSessionStorage('menber',info);
		},
		/**
		 * @description 删除会员
		 * @param {*}
		 */
		removeMember(){
			deleteSessionStorage('menber')
			this.memberInfo = null;
		},
		/**
		 * @description 登录
		 * @param {*} token
		 */
		async afterLogin(info) {
			this.userInfo = this.userInfo || {};
			const { data: { account, app_id, cashier_id, mobile, name, shop_supplier_id, token, user_name} } = info;
			this.userInfo.userName = user_name;
			this.userInfo.account = account;
			this.userInfo.AppID = app_id;
			this.userInfo.cashier_id = cashier_id;
			this.userInfo.mobile = mobile;
			this.userInfo.name = name;
			this.userInfo.shop_supplier_id = shop_supplier_id;
			this.token = token;
			setSessionStorage(strongToken,token);
			setSessionStorage('userInfo',this.userInfo);
		},
		/**
		 * @description 退出登录
		 * @param {*} token
		 */
		afterLogout() {
			delCookie();
			sessionStorage.clear();
			this.token = null;
			this.menus = null;
			this.userInfo = null;
			setSessionStorage('userInfo',null);
		},
	}
});
export default useUserStore;