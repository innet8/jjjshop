<template>
    <div class="product-add">
        <!--form表单-->
        <el-form size="small" ref="form" class="product-form" :model="form" label-position="top" label-width="180px">
            <!--基础信息-->
            <div class="product-form-flex" ref="formContainer">
                <Basic @validateField="validateField"></Basic>

                <!--规格设置-->
                <Spec></Spec>

                <!-- 属性设置-->
                <Attr ref="AttrRef" v-if="form.model.type == 10"></Attr>

                <!-- 加料设置-->
                <Ingredients ref="IngredientsRef" v-if="form.model.type == 10"></Ingredients>

                <!--商品详情-->
                <!-- <Content></Content> -->

                <!--高级设置-->
                <Buyset></Buyset>
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
import PorductApi from '@/api/product.js';
import Basic from './part/Basic.vue';
import Attr from './part/Attr.vue';
import Ingredients from './part/Ingredients.vue';
import Spec from './part/Spec.vue';
import Content from './part/Content.vue';
import Buyset from './part/Buyset.vue';
import { languageStore } from '@/store/model/language.js';
const languageData = JSON.stringify(languageStore().languageData)
const languageList = languageStore().languageList;
export default {
    components: {
        /*基础信息*/
        Basic,
        /*规格信息*/
        Spec,
        /* 属性信息*/
        Attr,
        /*加料设置*/
        Ingredients,
        /*商品详情*/
        Content,
        /*高级设置*/
        Buyset
    },
    data() {
        return {
            /*是否正在加载*/
            loading: false,
            active: false,
            /*form表单数据*/
            form: {
                model: {
                    /*商品类型*/
                    type: 10,
                    /*商品名称*/
                    product_name: JSON.parse(languageData),
                    /*商品分类*/
                    category_id: null,
                     /*供应商id*/
                    erp_supplier_id:null,
                    /*商品图片*/
                    image: [],
                    /*商品卖点*/
                    selling_point: '',
                    /*规格类别,默认10单规格，20多规格*/
                    spec_type: 10,
                    /*库存计算方式,默认20付款减库存，10下单减库存*/
                    deduct_stock_type: 20,
                    /*检查用户等级*/
                    is_alone_grade: 0,
                    sku: [{
                        spec_name: {},
                        product_price: null,
                        stock_num: null,
                        product_weight: '',
                        cost_price: 0,
                        material:[],
                    }],
                    product_attr: [],
                    product_feed: [],
                    /* 最小购买量 */
                    min_buy: 1,
                    /* 商品单位 */
                    product_unit: JSON.parse(languageData),
                    /* 属性*/
                    /*商品详情内容*/
                    content: '',
                    /*商品状态*/
                    product_status: 10,
                    /*商品材料*/
                    material: [],
                    /*平板是否显示*/
                    is_show_tablet: 1,
                    /*厨显是否显示*/
                    is_show_kitchen: 1,
                    /*初始销量*/
                    sales_initial: 0,
                    /*商品排序，默认100*/
                    product_sort: null,
                    /*限购数量*/
                    limit_num: 0,
                    special_id: '',
                    /*是否开启积分赠送,默认1为开启，0为关闭*/
                    is_points_gift: 1,
                    is_agent: 0,
                    /*是否开启单独分销,默认0为关闭，1为开启*/
                    is_ind_agent: 0,
                    /*分销佣金类型,默认10为百分比，20为固定金额*/
                    agent_money_type: 10,
                    /*一级佣金*/
                    first_money: 0,
                    /*二级佣金*/
                    second_money: 0,
                    /*三级佣金*/
                    third_money: 0,
                    /*会员折扣设置,默认1为单独设置折扣,0为默认折扣*/
                    is_enable_grade: 1,
                    /*等级金额类型,默认10为百分比，20为固定金额*/
                    alone_grade_type: 10,
                    /*打印标签*/
                    label_id: ''
                },
                /*商品分类*/
                category: [],
                feed: [],
                attribute: [],
                unit: [],
                spec: [],
                labelList: [],
                special: [],
                /*运费模板*/
                delivery: [],
                /*会员等级*/
                gradeList: [],
                /*规格数据*/
                specData: null,
                /*分销基础设置*/
                basicSetting: {},
                /*分销佣金设置*/
                agentSetting: {},
                /*单规格的材料组*/
                single_select_list: [],
                /*多规格的材料组*/
                many_select_list: [[]],
                /*加料的材料组*/
                ing_select_list: [[]],
            },

        };
    },
    provide: function () {
        return {
            form: this.form
        }
    },
    created() {

        /*获取基础数据*/
        this.getBaseData();

    },
    watch: {
        'form.model.type': {
            handler(val) {
                this.form.model.spec_type = 10;
            }
            , deep: true
            , immediate: true
        }
    },
    methods: {

        /*获取基础数据*/
        getBaseData: function () {
            let self = this;
            PorductApi.storeGetBaseData({}, true)
                .then(res => {
                    self.loading = false;
                    Object.assign(self.form, res.data);
                })
                .catch(error => {
                    self.loading = false;
                });
        },

        /*转JSON字符串*/
        convertJson(list) {
            let obj = {};
            list.forEach(item => {
                obj[item.grade_id] = item.product_equity;
            });
            return JSON.stringify(obj);
        },
        validateField(e) {
            this.$refs.form.validateField(e);
        },




        /*提交*/
        onSubmit: function () {
            let self = this;
            self.$refs.form.validate(valid => {

                if (self.form.model.product_attr.length > 0) {
                    self.$refs.AttrRef.checkedForm();
                }
                if (self.form.model.product_feed.length > 0) {
                    self.$refs.IngredientsRef.checkedForm();
                }
                if (self.form.model.product_attr.length > 0) {
                    let checkArr = self.form.model.product_attr
                    for (let i = 0; i < checkArr.length; i++) {
                        for (let e = 0; e < languageList.length; e++) {
                            if (!checkArr[i].attribute_name[languageList[e].key]) return
                        }
                        for (let e = 0; e < checkArr[i].attribute_value.length; e++) {
                            for (let d = 0; d < languageList.length; d++) {
                                if (!checkArr[i].attribute_value[e][languageList[d].key]) return
                            }
                        }
                    }
                }
                if (self.form.model.product_feed.length > 0) {
                    let checkArr = self.form.model.product_feed;
                    for (let i = 0; i < checkArr.length; i++) {
                        for (let e = 0; e < languageList.length; e++) {
                            if (!checkArr[i].feed_name[languageList[e].key]) return
                        }
                        if (checkArr[i].price == '' || checkArr[i].price == null) return;
                    }
                }
                if (valid) {
                    let params = {}
                    params = JSON.parse(JSON.stringify(self.form.model));
                    params.product_name = JSON.stringify(params.product_name)
                    params.product_unit = JSON.stringify(params.product_unit)
                    if (params.spec_type == 10) {
                        params.sku = params.sku.slice(0, 1);
                        params.sku[0].spec_name = ''
                    } else {
                        params.sku.map((item, index) => {
                            params.sku[index].spec_name = JSON.stringify(item.spec_name)
                        })
                    }
                    params.product_attr.map((item, index) => {
                        params.product_attr[index].attribute_name = JSON.stringify(item.attribute_name)
                        item.attribute_value.map((items, indexs) => {
                            params.product_attr[index].attribute_value[indexs] = JSON.stringify(items)
                        })
                    })
                    params.product_feed.map((item, index) => {
                        params.product_feed[index].feed_name = JSON.stringify(item.feed_name)
                    })
                    if (typeof params.category_id == 'object' && params.category_id) {
                        params.category_id = Number(params.category_id[params.category_id.length - 1])
                    }
                    self.loading = true;
                    params.alone_grade_equity = self.convertJson(self.form.gradeList);
                    PorductApi.storeAddProduct({
                        params: JSON.stringify(params)
                    }, true)
                        .then(data => {
                            self.loading = false;
                            this.$ElMessage({
                                message: $t('添加成功'),
                                type: 'success'
                            });
                            self.$router.push('/product/store/product/index');
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                }
            });

        },


        /*保存为草稿*/
        Draft() {
            let self = this;
            self.form.model.product_status = 30;
            self.onSubmit();
        },

        /*取消*/
        cancelFunc() {
            this.$router.back(-1);
        }

    }
};
</script>

<style lang="scss" scoped>
.basic-setting-content {}

.product-add {
    height: calc(100% - 14px);
    overflow: hidden;
}

.product-form {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .product-form-flex {
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
