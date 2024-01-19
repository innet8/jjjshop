<template>
  <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：区域-修改
    -->
  <el-dialog title="添加类型" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
      <el-form-item label="桌位名称" prop="table_name" :label-width="formLabelWidth">
        <el-input v-model="form.table_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="人数最小值" prop="min_num" :label-width="formLabelWidth">
        <el-input type="number" v-model.number="form.min_num" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="人数最大值" prop="max_num" :label-width="formLabelWidth">
        <el-input type="number" v-model.number="form.max_num" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="等待时间(分钟)" prop="wait_time" :label-width="formLabelWidth">
        <el-input type="number" v-model.number="form.wait_time" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
        <el-input v-model.number="form.sort" autocomplete="off"></el-input>
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
         table_id: 0,
         table_name: '',
         min_num: 1,
         max_num: 1,
         wait_time:1,
         sort: 100,
        },
        file_path: '',
        formRules: {
          table_name: [{
            required: true,
            message: '请输入桌位名称',
            trigger: 'blur'
          }],
          min_num: [{
            required: true,
            message: '请输入人数最小值',
            trigger: 'blur'
          }],
          max_num: [{
            required: true,
            message: '请输入人数最大值',
            trigger: 'blur'
          }],
          wait_time: [{
            required: true,
            message: '请输入等待时间',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '排序不能为空'
          }, {
            type: 'number',
            message: '排序必须为数字'
          }]
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
      this.form.table_id = this.editform.model.table_id;
      this.form.table_name = this.editform.model.table_name;
      this.form.min_num = this.editform.model.min_num;
      this.form.max_num = this.editform.model.max_num;
      this.form.wait_time = this.editform.model.wait_time;
      this.form.sort = this.editform.model.sort;
    },
    methods: {
      /*修改用户*/
      addUser() {
        let self = this;
        let params = self.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            QueueApi.editTable(params, true).then(data => {
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
