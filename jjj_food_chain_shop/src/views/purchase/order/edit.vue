<template>
    <div class="purchase-box">
        <el-form size="small" ref="form" class="purchase-form" :model="form" label-position="top" label-width="180px">
            <div class="purchase-form-flex" ref="formContainer">
                <!-- 基础设置 -->
                <basics :change="change"></basics>
                <!-- 采购明细 -->
                <detail @check="check" :change="change"></detail>
            </div>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button size="small" @click="cancelFunc">{{ $t('取消') }}</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
                <el-button v-if="change" size="small" type="primary" @click="onSubmit('putIn')" :loading="loading">{{ $t('确定并入库') }}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import PurchaseApi from '@/api/purchase.js';
import basics from './components/basics.vue';
import detail from './components/detail.vue';
export default {
    components: {
        basics,
        detail
    },
    data() {
        return {
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
            change: false,
        }
    },
    provide: function () {
        return {
            form: this.form
        }
    },
    created() {
        this.purchase_order_id = this.$route.query.purchase_order_id;
        this.change = this.$route.query.change ? true : false;
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
                })
                .catch(error => { });
        },
        check() {
            this.$refs.form.validateField('select_list');
        },

        onSubmit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let copyData = JSON.parse(JSON.stringify(this.form));
                    //调整数据
                    if (this.change) {
                        let Params = {
                            purchase_order_id: copyData.id,
                            purchase_detail: [],
                        };

                        copyData.purchase_detail.map(item => {
                            Params.purchase_detail.push({
                                purchase_detail_id: item.id,
                                actual_purchase_price: item.actual_purchase_price,
                                actual_purchase_num: item.actual_purchase_num,
                            })
                        })

                        PurchaseApi.adjustErpPurchaseOrder(Params, true)
                            .then(data => {
                                this.loading = false;
                                if (e == 'putIn') {
                                    this.changePutIn(Params.purchase_order_id);
                                }
                                else {
                                    this.$ElMessage({
                                        message: $t('操作成功'),
                                        type: 'success'
                                    });
                                    this.$router.push('/purchase/order/index');
                                }

                            })
                            .catch(error => { });
                    }
                    //编辑数据
                    else {
                        let Params = {
                            purchase_order_id: copyData.id,
                            name: copyData.name,
                            applicant_id: copyData.applicant_id,
                            arrival_time: copyData.arrival_time,
                            type: copyData.type,
                            purchase_detail: [],
                            remark: copyData.remark,
                        };

                        copyData.purchase_detail.map(item => {
                            Params.purchase_detail.push({
                                product_id: item.product_id,
                                estimate_purchase_price: item.estimate_purchase_price,
                                estimate_purchase_num: item.estimate_purchase_num,
                            })
                        })
                        PurchaseApi.editErpPurchaseOrder(Params, true)
                            .then(data => {
                                this.loading = false;
                                this.$ElMessage({
                                    message: $t('操作成功'),
                                    type: 'success'
                                });
                                this.$router.push('/purchase/order/index');
                            })
                            .catch(error => { });
                    }

                }
            })
        },

        // 调整完成后入库
        changePutIn(id) {
            this.loading = true;
            PurchaseApi.operateErpPurchaseOrder({
                purchase_order_id: id,
                status: 50,
            },
                true
            )
                .then(data => {
                    this.loading = false;
                    if (data.code == 1) {
                        this.$ElMessage({
                            message: $t('操作成功'),
                            type: 'success'
                        });
                        //刷新页面
                        this.$router.push('/purchase/order/index');
                    } else {
                        this.loading = false;
                    }
                })
                .catch(error => {
                    this.loading = false;
                });
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
    }

    :deep(.el-select__placeholder) {
        font-size: 14px;
    }
}
</style>