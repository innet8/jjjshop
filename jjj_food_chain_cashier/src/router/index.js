import { createRouter, createWebHashHistory } from 'vue-router';
import {
	setupPermissions
} from './permissions';
export const constantRoutes = [
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/',
		redirect: '/home',
		meta: {
			title: '登录'
		},
	},
	{
		path: '/home',
		name: 'Home',
		meta: {
			title: '管理台'
		},
		component: () => import('@/views/layout/main.vue'),
		children: [
			{
				path: '/home/index',
				name: 'HomeIndex',
				meta: {
					title: '收银',
					topTree: '/home'
				},
				component: () => import('@/views/home/index.vue'),
			}, 
			{
				path: '/table/index',
				name: 'table_index',
				meta: {
					title: '桌台'
				},
				component: () =>
					import('@/views/table/index.vue')
			},
			{
				path: '/order/index',
				name: 'orderIndex',
				meta: {
					title: '订单'
				},
				component: () =>
					import('@/views/order/index.vue')
			},
			{
				path: '/fonticon',
				name: 'Fonticon',
				meta: {
					title: '字体图标'
				},
				component: () =>
					import('@/views/help/Fonticon.vue')
			},
			{
				path: '/error',
				name: 'Page404',
				meta: {
					title: '错误页面'
				},
				component: () =>
					import('@/views/error-page/404.vue')
			}
		]
	},
];
const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
});
export function setupRouter(app) {
	setupPermissions(router);
	app.use(router);
	return router;
}

export default router;