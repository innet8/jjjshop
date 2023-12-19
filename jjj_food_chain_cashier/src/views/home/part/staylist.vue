<template>
  <el-dialog title="" v-model="dialogVisible" :before-close="handleClose" :close-on-click-modal="false"
    :close-on-press-escape="false" width="906" class="dialog-search">
    <template #title>
      <div class="dialog-title">取单</div>
    </template>
    <div>
      <div v-for="(item,index) in list" :key="index" class="stay-item">
        <div class="d-b-c mb20">
          <div class="f16 fb gray3">订单总价：<span class="redF4">￥</span><span class="redF4 f24">{{item.total_price}}</span>
          </div>
          <div class="gray3">挂单时间：<span class="f14 gray9">{{item.stay_time}}</span></div>
        </div>
        <el-row class="mb16" :gutter="20" v-for="(pro,proindex) in item.product" :key="proindex">
          <el-col :span="6">
            <div class="tl">{{pro.product.product_name}}</div>
          </el-col>
          <el-col :span="8">
            <div>￥{{pro.product_price}}</div>
          </el-col>
          <el-col :span="6">
            <div>X{{pro.product_num}}</div>
          </el-col>
        </el-row>
        <div class="d-e-c ww100">
          <el-button type="danger" size="medium" @click="delStay(item)">删除</el-button>
          <el-button type="success" size="medium" @click="pick(item)">取单</el-button>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" size="medium" @click="handleClose" round>取 消</el-button>
        <el-button type="warning" size="medium" @click="handleClose" round>确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import HomeApi from '@/api/home.js';
  export default {
    data() {
      return {
        dialogVisible: false,
        list: []
      };
    },
    props: {
      isStaylist: Boolean
    },
    watch: {
      isStaylist: function(n, o) {
        if (n != o) {
          this.dialogVisible = n;
          if (n) {
            this.getData();
          }
        }
      }
    },
    methods: {
      getData() {
        let self = this;
        HomeApi.stayList({}, true).then(res => {
          self.list = res.data.productList;
        })
      },
      delStay(e) {
        let self = this;
        HomeApi.delCart({
          cart_no: e.cart_no
        }, true).then(res => {
          self.getData()
          self.$emit('close', 'delete');
        })
      },
      pick(e) {
        this.$emit('close', e.cart_no);
      },
      handleClose(done) {
        this.$emit('close', null);
      }
    }
  };
</script>

<style lang="scss">
  .f24 {
    font-size: 24px;
  }

  .redF4 {
    color: #F4463B;
  }

  .mb16 {
    margin-bottom: 16px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .tl {
    text-align: left;
  }

  .dialog-title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #49494E;
    line-height: 38px;

  }

  .stay-item {
    background: #F8F8F8;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
    margin-bottom: 21px;
    padding: 20px 30px;
    box-sizing: border-box;
  }
</style>
