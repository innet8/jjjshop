<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存
    -->
    <div>
        <!--规格设置-->
        <div class="common-form mt50">{{ $t('规格/库存') }}</div>

        <!--减库存方式-->
        <el-form-item :label="$t('库存计算方式：')" v-if="form.model.type == 10">
            <el-radio-group v-model="form.model.deduct_stock_type">
                <el-radio :label="10">{{ $t('下单减库存') }}</el-radio>
                <el-radio :label="20">{{ $t('付款减库存') }}</el-radio>
            </el-radio-group>
        </el-form-item>

        <template v-for="(item, index) in languageList" :key="index">
            <el-form-item :label="index == 0 ? $t('商品单位：') : ''" :rules="[{ required: true, message: $t('请填写商品单位') }]" :prop="`model.product_unit.${item.key}`">
                <el-autocomplete :fetch-suggestions="(e, h) => querySearch(e, h, item.key)" @select="(e) => selectChange(e)" class="inline-input"
                    v-model="form.model.product_unit[item.key]" :placeholder="$t('请输入') + `(${item.value})`">
                </el-autocomplete>
            </el-form-item>
        </template>

        <el-form-item :label="$t('商品规格：')" v-if="form.model.type == 10">
            <el-radio-group v-model="form.model.spec_type" @change="changeSpec">
                <el-radio :label="10" v-if="!form.isSpecLocked || (form.isSpecLocked && form.model.spec_type == 10)">{{
            $t('单规格') }}</el-radio>
                <el-radio :label="20" v-if="!form.isSpecLocked || (form.isSpecLocked && form.model.spec_type == 20)">{{
            $t('多规格') }}</el-radio>
            </el-radio-group>
            <div v-if="form.isSpecLocked" class="red">{{ $t('此商品正在参加活动，不能修改规格') }}</div>
        </el-form-item>

        <!--单规格-->
        <template v-if="form.model.spec_type == 10">
            <Single></Single>
        </template>

        <!--多规格-->
        <template v-if="form.model.spec_type == 20">
            <Many></Many>
        </template>

    </div>
</template>

<script>
import Single from './spec/Single.vue';
import Many from './spec/Many.vue';
import { languageStore } from '@/store/model/language.js';

const languageList = languageStore().languageList;
export default {
    components: {
        /*单规格*/
        Single,
        /*多规格*/
        Many
    },
    data() {
        let languageObj = {}
        languageList.forEach(item => {
            languageObj[item.key] = []
        });
        return {
            restaurants: [],
            restaurantsObj: languageObj,
            languageList: languageList,
        }
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
                val.unit.map((item, index) => {
                    let unit_name = JSON.parse(item.unit_name);
                    languageList.forEach(items => {
                        if (unit_name[items.key]) {
                            this.restaurantsObj[items.key].push({
                                value: unit_name[items.key],
                                index: index,
                            })
                        }
                    });

                })

            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        changeSpec(e) {
            if (e == 10) {
                this.form.sku = {
                    product_price: '',
                    stock_num: '',
                    bag_price: 0,
                    cost_price: 0,
                    is_full: 0
                }
            } else if (e == 20) {
                this.form.sku = [];
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
            var restaurants = [];
            restaurants = this.restaurantsObj[key]
            return (restaurants) => {
                return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },

        selectChange(e) {
            languageList.forEach(item => {
                this.form.model.product_unit[item.key] = this.restaurantsObj[item.key][e.index].value
            });
        },


    }
};
</script>

<style scoped lang="scss">
:deep(.inline-input) {
    max-width: 460px;
    width: 100%;
}


</style>
