<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>
<script setup>
import {
    reactive,
    computed,
    onMounted,
    onUnmounted,
} from 'vue';
import {
    ElConfigProvider
} from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useRoute ,useRouter } from 'vue-router';
import { useLockscreenStore } from "../src/store/model/lockscreen"

const useLockscreen = useLockscreenStore();
const isLock = computed(() => useLockscreen.isLock);
const lockTime = computed(() => useLockscreen.lockTime);

const route = useRoute();
const router = useRouter();
let locale = zhCn;
const state = reactive({});
let timer;
const timekeeping = () => {
    clearInterval(timer);
    if (route.name == 'login' || isLock.value) return;
    // 设置不锁屏
    useLockscreen.setLock(false);
    // 重置锁屏时间
    useLockscreen.setLockTime();
    timer = setInterval(() => {
        // 锁屏倒计时递减
        useLockscreen.setLockTime(lockTime.value - 1);
        if (lockTime.value <= 0) {
            // 设置锁屏
            useLockscreen.setLock(true);
            router.push('/lockscreen')
            return clearInterval(timer);
        }
    }, 1000);
};

onMounted(() => {
    document.addEventListener('mousedown', timekeeping);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', timekeeping);
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
</style>