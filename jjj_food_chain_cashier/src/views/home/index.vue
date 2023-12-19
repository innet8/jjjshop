<template>
  <!--
    	作者：luoyiming
    	时间：2019-10-24
    	描述：后台系统首页
    -->
  <div class="home-container">
    <el-container class="ww100">
      <!-- 分类-->
      <el-aside width="128px">
        <ul class="category-list">
          <li class="item" @click="categoryFunc(0)" :class="category_id == 0 ? 'active' : ''">全部</li>
          <li class="item" :class="category_id == item.category_id ? 'active' : ''" v-for="(item, index) in categoryList" :key="index" @click="categoryFunc(item.category_id)">
            {{ item.name }}
          </li>
        </ul>
      </el-aside>
      <el-container class="hh100">
        <!-- 顶部操作栏-->
        <el-header class="border-b">
          <div class="d-e-c ww100 hh100 ">
            <el-button style="margin-right: 20px;margin-left: 0;" type="danger" round @click="is_search = true">查询会员</el-button>
            <el-button style="margin-right: 20px;margin-left: 0;" type="info" @click="changeProduct()" round>商品改价</el-button>
            <el-button style="margin-right: 20px;margin-left: 0;" type="info" @click="deleteProduct()" round>商品删行</el-button>
            <el-button style="margin-right: 20px;margin-left: 0;" type="info" @click="clearCart()" round>整单取消</el-button>
            <el-badge style="margin-right: 20px;margin-left: 0;" :value="stayNum" class="item" :hidden="stayNum <= 0">
              <el-button type="info" @click="openStaylist()" round>取单</el-button>
            </el-badge>
            <el-button style="margin-right: 20px;margin-left: 0;" type="info" @click="stayCart()" round>挂单</el-button>
            <el-button style="margin-right: 20px;margin-left: 0;" type="info" @click="changeMoney()" round>折扣/抹零</el-button>
          </div>
        </el-header>
        <el-main class="o-h">
          <el-row :gutter="40">
            <el-col :span="12">
              <div class="mb16">
                <el-input placeholder="请输入内容" v-model="product_name" class="input-with-select">
                  <template #append>
                    <el-button class="search-btn" icon="Search" @click="searchPro"></el-button>
                  </template>
                </el-input>
              </div>
              <div class="scroll-list">
                <div class="product-list ww100" v-infinite-scroll="scrolltolowerFunc" :infinite-scroll-disabled="disableds()">
                <!-- <div class="product-list ww100"> -->
                  <div class="product-item" v-for="(item, index) in listData" :key="item.product_id" @click="addProduct(item)">
                    <img :src="item.image[0].file_path" alt="" />
                    <div class="product-name text-ellipsis-2">{{ item.product_name }}</div>
                    <div class="d-b-c">
                      <span class="product-price">￥{{ item.product_price }}</span>
                      <el-icon class="icon-add"><CirclePlus /></el-icon>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="pl250 b-s-b">
              <el-form size="small" ref="form" :model="model" label-width="" style="text-align: left;">
                <el-form-item label="">收银员： {{ username }}</el-form-item>
                <el-form-item label="">
                  消费方式：
                  <el-radio-group v-model="model.delivery" @change="getCart()">
                    <el-radio :label="40">店内就餐</el-radio>
                    <el-radio :label="30">打包带走</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                  <el-table class="order-table" highlight-current-row @current-change="handleCurrentChange" v-loading="cartloading" :data="tableData" :show-header="false">
                    <el-table-column type="index" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="商品名称">
                      <template #default="scope">
                        <div class="">{{ scope.row.product.product_name }}</div>
                        <div class="gray9 f12">{{ scope.row.describe }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" label="商品价格">
                      <template #default="scope">
                        <span class="red">￥{{ scope.row.price }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="total_num" label="商品数量">
                      <template #default="scope">
                        <el-input-number @change="cartAdd($event, scope.row)" size="mini" v-model="scope.row.product_num" :min="1" label=""></el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
                <el-form-item label="" class="tr">
                  <div>应收：￥{{ cartInfo.total_price }}元</div>
                  <div class="d-e-c ww100">
                    <div class="mr20" v-if="model.delivery == 30">包装费：￥{{ cartInfo.total_bag_price }}元</div>
                    <div class="price-color">优惠：￥{{ cartInfo.discount_money }}元</div>
                  </div>
                  <div>
                    数量{{ cartInfo.cart_total_num }}件,实收：
                    <span class="price-color f24 fb">￥</span>
                    <span class="price-color f28 fb">{{ cartInfo.total_pay_price }}</span>
                    元
                  </div>
                </el-form-item>
                <el-form-item label="" class="">
                  <div class="d-a-c ww100">
                    <button class="close-btn" type="button" @click="clearCart()" :disabled="tableData.length <= 0">整单取消</button>
                    <button class="pay-btn" type="button" @click="is_cash = true" :disabled="tableData.length <= 0">收款￥{{ cartInfo.total_pay_price }}</button>
                  </div>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <Search :is_search="is_search" @close="closeSearch"></Search>
    <Money :is_money="is_money" :cartInfo="cartInfo" @close="closeMoney"></Money>
    <Change :isChange="isChange" :promodel="promodel" @close="closeChange"></Change>
    <Spec :is_pop="is_spec" :detail="detail" @close="closeSpec"></Spec>
    <Cash :is_pop="is_cash" :price="cartInfo.total_pay_price" @close="closeCash"></Cash>
    <Staylist :isStaylist="isStaylist" @close="closeStaylist"></Staylist>
  </div>
</template>

<script>
import { delCookie, getCookie } from '@/utils/base.js';
import UserApi from '@/api/user.js';
import HomeApi from '@/api/home.js';
import Search from './part/serch.vue';
import Money from './part/money.vue';
import Change from './part/change.vue';
import Spec from './part/spec.vue';
import Cash from './part/cash.vue';
import Staylist from './part/staylist.vue';
import { useUserStore } from '@/store';
const { memberInfo, userInfo } = useUserStore();
export default {
  components: {
    Search,
    Money,
    Spec,
    Cash,
    Change,
    Staylist
  },
  data() {
    return {
      promodel: null,
      isStaylist: false,
      isChange: false,
      is_money: false,
      is_search: false,
      is_spec: false,
      is_cash: false,
      detail: null,
      loading: true,
      cartloading: true,
      category_id: 0,
      cart_id: 0,
      curPage: 1,
      pageSize: 20,
      listData: [],
      last_page: 1,
      no_more: true,
      username: userInfo && userInfo.userName,
      // version: '',
      product_name: '',
      tableData: [],
      model: {
        delivery: 40
      },
      pay_model: {},
      categoryList: [],
      cartInfo: {
        cart_total_num: 0,
        /* 优惠金额*/
        discount_money: '',
        line_money: 0,
        total_bag_price: 0,
        total_pay_price: 0,
        total_price: 0
      },
      productList: [],
      stayNum: 0
    };
  },
  computed: {},
  created() {
    /*获取数据*/
    // this.getTableList();
    this.getCategory();
    this.getCart();
  },
  methods: {
    noMore() {
      return this.last_page >= this.curPage;
    },
    disableds() {
      return this.loading || this.noMore();
    },
    /*获取数据*/
    getTableList() {
      let self = this;
      let Params = {};
      UserApi.getVersion(Params, true)
        .then(data => {
          // self.loading = false;
          self.version = data.data.version;
        })
        .catch(error => {
          // self.loading = false;
        });
    },
    getCart() {
      let self = this;
      let Params = {
        delivery: self.model.delivery
      };
      self.cartloading = true;
      HomeApi.cartList(Params, true)
        .then(res => {
          self.cartloading = false;
          self.tableData = res.data.productList;
          self.cartInfo = res.data.cartInfo;
          self.stayNum = res.data.stayNum;
        })
        .catch(error => {
          self.cartloading = false;
        });
    },
    /* 购物车商品添加 */
    cartAdd(e, goods) {
      let self = this;
      let product_id = goods.product_id;
      let product_num = e >= 1 ? e : 1;
      HomeApi.subProduct(
        {
          product_num: product_num,
          cart_id: goods.cart_id,
          type: 'mid'
        },
        true
      )
        .then(res => {
          self.getCart();
        })
        .catch(error => {});
    },
    handleCurrentChange(val) {
      if (val) {
        this.cart_id = val.cart_id;
        this.promodel = val;
      }
    },
    changeMoney() {
      if (this.tableData.length <= 0) {
        return;
      }
      this.is_money = true;
    },
    changeProduct() {
      if (!this.promodel) {
        ElMessage({
          message: '请选择商品',
          type: 'warning'
        });
        return;
      }
      this.isChange = true;
    },
    deleteProduct() {
      let self = this;
      if (!self.cart_id) {
        return;
      }
      let Params = {
        cart_id: self.cart_id
      };
      console.log(this.promodel);
      // return
      let attr = this.promodel.describe ? '(' + this.promodel.describe + ')' : '';
      let text = '确定要删除' + this.promodel.product.product_name + attr + '吗?';
      ElMessageBox.confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.cartloading = true;
        HomeApi.delProduct(Params, true).then(res => {
          self.cart_id = 0;
          self.getCart();
          ElMessage({
            message: res.msg,
            type: 'success'
          });
        });
      });
    },
    stayCart() {
      let self = this;
      HomeApi.stay({}, true).then(res => {
        self.getCart();
        ElMessage({
          message: res.msg,
          type: 'success'
        });
      });
    },
    openStaylist() {
      this.isStaylist = true;
    },
    clearCart() {
      let self = this;
      if (self.tableData.length <= 0) {
        return;
      }
      let Params = {};
      ElMessageBox.confirm('确定要整单取消吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.cartloading = true;
        HomeApi.delStay(Params, true).then(res => {
          self.getCart();
          ElMessage({
            message: res.msg,
            type: 'success'
          });
        });
      });
    },
    getCategory() {
      let self = this;
      let Params = {};
      HomeApi.getCategory(Params, true)
        .then(res => {
          self.categoryList = res.data.list;
          self.getProduct();
        })
        .catch(error => {});
    },
    categoryFunc(e) {
      if (this.loading || this.category_id == e) {
        return;
      }
      this.loading = true;
      this.category_id = e;
      this.curPage = 1;
      this.listData = [];
      this.getProduct();
    },
    searchPro() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.curPage = 1;
      this.listData = [];
      this.getProduct();
    },
    getProduct(params) {
      let self = this;
      self.loading = true;
      let Params = {
        category_id: self.category_id,
        page: self.curPage,
        list_rows: self.pageSize,
        search: self.product_name
      };
      HomeApi.getProduct(Params, true)
        .then(res => {
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        })
        .catch(error => {
          self.loading = false;
        });
    },
    addProduct(item) {
      this.detail = item;
      this.is_spec = true;
    },
    addCart(params) {
      let self = this;
      let Params = params;
      Params.delivery = self.model.delivery;
      HomeApi.addCart(Params, true)
        .then(res => {
          self.getCart();
        })
        .catch(error => {
          // self.loading = false;
        });
    },
    closeSpec(e) {
      console.log(e);
      if (e && e != null && e != 'undefined') {
        this.addCart(e);
      }
      this.detail = null;
      this.is_spec = false;
    },
    closeStaylist(e) {
      let self = this;
      if (e && e != null && e != 'undefined') {
        if (e == 'delete') {
          self.getCart();
          return;
        }
        if (self.tableData.length > 0) {
          ElMessage.error('请先将购物车内的商品挂单或结账后再取单');
          return;
        } else {
          HomeApi.pick(
            {
              cart_no: e
            },
            true
          ).then(res => {
            self.getCart();
          });
        }
      }
      this.isStaylist = false;
    },
    closeCash(e) {
      let self = this;
      if (e && e != null) {
        let Params = {
          pay_type: e,
          delivery: self.model.delivery,
          user_id: 0
        };
        /* if (this.$store.state.user.menber) {
          Params.user_id = this.$store.state.user.menber.user_id;
        } */
        if (memberInfo) {
          Params.user_id = memberInfo.user_id;
        }
        HomeApi.orderBuy(Params, true)
          .then(res => {
            self.getCart();
            ElMessage({
              message: res.msg,
              type: 'success'
            });
          })
          .catch(error => {
          ElMessage.error(error.msg);
            // self.loading = false;
          });
      }
      this.pay_model = null;
      this.is_cash = false;
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      console.log('scroll');
      let self = this;
      if (self.loading || self.curPage >= self.last_page) {
        return;
      }
      self.loading = true;
      self.curPage++;
      self.getProduct();
    },
    closeSearch(e) {
      console.log(e);
      this.is_search = false;
    },
    closeMoney(e) {
      let self = this;
      if (e) {
        let Params = e;
        HomeApi.changeMoney(Params, true).then(res => {
          self.cart_id = 0;
          self.getCart();
          ElMessage({
            message: res.msg,
            type: 'success'
          });
        });
      }
      this.is_money = false;
    },
    closeChange(e) {
      let self = this;
      if (e) {
        let Params = {
          cart_id: self.promodel.cart_id,
          price: e
        };
        HomeApi.changePrice(Params, true).then(res => {
          self.cart_id = 0;
          self.getCart();
          ElMessage({
            message: res.msg,
            type: 'success'
          });
        });
      }
      this.isChange = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input-number__decrease:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled),
