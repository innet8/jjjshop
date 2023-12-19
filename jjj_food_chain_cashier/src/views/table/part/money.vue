<template>
  <el-dialog title="" v-model="dialogVisible" :before-close="handleClose" :close-on-click-modal="false"
    :close-on-press-escape="false" width="906" class="dialog-search">
    <template #title>
      <div class="dialog-title">折扣抹零</div>
    </template>
    <div class="dialog-content changeProduct">
      <div class="gray6 f16 tl mb30">当前价格：<span class="yellow  fb"
          v-if="cartInfo!=null">{{cartInfo.total_price || 0}}</span>
      </div>
      <div class="mb30 d-s-c">
        <el-radio-group v-model="type">
          <el-radio :label="1">改价</el-radio>
          <el-radio :label="2">折扣</el-radio>
          <el-radio :label="3">抹零</el-radio>
        </el-radio-group>
      </div>
      <div class="d-s-c mb30" v-if="type==1">
        <div class="f16 gray6 mr10"><span class="red">*</span>实付价格</div>
        <el-input placeholder="请输入实付价格" v-model="money" class="input-with-select changeinput">
          <template #append>元</template>
        </el-input>
      </div>
      <div class="d-s-c mb30" v-if="type==2">
        <div class="f16 gray6 mr10"><span class="red">*</span>优惠折扣</div>
        <el-input placeholder="请输入实付价格" v-model="rate" class="input-with-select changeinput">
          <template #append>折</template>
        </el-input>
      </div>
      <div class="mb30 d-s-c" v-if="type==3">
        <el-radio-group v-model="discountType">
          <el-radio :label="1">抹分</el-radio>
          <el-radio :label="2">抹角</el-radio>
          <el-radio :label="3">四舍五入到角</el-radio>
          <el-radio :label="4">四舍五入到元</el-radio>
        </el-radio-group>
      </div>
      <keyboard v-if="type!=3" @addNum="addNum" @confirm='submitFunc'></keyboard>
    </div>
    <template #footer>
      <span class="dialog-footer" v-if="type==3">
        <el-button type="primary" @click="submitFunc(true)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import keyboard from '@/components/keyboard/keyboard.vue'
  export default {
    components: {
      keyboard
    },
    data() {
      return {
        dialogVisible: false,
        type: 1,
        money: '',
        rate: 10,
        discountType: 1
      };
    },
    props: {
      is_money: Boolean,
      cartInfo: Object
    },
    watch: {
      is_money: function(n, o) {
        if (n != o) {
          this.dialogVisible = n;
          if (n) {
            this.money = this.cartInfo.pay_price;
            this.type = 1;
            this.rate = 10;
            this.discountType = 1;
          }
          console.log(this.cartInfo)
        }
      }
    },
    methods: {
      handleClose(e) {
        this.$emit('close', null);
      },
      addNum(n) {
        if(this.type==2){
          this.rate += n;
        }else{
          this.money += n;
        }
        
      },
      submitFunc(n) {
        if (n == 'clear') {
          this.money = '';
          this.rate = '';
        } else {
          let params = {};
          if (this.type == 1) {
            if (this.money == '') {
              ElMessage.error('价格不能为空');
            } else {
              params = {
                type: 1,
                money: this.money
              }
            }
          }
          if (this.type == 2) {
            if (this.rate == '') {
              ElMessage.error('折扣不能为空');
            } else {
              params = {
                type: 2,
                rate: this.rate
              }
            }
          }
          if (this.type == 3) {
            params = {
              type: 3,
              discountType: this.discountType
            }
          }
          this.$emit('close', params);
        }
      }
    }
  };
</script>

<style lang="scss">
  .tl {
    text-align: left;
  }

  .yellow {
    color: #FFA500;
  }

  .changeinput {
    width: 297px;
  }

  .changeProduct .changeinput .el-input__inner:focus {
    border-color: #5CB85C;
  }

  .changeProduct .changeinput .el-input__inner:focus {
    border-color: #5CB85C;
  }

  .changeProduct .el-input-group__append {
    color: #FFFFFF;
    background-color: #5CB85C;
    border: 1px solid #5CB85C;
    border-left: none;
    font-size: 16px;

  }

  .mb30 {
    margin-bottom: 30px;
  }

  .dialog-search {
    .el-dialog {
      background: #FBFAF8;
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
    }
  }

  .dialog-title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #49494E;
    line-height: 38px;

  }

  .dialog-content {
    padding: 24px 40px;
    border-top: 1px solid #EEEEEE;
  }
</style>
