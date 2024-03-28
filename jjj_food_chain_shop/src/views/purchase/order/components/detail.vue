<template>
    <div class="basic-setting-content">
        <!--基本信息-->
        <div class="common-form">{{ $t('采购明细') }}</div>
        <el-form-item class="table-form-item" label="" prop="purchase_detail"
            :rules="[{ required: true, validator: () => { return (form.purchase_detail || []).length == 0 ? false : true; }, message: $t('请选中商品') }]">
            <el-button size="small" type="primary" @click="add" v-if="!readOnly">{{ $t('添加商品') }}</el-button>
            <div class="product-content">
                <div class="table-wrap">
                    <el-table size="small" ref="multipleTable" v-if="(form.purchase_detail || []).length > 0" :data="form.purchase_detail" border style="width: 100%"
                        v-loading="loading">
                        <el-table-column width="60" :label="$t('序号')">
                            <template #default="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="product.type" :label="$t('类型')">
                            <template #default="scope">
                                {{ scope.row.product.type == 10 ? $t('成品') : $t('材料') }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="product.product_name" :label="$t('商品名称')" width="300px">
                            <template #default="scope">
                                <div class="product-info">
                                    <div class="pic"><img v-img-url="scope.row.product.image[0].file_path" alt="" /></div>
                                    <div class="info">
                                        <div class="name">{{ scope.row.product.product_name_text }}</div>
                                        <div class="price">{{ $t('销售价：') }}{{ scope.row.product.product_price }}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="product.erpSupplier" :label="$t('供应商')" width="160">
                            <template #default="scope">
                                {{ ERP(scope.row.product.erpSupplier || '') }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sales_actual" :label="$t('规格')">
                            <template #default="scope">
                            {{ scope.row.spec_name_text || '-' }}
                        </template>
                        </el-table-column>
                        <el-table-column prop="stock_num" :label="$t('当前库存')"></el-table-column>

                        <el-table-column :label="$t('预计采购单价')" width="180">
                            <template #default="scope">
                                <el-form-item class="mt-16" label="" prop="scope.row.estimate_purchase_price"
                                    :rules="[{ required: true, validator: () => { return scope.row.estimate_purchase_price ? true : false; }, message: $t('预计采购单价') }]">
                                    <el-input-number :controls="false" :min="0" :max="10000000" :disabled="readOnly || change" :placeholder="$t('预计采购单价')"
                                        v-model.number="scope.row.estimate_purchase_price"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('预计采购数量')" width="180">
                            <template #default="scope">
                                <el-form-item class="mt-16" label="" prop="scope.row.estimate_purchase_num"
                                    :rules="[{ required: true, validator: () => { return scope.row.estimate_purchase_num ? true : false; }, message: $t('预计采购数量') }]">
                                    <el-input-number :controls="false" :min="0" :disabled="readOnly || change" :max="10000000" :placeholder="$t('预计采购数量')"
                                        v-model.number="scope.row.estimate_purchase_num"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column :label="$t('实际采购单价')" width="180" v-if="change">
                            <template #default="scope">
                                <el-form-item class="mt-16" label="" prop="scope.row.actual_purchase_price"
                                    :rules="[{ required: true, validator: () => { return scope.row.actual_purchase_price ? true : false; }, message: $t('实际采购单价') }]">
                                    <el-input-number :controls="false" :min="0" :max="10000000" :placeholder="$t('实际采购单价')"
                                        v-model.number="scope.row.actual_purchase_price"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column :label="$t('实际采购数量')" width="180" v-if="change">
                            <template #default="scope">
                                <el-form-item class="mt-16" label="" prop="scope.row.actual_purchase_num"
                                    :rules="[{ required: true, validator: () => { return scope.row.actual_purchase_num ? true : false; }, message: $t('实际采购数量') }]">
                                    <el-input-number :controls="false" :min="0" :max="10000000" :placeholder="$t('实际采购数量')"
                                        v-model.number="scope.row.actual_purchase_num"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column :label="$t('总价')" width="120">
                            <template #default="scope">
                                {{ change ?
            ((Number(scope.row.actual_purchase_price) * Number(scope.row.actual_purchase_num)).toFixed(2) || 0) :
            ((Number(scope.row.estimate_purchase_price) * Number(scope.row.estimate_purchase_num)).toFixed(2) || 0) }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('操作')" width="80" v-if="!readOnly && !change">
                            <template #default="scope">
                                <el-button class="detele-button" @click="deleteClick(scope)" type="primary" link size="small">{{ $t('删除') }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-form-item>
        <el-form-item :label="$t('备注')" prop="remark" :rules="[{ required: true, validator: () => { return form.remark ? true : false; }, message: $t('请输入备注') }]">
            <el-input size="small" :disabled="readOnly || change" class="max-w460" v-model="form.remark" :maxlength="100" :placeholder="$t('请输入备注')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('采购价格总额')" prop="remark" :rules="[{ required: true, validator: () => { return form.remark ? true : false; }, message: '' }]">
            <h3 class="total-price">{{ totalPrice }}</h3>
        </el-form-item>
        <productList v-if="open_product" :open_product="open_product" :multiple_selection="multiple_selection" @closeDialogFunc="closeDialogFunc($event)">
        </productList>
    </div>
</template>
<script>
import productList from './productList.vue'
export default {
    components: {
        productList
    },
    inject: ['form'],
    props: {
        readOnly: {
            type: Boolean,
            required: false
        },
        change: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            open_product: false,
            multiple_selection: [],
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.form.purchase_detail.map(item => {
                total = this.change ? total + (Number(item.actual_purchase_price) * Number(item.actual_purchase_num)) : total + (Number(item.estimate_purchase_price) * Number(item.estimate_purchase_num))
            })
            return Number(total).toFixed(2);
        },
    },
    methods: {
        add() {
            this.multiple_selection = this.form.purchase_detail;
            this.open_product = true;
        },

        /*关闭弹窗*/
        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'select') {
                let map = new Map();
                [this.form.purchase_detail, e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                this.form.purchase_detail = Array.from(map.values());
                this.form.purchase_detail.map((item, index) => {
                    this.form.purchase_detail[index].estimate_purchase_price = null
                    this.form.purchase_detail[index].estimate_purchase_num = null
                })
                this.$emit('check')
            }

        },

        deleteClick(e) {
            this.form.purchase_detail.splice(e, 1);

            this.$emit('check')
        },

        ERP(data) {
            let result = '-';
            if (data.length > 0) {
                result = [];
                for (let index = 0; index < data.length; index++) {
                    if(index < 3){
                        result.push(data[index].name)
                    }
                }
                result  = result.join(',');
                if(data.length > 3){
                    result = result + '+3';
                }
            }
            return result;
        },
    },
}
</script>
<style lang="scss" scoped>
.table-form-item {
    :deep(.el-form-item__content) {
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: start;
        gap: 12px;
    }

    .product-content {
        width: 100%;
    }
}

.detele-button:hover,
.detele-button:focus {
    color: var(--el-color-black);
}

.mt-16 {
    margin-top: 16px;
}

.total-price {
    color: #ff0000;
    font-size: 24px;
}
</style>