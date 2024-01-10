<template>
  <!--
      	描述：桌位管理
      -->
  <div class="common-seach-wrap">
    <!--会员管理-->
    <user v-if="activeName=='user'"></user>
    <!--等级管理-->
    <grade v-if="activeName=='grade'"></grade>
    <!--积分设置-->
    <points v-if="activeName=='points'"></points>
    <!--积分明细-->
    <pointsdetail v-if="activeName=='pointsdetail'"></pointsdetail>
    <!--余额管理-->
    <balance v-if="activeName=='balance'"></balance>
  </div>
</template>
<script>
  import { reactive, toRefs, defineComponent } from 'vue';
  import { useUserStore } from "@/store";
  import user from './user/index.vue';
  import grade from './grade/index.vue';
  import points from './points/index.vue';
  import pointsdetail from './pointsdetail/index.vue';
  import balance from './balance/index.vue';
  export default defineComponent({
    components: {
        user,
        grade,
        points,
        pointsdetail,
        balance,
    },
    setup() {
     const { bus_emit, bus_off, bus_on } = useUserStore();
     const state = reactive ({
       bus_emit,
        bus_off,
        bus_on,
        /*是否加载完成*/
        loading: true,
        form: {},
        /*参数*/
        param: {},
        /*当前选中*/
        activeName: 'user',
        /*切换数组原始数据*/
        sourceList: [{
            key: 'user',
            value: $t('会员管理'),
            path: '/card/user/user/index'
          },
          {
           key: 'grade',
           value: $t('等级管理'),
           path: '/card/user/grade/index'
          },
          {
           key: 'points',
           value: $t('积分设置'),
           path: '/card/user/points/index'
          },
          {
           key: 'pointsdetail',
           value: $t('积分明细'),
           path: '/card/user/pointsdetail/index'
          },
          {
           key: 'balance',
           value: $t('余额明细'),
           path: '/card/user/balance/index'
          },
        ],
        /*权限筛选后的数据*/
        tabList: [],
        paramsFlag: false
     })
        return {
        ...toRefs(state),
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
          tab_type: 'uesrmanage',
      }
      this.bus_emit('tabData', params);
    },
    beforeUnmount() {
       //发送类别切换
        this.bus_emit('tabData', {active: null,tab_type:'uesrmanage', list: []});
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
      },

    }
  });
</script>

<style>

</style>
