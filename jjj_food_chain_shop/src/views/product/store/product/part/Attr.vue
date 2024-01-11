<template>
    <!--
    	描述：商品管理-商品编辑-规格/库存
    -->
    <div>
        <!--规格设置-->
        <div class="common-form mt50">商品属性</div>
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
                    <el-form size="small" class="product-attr" v-for="(items, indexs) in item" :key="indexs">
                        <el-form-item>
                            <template #label>
                                    {{ $t('属性名称：') }}<span class="product-tips">{{ items.placeholder }}</span>
                            </template>
                            <el-input class="inline-input"  v-model="items.attribute_name" maxlength="128"
                                :placeholder="$t('如：温度')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('属性：')">
                            <template v-for="(aitem, aindex) in items.much" :key="aindex">
                                <el-input style="width: 100px; margin-right: 16px;" 
                                    v-model="items.attribute_value[aindex]" :placeholder="$t('请输入')">
                                </el-input>
                            </template>
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

export default {
    data() {
        return {
            restaurants: [],
            formData: {},
        }
    },
    inject: ['form'],
    methods: {
        addAttr() {
            this.form.model.product_attr.push([{
                placeholder: '(ภาษาไทย)',
                attribute_name: '',
                attribute_value: [],
                much: 2,
            },
            {
                placeholder: '(简体中文)',
                attribute_name: '',
                attribute_value: [],
                much: 2,
            },
            {
                placeholder: '(繁體中文)',
                attribute_name: '',
                attribute_value: [],
                much: 2,
            },
            {
                placeholder: '(English)',
                attribute_name: '',
                attribute_value: [],
                much: 2,
            }
            ])
        },
        handleDelete(index) {
            this.form.model.product_attr.splice(index, 1);
        },
        handleAdd(index) {
            this.form.model.product_attr[index].map((item, indexs) => {
                this.form.model.product_attr[index][indexs].much++;
            })
        },
        handleDecrease(index) {
            this.form.model.product_attr[index].map((item, indexs) => {
                if(this.form.model.product_attr[index][indexs].much > 2){
                    this.form.model.product_attr[index][indexs].much--;
                }
                this.form.model.product_attr[index][indexs].attribute_value.pop();
            })
        },
        querySearch(queryString, cb) {
            let self = this;
            if (self.restaurants.length == 0) {
                self.form.attribute.forEach((item, index) => {
                    self.restaurants.push({
                        value: item.attribute_name
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
}
.inline-input{
    max-width: 460px;
}

.delete-icon {
    cursor: pointer;
    font-size: 24px;
    margin-right: 16px;
}
.product-tips{
    font-size: 12px;
    color: var(--el-color-tips);
}
</style>
