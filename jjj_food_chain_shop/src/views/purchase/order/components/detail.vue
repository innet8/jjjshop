<template>
    <div class="basic-setting-content">
        <!--基本信息-->
        <div class="common-form">{{ $t('采购明细') }}</div>
        <el-form-item class="table-form-item" label="" prop="select_list"
            :rules="[{ required: true, validator: () => { return form.select_list.length == 0 ? false : true; }, message: $t('请选中商品') }]">
            <el-button size="small" type="primary" @click="add">{{ $t('添加商品') }}</el-button>
            <div class="product-content">
                <div class="table-wrap">
                    <el-table size="small" ref="multipleTable" v-if="form.select_list.length > 0" :data="form.select_list" border style="width: 100%" v-loading="loading">
                        <el-table-column width="60" :label="$t('序号')">
                            <template #default="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="category.path_name_text" :label="$t('类型')"></el-table-column>
                        <el-table-column prop="product_name" :label="$t('商品名称')" width="300px">
                            <template #default="scope">
                                <div class="product-info">
                                    <div class="pic"><img v-img-url="scope.row.image[0].file_path" alt="" /></div>
                                    <div class="info">
                                        <div class="name">{{ scope.row.product_name_text }}</div>
                                        <div class="price">{{ $t('销售价：') }}{{ scope.row.product_price }}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="category.path_name_text" :label="$t('供应商')"></el-table-column>
                        <el-table-column prop="sales_actual" :label="$t('规格')"></el-table-column>
                        <el-table-column prop="product_stock" :label="$t('当前库存')"></el-table-column>

                        <el-table-column prop="product_status.text" :label="$t('预计采购单价')" width="180">
                            <template #default="scope">
                                <el-form-item class="mt-16" label="" prop="scope.row.purchase_price"
                                    :rules="[{ required: true, validator: () => { return scope.row.purchase_price ? true : false; }, message: $t('预计采购单价') }]">
                                    <el-input-number :controls="false" :min="0" :max="10000000" :placeholder="$t('预计采购单价')" v-model.number="scope.row.purchase_price"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="product_status.text" :label="$t('预计采购数量')" width="180">
                            <template #default="scope">
                                <el-form-item class="mt-16" label="" prop="scope.row.purchase_price"
                                    :rules="[{ required: true, validator: () => { return scope.row.num ? true : false; }, message: $t('预计采购数量') }]">
                                    <el-input-number :controls="false" :min="0" :max="10000000" :placeholder="$t('预计采购数量')" v-model.number="scope.row.num"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="create_time" :label="$t('总价')" width="120">
                            <template #default="scope">
                                {{ (Number(scope.row.purchase_price) * Number(scope.row.num)).toFixed(2) || 0 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="create_time" :label="$t('操作')" width="80">
                            <template #default="scope">
                                <el-button class="detele-button" @click="deleteClick(scope)" type="primary" link size="small">{{ $t('删除') }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-form-item>
        <el-form-item :label="$t('备注')" prop="remark"
            :rules="[{ required: true, validator: () => { return form.remark ? true : false; }, message: $t('请输入备注') }]">
            <el-input size="small"  class="max-w460" v-model="form.remark" :maxlength="100" :placeholder="$t('请输入备注')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('采购价格总额')" prop="remark"
            :rules="[{ required: true, validator: () => { return form.remark ? true : false; }, message: '' }]">
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
    data() {
        return {
            open_product: false,
            multiple_selection: [],
            select_list: [],
        }
    },
    computed:{
        totalPrice(){
            let total = 0;
            this.form.select_list.map(item=>{
                total = total + (Number(item.purchase_price) * Number(item.num))
            }) 
            return Number(total).toFixed(2);
        },
    },
    methods: {
        add() {
            this.multiple_selection = this.form.select_list;
            this.open_product = true;
        },

        /*关闭弹窗*/
        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'select') {
                let map = new Map();
                [this.form.select_list, e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                this.form.select_list = Array.from(map.values());
                this.form.select_list.map((item, index) => {
                    this.form.select_list[index].purchase_price = null
                    this.form.select_list[index].num = null
                })
                this.$emit('check')
            }

        },

        deleteClick(e) {
            this.form.select_list.splice(e, 1);

            this.$emit('check')
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

.total-price{
    color:#ff0000;
    font-size:24px;
}
</style>