<template>
  <div class="pb50" v-loading="loading">
    <!--订单进度-->
    <!--内容-->
    <div id="">
      <el-tabs v-model="formInline.order_type" type="card" @tab-click="handleClick">
        <el-tab-pane label="外卖" name="0"></el-tab-pane>
        <el-tab-pane label="店内" name="1"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="common-seach-wrap ww100">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline ww100">
        <div class="date_section d-b-c">
          <div class="flex-1">
            <el-form-item label="选择店铺"  v-auth="'/auth/shop'">
              <el-select size="small" v-model="formInline.shop_supplier_id" placeholder="请选择" @change="handleClick">
                <el-option label="全部" :value="0"></el-option>
                <el-option v-for="(item, index) in supplierList" :key="index" :label="item.name"
                  :value="item.shop_supplier_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="查询日期">
              <el-radio-group v-model="formInline.type" size="medium" @change="handleClick">
                <el-radio-button :label="1">今天</el-radio-button>
                <el-radio-button :label="2">近七天</el-radio-button>
                <el-radio-button :label="3">近十五天</el-radio-button>
                <el-radio-button :label="4">自定义时间</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="起始时间" v-if="formInline.type==4">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker @change="handleClick" size="small" v-model="formInline.time" type="daterange"
                  value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

    <div class="product-content">
      <div class="common-form">实时概况</div>
      <div class="table-wrap">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="pb16 grid-content bg-purple">
              <div>营业总额(元)</div>
              <div class="detail_prici">{{ detail.total_price }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="pb16 grid-content bg-purple">
              <div>预计收入(元)</div>
              <div class="detail_prici">{{ detail.income_money }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="pb16 grid-content bg-purple">
              <div>有效订单数</div>
              <div class="detail_prici">{{ detail.order_count }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="pb16 grid-content bg-purple">
              <div>退款金额(元)</div>
              <div class="detail_prici">{{ detail.refund_money }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--内容-->
    </div>
    <Transaction :profileList='profileList'></Transaction>
    <div class="common-form">实时概况</div>
    <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="time" label="日期"></el-table-column>
      <el-table-column prop="order_count" label="有效订单数"></el-table-column>
      <el-table-column prop="total_money" label="营业总额"></el-table-column>
      <el-table-column prop="refund_money" label="退款金额"></el-table-column>
      <el-table-column prop="revenue_money" label="预计收入"></el-table-column>
      <el-table-column prop="create_time" label="添加时间"></el-table-column>
      <el-table-column prop='settled_id' fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button @click="addClick(scope.row)" type="text" size="small" v-auth="'/cash/finance/detail'">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
        :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
        :total="totalDataNumber"></el-pagination>
    </div>
  </div>
</template>

<script>
  import StatisticsApi from '@/api/statistics.js';
  import Transaction from './Transaction.vue';
  export default {
    components: {
      Transaction
    },
    data() {
      return {
        active: 0,
        /*是否加载完成*/
        loading: true,
        /*一页多少条*/
        pageSize: 10,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        formInline: {
          order_type: 0,
          type: 1,
          shop_supplier_id: 0,
          time: '',
        },
        /*订单数据*/
        detail: {
          total_price: '',
          income_money: '',
          order_count: '',
          refund_money: ''
        },
        supplierList: [],
        tableData: [],
        profileList: []
      };
    },
    created() {
      /*获取列表*/
      this.getParams();
    },
    methods: {
      /*获取参数*/
      getParams() {
        let self = this;
        let params = self.formInline;
        params.page = self.curPage;
        params.list_rows = self.pageSize;
        self.loading = true;
        StatisticsApi.getOrderDate(params,
            true
          )
          .then(data => {
            self.detail = data.data.detail;
            self.supplierList = data.data.supplierList;
            self.profileList = data.data;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total;
            self.loading = false;
          })
          .catch(error => {
            self.loading = false;
          });
      },
      /*选择第几页*/
      handleCurrentChange(val) {
        let self = this;
        self.loading = true;
        self.curPage = val;
        self.getParams();
      },

      /*每页多少条*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.getParams();
      },

      /*切换菜单*/
      handleClick() {
        let self = this;
        if (self.formInline.type == 4 && !self.formInline.time) {
          return
        }
        self.curPage = 1;
        self.getParams()
      },
      selectId(e) {
        this.formInline.shop_supplier_id = e;
        this.getParams()
      },
      /*打开添加*/
      addClick(row) {
        let self = this;
        let params = row.finance_id;
        self.$router.push({
          path: '/cash/finance/detail',
          query: {
            finance_id: params
          }
        });
      },
    }
  };
</script>
<style lang="scss">
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    padding: 20px;
    border-radius: 4px;
    min-height: 36px;
  }

  .bg-purple {
    background: #f4f4f4;
  }

  .table-wrap {
    padding: 20px;
    padding-top: 0;
  }

  .common-form-data {
    margin-left: 15px;
    font-weight: 500;
  }

  .tips {
    padding: 15px;
    margin-bottom: 20px;
  }

  .tips_tit {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .tips_txt {
    line-height: 25px;
    color: #666;
    font-size: 14px;
  }

  .detail_prici {
    font-size: 20px;
    color: #000;
    font-weight: bold;
    margin-top: 10px;
    max-width: 250px;
  }
</style>
