<template>
  <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：区域-修改
    -->
  <el-dialog title="添加类型" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
      <el-form-item label="姓名" prop="user_name" :label-width="formLabelWidth">
        <el-input v-model="form.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
        <el-input type="number" v-model.number="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="account" :label-width="formLabelWidth">
        <el-input type="text" v-model="form.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.status" :label="1">开启</el-radio>
          <el-radio v-model="form.status" :label="0">禁用</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="登录密码" prop="password" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.confirm_password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="addUser" :loading="loading">确 定</el-button>
    </div>
    </template>
  </el-dialog>
</template>

<script>
  import CashierApi from '@/api/cashier.js';
  export default {
    components: {},
    data() {
      return {
        form: {
          cashier_id: 0,
          user_name: '',
          mobile: '',
          account: '',
          password: '',
          status: '',
        },
        file_path: '',
        formRules: {
          user_name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          mobile: [{
            required: true,
            message: '请输入联系方式',
            trigger: 'blur'
          }],
          account: [{
            required: true,
            message: '请输入登录账号',
            trigger: 'blur'
          }],
        },
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        loading: false,
        /*是否上传图片*/
        isupload: false,
      };
    },
    props: ['open_edit', 'editform'],
    created() {
      this.dialogVisible = this.open_edit;
      this.form.cashier_id = this.editform.model.cashier_id;
      this.form.user_name = this.editform.model.user_name;
      this.form.mobile = this.editform.model.mobile;
      this.form.account = this.editform.model.account;
      this.form.status = this.editform.model.status;
    },
    methods: {
      /*修改用户*/
      addUser() {
        let self = this;
        let params = self.form;
        if (!/^1[3456789]\d{9}$/.test(params.mobile)) {
          this.$ElMessage({
            message: '请输入正确手机号！',
            type: 'warning'
          });
          return;
        }
        if (params.password != '' && params.confirm_password && params.password != params.confirm_password) {
          this.$ElMessage({
            message: '两次输入密码不一致！',
            type: 'warning'
          });
          return;
        }
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            CashierApi.editUser(params, true).then(data => {
              self.loading = false;
              this.$ElMessage({
                message: '保存成功',
                type: 'success'
              });
              self.dialogFormVisible(true);
            }).catch(error => {
              self.loading = false;
            });
          }
        });
      },
      /*关闭弹窗*/
      dialogFormVisible(e) {
        if (e) {
          this.$emit('closeDialog', {
            type: 'success',
            openDialog: false
          })
        } else {
          this.$emit('closeDialog', {
            type: 'error',
            openDialog: false
          })
        }
      },
    }
  };
</script>

<style>
  .img {
    margin-top: 10px;
  }
</style>
