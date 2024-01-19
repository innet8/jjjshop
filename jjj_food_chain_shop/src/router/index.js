import { createRouter, createWebHashHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import {
	setupPermissions
} from './permissions';
const Login = defineAsyncComponent(() => import('@/views/login/index.vue'))
const Home = defineAsyncComponent(() => import('@/views/layout/main.vue'))
const HomeIndex = defineAsyncComponent(() => import('@/views/home/home.vue'))

export const constantRoutes = [{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: Login,
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
		component: Home,
		children: [
			{
				path: '/home',
				name: 'HomeIndex',
				meta: {
					title: '首页',
					topTree: '/home'
				},
				component: HomeIndex,
			}, 
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