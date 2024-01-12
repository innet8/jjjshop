<template >
    <div class="supplier">
        <el-form size="small" ref="form" :model="form" label-position="top" :rules="formRules">
            <el-form-item :label="$t('主货币单位')" prop="currency">
                <el-input class="max-w460" v-model="form.currency" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="$t('副货币单位')" prop="subcurrency_open">
                <div>
                    <el-radio v-model="form.subcurrency_open" :label="'1'">开启</el-radio>
                    <el-radio v-model="form.subcurrency_open" :label="'0'">关闭</el-radio>
                </div>
            </el-form-item>
            <el-form-item v-if="form.subcurrency_open == '1'" :label="$t('副货币单位')" prop="subcurrency">
                <el-input class="max-w460" v-model="form.subcurrency" placeholder="请输入" maxLength="50"></el-input>
            </el-form-item>
            <el-form-item v-if="form.subcurrency_open == '1'" :label="$t('副货币汇率')" prop="rate">
                <el-input class="max-w460" v-model="form.rate" placeholder="请输入" type="number" maxLength="50"></el-input>
            </el-form-item>
        </el-form>
        <!--提交-->
        <div class="common-button-wrapper">
            <el-button  @click="" :loading="loading">{{ $t('重置') }}</el-button>
            <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            loading:false,
            form: {
                currency: '',
                subcurrency_open: '1',
                subcurrency: '',
                rate: '',
            },
            formRules: {
                currency: [{
                    required: true,
                    message: $t('请输入主货币单位'),
                    trigger: 'blur'
                }],
                subcurrency_open: [{
                    required: true,
                    message: $t('请输入主货币单位'),
                    trigger: 'blur'
                }],
                subcurrency: [{
                    required: true,
                    message: $t('请输入副货币单位'),
                    trigger: 'blur'
                }],
                rate: [{
                    required: true,
                    message: $t('请输入货币汇率'),
                    trigger: 'blur'
                }],
            },
        }
    },
}
</script>
<style lang="">
    
</style>