<template>
  <!--
      作者：luoyiming
      时间：2019-10-25
      描述：订单列表
  -->
  <div class="user">
    <el-row class="user">
      <el-col :span="detail!=null?16:24" class="cashier-order p20" :style="detail!=null?'padding-right:0':''">
        <!--搜索表单-->
        <div class="common-seach-wrap">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="订单号">
              <el-input v-model="searchForm.search" placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item label="下单时间">
              <el-radio-group v-model="searchForm.time_type">
                <el-radio-button :label="1">今天</el-radio-button>
                <el-radio-button :label="2">昨天</el-radio-button>
                <el-radio-button :label="3">一周</el-radio-button>
                <el-radio-button :label="0">全部</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="起始时间">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="searchForm.time" type="daterange" value-format="YYYY-MM-DD"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="onSubmit">搜索</el-button>
            </el-form-item>
            <!--  <el-form-item>
              <el-button type="success" @click="onExport" v-auth="'/order/order/operate/export'">导出</el-button>
            </el-form-item> -->
          </el-form>
        </div>
        <!--内容-->
        <div class="product-content">
          <div class="table-wrap">
            <el-tabs :model-value="searchForm.eat_type" @tab-change="orderTypeClick">
              <el-tab-pane label="收银订单" :name="'20'"></el-tab-pane>
              <el-tab-pane label="桌台订单" :name="'10'"></el-tab-pane>
            </el-tabs>
            <div class="d-s-c mb16">
              <el-button class="mr16" size="medium" :type="activeName==1?'danger':''" @click="handleClick(1)" round>待完成
              </el-button>
              <el-button class="mr16" size="medium" :type="activeName==2?'danger':''" @click="handleClick(2)" round>已完成
              </el-button>
              <el-button class="mr16" size="medium" :type="activeName==3?'danger':''" @click="handleClick(3)" round>已取消
              </el-button>
              <el-button class="mr16" size="medium" :type="activeName==0?'danger':''" @click="handleClick(0)" round>全部
              </el-button>
            </div>
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="'待完成'" name="1"></el-tab-pane>
              <el-tab-pane :label="'已完成'" name="2"></el-tab-pane>
              <el-tab-pane :label="'已取消'" name="3"></el-tab-pane>
              <el-tab-pane label="全部" name="0"></el-tab-pane>
            </el-tabs> -->
            <el-table :data="tableData" style="width: 100%" v-loading="loading"
              @current-change="openDetail">
              <el-table-column prop="callNo" label="名称">
                <template #default="scope">
                  <div class="orange f20 fb tc" style="line-height: 84px;">
                    {{ scope.row.eat_type==20?scope.row.callNo: scope.row.table_no }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="order_no" label="订单号"></el-table-column>
              <el-table-column prop="pay_time_text" label="支付时间">
                <template #default="scope">
                  <div class="">{{ scope.row.pay_status.value==20?scope.row.pay_time_text:'——' }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="pay_price" label="实付金额">
                <template #default="scope">
                  <div class="">{{ scope.row.pay_price }} <span
                      :class="scope.row.refund_money>0?'red':'green'">({{scope.row.refund_money>0?'已退款:￥'+scope.row.refund_money:scope.row.pay_status.text}})</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="callNo" label="消费方式">
                <template #default="scope">
                  <div class="">{{ scope.row.pay_type.text }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="state_text" label="状态"></el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
              :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
              :total="totalDataNumber"></el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="detail!=null?8:0" v-if="detail!=null" class="cashier-order-right p20">
        <el-form v-loading="loading" ref="form" :model="detail">
          <!--添加门店-->
          <div class="common-form">顾客信息</div>
          <el-form-item label="" :rules="[{required: true,message: ' '}]" prop="name">
            <div class="d-b-c pl20 ww100">
              <div class="flex-1">用户昵称：无</div>
              <div class="flex-1">手机号：无</div>
            </div>
          </el-form-item>
          <div class="common-form border-t">订单信息</div>
          <el-form-item label="" prop="customer">
            <div class="d-b-c pl20 ww100">
              <div class="flex-1">订单来源：{{detail.order_source_text}}</div>
              <div class="flex-1">取单号：{{detail.callNo}}</div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="customer">
            <div class="d-b-c pl20 ww100">
              <div class="flex-1">就餐方式：{{detail.delivery_type.text}}</div>
              <div class="flex-1">订单号：{{detail.order_no}}</div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="customer">
            <div class="d-b-c pl20 ww100">
              <div class="flex-1">订单金额：{{detail.order_price}}</div>
              <div class="flex-1">订单优惠：{{detail.discount_money}}</div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="customer">
            <div class="d-b-c pl20 ww100">
              <div class="flex-1">实付金额：{{detail.pay_price}}</div>
              <div class="flex-1">支付方式：{{detail.pay_type.text}}</div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="customer" class=" border-t pl20" max-height="300">
            <el-table :data="detail.product" style="width: 100%" v-loading="detail==null">
              <el-table-column prop="product_name" label="商品名称">
                <template #default="scope">
                  <div class="f14 ">{{ scope.row.product_name }}</div>
                  <div class="f12 mt10 gray9">{{ scope.row.product_attr }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="product_price" label="单价"></el-table-column>
              <el-table-column prop="total_num" label="数量"></el-table-column>
              <el-table-column prop="total_price" label="金额"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="" prop="customer">
            <div class="d-e-c pr20">
              <div class="mr20" v-if="detail.bag_price>0">包装费：{{detail.bag_price}}元</div>
              <div class="mr20" v-if="detail.service_money>0">服务费：{{detail.service_money}}元</div>
              <div class="mr20" v-if="detail.refund_money>0">退款金额：{{detail.refund_money}}元</div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="customer">
            <div class="d-e-c ww100">
              <el-button class="mr16" size="medium" type="info" @click="print">打印小票</el-button>
              <!-- <el-button  class="mr16" type="primary">取单并叫号</el-button> -->
              <el-button class="mr16" size="medium" type="danger"
                v-if="detail.order_status.value==10&&detail.pay_status.value==20" @click="openRefund">
                退款
              </el-button>
              <el-button class="mr16" size="medium" type="success" @click="settleFunc"
                v-if="detail.order_status.value==10&&detail.pay_status.value==20">完成
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <Refund v-if="detail!=null" @close='closeRefund' :is_pop='is_refund' :price="detail.pay_price"></Refund>
  </div>
</template>
<script>
  import OrderApi from '@/api/order.js';
  import Refund from './part/refund.vue'
  import qs from 'qs';
  export default {
    components: {
      Refund
    },
    data() {
      return {
        order_type: 'second',
        is_refund: false,
        detail: null,
        /*切换菜单*/
        activeName: 0,
        /*是否加载完成*/
        loading: true,
        /*列表数据*/
        tableData: [],
        /*一页多少条*/
        pageSize: 10,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*横向表单数据模型*/
        searchForm: {
          search: '',
          time: '',
          eat_type: '20',
          time_type: 1,
        },
        /*配送方式*/
        exStyle: [],
        /*门店列表*/
        shopList: [],
        /*时间*/
        create_time: '',
        /*统计*/
        order_count: {
          payment: 0,
          delivery: 0,
          received: 0
        },
        dialogBatchDelivery: false,
        /*是否打开编辑弹窗*/
        open_edit: false,
        /*当前编辑的对象*/
        order_no: 0,
      };
    },
    created() {
      /*获取列表*/
      this.getData();
    },
    methods: {
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
      orderTypeClick(tab) {
        let self = this;
        self.curPage = 1;
        self.searchForm.eat_type = tab;
        self.getData();
      },
      /*切换菜单*/
      handleClick(n) {
        let self = this;
        if (n == self.activeName) {
          return
        }
        self.activeName = n;
        self.curPage = 1;
        self.getData();
      },

      /*获取列表*/
      getData() {
        let self = this;
        let Params = self.searchForm;
        Params.dataType = self.activeName;
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        self.loading = true;
        OrderApi.getList(Params, true)
          .then(res => {
            self.tableData = res.data.list.data;
            if (self.tableData.length > 0) {
              self.openDetail(self.tableData[0])
            }
            self.totalDataNumber = res.data.list.total;
            self.loading = false;
          })
          .catch(error => {});
      },
      /*打开取消*/
      cancelClick(item) {
        this.order_no = item.order_no;
        this.open_edit = true;
      },
      /*关闭弹窗*/
      closeDialogFunc(e, f) {
        if (f == 'edit') {
          this.open_edit = e.openDialog;
          if (e.type == 'success') {
            this.getData();
          }
        }
      },
      /*打开添加*/
      addClick(row) {
        let self = this;
        let params = row.order_id;
        self.$router.push({
          path: '/order/order/Detail',
          query: {
            order_id: params
          }
        });
      },
      settleFunc() {
        let self = this;
        let Params = {
          order_id: self.detail.order_id
        };
        ElMessageBox.confirm('确定要完成订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          OrderApi.settle(Params, true)
            .then(res => {
              ElMessage({
                message: res.msg,
                type: 'success'
              });
              self.detail = null;
              self.getData();
            })
            .catch(error => {
              self.loading = false;
            });
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          });
        });
      },
      print() {
        let self = this;
        let Params = {
          order_id: self.detail.order_id
        };
        ElMessageBox.confirm('确定要打印小票吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          OrderApi.print(Params, true)
            .then(res => {
              self.loading = false;
              ElMessage({
                message: res.msg,
                type: 'success'
              });
            })
            .catch(error => {
              self.loading = false;
            });
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          });
        });
      },
      openRefund() {
        this.is_refund = true;
      },
      closeRefund(e) {
        let self = this;
        if (e && e != "undefined") {
          let Params = {
            order_id: self.detail.order_id,
            refund_money: e
          };
          self.loading = true;
          OrderApi.refund(Params, true)
            .then(res => {
             ElMessage({
                message: res.msg,
                type: 'success'
              });
              self.detail = null;
              self.getData();
            })
            .catch(error => {
              self.loading = false;
            });
        }
        this.is_refund = false;
      },
      /*搜索查询*/
      onSubmit() {
        this.curPage = 1;
        this.tableData = [];
        this.getData();
      },
      onExport: function() {
        let baseUrl = window.location.protocol + '//' + window.location.host;
        window.location.href = baseUrl + '/index.php/shop/order.operate/export?' + qs.stringify(this.searchForm);
      },
      // 显示批量发货说明
      showBatchDelivery() {
        this.dialogBatchDelivery = true;
      },
      /*跳转物流公司*/
      gotoExpress() {
        let self = this;
        self.$router.push('/setting/express/index');
      },

      /*选择图片之前*/
      onBeforeUploadImage(file) {
        var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        const isEXCEL = fileType === 'xlsx';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isEXCEL) {
          ElMessage.error('上传文件只能是excel格式!');
        }
        if (!isLt10M) {
          ElMessage.error('上传文件大小不能超过 10MB!');
        }
        return isEXCEL && isLt10M;
      },
      openDetail(val) {
        this.detail = val;
      },
      /*上传图片*/
      UploadImage(param) {
        let self = this;
        const loading = this.$loading({
          lock: true,
          text: '正在处理,请等待',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const formData = new FormData();
        formData.append('iFile', param.file);
        OrderApi.batchDelivery(formData)
          .then(response => {
            loading.close();
            self.dialogBatchDelivery = false;
            ElMessage({
              message: response.msg,
              type: 'warning'
            });
          })
          .catch(response => {
            loading.close();
            ElMessage({
              message: '本次处理失败',
              type: 'warning'
            });
            param.onError();
          });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .cashier-order::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .cashier-order::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 0;
    background-color: #909399;
    // background-image: -webkit-linear-gradient(45deg,
    //     rgba(255, 255, 255, 0.2) 25%,
    //     transparent 25%,
    //     transparent 50%,
    //     rgba(255, 255, 255, 0.2) 50%,
    //     rgba(255, 255, 255, 0.2) 75%,
    //     transparent 75%,
    //     transparent);
  }

  .cashier-order::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.02);
    background: #ededed;
    border-radius: 0;
  }

  .cashier-order {
    height: calc(100vh - 87px);
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #FFF;
      background: #5CB85C;
      border-color: #5CB85C;
      -webkit-box-shadow: -1px 0 0 0 #5CB85C;
      box-shadow: -1px 0 0 0 #5CB85C;
    }

    .el-radio-button__inner:hover {
      color: #5CB85C;
    }

    .product-content .el-button:hover {
      background: #f78989;
      border-color: #f78989;
      color: #FFF;
    }

    .product-content .el-button:focus {
      background: #f78989;
      border-color: #f78989;
      color: #FFF;
    }

  }



  .cashier-order-right {
    padding-left: 0;
    height: calc(100vh - 87px);
    background: rgba($color: #E3EDF7, $alpha: 0.6);
    box-sizing: border-box;
    overflow-y: auto;

    .el-table td.el-table__cell,
    .el-table th.el-table__cell.is-leaf {
      border: none;
      background: rgba($color: #E3EDF7, $alpha: 0.6);
    }

    .el-pagination {
      padding: 2px 20px;
    }
  }

  .pr20 {
    padding-right: 20px;
  }

  .pl20 {
    padding-left: 20px;
  }

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

  .user {
    min-height: calc(100vh - 87px);
  }

  .user .el-tabs__header {
    background: #EFEFEF;
    padding: 0 22px;
  }

  .user .el-tabs__nav-wrap::after {
    width: 0;
  }

  .user .el-tabs__item.is-active {
    color: #FFA500;
  }

  .user .el-tabs__item:hover {
    color: #FFA500;
  }

  .user .el-tabs__active-bar {
    background-color: #FFA500;
  }

  .table-wrap .el-table__body tbody .el-table__row:nth-child(odd) {
    background: #f5f7fa;
  }

  .cashier-order-right .border-t {
    border-color: rgba($color: #409EFF, $alpha: 0.1);
  }

  .cashier-order-right::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .cashier-order-right::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #909399;
    // background-image: -webkit-linear-gradient(45deg,
    //     rgba(255, 255, 255, 0.2) 25%,
    //     transparent 25%,
    //     transparent 50%,
    //     rgba(255, 255, 255, 0.2) 50%,
    //     rgba(255, 255, 255, 0.2) 75%,
    //     transparent 75%,
    //     transparent);
  }

  .cashier-order-right::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
</style>
