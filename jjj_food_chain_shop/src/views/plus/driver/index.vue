<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销
      -->
  <div>
    <!--入驻申请-->
    <Apply v-if="activeName == 'apply'"></Apply>
    <!--配送员-->
    <User v-if="activeName == 'user'" @chang-tab="changTab"></User>
    <!--配送订单-->
    <Order v-if="activeName == 'order'"></Order>
    <!--提现申请-->
    <Cash v-if="activeName == 'cash'"></Cash>
    <!--配送设置-->
    <Setting v-if="activeName == 'setting'"></Setting>
    <!--背景海报-->
    <Refund v-if="activeName == 'refund'"></Refund>
  </div>
</template>
<script>
  import { reactive, toRefs, defineComponent } from 'vue';
  import { useUserStore } from "@/store";
  import Apply from './apply/Apply.vue';
  import User from './user/User.vue';
  import Order from './order/Order.vue';
  import Cash from './cash/Cash.vue';
  import Setting from './setting/Setting.vue';
  import Refund from './apply/Refund.vue';

  export default defineComponent({
    components: {
      Apply,
      User,
      Order,
      Cash,
      Setting,
      Refund
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
        sourceList: [{
            key: 'apply',
            value: '入驻申请',
            path: '/plus/driver/apply/index'
          },
          {
            key: 'user',
            value: '配送员',
            path: '/plus/driver/user/index'
          },
          {
            key: 'order',
            value: '配送订单',
            path: '/plus/driver/order/index'
          },
          {
            key: 'cash',
            value: '提现申请',
            path: '/plus/driver/cash/index'
          },
          {
            key: 'setting',
            value: '配送设置',
            path: '/plus/driver/setting/index'
          },
          {
            key: 'refund',
            value: '退出申请',
            path: '/plus/driver/apply/index'
          },
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
      if(this.tabList.length>0){
        this.activeName=this.tabList[0].key;
      }

      if (this.$route.query.type != null) {
        this.activeName = this.$route.query.type;
      }

      /*监听传插件的值*/
      this.bus_on('activeValue', res =>
      {
        this.activeName = res;
      });
      //发送类别切换
      let params = {
          active: this.activeName,
          list: this.tabList,
          tab_type: 'driver',
      }
      this.bus_emit('tabData', params);


    },
    beforeUnmount() {
      //发送类别切换
      this.bus_emit('tabData', {
        active: null,
        tab_type: 'driver',
        list: []
      });
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
<style lang="scss" scoped></style>
