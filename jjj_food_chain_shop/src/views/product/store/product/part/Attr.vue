<template>
    <!--
    	描述：商品管理-商品编辑-规格/库存
    -->
    <div>
        <!--规格设置-->
        <div class="common-form mt50">{{ $t('商品属性') }}</div>
        <!--多规格-->
        <div>
            <div class="mt16">
                <!-- <el-form-item label="属性明细："> -->
                <el-form-item :label="$t('商品属性：')">
                    <el-button type="primary" @click="addAttr">{{ $t('添加属性') }}+</el-button>
                </el-form-item>

                <!--多规格表格-->
                <el-form-item class="product-box" v-for="(item, index) in form.model.product_attr" :key="index"
                    v-if="form.model.product_attr.length > 0">
                    <template #label>
                        <el-icon class="delete-icon" @click="handleDelete(index)">
                            <Delete />
                        </el-icon>
                    </template>
                    <el-form :ref="`form-${index}`" :model="item" size="small" class="product-attr"
                        v-for="(items, indexs) in languageList" :key="indexs">
                        <el-form-item :prop="`item.attribute_name[items.key]`" :rules="[{
                            validator: () => {
                                return item.attribute_name[items.key] ? true : false;
                            },
                            message: $t('请输入属性名称')
                        }]">
                            <template #label>
                                {{ $t('属性名称：') }}<span class="product-tips">（{{ items.label }}）</span>
                            </template>
                            <el-autocomplete :fetch-suggestions="(e, h) => querySearch(e, h, items.key)"
                                @select="(e) => selectChange(e, index)" class="inline-input"
                                v-model="item.attribute_name[items.key]" maxlength="128"
                                :placeholder="$t('如：温度')"></el-autocomplete>
                        </el-form-item>
                        <el-form-item class="product-attr-item">
                            <template #label>
                                {{ $t('属性：') }}<span class="product-tips">({{ items.label }})</span>
                            </template>
                            <el-form-item v-for="(aitem, aindex) in item.attribute_value" :key="aindex"
                                :prop="`item.attribute_value[aindex][items.key]`" :rules="[{
                                    validator: () => {
                                        return item.attribute_value[aindex][items.key] ? true : false;
                                    },
                                    message: $t('请输入属性')
                                }]">
                                <el-input style="width: 100px; margin-right: 16px;" :maxlength="50"
                                    v-model="item.attribute_value[aindex][items.key]" :placeholder="$t('请输入')">
                                </el-input>
                            </el-form-item>
                            <el-icon class="add-button" @click="handleAdd(index)">
                                <CirclePlusFilled />
                            </el-icon>
                            <el-icon class="add-button" @click="handleDecrease(index)">
                                <RemoveFilled />
                            </el-icon>
                        </el-form-item>
                    </el-form>
                </el-form-item>
            </div>
        </div>

    </div>
</template>

<script>
import { handleError } from 'vue';
import { languageStore } from '@/store/model/language.js';
const languageData = JSON.stringify(languageStore().languageData)
const languageList = languageStore().languageList;
export default {
    data() {
        return {
            restaurants_zh: [],
            restaurants_zhtw: [],
            restaurants_en: [],
            restaurants_th: [],
            formData: {},
            languageList: languageList,
        }
    },
    inject: ['form'],
    watch: {
        'form': {
            handler(val) {
                this.restaurants_zh = [];
                this.restaurants_zhtw = [];
                this.restaurants_en = [];
                this.restaurants_th = [];

                val.attribute.map((item, index) => {
                    if (JSON.parse(item.attribute_name).zh && JSON.parse(item.attribute_name).zhtw && JSON.parse(item.attribute_name).en && JSON.parse(item.attribute_name).th) {
                        this.restaurants_zh.push({
                            value: JSON.parse(item.attribute_name).zh,
                            index: index,
                            child: item.attribute_value,
                        })
                        this.restaurants_zhtw.push({
                            value: JSON.parse(item.attribute_name).zhtw,
                            index: index,
                            child: item.attribute_value,
                        })
                        this.restaurants_en.push({
                            value: JSON.parse(item.attribute_name).en,
                            index: index,
                            child: item.attribute_value,
                        })
                        this.restaurants_th.push({
                            value: JSON.parse(item.attribute_name).th,
                            index: index,
                            child: item.attribute_value,
                        })
                    }

                })
            },
            deep: true,
            immediate: true,
        }
    },
    methods: {
        addAttr() {
            this.form.model.product_attr.push({
                attribute_name: JSON.parse(languageData),
                attribute_value: [JSON.parse(languageData)],
            },
            )
        },
        handleDelete(index) {
            this.form.model.product_attr.splice(index, 1);
        },
        handleAdd(index) {
            this.form.model.product_attr[index].attribute_value.push(JSON.parse(languageData));
        },
        handleDecrease(index) {
            if (this.form.model.product_attr[index].attribute_value.length > 1) {
                this.form.model.product_attr[index].attribute_value.pop();
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
            this.form.model.product_attr[index].attribute_name.zh = this.restaurants_zh[e.index].value
            this.form.model.product_attr[index].attribute_name.th = this.restaurants_th[e.index].value
            this.form.model.product_attr[index].attribute_name.en = this.restaurants_en[e.index].value
            this.form.model.product_attr[index].attribute_name.zhtw = this.restaurants_zhtw[e.index].value
            this.form.model.product_attr[index].much = e.child.length;
            this.form.model.product_attr[index].attribute_value = e.child
        },

        checkedForm() {

            this.form.model.product_attr.map((item, index) => {
                this.$refs['form-' + index].forEach((item, indexs) => {
                    this.$refs['form-' + index][indexs].validate(valid => {
                        if (!valid) {
                            
                        }
                    })
                })
            })

        },
    },

};
</script>

<style scoped lang="scss">
.product-attr {
    width: 100%;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    padding: 16px 16px 0 16px;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    margin-bottom: 12px;
}

.add-button {
    cursor: pointer;
    font-size: 24px;
    margin-right: 16px;
    margin-top: 4px;
}

:deep(.inline-input) {
    max-width: 460px;
    width: 100%;
}

.delete-icon {
    cursor: pointer;
    font-size: 24px;
    margin-right: 16px;
}

.product-tips {
    font-size: 12px;
    color: var(--el-color-tips);
}

.product-box {
    display: flex;
}

:deep(.product-attr-item) {
    .el-form-item__content {
        align-items: flex-start !important;
    }
}
</style>
