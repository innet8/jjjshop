<template >
    <div>
        <div class="supplier">
        <el-form size="small" ref="form" :model="form" label-position="top" :rules="formRules">
            <el-form-item :label="$t('消费税率')" prop="tax_open">
                <div>
                    <el-radio v-model="form.tax_open" :label="'1'">{{ $t('开启') }}</el-radio>
                    <el-radio v-model="form.tax_open" :label="'0'">{{ $t('关闭') }}</el-radio>
                </div>
            </el-form-item>
            <el-form-item v-if="form.tax_open == '1'" :label="$t('税率')" prop="tax">
                <el-input class="max-w460" v-model="form.tax" placeholder="请输入" maxLength="50">
                    <template #append>%</template>

                </el-input>
            </el-form-item>
        </el-form>
        <!--提交-->
        <div class="common-button-wrapper">
            <el-button  @click="" :loading="loading">{{ $t('重置') }}</el-button>
            <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>

    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading:false,
            form: {
                tax_open: '1',
                tax: '',
            },
            formRules: {

                tax_open: [{
                    required: true,
                    message: $t('请输入主货币单位'),
                    trigger: 'blur'
                }],
                tax: [{
                    required: true,
                    message: $t('请输入税率'),
                    trigger: 'blur'
                }],
            },
        }
    },
}
</script>
<style lang="">
    
</style>