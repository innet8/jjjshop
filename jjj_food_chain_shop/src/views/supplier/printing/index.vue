<template>
    <!--
      	描述：商品-店内商品
      -->
    <div class="common-seach-wrap">
        <!--打印機管理-->
        <printer v-if="activeName == 'printer'"></printer>
        <!-- 商品打印 -->
        <printing v-if="activeName == 'printing'"></printing>
        <!-- 打印模版 -->
        <preview v-if="activeName == 'preview'"></preview>
        <!--打印设置-->
        <dishes v-if="activeName == 'dishes'"></dishes>
    </div>
</template>
<script>
import { reactive, toRefs, defineComponent } from 'vue';
import { useUserStore } from "@/store";

import printer from './printer/index.vue';
import dishes from './dishes/index.vue';
import printing from './printing/index.vue';
import preview from './preview/index.vue';

export default defineComponent({
    components: {
        printer,
        dishes,
        printing,
        preview,
    },
    setup() {

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
            activeName: 'printer',
            /*切换数组原始数据*/
            sourceList: [{
                key: 'printer',
                value: $t('打印机管理'),
                path: '/supplier/printing/printer/index'
            },
            {
                key: 'dishes',
                value: $t('商品打印'),
                path: '/supplier/printing/dishes/index'
            },
            {
                key: 'preview',
                value: $t('打印模版'),
                path: '/supplier/printing/preview/index'
            },
            {
                key: 'printing',
                value: $t('打印设置'),
                path: '/supplier/printing/printing/index'
            },
            ],
            /*权限筛选后的数据*/
            tabList: [],

        })
        return {
            ...toRefs(state),

        };

    },
    mounted() {
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
            tab_type: 'printing',
        }
        this.bus_emit('tabData', params);

    },
    beforeUnmount() {
        //发送类别切换
        this.bus_emit('tabData', { active: null, tab_type: 'printing', list: [] });
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
