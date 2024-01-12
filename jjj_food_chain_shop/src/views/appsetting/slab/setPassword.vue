<template>
    <el-dialog class="" @close="handleClose" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="$t('设置钱箱密码')">
        <el-form size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('原密碼')" prop="password" :rules="[{ required: true, message: $t('请输入原密碼') }]">
                <el-input v-model="form.oldPassword"></el-input>
            </el-form-item>
            <el-form-item :label="$t('密碼')" prop="password" :rules="[{ required: true, message: $t('请输入密码') }]">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('确认密碼')" prop="newPassword" :rules="[{ required: true, message: $t('请输入确认密碼') }]">
                <el-input v-model="form.newPassword"></el-input>
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
export default {
    props: [ 'open'],
    created() {
        this.dialogVisible = this.open
    },
    data() {
        return {
            isProductUpload: false,
            loading: false,
            form: {
                password: "",
                newPassword: "",
                oldPassword: "",
            },
        }
    },
    methods: {
        onSubmit() {
            let self = this;
            let form = self.form;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    // self.loading = true;
                    // SettingApi.addPrinter(form, true)
                    //     .then(data => {
                    //         self.loading = false;
                    //         ElMessage({
                    //             message: '恭喜你，添加成功',
                    //             type: 'success'
                    //         });
                    //         this.$emit('close',1)

                    //     }).catch(error => {
                    //         self.loading = false;
                    //     });
                }
            });
        },

        handleClose() {
            this.$emit('close')
        },
    },
}
</script>
<style lang="">
    
</style>