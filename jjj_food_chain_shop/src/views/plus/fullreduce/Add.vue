<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-等级管理-添加等级
  -->
  <el-dialog title="添加活动" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" label-position="top" ref="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth" prop="active_name" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.active_name" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="满类型" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.full_type" :label="1">满金额</el-radio>
          <el-radio v-model="form.full_type" :label="2">满件数</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="满值" :label-width="formLabelWidth" prop="full_value" :rules="[{required: true,message: ' '}]">
        <el-input type="number" :precision="1" :step="1" :min="0" placeholder="请输入满值" v-model="form.full_value"></el-input>
      </el-form-item>
      <el-form-item label="减类型" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.reduce_type" :label="1">减金额</el-radio>
          <el-radio v-model="form.reduce_type" :label="2">打折</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="减值" :label-width="formLabelWidth" prop="reduce_value" :rules="[{required: true,message: ' '}]">
        <el-input type="number" :precision="1" :step="1" :min="0" placeholder="请输入满值" v-model="form.reduce_value"></el-input>
        <div class="tips">
          如果是打折，填写80，表示打8折
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="add()" :disabled="submit_loading">确 定</el-button>
    </div>
    </template>
  </el-dialog>
</template>

<script>
  import FullreduceApi from '@/api/plus/fullreduce.js';
  export default {
    data() {
      return {
        form: {
          /*活动名称*/
          active_name: '',
          /*满类型*/
          full_type: 1,
          /*满值*/
          full_value: 0,
          /*减类型*/
          reduce_type: 1,
          /*减值*/
          reduce_value: 0,
        },
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        /*是否正在提交*/
        submit_loading: false,
      };
    },
    props: ['open_add'],
    created() {
      this.dialogVisible = this.open_add;
    },
    methods: {
      /*添加等级*/
      add() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            FullreduceApi.add(params, true).then(data => {
                self.submit_loading = false;
                this.$ElMessage({
                  message: data.msg,
                  type: 'success'
                });
                self.dialogFormVisible(true);
              })
              .catch(error => {
                self.submit_loading = false;
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


