<template>
  <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：产品分类-添加
    -->
  <el-dialog title="添加收银员" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
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
          user_name: '',
          mobile: '',
          account: '',
          password: '',
        },
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
          password: [{
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          }, {
            min: 6,
            max: 16,
            message: '长度在6到16个字符',
            trigger: 'blur'
          }],
          confirm_password: [{
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          }, ]
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
    props: ['open_add', 'addform'],
    created() {
      this.dialogVisible = this.open_add;
    },
    methods: {
      /*添加用户*/
      addUser() {
        let self = this;
        let params = self.form;
        if (!/^1[3456789]\d{9}$/.test(params.mobile)) {
          ElMessage({
            message: '请输入正确手机号！',
            type: 'warning'
          });
          return;
        }
        if (params.password != '' && params.confirm_password && params.password != params.confirm_password) {
          ElMessage({
            message: '两次输入密码不一致！',
            type: 'warning'
          });
          return;
        }
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            CashierApi.addUser(params).then(data => {
              self.loading = false;
              ElMessage({
                message: '添加成功',
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
      }
    }
  };
</script>

<style>
  .img {
    margin-top: 10px;
  }
</style>
