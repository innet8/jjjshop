<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-配送员-配送员订单
      -->
  <div class="user">
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="佣金结算">
          <el-select v-model="formInline.is_settled" placeholder="是否结算佣金">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="已结算" value="1"></el-option>
            <el-option label="未结算" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="formInline.user_id" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input size="small" v-model="formInline.order_no" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table :data="tableData" size="small" border style="width: 100%" v-loading="loading">
          <el-table-column prop="order_master.create_time" label="商品信息">
            <template #default="scope">
              <div class="product-info" v-for="(item, index) in scope.row.order_master.product" :key="index">
                <div class="pic"><img v-img-url="item.image.file_path" alt="" /></div>
                <div class="info">
                  <div class="name gray3 product-name">
                    <span>{{ item.product_name }}</span>
                  </div>
                  <div class="gray9" v-if="item.product_attr">{{ item.product_attr }}</div>
                  <div class="orange" v-if="item.refund">{{ item.refund.type.text }}-{{ item.refund.status.text }}
                  </div>
                </div>
                <div class="d-c-c d-c">
                  <div class="orange">￥ {{ item.product_price }}</div>
                  <div class="gray3">x{{ item.total_num }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="order_master.order_no" label="订单号" width="150">
          </el-table-column>
          <el-table-column prop="create_time" label="时间" width="150">
          </el-table-column>
          <el-table-column prop="referee.value" label="配送员" width="150">
            <template #default="scope">
              <span class="gray9">用户ID：{{ scope.row.user_id }}</span><br>
              <span class="fb orange">姓名：{{ scope.row.driverUser.real_name }}</span><br>
              <span class="fb orange">手机号：{{ scope.row.driverUser.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="take_fee" label="配送费" width="100"></el-table-column>
          <el-table-column prop="order_master.pay_price" label="实付款" width="100">
            <template #default="scope">
              <span class="fb orange">{{ scope.row.order_master.pay_price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="order_master.user.nickName" label="买家" width="100"></el-table-column>
          <el-table-column prop="mobile" label="交易状态" width="130">
            <template #default="scope">
              <p>
                <span class="gray9">付款状态：</span>
                {{ scope.row.order_master.pay_status.text }}
              </p>
              <p>
                <span class="gray9">配送状态：</span>
                {{ scope.row.order_master.delivery_status.text }}
              </p>
              <p>
                <span class="gray9">送达状态：</span>
                {{ scope.row.order_master.receipt_status.text }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="referee.value" label="佣金结算" width="70">
            <template #default="scope">
              <span class="green" v-if="scope.row.is_settled == 1">已结算</span>
              <span class="red" v-if="scope.row.is_settled == 0">未结算</span>
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
  import DriverApi from '@/api/driver.js';
  export default {
    components: {
      /*编辑组件*/
    },
    data() {
      return {
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
        formInline: {
          is_settled: '-1',
          /*用户ID*/
          user_id: '',
          order_no: ''
        },
        /*是否打开编辑弹窗*/
        open_edit: false,
        /*当前编辑的对象*/
        userModel: {}
      };
    },
    props: {},
    watch: {
      $route(to, from) {
        if (to.query.user_id != null) {
          this.formInline.user_id = to.query.user_id;
        } else {
          this.formInline.user_id = '';
        }
        this.curPage = 1;
        this.getData();
      }
    },
    created() {
      if (this.$route.query.user_id != null) {
        this.formInline.user_id = this.$route.query.user_id;
      }
      /*获取列表*/
      this.getData();
    },
    methods: {
      /*选择第几页*/
      handleCurrentChange(val) {
        let self = this;
        self.curPage = val;
        self.loading = true;
        self.getData();
      },

      /*获取数据*/
      getData(user_id) {
        let self = this;
        let Params = {
          user_id: self.formInline.user_id,
          page: self.curPage,
          list_rows: self.pageSize,
          is_settled: self.formInline.is_settled,
          order_no: self.formInline.order_no
        };

        DriverApi.driverOrder(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total;
          })
          .catch(error => {
            self.loading = false;
          });
      },

      //搜索
      onSubmit() {
        let self = this;
        self.loading = true;
        self.getData();
      },

      /*每页多少条*/
      handleSizeChange(val) {
        this.curPage = 1;
        this.pageSize = val;
        this.getData();
      },

      /*打开弹出层编辑*/
      editClick(item) {
        this.userModel = item;
        this.open_edit = true;
      },

      /*关闭弹窗*/
      closeDialogFunc(e, f) {
        if (f == 'add') {
          this.open_add = e.openDialog;
          if (e.type == 'success') {
            this.getData();
          }
        }
        if (f == 'edit') {
          this.open_edit = e.openDialog;
          if (e.type == 'success') {
            this.getData();
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .referee-name {
    width: 33.333333%;
  }
</style>
