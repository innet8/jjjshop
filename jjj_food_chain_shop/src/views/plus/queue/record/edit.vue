<template>
  <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：区域-修改
    -->
  <el-dialog title="取号记录" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
      <el-form-item label="就餐号" prop="queue_no" :label-width="formLabelWidth">
        <el-input v-model="form.queue_no" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="就餐人数" prop="queue_num" :label-width="formLabelWidth">
        <el-input type="number" v-model.number="form.queue_num" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
        <el-input  v-model="form.mobile" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="桌位名称" prop="table_name" :label-width="formLabelWidth">
        <el-input v-model="form.table_name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio-group v-model="form.status">
          <el-radio :label="10">待取号</el-radio>
          <el-radio :label="20">已入座</el-radio>
          <el-radio :label="30">已过号</el-radio>
          <el-radio :label="40">已取消</el-radio>
        </el-radio-group>
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
  import QueueApi from '@/api/queue.js';
  export default {
    components: {
    },
    data() {
      return {
        form: {
         record_id: 0,
         queue_no: '',
         queue_num: '',
         table_id: '',
         mobile:'',
         status: '',
         table_name: '',
        },
        file_path: '',
        
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
      this.form.record_id = this.editform.model.record_id;
      this.form.queue_no = this.editform.model.queue_no;
      this.form.queue_num = this.editform.model.queue_num;
      this.form.table_id = this.editform.model.table_id;
      this.form.table_name = this.editform.model.table_name;
      this.form.mobile = this.editform.model.mobile;
      this.form.status = this.editform.model.status;
    },
    methods: {
      /*修改用户*/
      addUser() {
        let self = this;
        let params = self.form;
        console.log(params)
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            QueueApi.recordedit(params, true).then(data => {
              self.loading = false;
              ElMessage({
                message: '修改成功',
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

<style lang="scss" scoped>
  .img {
    margin-top: 10px;
  }
</style>
