<template >
        <div class="setting">
        <el-form size="small" ref="form" :model="form" label-position="top" :rules="formRules">
            <el-form-item :label="$t('Token')" prop="token">
                <el-input class="max-w460" v-model="form.token" :placeholder="$t('请输入云端Token')"></el-input>
            </el-form-item>
        </el-form>
        <!--提交-->
        <div class="common-button-wrapper">
            <el-button  @click="" type="info" :loading="loading">{{ $t('重置') }}</el-button>
            <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false,
            form:{
                token:'',
            },
            formRules: {
                token: [{
                    required: true,
                    message: $t('请输入Token'),
                    trigger: 'blur'
                }],

            },
        }
    },
}
</script>
<style lang="">
    
</style>