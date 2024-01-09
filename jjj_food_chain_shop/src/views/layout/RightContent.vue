<template>
    <div class="right-content pr">

        <!--内容区域-->
        <div class="right-content-box">
            <div class="subject-wrap">
                <div class="main-div">
                    <ChildTabs></ChildTabs>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChildTabs from '@/views/layout/ChildTabs.vue';
export default {
    components: {
        ChildTabs
    },
    data() {
        return {};
    },
    created() { },
    methods: {}
};
</script>

<style></style>
