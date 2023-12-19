<template>
  <el-dialog title="" v-model="dialogVisible" :before-close="handleClose" :close-on-click-modal="false"
    :close-on-press-escape="false" width="906" class="dialog-search">
    <template #title>
      <div class="dialog-title">可退款金额：{{price}}元</div>
    </template>
    <div class="dialog-content">
      <div class="gray6 f12 mb16">请输入退款金额</div>
      <el-input placeholder="请输入退款金额" v-model="num" class="input-with-select mb30">
        <template #append>
          <el-button class="search-btn" icon="Search"></el-button>
        </template>
      </el-input>
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
        num: ''
      };
    },
    props: ['is_pop', 'price'],
    watch: {
      is_pop: function(n, o) {
        if (n != o) {
          this.dialogVisible = n;
        }
      }
    },
    methods: {
      handleClose(e) {
        this.$emit('close', null);
      },
      addNum(n) {
        this.num += n;
      },
      submitFunc(n) {
        if (n == 'clear') {
          this.num = '';
        } else {
          if (this.num > this.price * 1) {
            ElMessage.error('超出可退款金额');
            return
          }
          this.$emit('close', this.num);
        }
      }
    }
  };
</script>

<style lang="scss">
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
