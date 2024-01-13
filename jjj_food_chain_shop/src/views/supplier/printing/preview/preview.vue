<template >
    <el-dialog @close="handleClose" width="480" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="title">
        <div class="box-border">
            <h3>{{ title }}</h3>
            <div class="box-main" v-for="(item,index) in one" :key="index">
                <div class="box-text-box"  v-for="(items,indexs) in item" :key="indexs">
                    <div class="text-box" :class="items.num && indexs == 0 ? 'font-bold' : '' ">
                        {{ items.name }}
                    </div>
                    <div class="text-box text-box-r" :class="items.num ? 'flex-end' : '' ">
                        <p class="text-box-r-p1" :class="items.num && indexs == 0 ? 'font-bold' : '' " v-if="items.num">{{ items.num }}</p>
                        <p class="text-box-r-p2" :class="items.num && indexs == 0 ? 'font-bold' : '' ">{{ items.label }}</p>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose"> {{ $t('取消') }}</el-button>
                <el-button type="primary" @click="handleClose"> {{ $t('确定') }} </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            one: [
                [
                    {
                        name: $t('交班编号：'),
                        label:202401253695842521,
                    },
                    {
                        name: $t('交班人：'),
                        label:$t('张三'),
                    },
                    {
                        name: $t('当班时间：'),
                        label:'2023/12/15 14:00:21 - 2023/12/15 14:00:21',
                    },
                ],
                [
                    {
                        name: $t('分类'),
                        num: $t('数量'),
                        label: $t('金额'),
                    },
                    {
                        name: $t('肉类'),
                        num: 68,
                        label:'￥50.00',
                    },
                    {
                        name: $t('蔬菜类'),
                        num: 50,
                        label:'￥50.00',
                    },
                    {
                        name: $t('饮品类'),
                        num: 55,
                        label:'￥50.00',
                    },
                ],
                [
                    {
                        name: $t('销售笔数：'),
                        label:50,
                    },
                    {
                        name: $t('现金收入：'),
                        label:'￥50.00',
                    },
                    {
                        name: $t('微信收入：'),
                        label:'￥50.00',
                    },
                    {
                        name: $t('支付宝收入：'),
                        label:'￥50.00',
                    },
                    {
                        name: $t('退款金额：'),
                        label:'￥50.00',
                    },
                ],
                [
                    {
                        name: $t('上一班遗留备用金：'),
                        label:50,
                    },
                    {
                        name: $t('本班取出现金：'),
                        label:'￥50.00',
                    },
                    {
                        name: $t('本班遗留备用金：'),
                        label:'￥50.00',
                    },
                ],
            ],
        }
    },
    props: ['open', 'title'],
    created() {
        this.dialogVisible = this.open
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

.box-border h3 {
    text-align: center;
    font-size: 20px;
    color: var(--el-color-black);
    margin-bottom: 24px;
}

.box-main {
    border-top: 1px dashed var(--el-color-black);
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
}
.box-main:nth-last-child(1){
    margin-bottom: 0;
}
.box-text-box{
    display: flex;
    justify-content: space-between;
    gap: 24px;
}
.text-box{
    font-size: 14px;
    color: var(--el-color-black);
    flex: 1;
}
.flex-end{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.text-box-r-p2{
    text-align: right;
}
.font-bold{
    font-size: 15px;
    font-weight: 500;
}
</style>