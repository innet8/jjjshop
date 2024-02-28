<template >
    <el-dialog :title="$t('选择商品')" v-model="dialogVisible" @close="dialogFormVisible"  append-to-body :close-on-click-modal="false"
        :close-on-press-escape="false">
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">

                <el-form-item :label="$t('商品状态')">
                    <el-select size="small" v-model="searchForm.type" :placeholder="$t('商品状态')">
                        <el-option :label="$t('全部')" value="all"></el-option>
                        <el-option :label="$t('上架中')" value="sell"></el-option>
                        <el-option :label="$t('下架中')" value="lower"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('商品分类')">
                    <el-cascader :options="categoryList" :props="{ checkStrictly: true, expandTrigger: 'hover' }"
                        v-model="searchForm.category_id" clearable :placeholder="$t('请选择分类')">
                        <template #default="{ data }">
                            <span @click="handleValue(data)">{{ data.label }}</span>
                        </template>
                    </el-cascader>
                </el-form-item>
                <el-form-item :label="$t('商品名称')"><el-input size="small" v-model="searchForm.product_name"
                        :placeholder="$t('商品名称')"></el-input></el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询')
                    }}</el-button>
                </el-form-item>
            </el-form>

        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" ref="multipleTable" :data="tableData" border style="width: 100%" v-loading="loading"
                    @selection-change="handleSelectionChange" :row-key="getRowKey">
                    <el-table-column prop="product_name" :label="$t('商品名称')" width="300px">
                        <template #default="scope">
                            <div class="product-info">
                                <div class="pic"><img v-img-url="scope.row.image[0].file_path" alt="" /></div>
                                <div class="info">
                                    <div class="name">{{ scope.row.product_name_text }}</div>
                                    <div class="price">{{ $t('销售价：') }}{{ scope.row.product_price }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_stock" :label="$t('分类')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('实际销量')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('库存')"></el-table-column>

                    <el-table-column prop="product_status.text" :label="$t('状态')" width="100">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/buffet/list/status')"
                                :model-value="scope.row.product_status.value == 10 ? true : false">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"  width="180">
                        <template #default="scope">
                                <p class="create-time">{{ scope.row.create_time.split(" ")[0] || '-' }}</p>
                                <p class="create-time">{{ scope.row.create_time.split(" ")[1] || '' }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" type="selection" width="40" :reserve-selection="true"></el-table-column>
                </el-table>
            </div>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                :total="totalDataNumber"></el-pagination>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="submit" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
import PorductApi from '@/api/product.js';
export default {
    data() {
        return {
            searchForm: {
                type: '',
                product_name: '',
                category_id: '',
            },

            /*一页多少条*/
            pageSize: 5,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            tableData: [],
            /*全部分类*/
            categoryList: [],
            multipleSelection: [],
        }
    },
    props: {
        open_product: {
            type: Boolean,
            default: false,
        },
        limit_ids: {
            type: String,
            default: '',
        },
        selectType: {
            type: String,
            default: '',
        },

    },
    created() {
        this.dialogVisible = this.open_product;
        this.getData();
    },
    methods: {

        getData() {
            let self = this;
            let Params = self.searchForm;
            Params.product_ids = this.selectType == 'limit' ? this.limit_ids : '';
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            if (typeof Params.category_id == 'object' && Params.category_id) {
                Params.category_id = Number(Params.category_id[Params.category_id.length - 1])
            }
            self.loading = true;
            PorductApi.storeProductList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                    self.categoryList = [];
                    data.data.category.map((item, index) => {
                        self.categoryList.push({
                            value: item.category_id,
                            label: item.name_text,
                            children: [],
                        })
                        item.child.map((items, indexs) => {
                            self.categoryList[index].children.push({
                                value: items.category_id,
                                label: items.name_text,
                            })
                        })
                    })

                })
                .catch(error => {
                    console.log(error);
                });
        },

        /*搜索查询*/
        onSubmit() {
            this.curPage = 1;
            this.getData();
        },

        /*选择第几页*/
        handleCurrentChange(val) {
            this.curPage = val;
            this.getData();
        },

        /*每页多少条*/
        handleSizeChange(val) {
            this.curPage = 1;
            this.pageSize = val;
            this.getData();
        },

        /*关闭弹窗*/
        dialogFormVisible(e) {
            if (e) {
                this.$emit('closeDialogFunc', {
                    type: 'success',
                    openDialog: false
                })
            } else {
                this.$emit('closeDialogFunc', {
                    type: 'error',
                    openDialog: false
                })
            }
        },

        submit() {
            if (this.selectType == 'limit') {
                this.$emit('closeDialogFunc', {
                    type: 'limit',
                    openDialog: false,
                    data: this.multipleSelection,
                })
            } else {
                this.$emit('closeDialogFunc', {
                    type: 'select',
                    openDialog: false,
                    data: this.multipleSelection,
                })
            }

        },

        getRowKey(row) {
            return row.product_id;
        },

        handleSelectionChange(e) {
            this.multipleSelection = e;
        },

        handleValue(data) {
            this.searchForm.category_id = []
            this.searchForm.category_id = data.value;
        }
    },
}
</script>
<style lang="scss" scoped>
.common-seach-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
}
.create-time{
    line-height: 24px !important;
}
</style>