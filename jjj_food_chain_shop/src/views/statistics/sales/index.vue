<template>
  <div v-loading="loading" style="min-height: 400px;">
    <div class="d-b-c">
      <el-form size="small" :inline="true"  class="demo-form-inline ww100">
        <div class="date_section d-b-c">
          <div class="flex-1">
            <el-form-item label="选择店铺" v-auth="'/auth/shop'">
              <el-select size="small" v-model="shop_supplier_id" placeholder="请选择" @change="handleClick">
                <el-option label="全部" :value="0"></el-option>
                <el-option v-for="(item, index) in supplierList" :key="index" :label="item.name" :value="item.shop_supplier_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择时间" >
              <el-date-picker
                size="small"
                v-model="datePicker"
                type="daterange"
                align="right"
                unlink-panels
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
                   :shortcuts="shortcuts"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <!--汇总-->
    <Total v-if="!loading"></Total>
    <!--交易统计-->
    <Transaction :shop_supplier_id="shop_supplier_id" :datePicker="datePicker" v-if="!loading"></Transaction>
    <!--商品统计-->
    <Productindex :shop_supplier_id="shop_supplier_id" :datePicker="datePicker" v-if="!loading"></Productindex>
  </div>
</template>

<script>
import StatisticsApi from '@/api/statistics.js';
import Total from './part/Total.vue';
import Transaction from './part/Transaction.vue';
import Productindex from './part/Product.vue';
import { formatDate } from '@/utils/DateTime.js';
export default {
  components: {
    Total,
    Transaction,
    Productindex
  },
  data() {
    let endDate=new Date();
    let startDate=new Date();
    startDate.setTime(startDate.getTime()- 3600 * 1000 * 24 * 7);
    return {
      /*是否正在加载*/
      loading: true,
      /*数据对象*/
      dataModel: {},
      datePicker: [formatDate(startDate, 'yyyy-MM-dd'), formatDate(endDate, 'yyyy-MM-dd')],
      shop_supplier_id: 0,
      supplierList:[],
      
         shortcuts: [
           {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
        ],
     
    };
  },
  provide: function() {
    return {
      dataModel: this.dataModel
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /*选择时间*/
    changeDate() {
      let self = this;
      self.curPage = 1;
      self.loading = true;
      this.getData();
    },
    /*切换菜单*/
    handleClick() {
      let self = this;
      self.curPage = 1;
      self.loading = true;
      self.getData();
    },
    /*获取数据*/
    getData() {
      let self = this;
      StatisticsApi.getOrderTotal({
        days: self.datePicker,
        shop_supplier_id:self.shop_supplier_id
      }, true)
        .then(res => {
          Object.assign(self.dataModel, res.data);
          console.log(self.dataModel)
          self.loading = false;
          self.supplierList = res.data.supplierList;
        })
        .catch(error => {});
    }
  }
};
</script>

<style></style>
