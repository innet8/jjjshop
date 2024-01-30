<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-小票打印设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
      <!--小票打印设置-->
      <div class="common-form">取号设置</div>

      <el-form-item label="是否开启打印">
        <div>
          <el-radio v-model="form.is_print" :label="1">开启</el-radio>
          <el-radio v-model="form.is_print" :label="0">关闭</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择打印机" v-if="form.is_print==1">
        <el-select v-model="form.printer_id" placeholder="请选择">
          <el-option v-for="(item,index) in printerList" :key="index" :label="item.printer_name"
            :value="item.printer_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="须知：" prop="notice" :rules="[{ required: true, message: '请输入须知' }]">
        <el-input type="textarea" rows="4" v-model="form.notice" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="商家说明：" prop="explain" :rules="[{ required: true, message: '请输入商家说明' }]">
        <el-input type="textarea" rows="4" v-model="form.explain" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="取号规则">
        <div class="edit_container">
          <Uediter v-if="!loading" v-model="form.content" @contentChange="contentChangeFunc" :text="ueditor.text" :config="ueditor.config" ref="ue">
          </Uediter>
        </div>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import QueueApi from '@/api/queue.js';
  import Uediter from '@/components/UE.vue';
  export default {
    components: {
      /*编辑器*/
      Uediter,
    },
    data() {
      return {
        /*富文本配置*/
        ueditor: {
          text: '',
          config: {
            initialFrameWidth: 400,
            initialFrameHeight: 300
          }
        },
        /*form表单数据*/
        form: {
          setting_id: '0',
          is_print: 0,
          printer_id: 0,
          content: '',
          notice: '',
          explain: ''
        },
        checked: false,
        printerList: [],
        loading: true,
      };
    },
    created() {
      this.getData()
    },

    methods: {
      contentChangeFunc(e){
        this.ueditor.text=e;
        this.content=e;
      },
      getData() {
        let self = this;
        QueueApi.getsetting({}, true)
          .then(data => {
            let vars = data.data.detail;
            self.form.setting_id = vars.setting_id;
            self.form.is_print = vars.is_print;
            self.form.printer_id = vars.printer_id;
            self.form.notice = vars.notice;
            self.form.explain = vars.explain;
            self.ueditor.text = vars.content;
            self.printerList = vars.printerList;
            self.loading = false;
          })
          .catch(error => {});
      },
      //提交表单
      onSubmit() {
        let self = this;
        self.form.content = this.ueditor.text;
        let params = this.form;
        QueueApi.editsetting(params, true)
          .then(data => {
            this.$ElMessage({
              message: '恭喜你，设置成功',
              type: 'success'
            });
          })
          .catch(error => {});
      },
      //监听复选框选中
      handleCheckedCitiesChange(e) {
        let self = this;
        if (e) {
          self.form.order_status[0] = 20;
        } else {
          self.form.order_status = [];
        }
      },

    }

  };
</script>
<style lang="scss" scoped>
  .tips {
    color: #ccc;
  }
</style>
