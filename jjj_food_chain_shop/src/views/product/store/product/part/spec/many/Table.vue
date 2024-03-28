<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存-多规格-表格
    -->
    <div class="mt16 ">
        <el-form-item :label="$t('规格明细：')" v-if="form.model.sku.length > 0">
            <!--多规格表格-->
            <div class="ww100">
                <el-table size="" :data="form.model.sku" border style="width: 100%; margin-top: 20px">
                    <el-table-column :label="$t('规格名称')" width="390">
                        <template #default="scope">
                            <div label="" class="spec-name" style="margin-bottom: 0;">
                                <el-form-item v-for="(item, index) in languageList" :key="index" :prop="`scope.row.spec_name[${item.key}]`" :rules="[{
            validator: () => {
                return scope.row.spec_name[item.key] ? true : false;
            },
            message: $t('请输入规格名称')
        }]">
                                    <el-autocomplete size="small" @select="(e) => selectChange(e, scope.$index)" :fetch-suggestions="(e, h) => querySearch(e, h, item.key)"
                                        v-model="scope.row.spec_name[item.key]" :placeholder="$t('请输入') + `(${item.value})`"></el-autocomplete>
                                </el-form-item>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('采购单价')" width="140">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;" :prop="`scope.row.purchase_price`"
                                :rules="[{ validator: () => { return scope.row.purchase_price ? true : false; }, message: $t('请输入采购单价') }]">
                                <el-input-number type="number" :placeholder="$t('请输入采购单价')" size="small" :min="0" :max="1000000" :controls="false"
                                    v-model="scope.row.purchase_price"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('库存')" width="140">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;" :prop="`scope.row.stock_num`"
                                :rules="[{ validator: () => { return typeof scope.row.stock_num == 'number' && scope.row.stock_num >= 0 ? true : false; }, message: $t('请输入库存') }]">
                                <el-input-number type="number" :disabled="scope.row.material.length > 0" :placeholder="$t('请输入库存')" size="small" :min="0" :max="999"
                                    :controls="false" v-model="scope.row.stock_num"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('条形码')" width="140" >
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;" :prop="`scope.row.barcode`"
                                :rules="[{ validator: () => { return scope.row.barcode ? true : false; }, message: $t('请输入条形码') }]">
                                <el-input v-model="scope.row.barcode" :placeholder="$t('请输入条形码')"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('商品价格')" width="140">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;" :prop="`scope.row.product_price`"
                                :rules="[{ validator: () => { return typeof scope.row.product_price == 'number' && scope.row.product_price >= 0 ? true : false; }, message: $t('请输入商品价格') }]">
                                <el-input-number type="number" :placeholder="$t('请输入商品价格')" size="small" :min="0" :max="1000000" :controls="false"
                                    v-model="scope.row.product_price"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('材料')" width="300">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;">
                                <el-button type="primary" :style="form.many_select_list[scope.$index].length > 0 ? 'margin-top: 16px;' : ''" @click='addMaterials(scope.$index)'>{{
            $t('添加材料') }}</el-button>
                            </el-form-item>
                            <div class="materials-one" label="" v-for="item, index in form.many_select_list[scope.$index]">
                                <el-form-item label="" class="max-w230">
                                    <el-input v-model="item.product_name_text" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="" class="max-w230"
                                :prop="`form.model.sku.[${scope.$index}].material.[${index}].material_num`"
                                :rules="[{ validator: () => { return form.model.sku[scope.$index].material[index].material_num ? true : false; }, message: $t('请输入数量') }]"
                                >
                                    <el-input v-model="form.model.sku[scope.$index].material[index].material_num" :placeholder="$t('请输入数量')">
                                        <template #append>{{ item.product_unit_text }}</template>
                                    </el-input>
                                </el-form-item>
                                <el-icon class="delete-icon" @click="handleDelete(scope.$index, index)">
                                    <Delete />
                                </el-icon>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="" fixed="right" width="100">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;">
                                <el-button type="primary" link @click='deleteAttr(scope.$index)'>{{ $t('删除') }}</el-button>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form-item>
        <productList v-if="open_product" :open_product="open_product" :index="index" :multiple_selection="multiple_selection" @closeDialogFunc="closeDialogFunc($event)">
        </productList>
    </div>
