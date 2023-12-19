<template>
  <!--
          作者：luoyiming
          时间：2019-10-24
          描述：后台系统头部
      -->
  <div class="common-header">
    <div class="breadcrumb">
      <div class="baseInfo-left-base">
        <span class="name">店铺名称：{{ shop_name }}</span>
        <span class="timer">{{nowDate}}</span>
      </div>
      <div class="header-navbar">
        <div class="header-navbar-icon">
          <span class="text ml4">{{ username }}</span>
        </div>
        <div class="header-navbar-icon" @click="login_out()">
          <span class="icon iconfont icon-tuichu" style="font-size: 20px"></span>
          <!-- <span class="icon iconfont icon-icon11"></span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserApi from '@/api/user.js';
  import { useUserStore} from "@/store";
  const { bus_on, userInfo, afterLogout } = useUserStore();
  import {
    delCookie,
    getCookie
  } from '@/utils/base.js';
  export default {
    data() {
      return {
        menu_title: '首页',
        username: userInfo.userName,
        nowDate: '',
        timer: null,
        shop_name: ''
      };
    },
    created() {
      bus_on('MenuName', res => {
        this.menu_title = res;
      });
      this.getNow();
      this.getData();
    },
    destroyed() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods: {
      getData() {
        let self = this;
        let Params = {};
        UserApi.getVersion(Params, true).then(res => {
            self.shop_name = res.data.user.user.name;
          })
          .catch(error => {});
      },
      getNow() {
        let self = this;
        self.timer = setInterval(function() {
          self.nowDate = self.dateStr(new Date());
        }, 1000);
      },
      //时间转换
      dateStr(date) {
        let Y = date.getFullYear()
        let M = date.getMonth() + 1 - 0 >= 10 ? Number(date.getMonth()) + 1 : '0' + (Number(date.getMonth()) + 1)
        let D = date.getDate() >= 10 ? Number(date.getDate()) : '0' + Number(date.getDate())
        let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
        let m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
        let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
      },
      /*退出登录*/
      login_out() {
        ElMessageBox.confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            UserApi.loginOut(true)
              .then(data => {
				this.logout();
              })
              .catch(error => {});
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消退出'
            });
          });
      },
	  async logout() {
	    await afterLogout();
	    this.$router.push("/login");
	  },
    }
  };
</script>
<style lang="scss">
  .login-out .icon-tuichu {
    color: red;
  }

  .header-navbar-icon .icon-geren9 {
    font-size: 20px;
  }
</style>