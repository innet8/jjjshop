<template>
    <!--
        作者：luoyiming
        时间：2019-10-25
        描述：权限-管理员列表-修改管理员
    -->
    <el-dialog :title="$t('修改管理员')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <!--form表单-->
        <el-form size="small" ref="form" :model="form" label-position="top" :rules="formRules"
            :label-width="formLabelWidth">
            <el-form-item :label="$t('用户名')" prop="user_name"><el-input v-model="form.user_name"
                    :placeholder="$t('请输入用户名')"></el-input>
                <div class="tips">{{ $t('用户名4-16位纯数字') }}</div>
            </el-form-item>
            <el-form-item :label="$t('角色')" prop="role_id">
                <el-select v-model="form.role_id" :multiple="true" :placeholder="$t('请选择角色')">
                    <el-option v-for="item in roleList" :value="item.role_id" :key="item.role_id"
                        :label="item.role_name_h1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('登录密码')" prop="password"><el-input v-model="form.password" :placeholder="$t('请输入登录密码')"
                    type="password"></el-input>
                <div class="tips">{{ $t('密码4-16位纯数字') }}</div>
            </el-form-item>
            <el-form-item :label="$t('确认密码')" prop="confirm_password"><el-input v-model="form.confirm_password"
                    :placeholder="$t('请输入确认密码')" type="password"></el-input></el-form-item>
            <el-form-item :label="$t('姓名')" prop="real_name"><el-input v-model="form.real_name"
                    :placeholder="$t('请输入姓名')"></el-input></el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import AuthApi from '@/api/auth.js';
export default {
    data() {
        let validatePass2 = (rule, value, callback) => {
            if (value != this.form.password && this.form.password) {
                callback(new Error($t('两次密码不一致！')))
            } else {
                callback()
            }
        }
        return {
            /*左边长度*/
            formLabelWidth: '120px',
            /*是否显示*/
            loading: false,
            /*是否显示*/
            dialogVisible: false,
            /*form表单对象*/
            form: {
                password: '',
                confirm_password: '',
                access_id: []
            },
            /*当前角色*/
            access_id: [],
            /*角色对象*/
            roleList: [],
            /*form验证*/
            formRules: {
                user_name: [
                    {
                        required: true,
                        message: $t('请输入用户名'),
                        trigger: 'blur'
                    }
                ],
                role_id: [
                    {
                        required: true,
                        message: $t('请选择角色'),
                        trigger: 'blur'
                    }
                ],
                confirm_password: [
                    {
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ],
                real_name: [
                    {
                        required: true,
                        message: $t('请输入姓名'),
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    props: ['open', 'shop_user_id'],
    watch: {
        open: function (n, o) {
            if (n != o) {
                this.dialogVisible = this.open;
                this.getData();
            }
        }
    },
    created() { },
    methods: {

        /*获取数据*/
        getData() {
            let self = this;
            AuthApi.userEditInfo({
                shop_user_id: this.shop_user_id
            }).then(res => {
                self.loading = false;
                self.roleList = res.data.roleList;
                let obj = res.data.info;
                obj.access_id = res.data.role_arr;
                obj.password = '';
                self.form = obj;
                self.form.role_id = res.data.role_arr;
            })
                .catch(error => {
                    self.loading = false;
                });
        },

        /*修改*/
        onSubmit() {
            let self = this;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    let params = self.form;
                    AuthApi.userEdit(params, true)
                        .then(data => {
                            self.loading = false;
                            this.$ElMessage({
                                message: $t('保存成功'),
                                type: 'success'
                            });
                            self.dialogFormVisible(true);
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                }
            });


        },

        /*关闭弹窗*/
        dialogFormVisible(e) {
            this.form = {
                user_name: '',
                access_id: []
            }
            if (e) {
                this.$emit('close', {
                    type: 'success',
                    openDialog: false
                });
            } else {
                this.$emit('close', {
                    type: 'error',
                    openDialog: false
                });
            }
        }
    }
};
</script>


