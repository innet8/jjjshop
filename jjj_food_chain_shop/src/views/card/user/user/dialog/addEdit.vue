<template >
    <el-dialog :title="title" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" ref="form" :model="form" label-position="top">
            <!--店员修改-->
            <el-form-item :label="$t('昵称')" prop="nick_name">
                <el-input class="percent-w100" v-model="form.nick_name" :placeholder="$t('请输入昵称')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('性别')">
                <el-radio-group v-model="form.gender">
                    <el-radio :label="1">{{ $t('男') }}</el-radio>
                    <el-radio :label="0">{{ $t('女') }}</el-radio>
                    <el-radio :label="2">{{ $t('保密') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('等级')">
                <el-select class="percent-w100" v-model="form.grade_id" :placeholder="$t('请选择等级')">
                    <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name"
                        :value="item.grade_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('手机号')" prop="mobile">
                <el-input class="percent-w100" v-model="form.mobile" :placeholder="$t('请输入手机号')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('密码')" prop="password" >
                <el-input class="percent-w100" type="password" v-model="form.password" :placeholder="$t('请输入密码')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('生日')">
                <el-date-picker class="percent-w100" v-model="form.birthday" type="date"
                    value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button size="small" type="info" @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
import UserApi from '@/api/user.js';
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                nick_name: '',
                gender: '',
                mobile: '',
                grade_id: 1,
                password: '',
                birthday: '',
            },
            loading: false,
        };
    },
    props: ['open', 'editform', 'title', 'gradeList', 'editData'],
    created() {
        this.dialogVisible = this.open;
        if (this.editData) {
            this.form = JSON.parse(JSON.stringify(this.editData));
            this.form.nick_name = this.editData.nickName
        }
    },
    methods: {
        onSubmit() {
            let self = this;
            if (self.editData) {
                let params = {};
                params.user_id = self.form.user_id
                params.nick_name = self.form.nick_name
                params.gender = self.form.gender
                params.grade_id = self.form.grade_id
                params.mobile = self.form.mobile
                params.password = self.form.password
                params.birthday = self.form.birthday
                self.$refs.form.validate((valid) => {
                    if (valid) {
                        self.loading = true;
                        UserApi.edituser(params, true).then(data => {
                            self.loading = false;
                            ElMessage({
                                message: '编辑成功',
                                type: 'success'
                            });
                            self.dialogFormVisible(1);
                        }).catch(error => {
                            self.loading = false;
                        });
                    }
                });
            } else {
                let params = self.form;
                self.$refs.form.validate((valid) => {
                    if (valid) {
                        self.loading = true;
                        UserApi.adduser(params, true).then(data => {
                            self.loading = false;
                            ElMessage({
                                message: '添加成功',
                                type: 'success'
                            });
                            self.dialogFormVisible(1);
                        }).catch(error => {
                            self.loading = false;
                        });
                    }
                });
            }

        },

        /*关闭弹窗*/
        dialogFormVisible(e) {
            this.$emit('closeDialog', e)
        },
    },
}
</script>
