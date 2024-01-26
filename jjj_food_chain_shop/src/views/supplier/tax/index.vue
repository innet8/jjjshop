<template >
    <div>
        <div class="supplier">
            <el-form size="small" ref="form" :model="form" label-position="top" :rules="formRules">
                <el-form-item :label="$t('消费税率')" prop="is_open">
                    <div>
                        <el-radio v-model="form.is_open" :label="'1'">{{ $t('开启') }}</el-radio>
                        <el-radio v-model="form.is_open" :label="'0'">{{ $t('关闭') }}</el-radio>
                    </div>
                </el-form-item>
                <el-form-item v-if="form.is_open == '1'" :label="$t('税率')" prop="tax_rate">
                    <el-input-number class="max-w460" :controls="false" :precision="2" :min="0" :max="100" :placeholder="$t('请输入')" v-model.number="form.tax_rate"></el-input-number>
                    <span>%</span>
                </el-form-item>
            </el-form>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button @click="getData" :loading="loading">{{ $t('重置') }}</el-button>
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
            </div>

        </div>
    </div>
</template>
<script>
import SettingApi from '@/api/setting.js';
export default {
    data() {
        return {
            loading: false,
            form: {
                is_open: '1',
                tax_rate: null,
            },
            formRules: {

                is_open: [{
                    required: true,
                    message: $t('请输入主货币单位'),
                    trigger: 'blur'
                }],
                tax_rate: [{
                    required: true,
                    message: $t('请输入税率'),
                    trigger: 'blur'
                }],
            },
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /*获取列表*/
        getData() {
            let self = this;
            SettingApi.getTaxRate({}, true)
                .then(data => {
                    self.loading = false;
                    self.form = data.data.vars.values;
                    self.form.tax_rate = Number(self.form.tax_rate)
                    self.form.is_open = data.data.vars.values.is_open.toString()
                })
                .catch(error => {

                });
        },
        onSubmit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    SettingApi.setTaxRate(params, true).then(data => {
                        self.loading = false;
                        ElMessage({
                            message: $t('保存成功'),
                            type: 'success'
                        });
                        self.dialogFormVisible(true);
                    }).catch(error => {
                        self.loading = false;
                    });
                }
            });

        },
    },
}
</script>
