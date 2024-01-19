<template>
  <!--
      作者：luoyiming
      时间：2019-10-25
      描述：订单列表
  -->
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input size="small" v-model="searchForm.order_no" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item label="使用门店" v-if="user_type==0">
          <el-select size="small" v-model="searchForm.shop_supplier_id" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in supplierList" :key="index" :label="item.name"
              :value="item.shop_supplier_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker size="small" v-model="searchForm.create_time" type="daterange" value-format="YYYY-MM-DD"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="Search" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-tabs v-if="user_type==0" v-model="activeName" @tab-change="handleClick">
          <el-tab-pane label="全部订单" name="all">
            <template #label>
              <span>
                全部订单
                <el-tag size="">{{order_count.all}}</el-tag>
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane :label="'待付款'" name="payment">
            <template #label>
              <span>
                待付款 
                <el-tag size="">{{order_count.payment}}</el-tag>
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane :label="'待使用'" name="process">
            <template #label>
              <span>待使用 <el-tag size="">{{order_count.process}}</el-tag></span>
            </template>
          </el-tab-pane>
          <el-tab-pane :label="'已取消'" name="cancel">
            <template #label>
              <span>已取消 <el-tag size="">{{order_count.cancel}}</el-tag></span>
            </template>
          </el-tab-pane>
          <el-tab-pane :label="'已退款'" name="refund">
            <template #label>
              <span>已退款 <el-tag size="">{{order_count.refund}}</el-tag></span>
            </template>
          </el-tab-pane>
          <el-tab-pane :label="'已完成'" name="complete">
            <template #label>
              <span>已完成 <el-tag size="">{{order_count.complete}}</el-tag></span>
            </template>
          </el-tab-pane>
        </el-tabs>
        <el-table size="small" :data="tableData.data" :span-method="arraySpanMethod" border style="width: 100%"
          v-loading="loading">
          <el-table-column prop="order_no" label="订单信息" width="400">
            <template #default="scope">
              <div class="order-code" v-if="scope.row.is_top_row">
                <span class="c_main">订单号：{{ scope.row.order_no }}</span>
                <span class="pl16">下单时间：{{ scope.row.create_time }}</span>
              </div>
              <template v-else>
                <div class="product-info" v-for="(item, index) in scope.row.product" :key="index">
                  <div class="pic"><img v-img-url="item.image.file_path" alt="" /></div>
                  <div class="info">
                    <div class="name gray3 product-name">
                      <span>{{ item.group_name }}</span>
                    </div>
                  </div>
                  <div class="d-c-c d-c">
                    <div class="orange">￥ {{ item.group_price }}</div>
                    <div class="gray3">x{{ item.total_num }}</div>
                  </div>
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="pay_price" label="实付款">
            <template #default="scope" >
              <div v-if="!scope.row.is_top_row">
              <div class="orange">{{ scope.row.pay_price }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="买家">
            <template #default="scope" >
              <div v-if="!scope.row.is_top_row&&scope.row.user">
              <div>{{ scope.row.user.nickName }}</div>
              <div class="gray9">ID：({{ scope.row.user.user_id }})</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="supplier.name" label="使用门店"></el-table-column>
          <el-table-column prop="state_text" label="交易状态">
            <template #default="scope" >
              <div v-if="!scope.row.is_top_row">
              {{ scope.row.state_text }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pay_type.text" label="支付方式">
            <template #default="scope" >
              <div v-if="!scope.row.is_top_row">
              <span class="gray9">{{ scope.row.pay_type.text }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope" >
              <div v-if="!scope.row.is_top_row">
              <el-button @click="addClick(scope.row)" type="primary" link size="small" v-auth="'/store/order/detail'">订单详情
              </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import GroupApi from '@/api/group.js';
  import qs from 'qs';
  import { useUserStore } from '@/store';
  const { userInfo } = useUserStore();
  const { token } = useUserStore();
  export default {
    components: {},
    data() {
      return {
        /*切换菜单*/
        activeName: 'all',
        /*是否加载完成*/
        loading: true,
        /*列表数据*/
        tableData: [],
        /*一页多少条*/
        pageSize: 20,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*横向表单数据模型*/
        searchForm: {
          order_no: '',
          shop_supplier_id: '',
          create_time: ''
        },
        /*门店*/
        supplierList: [],
        /*统计*/
        order_count: {
          all: 0,
          payment: 0,
          delivery: 0,
          received: 0,
          cancel: 0,
          refund: 0
        },
        user_type: '',
		token,
      };
    },
    created() {
      this.getBaseInof();
      /*获取列表*/
      this.getData();
    },
    methods: {
      async getBaseInof() {
        // let res = await store.dispatch('common/getBaseInfo');
        this.user_type = userInfo.user_type;
        if (this.user_type != 0) {
          this.activeName = "complete";
        }

      },
      /*跨多列*/
      arraySpanMethod(row) {
        if (row.rowIndex % 2 == 0) {
          if (row.columnIndex === 0) {
            return [1, 8];
          }
        }
      },
      /*选择第几页*/
      handleCurrentChange(val) {
        let self = this;
        self.curPage = val;
        self.getData();
      },

      /*每页多少条*/
      handleSizeChange(val) {
        this.curPage = 1;
        this.pageSize = val;
        this.getData();
      },

      /*切换菜单*/
      handleClick(tab, event) {
        let self = this;
        self.curPage = 1;
        self.getData();
      },

      /*获取列表*/
      getData() {
        let self = this;
        let Params = this.searchForm;
        Params.dataType = self.activeName;
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        self.loading = true;
        GroupApi.orderList(Params, true)
          .then(res => {
            let list = [];
            for (let i = 0; i < res.data.list.data.length; i++) {
              let item = res.data.list.data[i];
              let topitem = {
                order_no: item.order_no,
                create_time: item.create_time,
                is_top_row: true,
                order_status: item.order_status.value,
              };
              list.push(topitem);
              list.push(item);
            }
            self.tableData.data = list;
            self.totalDataNumber = res.data.list.total;
            self.supplierList = res.data.supplierList;
            self.order_count = res.data.order_count.order_count;
            self.loading = false;
          })
          .catch(error => {});
      },

      /*打开添加*/
      addClick(row) {
        let self = this;
        let params = row.order_id;
        self.$router.push({
          path: '/plus/group/order/detail',
          query: {
            order_id: params
          }
        });
      },
      /*搜索查询*/
      onSubmit() {
        this.curPage = 1;
        this.tableData = [];
        this.getData();
      },
      onExport: function() {
        let baseUrl = window.location.protocol + '//' + window.location.host;
		this.searchForm.token = this.token;
        window.location.href = baseUrl + '/index.php/shop/plus.group.order/export?' + qs.stringify(this.searchForm);
      }
    }
  };
</script>
<style lang="scss">
  .product-info {
    padding: 10px 0;
    border-top: 1px solid #eeeeee;
  }

  .order-code .state-text {
    padding: 2px 4px;
    border-radius: 4px;
    background: #808080;
    color: #ffffff;
  }

  .order-code .state-text-red {
    background: red;
  }

  .table-wrap .product-info:first-of-type {
    border-top: none;
  }

  .table-wrap .el-table__body tbody .el-table__row:nth-child(odd) {
    background: #f5f7fa;
  }
</style>
