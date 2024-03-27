<template>
    <div class="purchase-box">
        <el-form size="small" ref="form" class="purchase-form" :model="form" label-position="top" label-width="180px">
            <div class="common-button-wrapper">
                <el-button size="small" class="return-button" link @click="cancelFunc"><el-icon>
                        <ArrowLeftBold />
                    </el-icon>{{ $t('返回') }}</el-button>
            </div>
            <div class="purchase-form-flex" ref="formContainer">
                <!-- 基础设置 -->
                <basics :readOnly="true"></basics>
                <!-- 采购明细 -->
                <detail :readOnly="true"></detail>

                <div v-if="activities.length > 0">
                    <div class="common-form">{{ $t('操作记录') }}</div>
                    <div class="timeline-box">
                        <el-timeline class="timeline-main">
                            <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color"
                                :size="activity.size" :hollow="activity.hollow" :timestamp="activity.timestamp">
                                {{ activity.content }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </div>
            <!--提交-->

        </el-form>
    </div>
</template>
<script>
import basics from './components/basics.vue';
import detail from './components/detail.vue';
import PurchaseApi from '@/api/purchase.js';
export default {
    components: {
        basics,
        detail
    },
    data() {
        return {
            activities: [],
            form: {
                name: "",
                applicant_id: "",
                arrival_time: "",
                type: 10,
                purchase_detail: [],
                remark: '',
            },
            purchase_order_id: null,
            loading: false,
        }
    },
    provide: function () {
        return {
            form: this.form
        }
    },
    created() {
        this.purchase_order_id = this.$route.query.purchase_order_id;
        this.getData();
    },
    methods: {
        getData() {
            let self = this;
            self.loading = true;
            let Params = {};
            Params.purchase_order_id = this.purchase_order_id;
            PurchaseApi.detailErpPurchaseOrder(Params, true)
                .then(data => {
                    self.loading = false;
                    Object.assign(self.form, data.data.detail);
                    const date = new Date(self.form.arrival_time * 1000);  // 时间戳转换成毫秒
                    self.form.arrival_time = date.toISOString().slice(0, 10); // 获取日期部分
                    self.form.purchase_detail = data.data.detail.details;
                    self.form.purchase_detail.map((item, index) => {
                        Object.assign(self.form.purchase_detail[index], item.product);
                    })
                    self.activities = [];
                    self.form.logs.map(item => {
                        self.activities.push({
                            content: item.operator.real_name + " " + self.statusAction(item.status) + " " +(item.status == 20 ? `(${$t('驳回原因')}：${item.remark})` : ''),
                            timestamp: item.create_time,
                            color: item.status == 20 ?'#ff0000':'#0bbd87',
                        })
                    })
                })
                .catch(error => { });
        },

        // 状态计算
        statusAction(status) {
            let result = '';
            if (status == 10) return result = $t('待审核');
            if (status == 20) return result = $t('已驳回');
            if (status == 30) return result = $t('采购中');
            if (status == 40) return result = $t('已采购');
            if (status == 50) return result = $t('已入库');
        },

        cancelFunc() {
            this.$router.push('/purchase/order/index');
        },
    },
}
</script>
<style scoped>
.purchase-box {
    height: calc(100% - 14px);
    overflow: hidden;
}

.purchase-form {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .purchase-form-flex {
        flex: 1 1 auto;
        overflow-y: auto;
    }

    .common-button-wrapper {
        flex: 0 0 auto;
        flex-shrink: 0;
        border: none;
        padding: 0 0 16px 0;
        justify-content: start;

        .return-button {
            padding: 0 !important;
        }
    }

    :deep(.el-select__placeholder) {
        font-size: 14px;
    }
}

.timeline-box {
    padding-left: 1px;

    .timeline-main {
        max-width: 800px;
        font-size: 14px;
    }
}
</style>