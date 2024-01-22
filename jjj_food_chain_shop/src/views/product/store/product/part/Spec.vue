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
        <el-form-item :label="$t('库存计算方式：')">
            <el-radio-group v-model="form.model.deduct_stock_type">
                <el-radio :label="10">{{ $t('下单减库存') }}</el-radio>
                <el-radio :label="20">{{ $t('付款减库存') }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- <el-form-item :label="$t('特色分类：')">
            <el-radio-group v-model="form.model.special_id">
                <el-radio :label="0">无</el-radio>
                <el-radio :label="item.category_id" v-for="(item, index) in form.special" :key="index">{{ item.name_text
                }}</el-radio>
            </el-radio-group>
        </el-form-item> -->
        <template v-for="(item, index) in languageList" :key="index">
            <el-form-item :label="index == 0 ? $t('商品单位：') : ''" :rules="[{ required: true, message: $t('请填写商品单位') }]"
                prop="model.product_unit.th">
                <el-input class="inline-input" v-model="form.model.product_unit[item.key]"
                    :placeholder="$t('请输入') + `(${item.label})`"></el-input>
            </el-form-item>
        </template>

        <el-form-item :label="$t('产品规格：')">
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
        return {
            restaurants: [],
            languageList: languageList,
        }
    },
    inject: ['form'],
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
        querySearch(queryString, cb) {
            let self = this;
            if (self.restaurants.length == 0) {
                self.form.unit.forEach((item, index) => {
                    self.restaurants.push({
                        value: item.unit_name
                    })
                })
            }

            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
    }
};
</script>

<style scoped>
.inline-input {
    max-width: 460px;
}
</style>
