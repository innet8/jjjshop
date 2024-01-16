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
                <el-form-item class="product-box mb18" v-for="(item, index) in form.model.product_feed" :key="index"
                    v-if="form.model.product_feed.length > 0">
                    <template #label>
                        <el-icon class="delete-icon" @click="handleDelete(index)">
                            <Delete />
                        </el-icon>
                    </template>
                    <el-form class="product-attr">
                        <el-form-item v-for="(items, indexs) in languageList" :key="indexs">
                            <template #label>
                                {{ $t('加料名称：') }}<span class="product-tips">{{ items.label }}</span>
                            </template>
                            <el-input class="inline-input" v-model="item.feed_name[items.key]" maxlength="128"
                                :placeholder="$t('如:杯型')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('价格：')">
                            <el-input class="inline-input" type="number" size="small" v-model="item.price" placeholder="">
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
import { languageStore } from '@/store/model/language.js';
const languageData = JSON.stringify(languageStore().languageData)
const languageList = languageStore().languageList;
export default {
    data() {
        return {
            languageList:languageList,
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
                {
                    feed_name:JSON.parse(languageData),
                    price: ''
                }
            )
        },
        handleDelete(index) {
            this.form.model.product_feed.splice(index, 1);
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

.product-box {
    display: flex;
}
</style>
