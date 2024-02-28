<template>
    <!--
      作者：luoyiming
      时间：2019-10-24
      描述：商品管理
  -->
    <div class="product-list">
        <!--搜索表单-->
        <div class="common-seach-wrap">

            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item :label="$t('商品分类')">
                    <el-cascader :options="categoryList" :props="{ checkStrictly: true, expandTrigger: 'hover' }"
                        v-model="searchForm.category_id" clearable :placeholder="$t('请选择分类')">
                        <template #default="{ data }">
                            <span @click="handleValue(data)">{{ data.label }}</span>
                        </template>
                    </el-cascader>
                </el-form-item>
                <el-form-item :label="$t('商品库存')">
                    <el-select size="small" v-model="stock" :placeholder="$t('全部库存')">
                        <el-option :label="$t('全部')" value=" "></el-option>
                        <el-option :label="$t('库存低于10')" value="10"></el-option>
                        <el-option :label="$t('库存低于20')" value="20"></el-option>
                        <el-option :label="$t('库存低于50')" value="50"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('商品状态')">
                    <el-select size="small" v-model="activeName" :placeholder="$t('商品状态')">
                        <el-option :label="$t('全部')" value="all"></el-option>
                        <el-option :label="$t('上架中')" value="sell"></el-option>
                        <el-option :label="$t('下架中')" value="lower"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('商品名称')"><el-input size="small" v-model="searchForm.product_name"
                        :placeholder="$t('请输入商品名称')"></el-input></el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询')
                    }}</el-button>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" icon="Plus" v-auth="'/product/store/product/add'" @click="addClick">{{
                $t('添加商品') }}</el-button>
        </div>
        <!--添加产品-->
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="product_name" :label="$t('商品名称')" width="400px">
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
                    <el-table-column prop="category.path_name_text" :label="$t('分类')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('实际销量')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('库存')"></el-table-column>
                    <el-table-column prop="product_status.text" :label="$t('状态')" width="100">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/store/product/state')"
                                :model-value="scope.row.product_status.value == 10 ? true : false"
                                @click="undercarriage(scope.row, scope.row.product_status.value == 10 ? 20 : 10)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column prop="product_sort" :label="$t('排序')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/product/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/product/delete'">{{ $t('删除') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                :total="totalDataNumber"></el-pagination>
        </div>

    </div>
</template>

<script>
import PorductApi from '@/api/product.js';

export default {
    components: {},
    data() {
        return {
            /*切换菜单*/
            activeName: '',
            stock: '',
            /*切换选中值*/
            activeIndex: '0',
            /*是否正在加载*/
            loading: true,
            /*一页多少条*/
            pageSize: 10,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            /*搜索参数*/
            searchForm: {
                product_name: '',
                category_id: ''
            },
            /*列表数据*/
            tableData: [],
            /*全部分类*/
            categoryList: [],
            /*商品统计*/
            product_count: {},
        };
    },
    created() {
        /*获取列表*/
        if (this.$route.query.inventory) {
            this.stock = "10";
            this.$route.query = {}
        }
        this.getData();
    },
    methods: {
        /*选择第几页*/
        handleCurrentChange(val) {
            let self = this;
            self.loading = true;
            self.curPage = val;
            self.getData();
        },

        /*每页多少条*/
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData();
        },

        /*切换菜单*/
        handleClick(tab, event) {
            let self = this;
            self.curPage = 1;
            self.getData();
        },

        /*获取列表*/
        getData() {
            let self = this;
            let Params = self.searchForm;
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            Params.type = self.activeName;
            Params.stock = self.stock;
            if (typeof Params.category_id == 'object' && Params.category_id) {
                Params.category_id = Number(Params.category_id[Params.category_id.length - 1])
            }
            self.loading = true;
            PorductApi.storeProductList(Params, true).then(data => {
                self.loading = false;
                self.tableData = data.data.list.data;
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
                self.totalDataNumber = data.data.list.total;
                self.product_count = data.data.product_count;
            })
            .catch(error => {
                self.loading = false;
            });
        },

        /*搜索查询*/
        onSubmit() {
            this.curPage = 1;
            this.getData();
        },

        /*打开添加*/
        addClick() {
            this.$router.push('/product/store/product/add');
        },

        /*打开编辑*/
        editClick(row) {
            this.$router.push({
                path: '/product/store/product/edit',
                query: {
                    product_id: row.product_id,
                    scene: 'edit'
                }
            });
        },
        /* 强制下架上架*/
        undercarriage(row, state) {
            let self = this;
            let war = "";
            let war_ = '';
            if (state == 20) {
                war = $t("强制下架"),
                    war_ = $t('下架')
            } else if (state == 10) {
                war = $t("重新上架"),
                    war_ = $t('上架')
            }
            ElMessageBox.confirm($t("确认要") + war + $t("吗?"), $t('提示'), {
                type: 'warning'
            })
                .then(() => {
                    PorductApi.storeStateProduct({
                        product_id: row.product_id,
                        state
                    }).then(data => {
                        this.$ElMessage({
                            message: war_ + $t('成功'),
                            type: 'success'
                        });
                        self.getData();
                    });
                });
        },
        /*打开复制*/
        copyClick(row) {
            this.$router.push({
                path: '/product/product/edit',
                query: {
                    product_id: row.product_id,
                    scene: 'copy'
                }
            });
        },

        /*删除*/
        deleteClick: function (row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                type: 'warning'
            })
                .then(() => {
                    PorductApi.storeDelProduct({
                        product_id: row.product_id
                    }).then(data => {
                        this.$ElMessage({
                            message: $t('删除成功'),
                            type: 'success'
                        });
                        self.getData();
                    });
                });
        },

        handleValue(data){
            this.searchForm.category_id =[]
            this.searchForm.category_id = data.value;
        }
    }
};
</script>

<style scoped>
.common-seach-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
}
</style>
