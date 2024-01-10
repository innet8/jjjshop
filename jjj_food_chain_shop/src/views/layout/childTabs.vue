<template >
    <div class="el-tabs-container">
        <el-tabs :model-value="activeValue" @tab-click="tabClick">
            <el-tab-pane :label="item.value" :name="item.key" v-for="(item, index) in tabList" :key="index"></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup >
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useUserStore } from '../../store/index'

const { bus_emit, bus_on, } = useUserStore();
const activeValue = ref(0)
const tab_type = ref('')
const router = useRouter()
const tabList = ref([])

console.log("ZHUCE");
bus_on("tabData", (res) => {
    tabList.value = res.list;
    activeValue.value = res.active;
    tab_type.value = res.tab_type;
})
bus_on('activeValue', (res) => {
    if (res && res.params) {
        activeValue.value = res.params;
    } else {
        activeValue.value = res;
    }
})
bus_on('noTarget', (res) => {
    activeValue.value = res;
})
const tabClick = (event) => {
    let e = event.props;
    /*取号管理*/
    if (tab_type.value == "queuemanage") {
        router.push({
            path: "/plus/queue/index",
            query: {
                type: e.name,
            },
        });
    }
    /*桌位管理*/
    if (tab_type.value == "tablemanage") {
        router.push({
            path: "/store/table/index",
            query: {
                type: e.name,
            },
        });
    }
    /*外卖商品*/
    if (tab_type.value == "takeaway") {
        router.push({
            path: "/product/takeaway/index",
            query: {
                type: e.name
            }
        });
    }
    /*店内商品*/
    if (tab_type.value == "storeproduct") {
        router.push({
            path: "/product/store/index",
            query: {
                type: e.name
            }
        });
    }

    /*会员管理*/
    if (tab_type.value == "uesrmanage") {
        router.push({
            path: "/card/user/index",
            query: {
                type: e.name
            }
        });
    }
    /*会员卡管理*/
    if (tab_type.value == "cardmanage") {
        router.push({
            path: "/card/card/index",
            query: {
                type: e.name
            }
        });
    }
    /*商品扩展*/
    if (tab_type.value == "expand") {
        router.push({
            path: "/product/expand/index",
            query: {
                type: e.name
            }
        });
    }
    /*分销*/
    if (tab_type.value == "agent") {
        router.push({
            path: "/plus/agent/index",
            query: {
                type: e.name
            }
        });
    }
    /*配送员*/
    if (tab_type.value == "driver") {
        router.push({
            path: "/plus/driver/index",
            query: {
                type: e.name
            }
        });
    }
    /*优惠券*/
    if (tab_type.value == "coupon") {
        router.push({
            path: "/plus/coupon/index",
            query: {
                type: e.name
            }
        });
    }
    /*积分商城*/
    if (tab_type.value == "points") {
        router.push({
            path: "/plus/points/index",
            query: {
                type: e.name
            }
        });
    }
    /* 现时秒杀*/
    if (tab_type.value == "seckill") {
        router.push({
            path: "/plus/seckill/index",
            query: {
                type: e.name
            }
        });
    }
    /* 限时拼团*/
    if (tab_type.value == "assemble") {
        router.push({
            path: "/plus/assemble/index",
            query: {
                type: e.name
            }
        });
    }
    /* 砍价*/
    if (tab_type.value == "bargain") {
        router.push({
            path: "/plus/bargain/index",
            query: {
                type: e.name
            }
        });
    }
    /*门店*/
    if (tab_type.value == "store") {
        router.push({
            path: "/store/index",
            query: {
                type: e.name
            }
        });
    }
    /*门店*/
    if (tab_type.value == "takeout") {
        router.push({
            path: "/takeout/index",
            query: {
                type: e.name
            }
        });
    }
    /*app设置*/
    if (tab_type.value == "appopen") {
        router.push({
            path: "/appsetting/appopen/event",
            query: {
                type: e.name
            }
        });
    }
    activeValue.value = e.name;
    bus_emit("activeValue", e.name);
}

</script>
<style lang="scss" scoped>
.el-tabs__header {
    margin-bottom: 16px;
}
</style>