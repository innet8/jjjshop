<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-分销-分销商用户-编辑
      -->
  <el-dialog title="编辑" v-model="dialogVisible" @close="cancelFunc" :close-on-click-modal="false" :close-on-press-escape="false" width="30%">
    <el-form :model="formData">
      <el-form-item label="微信昵称" :label-width="formLabelWidth">
        <el-input type="text" v-model="formData.nickName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="微信头像" :label-width="formLabelWidth">
        <img v-img-url="formData.avatarUrl" width="50" height="50" />
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input type="text" v-model="formData.real_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input type="text" v-model="formData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <div  class="dialog-footer">
      <el-button @click="cancelFunc">取 消</el-button>
      <el-button type="primary" @click="confirmFunc">确 定</el-button>
    </div>
    </template>
  </el-dialog>
</template>

<script>
import PlusApi from '@/api/plus.js';
export default {
  data() {
    return {
      /*左边长度*/
      formLabelWidth: '100px',
      /*是否显示*/
      dialogVisible: false,
      /*表单数据模型*/
      formData: {}
    };
  },
  props: {
    open_edit: Boolean,
    userModel: Object
  },
  watch: {
    open_edit: function(n, o) {
      if (n != o) {
        this.dialogVisible = this.open_edit;
        if (n) {
          this.formData = this.userModel;
        }
      }
    }
  },
  created() {},
  methods: {
    /*修改用户*/
    confirmFunc() {
      let self = this;
      let params ={};
      params.user_id= this.formData.user_id;
      params.real_name=this.formData.real_name;
      params.mobile=this.formData.mobile;
      PlusApi.agentUserEdit(params, true)
        .then(data => {
          this.$ElMessage({
            message: $t('保存成功'),
            type: 'success'
          });
          self.cancelFunc(true);
        })
        .catch(error => {});
    },

    /*关闭弹窗*/
    cancelFunc(e) {
      let type='cancel';
      if(e){
        type='success';
      }
      this.$emit('close', {
        type:type
      });
    }
  }
};
</script>
