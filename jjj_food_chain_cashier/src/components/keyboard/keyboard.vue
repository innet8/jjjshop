<template>
  <div class="keyboard">
    <el-row>
      <el-col :span="18">
        <el-row>
          <el-col :span="8">
            <div class="key-num" @click="addNum('1')">1</div>
          </el-col>
          <el-col :span="8">
            <div class="key-num" @click="addNum('2')">2</div>
          </el-col>
          <el-col :span="8">
            <div class="key-num" @click="addNum('3')">3</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="key-num" @click="addNum('4')">4</div>
          </el-col>
          <el-col :span="8">
            <div class="key-num" @click="addNum('5')">5</div>
          </el-col>
          <el-col :span="8">
            <div class="key-num" @click="addNum('6')">6</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="key-num" @click="addNum('7')">7</div>
          </el-col>
          <el-col :span="8">
            <div class="key-num" @click="addNum('8')">8</div>
          </el-col>
          <el-col :span="8">
            <div class="key-num" @click="addNum('9')">9</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <div class="key-num w-x2" @click="addNum('.')">.</div>
          </el-col>
          <el-col :span="8">
            <div class="key-num" @click="addNum('0')">0</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="key-num clear-btn" @click="submitFunc('clear')">清空</div>
        <div class="key-num submit-btn" @click="submitFunc('confirm')">确认</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      addNum(n) {
        this.$emit('addNum', n);
      },
      submitFunc(type) {
        this.$emit('confirm', type)
      }
    }
  };
</script>

<style lang="scss">
  .keyboard {
    border-left: 1px solid #EEEEEE;
    border-top: 1px solid #EEEEEE;
  }

  .key-num {
    height: 80px;
    background: #FBFAF8;
    border-right: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
    font-size: 22px;
    font-family: Arial;
    font-weight: 400;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .key-num.clear-btn {
    height: 159px;
    font-size: 22px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
  }

  .key-num.submit-btn {
    height: 159px;
    background: linear-gradient(0deg, #FF8425, #FFA92E);
    color: #FFFFFF;
    font-size: 22px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
  }

  .key-num:active {
    background: #8e8e8e;

  }

  .key-num:hover {
    background: #e4e4e4;
  }
</style>
