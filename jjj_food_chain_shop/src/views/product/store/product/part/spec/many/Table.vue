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
                    <el-table-column :label="$t('规格名称')" width="400">
                        <template #default="scope">
                            <div label="" class="spec-name" style="margin-bottom: 0;">
                                <el-form-item v-for="(item, index) in languageList" :key="index"
                                    :prop="`scope.row.spec_name[${item.key}]`" :rules="[{
                                        validator: () => {
                                            return scope.row.spec_name[item.key] ? true : false;
                                        },
                                        message: $t('请输入规格名称')
                                    }]">
                                    <el-autocomplete size="small" @select="(e) => selectChange(e, scope.$index)"
                                        :fetch-suggestions="(e, h) => querySearch(e, h, item.key)"
                                        v-model="scope.row.spec_name[item.key]"
                                        :placeholder="$t('请输入') + `(${item.label})`"></el-autocomplete>
                                </el-form-item>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('价格')">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;" :prop="`scope.row.product_price`" :rules="[{
                                validator: () => {
                                    return typeof scope.row.product_price == 'number' && scope.row.product_price >= 0 ? true : false;
                                },
                                message: $t('请输入价格')
                            }]">
                                <el-input-number type="number" :placeholder="$t('请输入价格')" size="small" :min="0" :max="1000000" :controls="false"
                                    v-model="scope.row.product_price"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column :label="$t('包装费')">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;" :prop="`scope.row.bag_price`" :rules="[{
                                validator: () => {
                                    return scope.row.bag_price ? true : false;
                                },
                                message: $t('请输入规格名称')
                            }]">
                                <el-input type="number" size="small"
                                    v-model="scope.row.bag_price"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column> -->
                    <el-table-column :label="$t('库存')">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;" :prop="`scope.row.stock_num`" :rules="[{
                                validator: () => {
                                    return typeof scope.row.stock_num == 'number' && scope.row.stock_num >= 0 ? true : false;
                                },
                                message: $t('请输入库存')
                            }]">
                                <el-input-number type="number" :placeholder="$t('请输入库存')"  size="small" :min="0" :max="999" :controls="false"
                                    v-model="scope.row.stock_num"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;">
                                <el-button type="primary" link @click='deleteAttr(scope.$index)'>{{ $t('删除') }}</el-button>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import PorductApi from '@/api/product.js';
import { languageStore } from '@/store/model/language.js';
const languageList = languageStore().languageList;
export default {
    components: {

    },
    data() {
        return {
            languageList: languageList,
            restaurants: [],
            restaurants_zh: [],
            restaurants_zhtw: [],
            restaurants_en: [],
            restaurants_th: [],
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
            spec_index: -1
        };
    },
    inject: ['form'],
    created() {
        this.form.spec.map((item, index) => {
            this.restaurants_zh.push({
                value: JSON.parse(item.spec_name).zh,
                index: index,
            })
            this.restaurants_zhtw.push({
                value: JSON.parse(item.spec_name).zhtw,
                index: index,
            })
            this.restaurants_en.push({
                value: JSON.parse(item.spec_name).en,
                index: index,
            })
            this.restaurants_th.push({
                value: JSON.parse(item.spec_name).th,
                index: index,
            })
        })
    },
    mounted() {


    },
    methods: {
        deleteAttr(i) {
            if( this.form.model.sku.length > 1){
                this.form.model.sku.splice(i, 1)
            }
        },

        querySearch(queryString, cb, key) {
            let restaurants = [];
            if (key == 'th') {
                restaurants = this.restaurants_th
            }
            if (key == 'zh') {
                restaurants = this.restaurants_zh
            }
            if (key == 'zhtw') {
                restaurants = this.restaurants_zhtw
            }
            if (key == 'en') {
                restaurants = this.restaurants_en
            }
            let results = queryString ? restaurants.filter(this.createFilter(queryString, key)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },

        createFilter(queryString, key) {
            var restaurants = [];
            if (key == 'th') {
                restaurants = this.restaurants_th
            }
            if (key == 'zh') {
                restaurants = this.restaurants_zh
            }
            if (key == 'zhtw') {
                restaurants = this.restaurants_zhtw
            }
            if (key == 'en') {
                restaurants = this.restaurants_en
            }
            return (restaurants) => {
                return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },

        selectChange(e, index) {
            this.form.model.sku[index].spec_name.zh = this.restaurants_zh[e.index].value
            this.form.model.sku[index].spec_name.th = this.restaurants_th[e.index].value
            this.form.model.sku[index].spec_name.en = this.restaurants_en[e.index].value
            this.form.model.sku[index].spec_name.zhtw = this.restaurants_zhtw[e.index].value
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
</style>
