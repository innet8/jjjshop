<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-配送员-配送员设置-配送员条件
      -->
  <div class="product-add mt30">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
      <el-form-item label="是否审核">
        <div>
          <el-radio v-model="form.become" label="10">需后台审核</el-radio>
          <el-radio v-model="form.become" label="20">无需审核</el-radio>
        </div>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
    <!--产品列表弹出层组件-->
    <Product :isproduct="isproduct" @closeDialog="closeDialogFunc($event)">产品列表弹出层</Product>
  </div>
</template>

<script>
  import DriverApi from '@/api/driver.js';
  import Product from '@/components/product/Product.vue';
  export default {
    components: {
      /*产品列表组件*/
      Product: Product
    },
    data() {
      return {
        /*切换菜单*/
        // activeIndex: '1',
        /*form表单数据*/
        form: {},
        /*是否打开产品弹出层*/
        isproduct: false,
        loading: false
      };
    },
    props: {
      settingData: Object
    },
    created() {
      this.form = this.settingData.data.condition.values;
      if (!this.form.product_image) {
        this.form.product_image = [];
      }
    },

    methods: {
      /*提交表单*/
      onSubmit() {
        let self = this;
        self.loading = true;
        let params = this.form;
        DriverApi.condition(params, true)
          .then(data => {
            self.loading = false;
           this.$ElMessage({
              message: '恭喜你，设置成功',
              type: 'success'
            });
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*删除商品*/
      deleteFunc(i) {
        this.form.become__buy_product_ids.splice(i, 1);
        this.form.product_image.splice(i, 1);
      },

      /*产品列表弹出层*/
      openProduct() {
        this.isproduct = true;
      },

      /*关闭弹窗*/
      closeDialogFunc(e) {
        this.isproduct = e.openDialog;
        if (e.type == 'success') {
          if (this.form.become__buy_product_ids.indexOf(e.params.product_id) == -1) {
            this.form.become__buy_product_ids.push(e.params.product_id);
            this.form.product_image.push({
              product_id: e.params.product_id,
              image: e.params.image,
              product_name: e.params.product_name
            });
          } else {
            this.$ElMessage({
              message: '已选择该商品',
              type: 'warning'
            });
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .tips {
    color: #ccc;
  }

  .img {
    width: 100px;
    margin-top: 10px;
    height: 130px;
    margin-right: 10px;
  }

  .img img {
    border: 1px solid #eeeeee;
  }

  .delete-btn {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    right: -8px;
    top: -8px;
    color: red;
  }
</style>
