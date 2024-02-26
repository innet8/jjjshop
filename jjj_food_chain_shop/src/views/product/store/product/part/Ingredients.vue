<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存
    -->
    <div>
        <!--规格设置-->
        <div class="common-form mt50">{{ $t('商品加料') }}</div>
        <!--多规格-->
        <div>
            <div class="mt16">
                <!-- <el-form-item label="属性明细："> -->

                <el-form-item :label="$t('商品加料：')">
                    <el-button type="primary" @click="addIngredients">{{ $t('添加加料') }}+</el-button>
                </el-form-item>
                <!--多规格表格-->
                <el-form-item class="product-box mb18" v-for="(item, index) in form.model.product_feed" :key="index"
                    v-if="form.model.product_feed.length > 0">
                    <template #label>
                        <el-icon class="delete-icon" @click="handleDelete(index)">
                            <Delete />
                        </el-icon>
                    </template>
                    <el-form :ref="`form-${index}`" :model="item" class="product-attr">
                        <el-form-item v-for="(items, indexs) in languageList" :key="indexs"
                            :prop="`item.feed_name[items.key]`" :rules="[{
                                validator: () => {
                                    return item.feed_name[items.key] ? true : false;
                                },
                                message: $t('请输入加料名称')
                            }]">
                            <template #label>
                                <span style="color: var(--el-color-danger);margin: 0  4px 0 0 !important;">*</span>{{
                                    $t('加料名称：') }}<span class="product-tips">({{ items.value }})</span>
                            </template>
                            <el-autocomplete :fetch-suggestions="(e, h) => querySearch(e, h, items.key)"
                                @select="(e) => selectChange(e, index)" class="inline-input"
                                v-model="item.feed_name[items.key]" maxlength="128"
                                :placeholder="$t('如：番茄酱')"></el-autocomplete>
                        </el-form-item>
                        <el-form-item :label="$t('价格：')" :prop="`item.price`" :rules="[{
                            validator: () => {
                                return item.price != '' ? true : false;
                            },
                            message: $t('请输入价格')
                        }]">
                            <template #label>
                                <span style="color: var(--el-color-danger);margin: 0  4px 0 0 !important;">*</span>{{
                                    $t('价格：') }}
                            </template>
                            <el-input-number :controls="false" :min="0" :max="1000000" :placeholder="$t('请输入价格')"
                                v-model.number="item.price"></el-input-number>
                        </el-form-item>
                    </el-form>

                </el-form-item>
                <!-- </el-form-item> -->
            </div>
        </div>

    </div>
</template>

<script>
import { languageStore } from '@/store/model/language.js';
const languageData = JSON.stringify(languageStore().languageData)
const languageList = languageStore().languageList;

export default {
    data() {
        let languageObj = {}
        languageList.forEach(item => {
            languageObj[item.key] = []
        });
        return {
            languageList: languageList,
            restaurants: [],
            restaurantsObj: languageObj,
            formData: {
                feed: []
            },
        }
    },
    inject: {
        form: {
            default: () => { }
        },
    },
    watch: {
        'form': {
            handler(val) {
                let languageObj = {}
                languageList.forEach(item => {
                    languageObj[item.key] = []
                });
                this.restaurantsObj = languageObj
                val.feed.map((item, index) => {
                    let feed_name = JSON.parse(item.feed_name);
                    languageList.forEach(items => {
                        if (feed_name[items.key]) {
                            this.restaurantsObj[items.key].push({
                                value: feed_name[items.key],
                                index: index,
                                price: item.price,
                            })
                        }
                    });
                })
            },
            deep: true,
            immediate: true,
        }
    },
    methods: {
        addIngredients() {
            this.form.model.product_feed.push(
                {
                    feed_name: JSON.parse(languageData),
                    price: null,
                }
            )
        },
        handleDelete(index) {
            this.form.model.product_feed.splice(index, 1);
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
            this.form.model.product_feed[index].price = e.price
            languageList.forEach(item => {
                this.form.model.product_feed[index].feed_name[item.key] = this.restaurantsObj[item.key][e.index].value
            });
        },

        checkedForm() {
            this.form.model.product_feed.map((item, index) => {
                this.$refs['form-' + index].forEach((item, indexs) => {
                    this.$refs['form-' + index][indexs].validate(valid => {
                        if (!valid) {

                        }
                    })
                })
            })
        },
    }
};
</script>

<style scoped>
.delete-icon {
    cursor: pointer;
    font-size: 24px;
    margin-right: 16px;
}

.product-attr {
    width: 100%;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    padding: 16px 16px 0 16px;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    margin-bottom: 12px;
}

:deep(.inline-input) {
    width: 100%;
}

.product-tips {
    color: var(--el-color-tips);
}

.product-box {
    display: flex;
}</style>
