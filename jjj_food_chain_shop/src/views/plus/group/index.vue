<template>
  <!--
      	描述：商品-店内商品
      -->
  <div class="common-seach-wrap">
    <!--团购订单-->
    <order v-if="activeName=='order'"></order>
    <!--团购管理-->
    <groupIndex v-if="activeName=='group'"></groupIndex>
    <!--团购设置-->
    <setting v-if="activeName=='setting'"></setting>
  </div>
</template>
<script>
  import { reactive, toRefs, defineComponent } from 'vue';
  import { useUserStore } from "@/store";
  import setting from './setting/Index.vue';
  import groupIndex from './group/Index.vue';
  import order from './order/Index.vue';
  export default defineComponent({
    components: {
      setting,
      groupIndex,
      order,
    },
    data() {
      const { bus_emit, bus_off, bus_on } = useUserStore();
      const state = reactive({
        bus_emit,
        bus_off,
        bus_on,
 /*是否加载完成*/
        loading: true,
        form: {},
        /*参数*/
        param: {},
        /*当前选中*/
        activeName: 'order',
        /*切换数组原始数据*/
      sourceList: [
        {
            key: 'order',
            value: '团购订单',
            path:'/plus/group/order/index'
        },
        {
            key: 'group',
            value: '团购管理',
            path:'/plus/group/group/index'
        },
        {
            key: 'setting',
            value: '团购设置',
            path:'/plus/group/setting/index'
        },
      ],
        /*权限筛选后的数据*/
        tabList:[],
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
          tab_type: 'plusgroup',
      }
      this.bus_emit('tabData', params);


    },
    beforeUnmount() {
     //发送类别切换
    this.bus_emit('tabData', { active: null, tab_type:'plusgroup',list: [] });
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
  .operation-wrap {
    height: 124px;
    border-radius: 8px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 30px 30px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    background: #909399;
    background-size: 100% 100%;
    color: #fff;
  }
</style>
