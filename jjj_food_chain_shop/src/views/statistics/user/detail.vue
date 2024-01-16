<template >
    <el-dialog :title="$t('收银交班详情')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <div class="common-form">{{ $t('基本信息') }}</div>
        <el-row :gutter="16">
            <el-col :span="12">
                <p class="text">{{ $t('交班编号') }}:<span>{{ detail.shift_no }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('收银员') }}:<span>{{ detail.user?.real_name }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">
                    {{ $t('当班时间') }}:<span>{{ detail.shift_start_time }}</span>
                    {{ $t('至') }}<span>{{ detail.shift_end_time }}</span>
                    
                </p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('营业收入') }}:<span>{{ detail.total_money }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('现金收入') }}:<span>{{ detail.cash_income }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('余额收入') }}:<span>{{ detail.balance_income }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('支付宝收入') }}:<span>{{ detail.alipay_income }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('微信收入') }}:<span>{{ detail.wechat_income }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('上一班遗留备用金') }}:<span>{{ detail.previous_shift_cash }}</span></p>
            </el-col>
            <el-col :span="12">
                <p class="text">{{ $t('本班遗留备用金') }}:<span>{{ detail.cash_left }}</span></p>
            </el-col>
        </el-row>

        <div class="common-form">{{ $t('销售信息') }}</div>

        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="name" :label="$t('分类')"></el-table-column>
            <el-table-column prop="sales" :label="$t('销售数量')"></el-table-column>
            <el-table-column prop="prices" :label="$t('销售金额')"></el-table-column>
        </el-table>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
import StatisticsApi from '@/api/statistics.js';
export default {
    props: ['open', 'detailId'],

    created() {
        this.dialogVisible = this.open;
        this.id = this.detailId;
        this.getData();
    },

    data() {
        return {
            dialogVisible: false,
            id: {},
            detail:{},
            tableData:[],
        }
    },

    methods: {
        /*获取数据*/
        getData() {
            let self = this;
            let params = {};
            params.id = self.id;
            StatisticsApi.getUserShiftLogdDetail(params, true)
                .then(res => {
                    self.detail = res.data.detail;
                    self.tableData = res.data.salesInfo;
                })
                .catch(error => { });
        },
        dialogFormVisible() {
            this.$emit('closeDialog')
        },
    },
}
</script>
<style scoped>
.text {
    color: var(--el-color-black);
    font-size: 14px;
    margin-bottom: 16px;
}
</style>