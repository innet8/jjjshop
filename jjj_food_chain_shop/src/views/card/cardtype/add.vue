<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-等级管理-添加等级
  -->
  <el-dialog title="添加类型" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="类型名称" :label-width="formLabelWidth" prop="name" :rules="[{required: true,message: '请输入等级名称'}]">
        <el-input v-model="form.name" placeholder="请输入类型名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="addGrade()" :disabled="submit_loading">确 定</el-button>
    </div>
    </template>
  </el-dialog>
</template>

<script>
  import CardApi from '@/api/card.js';
  export default {
    data() {
      return {
        form: {
          /*名称*/
          name: '',
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
      addGrade() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            CardApi.addcardtype(params, true).then(data => {
                self.submit_loading = false;
                ElMessage({
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

<style></style>
