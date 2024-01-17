<template >
    <el-dialog @close="handleClose" width="480" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="title">
        <div class="box-border">
            <h2 v-if="storeShow">店铺名字(分店名字)</h2>
            <h3>{{ titleName }}</h3>
            <div class="box-main" :class="index == 0 ? 'box-main-border' : ''" v-for="(item, index) in details"
                :key="index">
                <div class="box-text-box" v-for="(items, indexs) in item" :key="indexs">
                    <div class="text-box"
                        :class="[items.bold && indexs == 0 ? 'font-bold' : '', items.big ? 'font-big' : '']">
                        {{ items.name }}
                    </div>
                    <div class="text-box text-box-r" :class="items.num ? 'flex-end' : ''">
                        <p class="text-box-r-p1"
                            :class="[items.bold && indexs == 0 ? 'font-bold' : '', items.big ? 'font-big' : '']"
                            v-if="items.num">{{
                                items.num }}</p>
                        <p class="text-box-r-p2"
                            :class="[items.bold && indexs == 0 ? 'font-bold' : '', items.big ? 'font-big' : '']">{{
                                items.label
                            }}</p>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose"> {{ $t('关闭') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            storeShow: true,
            details: [],
            titleName: '',
            one: [
                [
                    {
                        name: $t('交班编号'),
                        label: 202401253695842521,
                    },
                    {
                        name: $t('交班人'),
                        label: $t('张三'),
                    },
                    {
                        name: $t('当班时间'),
                        label: '2023/12/15 14:00:21 - 2023/12/15 14:00:21',
                    },
                ],
                [
                    {
                        name: $t('分类'),
                        num: $t('数量'),
                        label: $t('金额'),
                        bold: true,
                    },
                ],
                [
                    {
                        name: $t('肉类'),
                        num: 68,
                        label: '￥50.00',
                    },
                    {
                        name: $t('蔬菜类'),
                        num: 50,
                        label: '￥50.00',
                    },
                    {
                        name: $t('饮品类'),
                        num: 55,
                        label: '￥50.00',
                    },
                ],
                [
                    {
                        name: $t('销售笔数'),
                        label: 50,
                    },
                    {
                        name: $t('现金收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('余额收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('微信收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('支付宝收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('退款金额'),
                        label: '￥50.00',
                    },
                ],
                [
                    {
                        name: $t('本班营业总额'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('上一班遗留备用金'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('本班取出现金'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('本班遗留备用金'),
                        label: '￥50.00',
                    },
                ],
            ],
            two: [
                [
                    {
                        name: $t('订单号'),
                        label: 202401253695842521,
                    },
                    {
                        name: $t('收银员'),
                        label: $t('张三'),
                    },
                    {
                        name: $t('时间'),
                        label: '2023/12/15 14:00:21 - 2023/12/15 14:00:21',
                    },
                ],
                [
                    {
                        name: $t('商品'),
                        num: $t('数量'),
                        label: $t('金额'),
                        bold: true,
                    },
                ],
                [
                    {
                        name: $t('商品名称商品名称商品名称商品名称商品名称商品名称'),
                        num: 68,
                        label: '￥50.00',
                    },
                    {
                        name: $t('加珍珠'),
                        num: 50,
                        label: '￥50.00',
                    },
                    {
                        name: $t('商品名称商品名称商'),
                        num: 55,
                        label: '￥50.00',
                    },
                ],
                [
                    {
                        name: $t('合计金额'),
                        label: '￥410.00',
                    },
                    {
                        name: $t('服务费'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('消费税'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('优惠折扣'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('会员折扣'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('应收金额'),
                        label: '￥410.00',
                        big: true,
                    },
                ],
                [
                    {
                        name: $t('支付方式'),
                        label: $t('微信支付'),
                    },
                    {
                        name: $t('实付金额'),
                        label: '￥410.00',
                    },
                ],
            ],
            three: [
                [
                    {
                        name: $t('订单号'),
                        label: 202401253695842521,
                    },
                    {
                        name: $t('收银员'),
                        label: $t('张三'),
                    },
                ],
                [
                    {
                        name: $t('商品'),
                        num: $t('数量'),
                        label: $t('金额'),
                        bold: true,
                    },
                ],
                [
                    {
                        name: $t('商品名称商品名称商品名称商品名称商品名称商品名称'),
                        num: 68,
                        label: '￥50.00',
                    },
                    {
                        name: $t('加珍珠'),
                        num: 50,
                        label: '￥50.00',
                    },
                    {
                        name: $t('商品名称商品名称商'),
                        num: 55,
                        label: '￥50.00',
                    },
                ],
                [
                    {
                        name: $t('合计金额'),
                        label: '￥410.00',
                    },
                    {
                        name: $t('服务费'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('消费税'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('优惠折扣'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('会员折扣'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('应收金额'),
                        label: '￥410.00',
                        big: true,
                    },
                ],
            ],
            four: [
                [
                    {
                        name: $t('订单号'),
                        label: 202401253695842521,
                    },
                    {
                        name: $t('收银员'),
                        label: $t('张三'),
                    },
                ],
                [
                    {
                        name: $t('商品'),
                        num: $t('数量'),
                        label: $t('金额'),
                        bold: true,
                    },
                ],
                [
                    {
                        name: $t('商品名称商品名称商品名称商品名称商品名称商品名称'),
                        num: 68,
                        label: '￥50.00',
                    },
                ],

            ],
            five: [
                [
                    {
                        name: $t('时间'),
                        label: '2023/12/15 14:00:21 - 2023/12/15 14:00:21',
                    },
                ],
                [
                    {
                        name: $t('分类'),
                        num: $t('数量'),
                        label: $t('金额'),
                        bold: true,
                    },
                ],
                [
                    {
                        name: $t('肉类'),
                        num: 68,
                        label: '￥50.00',
                    },
                    {
                        name: $t('蔬菜类'),
                        num: 50,
                        label: '￥50.00',
                    },
                    {
                        name: $t('饮品类'),
                        num: 55,
                        label: '￥50.00',
                    },
                ],
                [
                    {
                        name: $t('销售笔数'),
                        label: 50,
                    },
                    {
                        name: $t('现金收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('余额收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('微信收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('支付宝收入'),
                        label: '￥50.00',
                    },
                    {
                        name: $t('退款金额'),
                        label: '￥50.00',
                    },
                ],
            ],
        }
    },
    props: ['open', 'title'],
    created() {
        this.dialogVisible = this.open;
        if (this.title == $t('交班单')) {
            this.details = this.one;
            this.titleName = this.title;
        }
        if (this.title == $t('结账单')) {
            this.details = this.two;
            this.titleName = $t('桌位: ') + 'A01';
        }
        if (this.title == $t('预结账单')) {
            this.details = this.three;
            this.titleName = $t('桌位: ') + 'A01';
        }
        if (this.title == $t('一菜一单')) {
            this.details = this.four;
            this.storeShow = false;
            this.titleName = $t('桌位: ') + 'A01';
        }
        if (this.title == $t('营业数据')) {
            this.details = this.five;
            this.titleName = this.title;
        }
    },
    methods: {
        handleClose() {
            this.$emit('close')
        },
    },
}
</script>
<style  scoped>
.box-border {
    border: 1px solid var(--el-color-border);
    border-radius: 4px;
    padding: 24px;
}

.box-border h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: var(--el-color-black);
}

.box-border h3 {
    text-align: center;
    font-size: 20px;
    color: var(--el-color-black);
    margin-bottom: 24px;
}

.box-main {
    border-bottom: 1px dashed var(--el-color-black);
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
}

.box-main-border {
    border-bottom: none;
}

.box-main:nth-last-child(1) {
    margin-bottom: 0;
    border-bottom: none;
}

.box-text-box {
    display: flex;
    justify-content: space-between;
    align-items: self-start;
    gap: 24px;
}

.text-box {
    font-size: 14px;
    color: var(--el-color-black);
    flex: 1;
}

.flex-end {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text-box-r-p2 {
    text-align: right;
}

.font-bold {
    font-size: 15px;
    font-weight: 500;
}

.font-big {
    font-size: 18px;
    font-weight: 500;
}
</style>