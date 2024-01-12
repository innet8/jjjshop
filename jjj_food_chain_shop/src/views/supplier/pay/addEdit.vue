<template >
    <el-dialog class="" @close="handleClose" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="title">
    </el-dialog>
</template>
<script>
export default {
    props: ['title','open'],
    created() {
        this.dialogVisible = this.open
        this.getData();
    },
    data() {
        return {}
    },

}
</script>
<style lang="">
    
</style>