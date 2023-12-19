<template>
  <el-dialog title="" v-model="dialogVisible" :before-close="handleClose" :close-on-click-modal="false"
    :close-on-press-escape="false" width="906" class="dialog-search">
    <template #title>
      <div class="dialog-title">修改价格</div>
    </template>
    <div class="dialog-content changeProduct">
      <div class="gray6 f16 tl mb30">当前价格：<span class="yellow  fb" v-if="promodel!=null">{{promodel.price || 0}}</span>
      </div>
      <div class="d-s-c mb30">
        <div class="f16 gray9 mr10"><span class="red">*</span>本次售价</div>
        <el-input placeholder="请输入本次售价" v-model="price" class="input-with-select changeinput">
          <template #append>元</template>
        </el-input>
      </div>
      <keyboard @addNum="addNum" @confirm='submitFunc'></keyboard>
    </div>
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
        price: ''
      };
    },
    props: {
      isChange: Boolean,
      promodel: Object
    },
    watch: {
      isChange: function(n, o) {
        if (n != o) {
          this.dialogVisible = n;
          if (n) {
            this.price = '';
          }
          console.log(this.promodel)
        }
      }
    },
    methods: {
      handleClose(e) {
        this.$emit('close', null);
      },
      addNum(n) {
        this.price += n;
      },
      submitFunc(n) {
        if (n == 'clear') {
          this.price = '';
        } else {
          this.$emit('close', this.price);
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
