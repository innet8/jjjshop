/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
// import { computed } from 'vue'
import { useUserStore } from '@/store';
import dealWithRoute from './dealWithRoute.js';
// import { useLockscreenStore } from "@/store/model/lockscreen"
export async function setupPermissions(router) {
	const { bus_emit } = useUserStore();
    // const useLockscreen = useLockscreenStore();
    // const isLock = computed(() => useLockscreen.isLock);

	let load = 0;
	router.beforeEach(async (to, from, next) => {
		bus_emit('MenuName', to.meta && to.meta.title);
		const { token, menus } = useUserStore();
		const whiteList = ['/login'];
		if (!token) {
			if (whiteList.includes(to.path)) {
				next();
				return;
			}
			next('/login');
		} else {
			if (to.path == '/login') {
				next({
					path: '/home'
				});
				return;
			}
            // if(isLock.value && to.path != '/lockscreen'){
            //     next({
			// 		path: '/lockscreen'
			// 	});
			// 	return;
            // }
            // if(!isLock.value && to.path == '/lockscreen'){
            //     next({
			// 		path: '/home'
			// 	});
			// 	return;
            // }
			if (menus && load == 0) {
				load++;
				dealWithRoute(menus);
				next({
					...to,
					replace: true
				});
				return;
			}
			next();
		}
	});

}