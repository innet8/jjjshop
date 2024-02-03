<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-团购设置
  -->
  <div>
    <el-form size="small" :model="form" label-position="top" ref="ruleForm" label-width="100px">
      <!--订单设置-->
      <div class="common-form">订单设置</div>
      <el-form-item label="未支付订单" prop="close_time" :rules="[{ required: true, message: '请输入关闭时间' }]">
        <el-input v-model="form.close_time" type="number" class="max-w460"></el-input>
        分钟后自动关闭
        <div class="tips">
          订单下单未付款，n分钟后自动关闭，设置0不自动关闭
        </div>
      </el-form-item>
      <!--团购保障-->
      <div class="common-form">团购保障</div>
      <el-form-item label="团购保障：">
        <div class="edit_container">
          <Uediter  :text="ueditor.text" :config="ueditor.config" @contentChange="contentChangeFunc" ref="ue"></Uediter>
        </div>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" size="small" @click="onSubmit" :disabled="loading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import GroupApi from '@/api/group.js';
  import Uediter from '@/components/UE.vue';
  export default {
    components: {
      /*编辑器*/
      Uediter
    },
    data() {
      return {
        /*富文本配置*/
        ueditor: {
          text: '',
          config: {
            initialFrameWidth: 400,
            initialFrameHeight: 500
          }
        },
        /*表单数据对象*/
        form: {
          explain: '',
          close_time: '',
        },
        /*是否正在加载*/
        loading: true,
      };
    },
    created() {
      /*获取列表*/
      this.getData();
    },
    methods: {
      contentChangeFunc(e){
        this.ueditor.text=e;
      },
      /*获取列表*/
      getData() {
        let self = this;
        self.loading = true;
        GroupApi.getGroupSetting()
          .then(data => {
            self.loading = false;
            let val = data.data.vars.values;
            self.ueditor.text = val.explain;
            self.form.close_time = val.close_time;
          })
          .catch(error => {});
      },

      onSubmit() {
        let self = this;
        let params = self.form;
        params.explain = self.ueditor.text;
        self.$refs.ruleForm.validate(valid => {
          if (valid) {
            self.loading = true;
            GroupApi.editGroupSetting(params, true)
              .then(data => {
                this.$ElMessage({
                  message: $t('保存成功'),
                  type: 'success'
                });
                self.getData();
              })
              .catch(error => {});
          }
        });
      },
      /*获取富文本编辑器的内容*/
      getContent: function() {
        // return this.$refs.ue.getUEContent();
      },
    }
  };
</script>

<style scoped>
  .open-sign {
    padding: 20px;
    background: #e2f0ff;
  }

  .reward-list .reward-item {
    margin-bottom: 10px;
    padding: 20px 20px 0;
  }

  .reward-list .delete-reward {
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    z-index: 10;
  }

  .el-button--small.is-circle {
    padding: 4px;
  }
</style>