.el-input-number__increase:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled) {
  border-color: #ffa500;
}

.el-input-number--mini {
  max-width: 100%;
}

.f12 {
  font-size: 12px;
}

.mr20 {
  margin-right: 20px;
}

.o-h {
  overflow: hidden;
}
.el-main.o-h {
  overflow: hidden;
}
.el-main.o-h {
  overflow: hidden !important;
}
.f28 {
  font-size: 28px;
}

.f24 {
  font-size: 24px;
}

.tr {
  text-align: right;
}

.b-s-b {
  box-sizing: border-box;
}

.pl50 {
  padding-left: 50px;
}

.el-table .cell {
  padding-left: 0;
}

.home-container {
  height: calc(100vh - 87px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: center;
  flex-direction: column;
  overflow: hidden;
  .close-btn {
    width: 202px;
    height: 46px;
    background: linear-gradient(0deg, #409eff, #409eff);
    border-radius: 23px;
    text-align: center;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }

  .close-btn:disabled {
    background: rgba($color: #409eff, $alpha: 0.6);
  }

  .pay-btn {
    width: 202px;
    height: 46px;
    background: linear-gradient(0deg, #ff8425, #ffa92e);
    border-radius: 23px;
    text-align: center;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }

  .pay-btn:disabled {
    background: rgba($color: #ffa92e, $alpha: 0.6);
  }

  .price-color {
    color: #f4463b;
  }

  // background: url(/static/imgs/home_bg.jpg) center center no-repeat;
  button.search-btn {
    background-color: #ffa500;
    color: #ffffff;
    font-size: 14px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .order-table {
    overflow: auto;
    // height: calc(100vh - 488px);
    height: calc(100vh - 430px);
  }

  .order-table .el-input__inner {
    border-color: #ffa500;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #ffa500;
    background: #ffa500;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #ffa500;
  }

  .el-radio__inner:hover {
    border-color: #ffa500;
  }

  .el-input-number__decrease,
  .el-input-number__increase {
    background: #ffa500;
    color: #eeeeee;
    border-color: #ffa500;
  }
}

.home-container .home-title {
  padding: 20px;
  text-align: center;
  white-space: nowrap;
  text-align: center;
  font-size: 40px;
  color: #409eff;
}

.home-container .home-des {
  color: #888888;
}

.home-index {
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  min-width: 1000px;
  overflow-x: auto;
}

.category-list {
  background-color: #ededee;
  height: 100%;
  width: 100%;
  padding-top: 53px;
  box-sizing: border-box;

  .item {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    padding-left: 17px;
    text-align: left;
    cursor: pointer;
  }

  .item.active {
    color: #ffa500;
    position: relative;
  }

  .item.active::after {
    content: '';
    width: 5px;
    height: 28px;
    background: #49494e;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
  }
}

.scroll-list {
  height: calc(100vh - 243px);
  overflow-y: auto;
}

.home-container .product-list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  .product-item {
    flex-shrink: 0;
    width: 133px;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;

    img {
      width: 133px;
      height: 112px;
      border-radius: 10px;
      margin-bottom: 8px;
    }

    .product-name {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      margin-bottom: 8px;
      height: 42px;
      text-align: left;
    }

    .product-price {
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: bold;
      color: #f4463b;
      line-height: 38px;
    }

    .icon-add {
      color: #ffa500;
      font-size: 18px;
    }
  }
}

.order-table::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.order-table::-webkit-scrollbar-thumb {
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

.order-table::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.scroll-list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.scroll-list::-webkit-scrollbar-thumb {
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

.scroll-list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #ffa500;
}

.home-container .el-table__body tr.current-row > td.el-table__cell {
  background-color: rgba($color: #409eff, $alpha: 0.2);
}
</style>
