<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品添加
    -->
    <div class="product-add" v-loading="loading">
        <!--form表单-->
        <el-form size="small" ref="form" :model="form" class="product-form" label-position="top" label-width="180px"
            v-if="!loading">
            <!--基础信息-->
            <div class="product-form-flex">
                <Basic @validateField="validateField"></Basic>
                <!--规格设置-->
                <Spec></Spec>

                <!-- 属性设置-->
                <Attr ref="AttrRef"></Attr>

                <!-- 加料设置-->
                <Ingredients ref="IngredientsRef"></Ingredients>
                <!--商品详情-->
                <!-- <Content></Content> -->
                <!--高级设置-->
                <Buyset></Buyset>
            </div>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button size="small"  @click="cancelFunc">{{ $t('取消') }}</el-button>
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
import {
    formatModel
} from '@/utils/base.js';
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
        Buyset,
    },
    data() {

        return {
            /* 审核状态*/
            old_audit: 20,
            /*商品ID*/
            product_id: 0,
            /*判断是编辑*/
            scene: 'edit',
            /*是否正在加载*/
            loading: true,
            /*是否正在提交保存*/
            save_loading: false,
            /*form表单数据*/
            form: {
                model: {},
                /*商品分类*/
                category: [],
                feed: [],
                attribute: [],
                unit: [],
                spec: [],
                labelList: [],
                special: [],
                /*会员等级*/
                gradeList: [],
                /*规格数据*/
                specData: null,
                /*是否锁住*/
                isSpecLocked: false,
                /*分销基础设置*/
                basicSetting: {},
                /*分销佣金设置*/
                agentSetting: {},
                /*打印标签*/
                label_id: ''
            },
            /*模型数据*/
            model: {
                /*商品名称*/
                product_name: '',
                /*商品分类*/
                category_id: null,
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
                /*单规格*/
                sku: [{
                    product_price: '',
                    stock_num: '',
                    product_weight: '',
                    cost_price: ''
                }],
                product_attr: [],
                product_feed: [],
                /* 最小购买量 */
                min_buy: 1,
                /* 商品单位 */
                product_unit: '',
                /*商品详情内容*/
                content: '',
                /*商品状态*/
                product_status: 10,
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
            }
        };
    },
    provide: function () {
        return {
            form: this.form
        };
    },
    created() {
        /*获取列表*/
        this.product_id = this.$route.query.product_id;
        this.scene = this.$route.query.scene;
        this.getData();
    },
    methods: {
        /**
         * 获取基础数据
         */
        getData: function () {
            let self = this;
            PorductApi.storeGetEditData({
                product_id: self.product_id,
                scene: self.scene
            },
                true
            )
                .then(res => {
                    self.loading = false;
                    if (res.data.model.alone_grade_equity != null && typeof res.data.model.alone_grade_equity !=
                        'undefined') {
                        let equitys = res.data.model.alone_grade_equity;
                        res.data.gradeList.forEach(item => {
                            item.product_equity = equitys[item.grade_id];
                        });
                    }
                    Object.assign(self.form, res.data);
                    // 处理数据
                    self.form.model.product_status = res.data.model.product_status.value;
                    self.form.model.product_name = JSON.parse(self.form.model.product_name)
                    self.form.model.product_unit = JSON.parse(self.form.model.product_unit)
               
                    self.form.model.sku.map((item, index) => {
                        if(item.spec_name){
                            self.form.model.sku[index].spec_name = JSON.parse(item.spec_name)
                        }else{
                            self.form.model.sku[index].spec_name =  JSON.parse(languageData)
                        }
                    })
               
                    self.form.model.product_attr.map((item, index) => {
                        self.form.model.product_attr[index].attribute_name = JSON.parse(item.attribute_name)
                        item.attribute_value.map((items, indexs) => {
                            self.form.model.product_attr[index].attribute_value[indexs] = JSON.parse(items)
                        })
                    })

                    self.form.model.product_feed.map((item, index) => {
                        self.form.model.product_feed[index].feed_name = JSON.parse(item.feed_name)
                    })

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
                        if (checkArr[i].attribute_name.en == '' || checkArr[i].attribute_name.th == '' || checkArr[i].attribute_name.zh == '' || checkArr[i].attribute_name.zhtw == '') return;
                        for (let e = 0; e < checkArr[i].attribute_value.length; e++) {
                            if (checkArr[i].attribute_value[e].en == '' || checkArr[i].attribute_value[e].th == '' || checkArr[i].attribute_value[e].zh == '' || checkArr[i].attribute_value[e].zhtw == '') return;
                        }
                    
                    }
                }
                if (self.form.model.product_feed.length > 0) {
                    let checkArr = self.form.model.product_feed;
                    for (let i = 0; i < checkArr.length; i++) {
                        if (checkArr[i].feed_name.en == '' || checkArr[i].feed_name.th == '' || checkArr[i].feed_name.zh == '' || checkArr[i].feed_name.zhtw == '' || checkArr[i].price == '' || checkArr[i].price == null) return;
                    }
                }
                if (valid) {
                    let params = formatModel(JSON.parse(JSON.stringify(self.model)), JSON.parse(JSON.stringify(self.form.model)));
                    params.scene = JSON.parse(JSON.stringify(self.scene));
                    params.image = JSON.parse(JSON.stringify(self.ImgKeepId(params.image)));
                    params.product_id = JSON.parse(JSON.stringify(self.product_id));
                    params.sku = JSON.parse(JSON.stringify(self.form.model.sku));
                    params.alone_grade_equity = JSON.parse(JSON.stringify(self.convertJson(self.form.gradeList)));
                    //处理数据
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
                    self.save_loading = true;
                    PorductApi.storeEditProduct({
                        product_id: self.product_id,
                        params: JSON.stringify(params)
                    }, true)
                        .then(data => {
                            self.save_loading = false;
                            this.$ElMessage({
                                message: $t('保存成功'),
                                type: 'success'
                            });
                            self.cancelFunc();
                        })
                        .catch(error => {
                            self.save_loading = false;
                        });
                }
            });
        },

        /*图片数值只保留id*/
        ImgKeepId(list) {
            let arr = [];
            for (let i = 0, length = list.length; i < length; i++) {
                let obj = {
                    image_id: list[i].image_id,
                    file_id: list[i].file_id
                };
                arr.push(obj);
            }
            return arr;
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
}

.mb50 {
    margin-bottom: 50px;
}
</style>
