<template>
  <!--
      描述：活动-新客有礼
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <!--小票打印设置-->
      <el-form-item label="活动时间">
        <el-date-picker v-model="time" type="daterange" align="right" unlink-panels value-format="YYYY-MM-DD"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="外卖商品">
        <el-button type="text" @click="addTakeout">添加外卖商品</el-button>
        <el-table :data="takeoutData" highlight-current-row ref="singleTable">
          <el-table-column prop="lottery_id" label="序号" type="index">
          </el-table-column>
          <el-table-column prop="product.product_name" label="商品名称" width="280">
          </el-table-column>
          <el-table-column prop="product_image" label="商品图片" width="180">
            <template #default="scope">
              <img v-img-url="scope.row.logo.file_path || ''" alt="" :width="50" />
            </template>
          </el-table-column>
          <el-table-column prop="product_image" label="活动折扣" width="180">
            <template #default="scope">
              <el-input-number v-model="scope.row.discount" :precision="1" :step="0.1" :max="10" :min="0">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="product_image" label="活动价格" width="180">
            <template #default="scope">
              {{getPrice(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="活动库存" :rules="[{required: true,message: ' '}]">
            <template #default="scope">
              <el-input type="number" v-model="scope.row.stock" placeholder="" :min="0">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template #default="scope">
              <el-button type="text" size="small" @click="delcoupon('takeoutData',scope.$index)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="店内商品">
        <el-button type="text" @click="addStore">添加店内商品</el-button>
        <el-table :data="storeData" highlight-current-row ref="singleTable">
          <el-table-column prop="lottery_id" label="序号" type="index">
          </el-table-column>
          <el-table-column prop="product.product_name" label="商品名称" width="280">
              <template #default="scope">
             {{ scope.row.product ? scope.row.product.product_name : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="file_path" label="商品图片" width="180">
            <template #default="scope">
              <img v-img-url="scope.row.logo.file_path || ''" alt="" :width="50" />
            </template>
          </el-table-column>
          <el-table-column prop="product_image" label="活动折扣" width="180">
            <template #default="scope">
              <el-input-number v-model="scope.row.discount" :precision="1" :step="0.1" :max="10" :min="0">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="product_price" label="活动价格" width="180">
            <template #default="scope">
              {{getPrice(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="活动库存" :rules="[{required: true,message: ' '}]">
            <template #default="scope">
              <el-input type="number" v-model="scope.row.stock" placeholder="" :min="0">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template #default="scope">
              <el-button type="text" size="small" @click="delcoupon('storeData',scope.$index)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
    <!--选择商品-->
    <Product :isproduct="isproduct" :excludeIds="exclude_ids" :product_type='product_type' spec_type='10'
      :islist="false" @closeDialog="closeProductFunc"></Product>
  </div>
</template>

<script>
  import DiscountApi from '@/api/plus/discount.js';
  import Product from '@/components/product/Product.vue';
  export default {
    components: {
      Product
    },
    data() {
      return {
        discount_product_ids: [],
        form: {},
        /*是否打开选择商品*/
        isproduct: false,
        exclude_ids: [],
        product_type: 0,
        loading: true,
        takeoutData: [],
        storeData: [],
        time: [],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
          }
        }
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let self = this;
        self.loading = true;
        DiscountApi.getDiscount({}, true)
          .then(data => {

            if (data.data.detail) {
              self.storeData = data.data.detail.store_product;
              console.log(self.storeData)
              self.takeoutData = data.data.detail.takeout_product;
              self.exclude_ids = data.data.productIds;
              if (data.data.detail.time) {
                self.time = data.data.detail.time;
              }
            }
            self.loading = false;


          })
          .catch(error => {});
      },
      //提交表单
      onSubmit() {
        let self = this;
		self.loading = true;
        let params = {
          product: '',
          discount_product_ids: self.discount_product_ids,
          time: self.time
        }
        if (params.discount_product_ids.length <= 0) {
          params.discount_product_ids = 0
        }
        params.product = JSON.stringify([...self.takeoutData, ...self.storeData])
        DiscountApi.setDiscount(params, true)
          .then(data => {
            ElMessage({
              message: data.msg,
              type: 'success'
            });
			self.takeoutData = [];
			self.storeData = [];
			self.getData();
			self.loading = false;
          })
          .catch(error => {});
      },
      getPrice(row) {
        if(row.product){
           return parseFloat(row.product.product_price * 1 * row.discount * 1 * 0.1).toFixed(2)
        }
       return 0;
      },
      addTakeout() {
        this.product_type = 0;
        this.isproduct = true;
      },
      addStore() {
        this.product_type = 1;
        this.isproduct = true;
      },
      delcoupon(list, e) {
        let self = this;
        if (self[list][e].discount_product_id) {
          let n = self.discount_product_ids.indexOf(self[list][e].discount_product_id);
          if (n == -1) {
            self.discount_product_ids.push(self[list][e].discount_product_id);
          } else {
            self.discount_product_ids.splice(n, 1);
          }
        }
        self[list].splice(e, 1);
      },
      /*关闭商品*/
      closeProductFunc(e) {
        let self = this;
        self.isproduct = e.openDialog;
        if (e.type == 'success') {
          let params = {
            product_type: e.params.product_type,
            discount: 10,
            product_id: e.params.product_id,
            stock: 0,
            product: {
              product_name: e.params.product_name,
              product_price: e.params.product_price
            },
            logo: {
              file_path: e.params.product_image
            }
          }
          console.log(e.params.product_name)
          if (self.product_type == 0) {
            self.takeoutData.push(params)
          } else {
            self.storeData.push(params)
          }
        }
      },
    }

  };
</script>

<style>
  .tips {
    color: #ccc;
  }

  .img {
    margin-top: 10px;
  }
</style>
