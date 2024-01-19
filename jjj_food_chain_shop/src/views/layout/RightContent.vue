<template>
    <div class="right-content pr">

        <!--内容区域-->
        <div class="right-content-box">
            <div class="subject-wrap">
                <div :class=" route.path=='/home' ? 'home-div' :'main-div'">
                    <ChildTabs></ChildTabs>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ChildTabs from '@/views/layout/ChildTabs.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

