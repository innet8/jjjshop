import {
	createApp
} from 'vue'
import router from "./router";
import "../static/css/app.css";
import "../static/css/common.css";
import { createPinia } from 'pinia'
import I18n from "./lang/index"
const pinia = createPinia();
import {
	setupRouter
} from "@/router";
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import filters from '@/filters/index.js'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(pinia)
app.use(I18n)
app.use(router)
window.$t = I18n.global.t
app.mount('#app')
app.config.globalProperties.$filter = filters;

setupRouter(app);
