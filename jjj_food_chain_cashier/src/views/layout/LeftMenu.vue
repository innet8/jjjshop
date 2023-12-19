<template>
  <!--
    	作者：luoyiming
    	时间：2019-10-24
    	描述：后台系统左侧菜单
    -->
  <div class="left-menu-wrapper">
    <!--主菜单-->
    <div class="menu-wrapper">
      <div class="menu-wrapper-title">
        <div>收银台</div>
        <div>CASHIER </div>
      </div>
      <div class="nav-wrapper">
        <div class="first-menu-content">
          <ul class="nav-ul">
            <li :class="active_menu == index ? 'menu-item router-link-active muneactive' : 'menu-item'"
              v-for="(item, index) in menuList" :key="index" @click="choseMenu(item)">
              <div class="item-box">
                <span :class="'icon iconfont menu-item-icon ' + item.icon"></span>
                <span>{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="launchFullScreen" @click="launchFullScreen">
        <span :class="'icon iconfont menu-item-icon icon-quanping'"></span>
        <div>全屏模式 </div>
      </div>
    </div>
    <!--子菜单-->
    <div class="child-menu-wrapper">
      <div class="child-menu right-animation">
        <ul v-if="active_menu != null">
          <li :class="active_child == index ? 'router-link router-link-active' : 'router-link'"
            v-for="(item, index) in menuList[active_menu]['children']" :key="index" @click="choseMenu(item)">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { useUserStore } from "@/store";
  const { bus_emit } = useUserStore();
  export default {
    components: {},
    data() {
      return {
        fullscreen:false,
        /*选中的菜单*/
        active_menu: null,
        /*子菜单选择*/
        active_child: 0,
        /*菜单数据*/
        menuList: [
          {
            name: '收银',
            icon: 'icon-shouyin',
            path: '/home/index',
          },
          {
            name: '桌台',
            icon: 'icon-icon-test1',
            path: '/table/index',
          },
          {
            name: '订单',
            icon: 'icon-icon-test',
            path: '/order/index',
          },
        ]
      };
    },
    created() {
      /*页面加载判断哪个菜单*/
      this.selectMenu(this.$route);
    },
    watch: {
      //监听路由
      $route(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        this.selectMenu(to);
      }
    },
    methods: {
      /*菜单*/
      selectMenu(to) {
        let path = to.fullPath;
        let idx = this.menuList.findIndex((v)=>{
          return v.path == to.fullPath;
        })
        this.active_menu = 0;
        if(idx > 0){
          this.active_menu = idx;
        }
        // let menu_name = '收银';
        // let menupath = '/' + to.path.split('/')[1];
        // for (let i = 0; i < this.menuList.length; i++) {
        //   /*判断主菜单选择*/
        //   if (menupath == this.menuList[i]['path']) {
        //     menu_name = this.menuList[i]['name'];
        //     this.active_menu = i;
        //     /*判断子菜单选择*/
        //     let path = to.path;
        //     if (this.menuList[i]['children']) {
        //       let childs = this.menuList[i]['children'];
        //       for (let c = 0; c < childs.length; c++) {
        //         if (path == childs[c]['path']) {
        //           menu_name = childs[c]['name'];
        //           this.active_child = c;
        //           break;
        //         } else {
        //           this.active_child = 0;
        //         }
        //       }
        //     }
        //     break;
        //   } else {
        //     this.active_menu = null;
        //   }
        // }
        // this.$emit('selectMenu', this.active_menu);
        // bus_emit('MenuName', menu_name);
      },

      /*点击菜单跳转*/
      choseMenu(item) {
        if (item != null) {
          let path = item.path;
          this.$router.push(path);
        } else {
          this.$router.push('/');
        }
      },
      //开启全屏
      launchFullScreen() {
        this.fullscreen = !this.fullscreen;
        let element = document.documentElement;
        if (this.fullscreen) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozExitFullScreen) {
            document.mozExitFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      },
    }
  };
</script>

<style>
  .home-login .icon-tubiaozhizuomoban- {
    color: #3a8ee6;
    font-size: 28px;
  }

  .menu-item-icon.icon.iconfont {
    font-size: 20px;
  }

  .menu-item .item-box {
    display: flex;
  }
</style>
