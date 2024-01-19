<template >
    <div>
        锁屏
        <button @click="Unlock">解锁</button>
    </div>
</template>
<script setup>
import { useLockscreenStore } from "@/store/model/lockscreen.js"
import { useRouter } from "vue-router";
const useLockscreen = useLockscreenStore();
const router = useRouter();
const Unlock = ()=>{
    useLockscreen.setLock(false);
    router.push('/home')
}
</script>
