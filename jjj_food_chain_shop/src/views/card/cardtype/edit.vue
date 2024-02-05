<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-等级管理-编辑等级
  -->
  <el-dialog title="编辑类型" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" label-position="top" ref="form">
      <el-form-item label="类型名称" :label-width="formLabelWidth" prop="name" :rules="[{required: true,message: '请输入等级名称'}]">
        <el-input v-model="form.name" placeholder="请输入类型名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="editType" :disabled="submit_loading">确 定</el-button>
    </div>
    </template>
  </el-dialog>
</template>

<script>
  import CardApi from '@/api/card.js';
  export default {
    data() {
      return {
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        /*是否正在提交*/
        submit_loading: false,
      };
    },
    props: ['open_edit', 'form'],
    created() {
      this.dialogVisible = this.open_edit;
    },
    methods: {
      /*修改用户*/
      editType() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            CardApi.editcardtype(params, true)
              .then(data => {
                self.submit_loading = false;
                this.$ElMessage({
                  message: $t('操作成功'),
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


