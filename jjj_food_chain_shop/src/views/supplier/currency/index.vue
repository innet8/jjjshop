<template >
    <div class="supplier">
        <el-form size="small" ref="form" :model="form" label-position="top" :rules="formRules">
            <el-form-item :label="$t('主货币单位')" prop="unit">
                <el-input class="max-w460" v-model="form.unit" :maxlength="50" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="$t('副货币单位')" prop="is_open">
                <div>
                    <el-radio v-model="form.is_open" label="1">{{ $t('开启') }}</el-radio>
                    <el-radio v-model="form.is_open" label="0">{{ $t('关闭') }}</el-radio>
                </div>
            </el-form-item>
            <el-form-item v-if="form.is_open == '1'" :label="$t('副货币单位')" prop="vice_unit">
                <el-input class="max-w460" v-model="form.vice_unit" :placeholder="$t('请输入')" maxLength="50"></el-input>
            </el-form-item>
            <el-form-item v-if="form.is_open == '1'" :label="$t('副货币汇率')" prop="unit_rate">
                <el-input-number class="max-w460" :controls="false" :precision="4" :min="0" 
                    :placeholder="$t('请输入')" v-model.number="form.unit_rate"></el-input-number>
            </el-form-item>
        </el-form>
        <!--提交-->
        <div class="common-button-wrapper">
            <el-button @click="getData" :loading="loading">{{ $t('重置') }}</el-button>
            <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>

    </div>
</template>
<script>
import SettingApi from '@/api/setting.js';
import { nextTick } from 'vue';
export default {
    data() {
        return {
            loading: false,
            form: {
                unit: '',
                is_open: '1',
                vice_unit: '',
                unit_rate: null,
            },
            formRules: {
                unit: [{
                    required: true,
                    message: $t('请输入主货币单位'),
                    trigger: 'blur'
                }],
                is_open: [{
                    required: true,
                    message: $t('请输入主货币单位'),
                    trigger: 'blur'
                }],
                vice_unit: [{
                    required: true,
                    message: $t('请输入副货币单位'),
                    trigger: 'blur'
                }],
                unit_rate: [{
                    required: true,
                    message: $t('请输入货币汇率'),
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
            SettingApi.getCurrencyUnit({}, true)
                .then(data => {
                    self.loading = false;
                    self.form = data.data.vars.values;
                    self.form.unit_rate = Number(self.form.unit_rate)
                    self.form.is_open = data.data.vars.values.is_open.toString()
                    nextTick(() => {
                        self.$refs.form.validate()
                    })
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
                    SettingApi.setCurrencyUnit(params, true).then(data => {
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
            })

        },
    },
}
</script>
