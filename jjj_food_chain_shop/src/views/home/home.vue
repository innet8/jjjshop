<template>
    <div class="home" v-loading="loading">
        <div class="operation-wrap" style="background-color: #FFFFFF;">
            <h3 class="operation-title mb16">{{ $t('数据总览') }}</h3>
            <div class="operation-data">
                <div class="data-box">
                    <div class="data-box-title">
                        <h3>{{ $t('营业总额（元）') }}</h3>
                        <SvgIcon class="data-box-icon" name="icon1"></SvgIcon>
                    </div>
                    <h4>12,584.00</h4>
                </div>
                <div class="data-box">
                    <div class="data-box-title">
                        <h3>{{ $t('折扣总额（元）') }}</h3>
                        <SvgIcon class="data-box-icon" name="icon2"></SvgIcon>
                    </div>
                    <h4>12,584.00</h4>
                </div>
                <div class="data-box">
                    <div class="data-box-title">
                        <h3>{{ $t('会员数（元）') }}</h3>
                        <SvgIcon class="data-box-icon" name="icon3"></SvgIcon>
                    </div>
                    <h4>12,584.00</h4>
                </div>
                <div class="data-box">
                    <div class="data-box-title">
                        <h3>{{ $t('订单数') }}</h3>
                        <SvgIcon class="data-box-icon" name="icon4"></SvgIcon>
                    </div>
                    <h4>12,584.00</h4>
                </div>
                <div class="data-box">
                    <div class="data-box-title">
                        <h3>{{ $t('退款金额（元）') }}</h3>
                        <SvgIcon class="data-box-icon" name="icon5"></SvgIcon>
                    </div>
                    <h4>12,584.00</h4>
                </div>

            </div>
        </div>
        <div class="operation-center mt12">
            <div class="operation-center-l">
                <h3 class="operation-title mb16">{{ $t('今日概况') }}</h3>
                <div class="operation-today">
                    <div class="grid-content">
                        <p class="des">{{ $t('营业总额（元）') }}</p>
                        <h3>{{ today_data.order_total_price.tday }}</h3>
                        <p class="yesterday">{{ $t('昨日：') }}{{ today_data.order_total_price.ytd }}</p>
                    </div>
                    <div class="grid-content">
                        <p class="des">{{ $t('折扣总额（元）') }}</p>
                        <h3>11</h3>
                        <p class="yesterday">{{ $t('昨日：') }}11</p>
                    </div>
                    <div class="grid-content">
                        <p class="des">{{ $t('会员数（人）') }}</p>
                        <h3>{{ today_data.new_user_total.tday }}</h3>
                        <p class="yesterday">{{ $t('昨日：') }}{{ today_data.new_user_total.ytd }}</p>
                    </div>
                    <div class="grid-content">
                        <p class="des">{{ $t('订单数') }}</p>
                        <h3>{{ today_data.order_total.tday }}</h3>
                        <p class="yesterday">{{ $t('昨日：') }}{{ today_data.order_total.ytd }}</p>
                    </div>
                    <div class="grid-content">
                        <p class="des">{{ $t('退款金额（元）') }}</p>
                        <h3>11</h3>
                        <p class="yesterday">{{ $t('昨日：') }}11</p>
                    </div>

                </div>
            </div>
            <div class="operation-center-r">
                <h3 class="operation-title mb16">{{ $t('待办事项') }}</h3>
                <div class="center-r-box">
                    <div class="center-r-box-t">
                        <h4>{{ $t('库存告急') }}</h4>
                        <p>{{ $t('查看') }}</p>
                    </div>
                    <p class="fb">{{ wait_data.stock.product }}</p>
                </div>

            </div>
        </div>

        <div class="home-index mt12">
            <!--main-index-->
            <div class="flex-1">
                    <!--待办事项-->
                    <div class="matters-wrap" style="width: 100%;">
                        <Transaction></Transaction>
                    </div>
         
            </div>
            <div class="matters-wrap flex-1">
                <Ranking v-if="!loading"></Ranking>
            </div>

        </div>
    </div>
</template>

