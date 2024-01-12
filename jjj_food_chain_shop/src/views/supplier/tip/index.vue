<template >
    <div class="supplier">
        <el-form size="small" ref="form" :model="form" label-position="top" :rules="formRules">
            <el-form-item :label="$t('服务费')" prop="serve_open">
                <div>
                    <el-radio v-model="form.serve_open" :label="'1'">{{ $t('开启') }}</el-radio>
                    <el-radio v-model="form.serve_open" :label="'0'">{{ $t('关闭') }}</el-radio>
                </div>
            </el-form-item>
            <el-form-item v-if="form.serve_open == '1'" :label="$t('金额')" prop="serve">
                <el-input class="max-w460" v-model="form.serve" placeholder="请输入" maxLength="50">
                    <template #append>{{ $t('元') }}</template>
                </el-input>
            </el-form-item>
        </el-form>
        <!--提交-->
        <div class="common-button-wrapper">
            <el-button @click="" :loading="loading">{{ $t('重置') }}</el-button>
            <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            form: {
                serve_open: '1',
                serve: '',
            },
            formRules: {

                serve_open: [{
                    required: true,
                    message: $t('请输入主货币单位'),
                    trigger: 'blur'
                }],
                serve: [{
                    required: true,
                    message: $t('请输入金额'),
                    trigger: 'blur'
                }],
            },
        }
    },
}
</script>
<style lang="">
    
</style>