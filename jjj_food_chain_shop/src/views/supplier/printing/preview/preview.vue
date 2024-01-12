<template >
    <el-dialog class="product-add" @close="handleClose" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="$t('')">

    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialogVisible:false
        }
    },
    props:['open'],
    created(){
        this.dialogVisible = this.open
    },
}
</script>
<style lang="">
    
</style>