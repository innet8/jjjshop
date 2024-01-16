<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存-多规格-表格
    -->
    <div class="mt16 ">
        <el-form-item :label="$t('规格明细：')" v-if="form.model.sku.length > 0">
            <!--多规格表格-->
            <div class="ww100">
                <el-table size="" :data="form.model.sku" border style="width: 100%; margin-top: 20px">
                    <el-table-column :label="$t('规格名称')" width="400">
                        <template #default="scope">
                            <div label="" class="spec-name" style="margin-bottom: 0;">
                                <template v-for="(item, index) in languageList" :key="index">
                                    <el-input size="small" prop="spec_name" v-model="scope.row.spec_name[item.key]"
                                        :placeholder="$t('请输入') + `(${item.label})`"></el-input>
                                </template>

                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('价格')">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;">
                                <el-input type="number" size="small" prop="product_price"
                                    v-model="scope.row.product_price"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('包装费')">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;">
                                <el-input type="number" size="small" prop="bag_price"
                                    v-model="scope.row.bag_price"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('库存')">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;">
                                <el-input type="number" size="small" prop="stock_num"
                                    v-model="scope.row.stock_num"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <!--          <el-table-column label="成本价格">
            <template slot-scope="scope">
              <el-form-item label="" style="margin-bottom: 0;">
                <el-input type="number" size="small" prop="cost_price" v-model="scope.row.cost_price"></el-input>
              </el-form-item>
            </template>
          </el-table-column> -->
                    <el-table-column label="">
                        <template #default="scope">
                            <el-form-item label="" style="margin-bottom: 0;">
                                <el-button type="primary" link @click='deleteAttr(scope.$index)'>删除</el-button>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import PorductApi from '@/api/product.js';
import { languageStore } from '@/store/model/language.js';
const languageList = languageStore().languageList;
export default {
    components: {

    },
    data() {
        return {
            languageList: languageList,
            restaurants: [],
            formData: {},
            /*批量设置sku属性*/
            batchData: {
                product_price: '',
                line_price: '',
                stock_num: '',
                product_weight: ''
            },
            /*图片是否打开*/
            isupload: false,
            //上传图片选择的下标
            spec_index: -1
        };
    },
    inject: ['form'],
    created() {
        this.formData = this.form;
    },
    mounted() {


    },
    methods: {
        deleteAttr(i) {
            this.form.model.sku.splice(i, 1)
        },

    }
}
</script>

<style scoped>
.spec-name {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px;
}

.spec-name .el-input {
    max-width: calc(50% - 6px);
}
</style>
