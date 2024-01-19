<template>
    <!--
          作者：luoyiming
          时间：2019-10-24
          描述：统计-销售统计-商品统计-排行榜
      -->
    <div class="right-box d-s-s d-c">
        <div class="ww100 right-box-t">
            <div :class="activeName == 'sale' ? 'active' : ''" @click="handleClick('sale')">{{ $t('销量TOP10') }}</div>
            <div :class="activeName == 'view' ? 'active' : ''" @click="handleClick('view')">{{ $t('销售额TOP10') }}</div>
        </div>
        <div class="list ww100">

            <el-table v-if="listData.length > 0" :data="listData" style="width: 100%" size="small">
                <el-table-column prop="product_name_text" :label="$t('商品名称')">
                    <template #default="scope">
                        <div class="product-name">
                            <span :class="scope.$index <=3 ? 'key-box':'key-box2'">{{ scope.$index  + 1 }}</span>
                            <span class="">{{ scope.row.product_name_text }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="total_num" :label="$t('销量')">
                </el-table-column>
                <el-table-column prop="total_price" :label="$t('销售额')">
                </el-table-column>
            </el-table>
            <div v-else class="tc pt30">{{ $t('暂无上榜记录') }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'sale',
            /*列表数据*/
            listData: []
        };
    },
    inject: ['dataRank'],
    created() {
        this.listData = this.dataRank.salesMoneyRank;
    },
    mounted() {

    },
    methods: {
        handleClick(e) {
            if (e == 'sale') {
                this.listData = this.dataRank.salesNumRank;
                this.activeName = e
            } else if (e == 'view') {
                this.listData = this.dataRank.salesMoneyRank;
                this.activeName = e
            }
        }
    }
};
</script>

<style scoped>
.right-box {
    width: 100%;
    box-sizing: border-box;
}

.Echarts>div {
    height: 400px;
}
.product-name{
    display: flex;
    align-items: center;
    gap: 8px;
}
.key-box {
    display: block;
    width: 20px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    border-radius: 50%;
    font-weight: bold;
    text-align: center;
    color: var(--el-color-black);
    background: var(--el-color-primary);
    font-weight: 700;
}
.key-box2 {
    display: block;
    width: 20px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    border-radius: 50%;
    font-weight: bold;
    text-align: center;
    color: var(--el-color-primary);
    background: #FFF6DE;
    font-weight: 700;
}
.right-box .list img {
    width: 30px;
    height: 30px;
}

.right-box-t {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
}

.right-box-t>div {
    color: var(--el-color-tips);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    text-transform: capitalize;
}

.right-box-t>div.active {
    color: var(--el-color-black);
    font-size: 20px;
    font-weight: 500;
}
</style>
