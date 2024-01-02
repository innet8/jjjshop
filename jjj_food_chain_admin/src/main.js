import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
import { setupRouter } from '@/router';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import filters from '@/filters/index'
import I18n from "./lang/index";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.config.globalProperties.$filter = filters;
app.use(I18n)
app.use(pinia);
app.use(router);
app.mount('#app');
setupRouter(app);