<script>
import IndexApi from '@/api/index.js';
import Ranking from '@/views/home/part/product/Ranking.vue';
import Transaction from '@/views/home/part/Transaction.vue';
import SvgIcon from "@/components/svg-icon/SvgIcon.vue";
import { useUserStore } from '@/store';
const { userInfo } = useUserStore();
export default {
    components: {
        Ranking,
        Transaction,
        SvgIcon,
    },
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            /*统计信息*/
            top_data: [],
            /*待办事项*/
            wait_data: {
                order: {},
                agent: {},
                supplier: {},
                activity: {},
                audit: {},
                stock: {}
            },
            /*今日数据*/
            today_data: {
                order_total_price: {},
                order_total: {},
                new_user_total: {},
                new_supplier_total: {},
                apply_supplier_total: {},
                order_user_total: {},
                income_money: {}
            },
            product_data: {
                salesMoneyRank: [],
                salesNumRank: []
            },
            user_type: ''
        };
    },
    provide: function () {
        return {
            dataRank: this.product_data
        }
    },
    mounted() {
        /*获取数据*/
        this.getData();
        this.getBaseInof();
    },
    methods: {
        async getBaseInof() {
            /* let res = await store.dispatch('common/getBaseInfo');
            this.user_type = res.user.user_type; */
            this.user_type = userInfo.user_type;
        },
        /*获取数据*/
        getData() {
            let self = this;
            self.loading = true;
            IndexApi.getCount(true).then(data => {
                self.loading = false;
                Object.assign(self.product_data, data.data.data.product_data);
                self.top_data = data.data.data.top_data;
                self.wait_data = data.data.data.wait_data;
                self.today_data = data.data.data.today_data;
            }).catch(error => {

            });
        },
    }
};
</script>

<style lang="scss" scoped>
.operation-wrap {
    height: auto;
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    background-size: 100% 100%;
    color: #ffffff;
}

.operation-center {
    width: 100%;
    display: flex;
    gap: 12px;
}

.operation-center-l {
    flex: 7;
    border-radius: 4px;
    padding: 16px;
    background: #fff;
}

.operation-today {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.grid-content {
    border-radius: 4px;
    padding: 16px;
    background: #F7F9FB;
    flex: 1;
    min-width: calc(33.3% - 8px);
    max-width: 30%;
}

.grid-content .des {
    color: var(--el-color-black);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 16px;
}

.grid-content h3 {
    color: var(--el-color-black);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 8px;
}

.grid-content .yesterday {
    color: var(--el-color-tips);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
}

.operation-center-r {
    flex: 3;
    border-radius: 4px;
    padding: 16px;
    background: #fff;
}

.center-r-box {
    padding: 16px;
    border-radius: 4px;
    background: #FFF1EE;
}

.center-r-box-t {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
}

.center-r-box-t h4 {
    color: var(--el-color-black);
    font-size: 16px;
    font-weight: 400;
}

.center-r-box-t p {
    color: var(--el-color-primary);
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
}

.operation-title {
    color: var(--el-color-black);
    font-size: 20px;
    font-weight: 500;
}

.fb {
    color: #FF6241;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.operation-data {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.data-box {
    flex: 1;
    padding: 16px;
    background: #FFF6DE;
    border-radius: 4px;

}

.data-box-title {
    display: flex;
    justify-content: space-between;
}

.data-box-title h3 {
    font-size: 16px;
    font-weight: 400;
    color: var(--el-color-black);
}

.data-box h4 {
    font-size: 28px;
    font-weight: 700;
    margin-top: 20px;
    color: var(--el-color-black);
}

.data-box:hover {
    background: #FFBE00;
}

.data-box:hover .data-box-icon {
    color: #fff;
}

.data-box-icon {
    width: 24px;
    height: 24px;
    color: #FFBE00;
}

.home-index {
    display: -ms-flexbox;
    display: flex;
    gap: 12px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    min-width: 1000px;
    overflow-x: auto;
}

.main-index {
    flex: 1;
    margin: 20px;
}

.matters-wrap {
    padding-bottom: 15px;
    padding: 16px;
    border-radius: 4px;
    background: #fff;
}

.matters .box {
    width: 100%;
}

.matters-wrap .matters {
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    // height: 120px;
    margin-bottom: 30px;
}

.matters-wrap .matters .title {
    font-size: 16px;
    color: #333333;
    display: inline-block;
    height: 20px;
    line-height: 0;
    padding: 11px;
    text-align: center;
    margin-bottom: 20px;
}

.matters-wrap .matters ul {
    color: #999999;
}

.matters-wrap .matters ul span {
    padding-right: 6px;
    color: #3a8ee6;
}

.border-b {
    display: flex;
    flex-direction: column;
}

.border-b-l {
    flex-direction: initial;
}

.matters_item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.matters_item li {
    width: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
}

.matters_box {
    width: 90%;
    border-top: 1px solid #d9d9d9;
    padding-top: 20px;
}

.matters-wrap .matters_item li .fb {
    font-size: 16px;
    color: #5d75e3;
}</style>
