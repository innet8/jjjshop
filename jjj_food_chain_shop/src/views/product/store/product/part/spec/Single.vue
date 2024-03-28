<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存-单规格
    -->
    <div>
        <el-form-item :label="$t('商品价格：')" width="80" :rules="[{ required: true, message: $t('请填写商品价格') }]" prop="model.sku[0].product_price">
            <el-input-number :min="0" :max="1000000" :controls="false" v-model="form.model.sku[0].product_price" :placeholder="$t('请填写商品价格')" class="max-w460"></el-input-number>
        </el-form-item>

        <el-form-item :label="$t('采购单价：')" width="80" :rules="[{ required: true, message: $t('请填写采购单价') }]" prop="model.sku[0].purchase_price">
            <el-input-number :min="0" :max="1000000" :controls="false" v-model="form.model.sku[0].purchase_price" :placeholder="$t('请填写采购单价')" class="max-w460"></el-input-number>
        </el-form-item>

        <el-form-item :label="$t('库存数量：')" v-if="form.model.type == 10" :rules="[{ required: true, message: $t('请填写库存数量') }]" prop="model.sku[0].stock_num">
            <el-input-number :min="0" :max="999" :disabled="form.single_select_list.length > 0" :controls="false" :placeholder="$t('请填写库存数量')" v-model="form.model.sku[0].stock_num"
                class="max-w460"></el-input-number>
        </el-form-item>

        <el-form-item :label="$t('库存数量：')" v-if="form.model.type == 20" :rules="[{ required: true, message: $t('请填写库存数量') }]" prop="model.sku[0].material_stock">
            <el-input-number :min="0" :max="999" :disabled="form.single_select_list.length > 0" :controls="false" :placeholder="$t('请填写库存数量')" v-model="form.model.sku[0].material_stock"
                class="max-w460"></el-input-number>
        </el-form-item>

        <el-form-item :label="$t('商品条码：')" :rules="[{ required: true, message: $t('请输入商品条码') }]" prop="model.sku[0].barcode">
            <el-input :placeholder="$t('请输入商品条码')" v-model="form.model.sku[0].barcode" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item class="materials" :label="$t('商品材料：')" v-if="form.model.type == 10">
            <el-button style="margin-bottom: 16px;" type="primary" @click="addMaterials">{{ $t('添加材料') }}+</el-button>

            <div class="materials-one" label="" v-for="item, index in form.single_select_list">
                <el-form-item label="" class="max-w230">
                    <el-input v-model="item.product_name_text" disabled></el-input>
                </el-form-item>
                <el-form-item label="" class="max-w230"
                    :rules="[{ validator: () => { return form.model.sku[0].material[index].material_num ? true : false; }, message: $t('请输入折扣') }]"
                    :prop="`form.model.sku[0].material[${index}].material_num`">
                    <el-input v-model="form.model.sku[0].material[index].material_num" :placeholder="$t('请输入数量')">
                        <template #append>{{ item.product_unit_text }}</template>
                    </el-input>

                </el-form-item>
                <el-icon class="delete-icon" @click="handleDelete(index)">
                    <Delete />
                </el-icon>
            </div>


        </el-form-item>
        <productList v-if="open_product" :open_product="open_product" :index="0" :multiple_selection="multiple_selection" @closeDialogFunc="closeDialogFunc($event)">
        </productList>
    </div>
</template>

<script>
import productList from './productList.vue'
export default {
    components: {
        productList
    },
    data() {
        return {
            open_product: false,
            multiple_selection: [],
        }
    },
    inject: ['form'],
    watch: {
        'form.model.sku': {
            handler(val) {
                if (val) {
                    let arr = [];
                    (val[0].material || []).map((item, index) => {
                        let num = 0
                        num = Number(this.form.single_select_list[index].sku[0].stock_num) / Number(item.material_num)
                        num = Math.floor(num)
                        arr.push(num)
                    })
                    if ((val[0].material || []).length > 0) {
                        this.form.model.sku[0].stock_num = arr.sort((a, b) => a - b)[0] == Infinity ? null : arr.sort((a, b) => a - b)[0];
                    }
                }

            },
            deep: true,
            immediate: true,
        }
    },
    methods: {

        addMaterials() {
            this.multiple_selection = this.form.single_select_list;
            this.open_product = true;
        },

        handleDelete(index) {
            this.form.single_select_list.splice(index, 1);
            this.form.many_select_list[0].splice(index, 1);
            this.form.model.sku[0].material.splice(index, 1);
        },

        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'submit') {
                let map = new Map();
                [this.form.single_select_list, e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                this.form.single_select_list = Array.from(map.values());

                this.form.many_select_list[0] = []
                this.form.many_select_list[0] = JSON.parse(JSON.stringify(this.form.single_select_list));

                let arr = []
                this.form.model.sku[0].material.map(item => {
                    arr.push(item.product_id)
                })

                this.form.single_select_list.map(item => {
                    if (!arr.includes(item.product_id)) {
                        this.form.model.sku[0].material.push({
                            product_id: item.product_id,
                            material_num: null,
                        })
                    }
                })

            }
        },
    },
}
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
    padding-left: 7px !important;
    padding-right: 7px !important;
}

.materials {
    :deep(.el-form-item__content) {
        flex-direction: column;
        align-items: flex-start;
    }

    .materials-one {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;

        .delete-icon {
            cursor: pointer;
            font-size: 24px;
            margin-top: -16px;
        }
    }
}

.max-w230 {
    max-width: 226px;
    width: 100%;
}
</style>
