<template>
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="180px">
      <!--基础信息-->
      <Basic></Basic>

      <!--规格设置-->
      <Spec></Spec>
      <!--商品详情-->
      <Content></Content>

      <!--高级设置-->
      <Buyset></Buyset>

      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small"  @click="cancelFunc">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit" :loading="loading">发布</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import PointsApi from '@/api/plus/points.js';
  import Basic from './part/Basic.vue';
  import Spec from './part/Spec.vue';
  import Content from './part/Content.vue';
  import Buyset from './part/Buyset.vue';
  export default {
    components: {
      /*基础信息*/
      Basic,
      /*规格信息*/
      Spec,
      /*商品详情*/
      Content,
      /*高级设置*/
      Buyset
    },
    data() {
      return {
        /*是否正在加载*/
        loading: false,
        /*form表单数据*/
        form: {
          model: {
            /*商品名称*/
            product_name: '',
            product_price:'',
            product_points:'',
            /*商品分类*/
            category_id: null,
            /*商品图片*/
            file_path: '',
            image_id: '',
            /*商品详情内容*/
            content: '',
            /*商品状态*/
            product_status: 10,
            /*商品排序，默认100*/
            product_sort: 100,
            /*限购数量*/
            limit_num: 0,
            delivery_set:[10,20],
            express_price:'',
            product_stock:''
          },
          /*商品分类*/
          category: {
            all:[]
          },
          feed: [],
          special: [],
          /*运费模板*/
          delivery: [],
          /*会员等级*/
          gradeList: [],
          /*规格数据*/
          specData: null,
        }
      };
    },
    provide: function() {
      return {
        form: this.form
      }
    },
    created() {

      /*获取基础数据*/
      this.getBaseData();

    },
    methods: {

      /*获取基础数据*/
      getBaseData: function() {
        let self = this;
        PointsApi.getProduct({}, true)
          .then(res => {
            self.loading = false;
            Object.assign(self.form, res.data);
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*转JSON字符串*/
      convertJson(list) {
        let obj = {};
        list.forEach(item => {
          obj[item.grade_id] = item.product_equity;
        });
        return JSON.stringify(obj);
      },

      /*提交*/
      onSubmit: function() {
        let self = this;
        let params = self.form.model;
        self.$refs.form.validate(valid => {
          if (valid) {
            self.loading = true;
            PointsApi.addProduct({
                params: JSON.stringify(params)
              }, true)
              .then(data => {
                self.loading = false;
                this.$ElMessage({
                  message: '添加成功',
                  type: 'success'
                });
                self.$router.push('/plus/points/index');
              })
              .catch(error => {
                self.loading = false;
              });
          }
        });
      },

      /*保存为草稿*/
      Draft() {
        let self = this;
        self.form.model.product_status = 30;
        self.onSubmit();
      },

      /*取消*/
      cancelFunc() {
        this.$router.back(-1);
      }

    }
  };
</script>

<style lang="scss" scoped>
  .basic-setting-content {}

  .product-add {

  }
</style>
