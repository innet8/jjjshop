<template>
  <!--
      作者：luoyiming
      时间：2020-06-01
      描述：插件中心-团购-添加
    -->
  <div class="product-add pb50">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基础设置" name="basic"></el-tab-pane>
      <el-tab-pane label="购买须知" name="notice"></el-tab-pane>
      <el-tab-pane label="团购详情" name="content"></el-tab-pane>
    </el-tabs>
    <!--添加团购-->
    <el-form size="small" :model="form" label-position="top" ref="form" label-width="100px">
      <!--基础信息-->
      <Basic v-if="activeName == 'basic'"></Basic>

      <!--使用须知-->
      <Notice v-show="activeName == 'notice'"></Notice>

      <!-- 详情-->
      <Content v-show="activeName == 'content'"></Content>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
    <Upload v-if="isupload" :config="{ total: 9 }" :isupload="isupload" @returnImgs="returnImgsFunc">上传图片</Upload>
  </div>
</template>

<script>
  import GroupApi from '@/api/group.js';
  import Uediter from '@/components/UE.vue';
  import Upload from '@/components/file/Upload.vue';
  import Basic from './part/Basic.vue';
  import Notice from './part/Notice.vue';
  import Content from './part/Content.vue';
  export default {
    components: {
      /*编辑器*/
      Uediter,
      /*图片上传*/
      Upload: Upload,
      /*基础信息*/
      Basic,
      /*使用须知*/
      Notice,
      /*详情*/
      Content
    },
    data() {
      return {
        activeName: 'basic',
        /*是否上传图片*/
        isupload: false,
        path: '',
        /*form表单数据*/
        form: {
          group_name: '',
          group_price: '',
          line_price: '',
          sales_initial: '',
          notice: '',
          content: '',
          limit_num: 0,
          group_sort: 100,
          suit_type: 10,
          shop_supplier_id: [],
          group_status: 1,
          image: [],
          /*团购门店*/
          supplier: [],
          describe: '',
          time: [],
          expire_type: 10,
          expire_day: ''
        },
        loading: false,
      };
    },
    provide: function() {
      return {
        form: this.form
      }
    },
    created() {
      /*获取列表*/
      this.getData();
    },
    methods: {
      /*上传*/
      openUpload() {
        this.isupload = true;
      },

      /*获取图片*/
      returnImgsFunc(e) {
        let self = this;
        if (e != null) {
          let imgs = this.form.image.concat(e);
          this.form.image = imgs;
        }
        this.isupload = false;
      },

      /*获取团购门店*/
      getData() {
        let self = this;
        let Params = {};
        GroupApi.toAddGroup(Params, true)
          .then(res => {
            self.form.supplier = res.data.supplier;
          })
          .catch(error => {

          });
      },

      /*添加团购*/
      onSubmit() {
        let self = this;
        let form = self.form;
        self.$refs.form.validate(valid => {
          if (valid) {
            self.loading = true;
            GroupApi.addGroup(form, true)
              .then(data => {
                self.loading = false;
                ElMessage({
                  message: data.msg,
                  type: 'success'
                });
                self.$router.push('/plus/group/index');
              })
              .catch(error => {
                self.loading = false;
              });
          }
        });
      },

      /*取消添加，返回团购列表*/
      cancelFunc() {
        this.$router.push({
          path: '/plus/group/index'
        });
      },
      /*删除图片*/
      deleteImg(index) {
        this.form.image.splice(index, 1);
      },
    }
  };
</script>

<style>
  .edit_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .ql-editor {
    height: 400px;
  }
</style>
