<template>
  <!--
      作者：luoyiming
      时间：2020-06-01
      描述：插件中心-文章-编辑
    -->
  <div class="product-add pb50" v-loading="loading">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基础设置" name="basic"></el-tab-pane>
      <el-tab-pane label="购买须知" name="notice"></el-tab-pane>
      <el-tab-pane label="团购详情" name="content"></el-tab-pane>
    </el-tabs>

    <!--编辑文章-->
    <!--添加团购-->
    <el-form size="small" :model="form" label-position="top" ref="form" label-width="100px" v-if="!loading">
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
        /*是否加载完成*/
        loading: true,
        /*form表单数据*/
        form: {
          group_id: 0,
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
          expire_type: '',
          expire_day: ''
        },
      };
    },
    provide: function() {
      return {
        form: this.form
      }
    },
    created() {
      this.getDetail();
    },

    methods: {

      getDetail() {
        let self = this;
        // 取到路由带过来的参数
        const params = self.$route.query.group_id;
        GroupApi.toEditGroup({
            group_id: params
          }, true).then(res => {
            self.loading = false;
            // self.ueditor.text = res.data.model.notice;
            Object.assign(self.form, res.data.model);
            if (!self.form.image) {
              self.form.image = [];
            }
            // 转成整数，兼容组件
            for (let i = 0; i < self.form.shop_supplier_id.length; i++) {
              self.form.shop_supplier_id[i] = parseInt(self.form.shop_supplier_id[i]);
            }
            self.form.supplier = res.data.supplier;
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*修改文章*/
      onSubmit() {
        let self = this;
        let params = this.form;
        // self.form.article_content = this.$refs.ue.getUEContent();
        // 取到路由带过来的参数
        self.$refs.form.validate(valid => {
          if (valid) {
            GroupApi.editGroup(params, true)
              .then(data => {
               ElMessage({
                  message: data.msg,
                  type: 'success'
                });
                self.$router.push('/plus/group/index');
              })
              .catch(error => {

              });
          }
        });
      },

      /*取消添加，返回文章列表*/
      cancelFunc() {
        this.$router.push({
          path: '/plus/group/index'
        });
      }
    }
  };
</script>

<style scoped>
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
