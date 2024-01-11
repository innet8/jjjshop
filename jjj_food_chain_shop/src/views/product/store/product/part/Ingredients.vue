<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存
    -->
    <div>
        <!--规格设置-->
        <div class="common-form mt50">商品加料</div>
        <!--多规格-->
        <div>
            <div class="mt16">
                <!-- <el-form-item label="属性明细："> -->

                <el-form-item :label="$t('商品加料：')">
                    <el-button type="primary" @click="addIngredients">{{ $t('添加属性') }}+</el-button>
                </el-form-item>
                <!--多规格表格-->
                <el-form-item class=" mb18" v-for="(item, index) in form.model.product_feed" :key="index"
                    v-if="form.model.product_feed.length > 0">
                    <template #label>
                        <el-icon class="delete-icon" @click="handleDelete(index)">
                            <Delete />
                        </el-icon>
                    </template>
                    <el-form  class="product-attr" v-for="(items, indexs) in item" :key="indexs">
                        <el-form-item>
                            <template #label>
                                {{ $t('加料名称：') }}<span class="product-tips">{{ items.placeholder }}</span>
                            </template>
                            <el-input class="inline-input" v-model="items.feed_name" maxlength="128"
                                :placeholder="$t('如:杯型')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('价格：')">
                            <el-input class="inline-input" type="number" size="medium" v-model="items.price"
                                placeholder="">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-form-item>
                <!-- </el-form-item> -->
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            restaurants: [],
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
    methods: {
        addIngredients() {
            this.form.model.product_feed.push(
                [
                    {
                        placeholder: '(ภาษาไทย)',
                        feed_name: '',
                        price: ''
                    },
                    {
                        placeholder: '(简体中文)',
                        feed_name: '',
                        price: ''
                    },
                    {
                        placeholder: '(繁體中文)',
                        feed_name: '',
                        price: ''
                    },
                    {
                        placeholder: '(English)',
                        feed_name: '',
                        price: ''
                    },
                ]
            )
        },
        handleDelete(index) {
            this.form.model.product_feed.splice(index, 1);
        },
        querySearch(queryString, cb) {
            let self = this;
            if (self.restaurants.length == 0) {
                self.form.feed.forEach((item, index) => {
                    self.restaurants.push({
                        value: item.feed_name
                    })
                })
            }

            var restaurants = self.restaurants;
            var results = queryString ? restaurants.filter(self.createFilter(queryString)) : restaurants;
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
</style>
