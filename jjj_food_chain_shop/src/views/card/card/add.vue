<template>
  <div class="product-add">

    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="180px">
      <!--基础信息-->
      <Basic ></Basic>
      <!--高级设置-->
      <Set ></Set>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import CardApi from '@/api/card.js';
  import Basic from './part/Basic.vue';
  import Set from './part/set.vue';
  export default {
    components: {
      /*基础信息*/
      Basic,
      /*高级设置*/
      Set
    },
    data() {
      return {
        activeName: 'basic',
        /*是否正在加载*/
        loading: false,
        /*form表单数据*/
        form: {
          model: {
            card_name: '',
            type_id: 1,
            card_style: '',
            sort: 0,
            is_discount: 0,
            discount: 0,
            open_points: 0,
            open_points_num: 0,
            open_coupon: 0,
            open_coupons: [],
            month_points: 0,
            month_points_num: 0,
            month_coupon: 0,
            month_coupons: [],
            expire: 0,
            money: 0,
            stock: '',
            status: 0,
            content: '',
            sub_card: 0,
            sub_num: 0,
            default_style: '',
            is_default: 0
          },
          subList: [],
          /*副卡*/
          image: [],
          /*会员卡类型*/
          typeList: [],
          /*优惠券*/
          couponList: [],
        }
      };
    },
    provide: function() {
      return {
        form: this.form,
        image: this.image,
        subList: this.subList,
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
        CardApi.getBaseData({}, true)
          .then(res => {
            self.loading = false;
            Object.assign(self.form, res.data);
            console.log(self.form)
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*提交*/
      onSubmit: function() {
        let self = this;
        let params = self.form.model;
        self.$refs.form.validate(valid => {
          if (valid) {
            self.loading = true;
            CardApi.addcard({
                params: JSON.stringify(params)
              }, true)
              .then(data => {
                self.loading = false;
                ElMessage({
                  message: '添加成功',
                  type: 'success'
                });
                self.$router.push('/card/card/index');
              })
              .catch(error => {
                self.loading = false;
              });
          } else {
            ElMessage({
              message: '请检查必填项是否填写完整',
              type: 'error'
            });
          }
        });
      },

      /*取消*/
      cancelFunc() {
        this.$router.back(-1);
      },

    }
  };
</script>

<style lang="scss" scoped>
  .basic-setting-content {}

  .product-add {
  }
</style>
