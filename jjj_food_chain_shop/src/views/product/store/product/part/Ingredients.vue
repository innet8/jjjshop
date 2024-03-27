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
                <el-form-item class="product-box mb18" v-for="(item, index) in form.model.product_feed" :key="index" v-if="form.model.product_feed.length > 0">
                    <template #label>
                        <el-icon class="delete-icon" @click="handleDelete(index)">
                            <Delete />
                        </el-icon>
                    </template>
                    <el-form :ref="`form-${index}`" :model="item" class="product-attr">
                        <el-form-item v-for="(items, indexs) in languageList" :key="indexs" :prop="`item.feed_name[items.key]`"
                            :rules="[{ validator: () => { return item.feed_name[items.key] ? true : false; }, message: $t('请输入加料名称') }]">
                            <template #label>
                                <span style="color: var(--el-color-danger);margin: 0  4px 0 0 !important;">*</span>{{ $t('加料名称：') }}<span class="product-tips">
                                    ({{ items.value }})
                                </span>
                            </template>
                            <el-autocomplete :fetch-suggestions="(e, h) => querySearch(e, h, items.key)" @select="(e) => selectChange(e, index)" class="inline-input"
                                v-model="item.feed_name[items.key]" maxlength="128" :placeholder="$t('如：番茄酱')"></el-autocomplete>
                        </el-form-item>
                        <el-form-item :label="$t('价格：')" :prop="`item.price`" :rules="[{ validator: () => { return item.price  ? true : false; }, message: $t('请输入价格') }]">
                            <template #label>
                                <span style="color: var(--el-color-danger);margin: 0  4px 0 0 !important;">*</span>{{ $t('价格：') }}
                            </template>
                            <el-input-number :controls="false" :min="0" :max="1000000" :placeholder="$t('请输入价格')" v-model.number="item.price"></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('库存数量：')" :prop="`product_feed[${index}].stock_num`"
                            :rules="[{ validator: () => { return item.stock_num  ? true : false; }, message: $t('请填写库存数量') }]">
                            <template #label>
                                <span style="color: var(--el-color-danger);margin: 0  4px 0 0 !important;">*</span>{{ $t('库存数量：') }}
                            </template>
                            <el-input-number :controls="false" :min="0" :max="1000000" :disabled="form.ing_select_list[index].length > 0" :placeholder="$t('请填写库存数量')" v-model.number="item.stock_num"></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('材料：')" :prop="`item.stock_num`">
                            <template #label>
                                <span style="color: var(--el-color-danger);margin: 0  4px 0 0 !important;">*</span>{{ $t('材料：') }}
                            </template>
                            <el-button type="primary" @click='addMaterials(index)'>{{ $t('添加材料') }}</el-button>
                        </el-form-item>
                        <div class="materials-one" label="" v-for="items, indexs in form.ing_select_list[index]">
                            <el-form-item label="" class="max-w230">
                                <el-input v-model="items.product_name_text" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="" class="max-w230" :prop="`form.model.product_feed[${index}].material[${indexs}].material_num`"
                            :rules="[{ validator: () => { return form.model.product_feed[index].material[indexs].material_num ? true : false; }, message: $t('请输入加料名称') }]">
                                <el-input v-model="form.model.product_feed[index].material[indexs].material_num" :placeholder="$t('请输入数量')">
                                    <template #append>{{ items.product_unit_text }}</template>
                                </el-input>

                            </el-form-item>
                            <el-icon class="delete-icon" @click="handleDeleteOne(index, indexs)">
                                <Delete />
                            </el-icon>
                        </div>
                    </el-form>

                </el-form-item>
                <!-- </el-form-item> -->
            </div>
        </div>
        <productList v-if="open_product" :open_product="open_product" :index="index" :multiple_selection="multiple_selection" @closeDialogFunc="closeDialogFunc($event)">
        </productList>
    </div>
</template>

<script>
import productList from './spec/productList.vue';
import { languageStore } from '@/store/model/language.js';
const languageData = JSON.stringify(languageStore().languageData)
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
            formData: {
                feed: []
            },
            //材料
            open_product: false,
            multiple_selection: [],
            index: 0,
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
                });


                (val.model.product_feed || []).map((item, index) => {
                    let arr = [];
                    (item.material || []).map((items, indexs) => {
                        let num = 0;
                        num = Number(this.form.ing_select_list[index][indexs].sku[0].stock_num) / Number(items.material_num);
                        num = Math.floor(num);
                        arr.push(num);
                    })
                    this.form.model.product_feed[index].stock_num = arr.sort((a, b) => a - b)[0]==Infinity ? null : arr.sort((a, b) => a - b)[0];
                });
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
                    stock_num: null,
                    material: [],
                }
            )
            this.form.ing_select_list.push([])
        },
        handleDelete(index) {
            this.form.model.product_feed.splice(index, 1);
            this.form.ing_select_list.splice(index,1);
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

        addMaterials(index) {
            this.multiple_selection = this.form.ing_select_list[index];
            this.index = index
            this.open_product = true;
        },

        handleDeleteOne(index,indexs){
            this.form.ing_select_list[index].splice(index,1);
            this.form.model.product_feed[e.index].material.splice(index,1);
        },

        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'submit') {
                let map = new Map();

                [this.form.ing_select_list[e.index], e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                this.form.ing_select_list[e.index] = Array.from(map.values());
                console.log(this.form.ing_select_list);

                let arr = [];
                if (this.form.model.product_feed[e.index].material.length > 0) {
                    this.form.model.product_feed[e.index].material.map(item => {
                        arr.push(item.product_id)
                    })
                }


                this.form.ing_select_list[e.index].map(item => {
                    if (!arr.includes(item.product_id)) {
                        this.form.model.product_feed[e.index].material.push({
                            product_id: item.product_id,
                            material_num: null,
                        })
                    }
                })

            }
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
        margin-right: 0;
    }
}

.max-w230 {
    
    width: 100%;
}
</style>
