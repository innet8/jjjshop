<template>
    <div class="right-content pr">

        <!--内容区域-->
        <div class="right-content-box">
            <div class="subject-wrap">
                <div class="main-div">
                    <childTabs></childTabs>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import childTabs from './childTabs.vue';
export default {
    components: {
        childTabs
    },
    data() {
        return {};
    },
    created() { },
    methods: {}
};
</script>

<style></style>
