<template>
    <div class="purchase-box">
        <el-form size="small" ref="form" class="purchase-form" :model="form" label-position="top" label-width="180px">
            <div class="purchase-form-flex" ref="formContainer">
                <!-- 基础设置 -->
                <basics></basics>
                <!-- 采购明细 -->
                <detail @check="check"></detail>
            </div>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button size="small" @click="cancelFunc">{{ $t('取消') }}</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
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
                remark:'',
            },

        }
    },
    provide: function () {
        return {
            form: this.form
        }
    },
    mounted() {

    },
    methods: {
        check() {
            this.$refs.form.validateField('select_list');
        },


        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let Params = JSON.parse(JSON.stringify(this.form));
                    Params.purchase_detail = [];
                    this.form.purchase_detail.map(item => {
                        Params.purchase_detail.push({
                            product_sku_id: item.product_sku_id,
                            product_id: item.product_id,
                            estimate_purchase_price: item.estimate_purchase_price,
                            estimate_purchase_num: item.estimate_purchase_num,
                        })
                    })

                    PurchaseApi.addErpPurchaseOrder(Params, true)
                        .then(data => {
                            this.loading = false;
                            this.$ElMessage({
                                message: $t('添加成功'),
                                type: 'success'
                            });
                            this.$router.push('/purchase/order/index');
                        })
                        .catch(error => { });
                }

            })
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