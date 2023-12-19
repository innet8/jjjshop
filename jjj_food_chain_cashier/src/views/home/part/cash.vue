<template>
  <el-drawer :show-close="false" size="40%" v-model="dialogVisible" :with-header="false" :before-close="closeFunc">
    <el-container class="h100vh cash-drawer">
      <el-header class="d-c-c border-b">
        <div class="">
          <el-radio-group v-model="type" @change="changeType" fill="#f3473d">
            <el-radio-button :label="0">现金收款</el-radio-button>
            <!-- 40 -->
            <el-radio-button :label="2">余额收款</el-radio-button>
            <el-radio-button :label="1">其他方式</el-radio-button>
          </el-radio-group>
        </div>
      </el-header>
      <el-main>
        <div class="f24 fb tc">
          应收金额：
          <span style="color: #f3473d;">￥{{ price }}</span>
        </div>
        <template v-if="type == 1">
          <div class="p20 tc f16 mt20">用户通过店内扫码等方式进行支付，确认用户支付成功后，点击确认付款即可完成付款操作。</div>
          <div class="d-a-c ww100">
            <div class="cash-item" @click="cash_type = 50" :class="cash_type == 50 ? 'active' : ''">
              <div class="cash-icon"><img src="@/assets/img/wx.png" /></div>
              微信支付
            </div>
            <div class="cash-item" @click="cash_type = 60" :class="cash_type == 60 ? 'active' : ''">
              <div class="cash-icon"><img src="@/assets/img/zfb.png" /></div>
              支付宝支付
            </div>
            <div class="cash-item" @click="cash_type = 70" :class="cash_type == 70 ? 'active' : ''">
              <div class="cash-icon"><img src="@/assets/img/pos.png" /></div>
              pos刷卡
            </div>
          </div>
        </template>
        <template v-if="type == 2">
          <!-- <div class="m10" v-if="!$store.state.user.menber"> -->
          <div class="m10" v-if="!memberInfo">
            <!-- <div class="cash-item" @click="cash_type=50" :class="cash_type==50?'active':''">会员登陆</div> -->
            <!-- <el-button style="margin-right: 20px;margin-left: 0;" type="danger"  @click="is_search=true">查询会员</el-button> -->
            <div class="gray6 f12 mb10">请输入会员手机号查询会员，输入完毕后点击确认</div>
            <el-input placeholder="请输入会员手机号" v-model="phone" class="input-with-select mb30">
              <template #append>
                <el-button class="search-btn" icon="Search"></el-button>
              </template>
            </el-input>
            <keyboard @addNum="addNum" @confirm="submitFunc"></keyboard>
          </div>
          <div v-else class="mt20">
            <div class="d-b-c border f16 bg-white" style="border-bottom: none;">
              <div class="border-r p20">会员昵称</div>
              <!-- <div class="flex-1 p20" style="color: #f4463b;text-align: left;">{{ $store.state.user.menber.nickName }}</div> -->
              <div class="flex-1 p20" style="color: #f4463b;text-align: left;">{{ memberInfo.nickName }}</div>
            </div>
            <div class="d-b-c border f16 bg-white">
              <div class="border-r p20">余额总计</div>
              <div class="flex-1 p20" style="text-align: left;">{{ memberInfo.balance }}</div>
            </div>
          </div>
          <div class="p10 tc f12 gray9 mt20 mb20" style="background-color: #fef0f0;border: 1px solid #f4463b;">登录会员仅作为积分累计，无法享受其他优惠。</div>
          <!-- <el-button v-if="$store.state.user.menber" class="mt20" style="font-size: 16px;" type="text" @click="loginout">退出</el-button> -->
          <el-button v-if="memberInfo" class="mt20" style="font-size: 16px;" type="text" @click="loginout">退出</el-button>
        </template>
      </el-main>
      <el-footer>
        <div class="d-c-c cash-drawer-btn">
          <button class="close-btn border" type="button" @click="closeFunc(null)">取消收款</button>
          <!-- <button class="pay-btn" type="button" @click="submit" v-if="type != 2 || (type == 2 && $store.state.user.menber)">收款￥{{ price }}</button> -->
          <button class="pay-btn" type="button" @click="submit" v-if="type != 2 || (type == 2 && memberInfo)">收款￥{{ price }}</button>
        </div>
      </el-footer>
    </el-container>
  </el-drawer>
</template>

<script>
import UserApi from '@/api/user.js';
import keyboard from '@/components/keyboard/keyboard.vue';
import { useUserStore } from '@/store';
const { memberInfo, removeMember, setMember } = useUserStore();
export default {
  components: {
    keyboard
  },
  data() {
    return {
      dialogVisible: false,
      type: 0,
      cash_type: 40,
      phone: '',
      memberInfo,
    };
  },
  props: ['is_pop', 'price'],
  watch: {
    is_pop: function(n, o) {
      if (n != o) {
        this.dialogVisible = n;
        // console.log(this.$store.state.user.menber);
      }
    }
  },
  methods: {
    loginout() {
      this.memberInfo = null;
      removeMember();
      // this.$store.commit('user/setMenber', null);
    },
    addNum(n) {
      this.phone += n;
    },
    submitFunc(n) {
      let self = this;
      if (n == 'clear') {
        this.phone = '';
      } else {
        if(this.phone == ''){
          ElMessage.error('请输入会员手机号');
          return
        }
        UserApi.getMenber(
          {
            mobile: self.phone
          },
          true
        )
          .then(res => {
            self.phone = '';
            if (res.data.list.length > 0) {
              // self.$store.commit('user/setMenber', res.data.list[0]);
              this.memberInfo = res.data.list[0];
              setMember(res.data.list[0]);
            } else {
              ElMessage.error('该用户不存在');
            }
          })
          .catch(error => {});
      }
    },
    changeType(e) {
      if (e == 0) {
        this.cash_type = 40;
      } else if (e == 1) {
        this.cash_type = 50;
      } else if (e == 2) {
        this.cash_type = 10;
      }
    },
    closeFunc() {
      this.$emit('close', null);
    },
    submit() {
      this.$emit('close', this.cash_type);
    }
  }
};
</script>

<style lang="scss">
.el-drawer__container .el-drawer__header {
  display: none;
}
.cash-drawer .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #ffa500;
  border-color: #ffa500;
  -webkit-box-shadow: -1px 0 0 0 #ffa500;
  box-shadow: -1px 0 0 0 #ffa500;
}

.cash-drawer {
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
}

.b-s-b {
  box-sizing: border-box;
}

.h100vh {
  height: 100vh;
}

.cash-drawer-btn .close-btn {
  margin-right: 20px;
}

.cash-item {
  border: 1px solid #e9edef;
  position: relative;
  margin-right: 20px;
  width: 160px;
  height: 50px;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.cash-item.active {
  border-color: #ffa500;
}

.cash-icon {
  width: 32px;
  height: 32px;
  margin-right: 4px;
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
