<template>
    <!--内容-->
    <div class="product-content">
        <div class="" v-loading="loading">
            <!--订单进度-->
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="起始时间">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker size="small" v-model="searchForm.create_time" type="daterange"
                            value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="primary" icon="Search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-form">实时概况</div>

        <div class="operation-data">
            <div class="data-box">
                <div class="data-box-title">
                    <h3>{{ $t('营业总额（元）') }}</h3>
                    <SvgIcon class="data-box-icon" name="icon1"></SvgIcon>
                </div>
                <h4>{{ detail.total_price }}</h4>
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
                <h4>{{ detail.order_count }}</h4>
            </div>
            <div class="data-box">
                <div class="data-box-title">
                    <h3>{{ $t('退款金额（元）') }}</h3>
                    <SvgIcon class="data-box-icon" name="icon5"></SvgIcon>
                </div>
                <h4>{{ detail.refund_money }}</h4>
            </div>

        </div>
        <!--内容-->
        <div class="product-bottom d-b-c">

            <div class="flex-1">
                <div class="right-box d-s-s d-c  pr16">
                    <div class="common-form">{{ $t('销量TOP10') }}</div>
                    <div class="list ww100">

                        <el-table v-if="salesNumRank.length > 0" :data="salesNumRank" style="width: 100%" size="small">
                            <el-table-column prop="product_name" :label="$t('商品名称')">
                                <template #default="scope">
                                    <div class="product-name">
                                        <span :class="scope.$index <= 3 ? 'key-box' : 'key-box2'">{{ scope.$index + 1
                                        }}</span>
                                        <span class="">{{ scope.row.product_name }}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="total_num" :label="$t('销量')">
                            </el-table-column>
                            <el-table-column prop="total_price" :label="$t('销售额')">
                            </el-table-column>
                        </el-table>
                        <div v-else class="tc pt30">暂无上榜记录</div>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <div class="right-box d-s-s d-c  pr16">
                    <div class="common-form">{{ $t('销售额TOP10') }}</div>
                    <div class="list ww100">

                        <el-table v-if="salesMoneyRank.length > 0" :data="salesMoneyRank" style="width: 100%" size="small">
                            <el-table-column prop="product_name" :label="$t('商品名称')">
                                <template #default="scope">
                                    <div class="product-name">
                                        <span :class="scope.$index <= 3 ? 'key-box' : 'key-box2'">{{ scope.$index + 1
                                        }}</span>
                                        <span class="">{{ scope.row.product_name }}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="total_num" :label="$t('销量')">
                            </el-table-column>
                            <el-table-column prop="total_price" :label="$t('销售额')">
                            </el-table-column>
                        </el-table>
                        <div v-else class="tc pt30">暂无上榜记录</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import StoreApi from '@/api/store.js';
export default {
    data() {
        return {
            active: 0,
            /*是否加载完成*/
            loading: true,
            /*订单数据*/
            detail: {
                total_price: '',
                income_money: '',
                order_count: '',
                refund_money: ''
            },
            searchForm:{
                create_time:'',
            },
            activeName: 'sale',
            salesNumRank: [],
            salesMoneyRank: []
        };
    },
    created() {
        /*获取列表*/
        this.getParams();
    },
    methods: {
        /*获取参数*/
        getParams() {
            let self = this;
            self.loading = true;
            StoreApi.storeSurvey({},
                true
            )
                .then(data => {
                    self.detail = data.data.detail;
                    self.salesNumRank = data.data.salesNumRank;
                    self.salesMoneyRank = data.data.salesMoneyRank;
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        handleClick() {
            this.getParams()
        }
    }
};
</script>
<style lang="scss">
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    padding: 20px;
    border-radius: 4px;
    min-height: 36px;
}

.bg-purple {
    background: #f4f4f4;
}

.table-wrap {
    padding: 20px;
    padding-top: 0;
}

.common-form-data {
    margin-left: 15px;
    font-weight: 500;
}

.tips {
    padding: 15px;
    margin-bottom: 20px;
}

.tips_tit {
    font-size: 22px;
    margin-bottom: 10px;
}

.tips_txt {
    line-height: 25px;
    color: #666;
    font-size: 14px;
}

.detail_prici {
    font-size: 20px;
    color: #000;
    font-weight: bold;
    margin-top: 10px;
    max-width: 250px;
}

.product-bottom {
    gap: 16px;
    margin-top: 16px;
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

.product-name {
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
</style>
