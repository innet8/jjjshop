<template>
  <el-dialog title="" v-model="dialogVisible" :before-close="handleClose" :close-on-click-modal="false"
    :close-on-press-escape="false" width="906" class="dialog-search">
    <template #title>
      <div class="dialog-title">查询会员</div>
    </template>
    <div class="dialog-content">
      <!-- <div v-if="!$store.state.user.menber"> -->
      <div v-if="!memberInfo">
        <div class="gray6 f12 mb10">请输入会员手机号查询会员，输入完毕后点击确认</div>
        <el-input placeholder="请输入会员手机号" v-model="phone" class="input-with-select mb30">
          <template #append>
            <el-button class="search-btn" icon="Search" style="cursor: auto;"></el-button>
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
        <el-button class="mt10" style="font-size: 16px;" type="text" @click="loginout">退出</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import UserApi from '@/api/user.js';
  import keyboard from '@/components/keyboard/keyboard.vue';
  import { useUserStore } from '@/store';
  const { setMember, removeMember, memberInfo } = useUserStore();
  export default {
    components: {
      keyboard
    },
    data() {
      return {
        dialogVisible: false,
        phone: '',
        memberInfo,
      };
    },
    props: {
      is_search: Boolean
    },
    watch: {
      is_search: function(n, o) {
        if (n != o) {
          this.dialogVisible = n;
        }
      }
    },
    methods: {
      handleClose(e) {
        this.$emit('close', e);
      },
      addNum(n) {
        this.phone += n;
      },
      loginout() {
        this.memberInfo = null;
        removeMember();
        // this.$store.commit('user/setMenber', null);
      },
      submitFunc(n) {
        let self = this;
        if (n == 'clear') {
          this.phone = '';
        } else {
          if (self.phone == '') {
            ElMessage.error('请输入会员手机号');
            return
          }
          UserApi.getMenber({
                mobile: self.phone
              },
              true
            )
            .then(res => {
              self.phone = '';
              if (res.data.list.length > 0) {
                setMember(res.data.list[0]);
                this.memberInfo = res.data.list[0];
                // self.$store.commit('user/setMenber', res.data.list[0]);
              } else {
                ElMessage.error('该用户不存在');
              }
            })
            .catch(error => {});
          // this.$emit('close', this.phone);
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
      background: #fbfaf8;
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
    }
  }

  .dialog-title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #49494e;
    line-height: 38px;
  }

  .dialog-content {
    padding: 24px 40px;
    border-top: 1px solid #eeeeee;
  }
</style>