</template>

<script>
import productList from '../productList.vue'
import { languageStore } from '@/store/model/language.js';

const languageList = languageStore().languageList;
export default {
    components: {
        productList
    },
    data() {
        let languageObj = {}
        languageList.forEach(item => {
            languageObj[item.key] = []
        });
        return {
            languageList: languageList,
            restaurants: [],
            restaurantsObj: languageObj,
            /*批量设置sku属性*/
            batchData: {
                product_price: '',
                line_price: '',
                stock_num: '',
                product_weight: ''
            },
            /*图片是否打开*/
            isupload: false,
            //上传图片选择的下标
            spec_index: -1,
            //材料
            open_product: false,
            multiple_selection: [],
            index: 0,
        };
    },
    inject: ['form'],
    watch: {
        'form': {
            handler(val) {
                let languageObj = {}
                languageList.forEach(item => {
                    languageObj[item.key] = []
                });
                this.restaurantsObj = languageObj
                val.spec.map((item, index) => {
                    let spec_name = JSON.parse(item.spec_name);
                    languageList.forEach(items => {
                        if (spec_name[items.key]) {
                            this.restaurantsObj[items.key].push({
                                value: spec_name[items.key],
                                index: index,
                            })
                        }
                    });
                });

                (val.model.sku || []).map((item, index) => {
                    let arr = [];
                    (item.material || []).map((items, indexs) => {
                        let num = 0;
                        num = Number(this.form.many_select_list[index][indexs].sku[0].stock_num) / Number(items.material_num);
                        num = Math.floor(num);
                        arr.push(num);
                    })
                    if((item.material || []).length>0){
                        this.form.model.sku[index].stock_num = arr.sort((a, b) => a - b)[0]==Infinity ? null : arr.sort((a, b) => a - b)[0];
                    }
                });
            },
            deep: true,
            immediate: true,
        }
    },
    mounted() {


    },
    methods: {
        deleteAttr(i) {
            if (this.form.model.sku.length > 1) {
                this.form.model.sku.splice(i, 1)
                this.form.many_select_list.splice(i, 1)
                if (i == 0) {
                    this.form.single_select_list = []
                    this.form.single_select_list = this.form.many_select_list[0]
                }
            }
        },

        querySearch(queryString, cb, key) {
            let restaurants = [];
            restaurants = this.restaurantsObj[key]
            let results = queryString ? restaurants.filter(this.createFilter(queryString, key)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },

        createFilter(queryString, key) {
            let restaurants = [];
            restaurants = this.restaurantsObj[key]
            return (restaurants) => {
                return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },

        selectChange(e, index) {
            languageList.forEach(item => {
                this.form.model.sku[index].spec_name[item.key] = this.restaurantsObj[item.key][e.index].value
            });
        },

        addMaterials(index) {
            this.multiple_selection = this.form.many_select_list[index];
            this.index = index
            this.open_product = true;
        },

        handleDelete($index, index) {
            this.form.many_select_list[$index].splice(index, 1);
            this.form.model.sku[$index].material.splice(index, 1);
            if ($index == 0) {
                this.form.single_select_list.splice(index, 1);
            }
        },

        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'submit') {
                let map = new Map();
                if (e.index == 0) {
                    [this.form.single_select_list, e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                    this.form.single_select_list = Array.from(map.values());
                }

                [this.form.many_select_list[e.index], e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                this.form.many_select_list[e.index] = Array.from(map.values());

                let arr = []
                if (this.form.model.sku[e.index].material.length > 0) {
                    this.form.model.sku[e.index].material.map(item => {
                        arr.push(item.product_id)
                    })
                }


                this.form.many_select_list[e.index].map(item => {
                    if (!arr.includes(item.product_id)) {
                        this.form.model.sku[e.index].material.push({
                            product_id: item.product_id,
                            material_num: null,
                        })
                    }
                })

            }
        },

    }
}
</script>

<style scoped>
.spec-name {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px;
}

.spec-name .el-input {
    max-width: calc(50% - 6px);
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

.max-w230 {
    max-width: 226px;
    width: 100%;
}
</style>
