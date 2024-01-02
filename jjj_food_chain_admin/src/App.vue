<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>
<script setup>
import {
    reactive,
    ref
} from 'vue';
import {
    ElConfigProvider
} from 'element-plus';
import { languageStore } from './store/model/language';
import zhCn from "element-plus/es/locale/lang/zh-cn";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import en from "element-plus/es/locale/lang/en";
const language = languageStore()
const languageNow = language.getLanguage().language
const locale = ref(zhCn) ;
if(languageNow.value == '简体'){
    locale.value = zhCn;
}
if(languageNow.value == '繁体'){
    locale.value = zhTw;
}
if(languageNow.value == 'English'){
    locale.value = en;
}
const state = reactive({});


</script>
<style lang="scss">
@import './assets/font/iconfont.css';

* {
    margin: 0;
    padding: 0;
    font-size: 12px;
}
</style>