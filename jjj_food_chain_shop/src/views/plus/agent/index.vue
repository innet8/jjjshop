<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销
      -->
  <div>
    <!--入驻申请-->
    <Applyindex v-if="activeName == 'Applyindex'"></Applyindex>
    <!--分销商用户-->
    <User v-if="activeName == 'user'" @chang-tab="changTab"></User>
    <!--分销订单-->
    <Order v-if="activeName == 'order'"></Order>
    <!--提现申请-->
    <Cash v-if="activeName == 'cash'"></Cash>
    <!--分销设置-->
    <Setting v-if="activeName == 'setting'"></Setting>
    <!--分销海报-->
    <Poster v-if="activeName == 'poster'"></Poster>

  </div>
</template>
<script>
import { reactive, toRefs, defineComponent } from 'vue';
import { useUserStore } from "@/store";
import Applyindex from './apply/Apply.vue';
import User from './user/User.vue';
import Order from './order/Order.vue';
import Cash from './cash/Cash.vue';
import Setting from './setting/Setting.vue';
import Poster from './poster/Poster.vue';

export default defineComponent({
  components: {
    Applyindex,
    User,
    Order,
    Cash,
    Setting,
    Poster
  },
  setup() {
    const { bus_emit, bus_off, bus_on } = useUserStore();
    const state = reactive({
      bus_emit,
      bus_off,
      bus_on,
      formInline: {
        nick_name: ''
      },
      /*参数*/
      param: {},
      /*当前选中*/
      activeName: '',
      /*切换数组*/
      sourceList: [
        {
          key: 'Applyindex',
          value: '入驻申请',
          path: '/plus/agent/apply/index'
        },
        {
          key: 'user',
          value: '分销商用户',
          path: '/plus/agent/user/index'
        },
        {
          key: 'order',
          value: '分销订单',
          path: '/plus/agent/order/index'
        },
        {
          key: 'cash',
          value: '提现申请',
          path: '/plus/agent/cash/index'
        },
        {
          key: 'setting',
          value: '分销设置',
          path: '/plus/agent/setting/index'
        },
        {
          key: 'poster',
          value: '分销海报',
          path: '/plus/agent/setting/qrcode'
        }
      ],
      /*权限筛选后的数据*/
      tabList: [],
      /*判断third是否有参数*/
      is_third_param: false,
      paramsFlag: false
    })
    const changTab = (name)=>{
      bus_emit('activeValue',name);
    }
    return {
      ...toRefs(state),
      changTab,
    };


  },
  created() {
    this.tabList = this.authFilter();
    if (this.tabList.length > 0) {
      this.activeName = this.tabList[0].key;
    }

    if (this.$route.query.type != null) {
      this.activeName = this.$route.query.type;
    }

    /*监听传插件的值*/
    this.bus_on('activeValue', res => {
      this.activeName = res;
    });
    //发送类别切换
    let params = {
      active: this.activeName,
      list: this.tabList,
      tab_type: 'agent',
    }
    this.bus_emit('tabData', params);



  },
  beforeUnmount() {
    //发送类别切换
    this.bus_emit('tabData', { active: null, tab_type: 'agent', list: [] });
    this.bus_off('activeValue');
  },
  methods: {
    /*权限过滤*/
    authFilter() {
      let list = [];
      for (let i = 0; i < this.sourceList.length; i++) {
        let item = this.sourceList[i];
        if (this.$filter.isAuth(item.path)) {
          list.push(item);
        }
      }
      return list;
    }

  }
});
</script>
