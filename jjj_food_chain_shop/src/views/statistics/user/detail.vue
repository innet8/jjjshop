<template >
    <el-dialog :title="$t('收银交班详情')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <div class="common-form">{{ $t('基本信息') }}</div>
        <el-row :gutter="16">
            <el-col :span="8">{{ $t('交班编号') }}:{{ detail.shift_no }}</el-col>
            <el-col :span="8">{{ $t('收银员') }}:{{ detail.user.real_name }}</el-col>
            <el-col :span="8">{{ $t('当班时间') }}:
                {{ detail.shift_start_time }}
                {{ $t('至') }}
                {{ detail.shift_end_time }}
            </el-col>
            <el-col :span="8">{{ $t('营业收入') }}:{{ detail.total_money }}</el-col>
            <el-col :span="8">{{ $t('现金收入') }}:{{ detail.cash_income }}</el-col>
            <el-col :span="8">{{ $t('余额收入') }}:{{ detail.balance_income }}</el-col>
            <el-col :span="8">{{ $t('支付宝收入') }}:{{ detail.alipay_income }}</el-col>
            <el-col :span="8">{{ $t('微信收入') }}:{{ detail.wechat_income }}</el-col>
            <el-col :span="8">{{ $t('上一班遗留备用金') }}:{{ detail.previous_shift_cash }}</el-col>
            <el-col :span="8">{{ $t('本班遗留备用金') }}:{{ detail.cash_left }}</el-col>
        </el-row>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
export default {
    props: ['open', 'detailData'],

    created() {
        this.dialogVisible = this.open;
        this.detail = this.detailData;
    },

    data() {
        return {
            dialogVisible: false,
            detail: {},
        }
    },

    methods: {
        dialogFormVisible() {
            this.$emit('closeDialog')
        },
    },
}
</script>
<style lang="">
    
</style>