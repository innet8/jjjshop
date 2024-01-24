<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>
<script setup>
import {
    ref,
    reactive,
    computed,
    onMounted,
    onUnmounted,
} from 'vue';
import {
    ElConfigProvider
} from 'element-plus';
import { useRoute ,useRouter } from 'vue-router';
// import { useLockscreenStore } from "../src/store/model/lockscreen"
import { languageStore } from './store/model/language';

import zhCn from "element-plus/es/locale/lang/zh-cn";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import en from "element-plus/es/locale/lang/en";
import th from "element-plus/es/locale/lang/th";

// const useLockscreen = useLockscreenStore();
// const isLock = computed(() => useLockscreen.isLock);
// const lockTime = computed(() => useLockscreen.lockTime);
const language = languageStore().language

const route = useRoute();
const router = useRouter();
const locale = ref(zhCn) ;
if(language == 'zh'){
    locale.value = zhCn;
}
if(language == 'zhtw'){
    locale.value = zhTw;
}
if(language == 'en'){
    locale.value = en;
}
if(language == 'th'){
    locale.value = th;
}
const state = reactive({});
// let timer;
// const timekeeping = () => {
//     clearInterval(timer);
//     if (route.name == 'login' || isLock.value) return;
//     // 设置不锁屏
//     useLockscreen.setLock(false);
//     // 重置锁屏时间
//     useLockscreen.setLockTime();
//     timer = setInterval(() => {
//         // 锁屏倒计时递减
//         useLockscreen.setLockTime(lockTime.value - 1);
//         if (lockTime.value <= 0) {
//             // 设置锁屏
//             useLockscreen.setLock(true);
//             router.push('/lockscreen')
//             return clearInterval(timer);
//         }
//     }, 1000);
// };

onMounted(() => {
    
});

onUnmounted(() => {

});

</script>
<style lang="scss">
@import '@/assets/font/iconfont.css';
@import '@/assets/font/myIcon.css';
@import '@/styles/diy.scss';

* {
    margin: 0;
    padding: 0;
}

.common-level-rail {
    text-align: right;
    &.flex{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }
}

.common-seach-wrap {
    &.flex {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }
}
</style>