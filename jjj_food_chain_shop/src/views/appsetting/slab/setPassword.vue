<template>
    <el-dialog class="" @close="handleClose" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="$t('设置平板密码')">
        <el-form size="small" ref="form" :model="form" label-position="top" :rules="rules">
            <!-- <el-form-item v-if="have" :label="$t('原密码')" prop="advanced_password"
                :rules="[{ required: true, message: $t('请输入原密码') }]">
                <el-input type="password" v-model="form.advanced_password"></el-input>
            </el-form-item> -->
            <el-form-item :label="have ? $t('新密码') : $t('密码')" prop="new_advanced_password" >
                <el-input v-model="form.new_advanced_password" type="password"></el-input>
                <div class="tips">{{ $t('密码必须是4-8位的数字') }}</div>
            </el-form-item>
            <el-form-item :label="$t('确认密码')" prop="confirm_advanced_password" >
                <el-input v-model="form.confirm_advanced_password" type="password"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import Terminal from '@/api/terminal.js';
export default {
    props: ['open', 'advancedPassword'],
    created() {
        this.dialogVisible = this.open;
        this.have = this.advancedPassword;
    },
    data() {
        let validatePass1 = (rule, value, callback) => {
            if (!value) {
                callback(new Error($t('请输入密码')))
            } else if (value.length < 4 ||  value.length > 8  || !(/^\d+$/.test(value))  ) {
                callback(new Error($t('密码必须是4-8位的数字')))
            } else {
                callback()
            }
        }
        let validatePass2 = (rule, value, callback) => {
            if (!value) {
                callback(new Error($t('请输入确认密码')))
            } else if (value !== this.form.new_advanced_password) {
                callback(new Error($t('两次密码不一致！')))
            } else {
                callback()
            }
        }

        return {
            isProductUpload: false,
            loading: false,
            form: {
                new_advanced_password: "",
                confirm_advanced_password: "",
                advanced_password: "",
            },
            have: false,
            rules: {
                new_advanced_password: [{  required: true,validator: validatePass1, trigger: 'blur' }],
                confirm_advanced_password: [{  required: true,validator: validatePass2, trigger: 'blur' }],
            },
        }
    },
    methods: {

        onSubmit() {
            let self = this;
            let form = self.form;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    Terminal.editAdvancedPassword(form, true)
                        .then(data => {
                            self.loading = false;
                            ElMessage({
                                message: $t('修改成功'),
                                type: 'success'
                            });
                            this.$emit('close',1)

                        }).catch(error => {
                            self.loading = false;
                        });
                }
            });
        },

        handleClose() {
            this.$emit('close')
        },
    },
}
</script>
