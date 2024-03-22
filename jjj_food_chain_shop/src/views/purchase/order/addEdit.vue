<template>
    <div class="purchase-box">
        <el-form size="small" ref="form" class="purchase-form" :model="form" label-position="top" label-width="180px">
            <div class="purchase-form-flex" ref="formContainer">
                <!-- 基础设置 -->
                <basics></basics>
                <!-- 采购明细 -->
                <detail @check="check"></detail>
            </div>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button size="small" @click="cancelFunc">{{ $t('取消') }}</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import basics from './components/basics.vue';
import detail from './components/detail.vue'
export default {
    components:{
        basics,
        detail
    },
    data(){
        return{
            form:{
                applicant:"",
                time:"",
                way:1,
                select_list:[],
            },
        }
    },
    provide: function () {
        return {
            form: this.form
        }
    },
    methods:{
        check(){
            this.$refs.form.validateField('select_list');
        },

        onSubmit(){

        },

        cancelFunc(){
            this.$router.push('/purchase/order/index');
        },
    },
}
</script>
<style scoped>
.purchase-box {
    height: calc(100% - 14px);
    overflow: hidden;
}

.purchase-form {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .purchase-form-flex {
        flex: 1 1 auto;
        overflow-y: auto;
    }

    .common-button-wrapper {
        flex: 0 0 auto;
        flex-shrink: 0;
    }

    :deep(.el-select__placeholder) {
        font-size: 14px;
    }
}
</style>