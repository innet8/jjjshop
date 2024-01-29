<template>
    <!--
      描述：属性库
  -->
    <div class="product-list">
        <!--添加属性-->
        <div class="common-level-rail">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item>
                    <el-input size="small" v-model="searchForm.name" :placeholder="$t('属性名称')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" icon="Search" @click="getData">{{ $t('查询') }}</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-button size="small" type="primary" icon="Plus" v-auth="'/product/expand/attr/add'"
                    @click="addClick">{{ $t('添加属性') }}</el-button>
                <el-button size="small" v-auth="'/product/expand/attr/batch_delete'" :disabled="multipleSelection.length == 0"
                    @click="deleteBatch">{{ $t('批量删除') }}</el-button>
            </div>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="45"></el-table-column>
                    <el-table-column prop="attribute_name_text" :label="$t('属性名称')" width="400px"></el-table-column>
                    <el-table-column prop="attribute_value_text" :label="$t('属性值')">
                        <template #default="scope">
                            {{ attrjoin(scope.row.attribute_value_text) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" :label="$t('排序')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/expand/attr/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row.attribute_id)" type="primary" link size="small"
                                v-auth="'/product/expand/attr/delete'">{{ $t('删除') }}</el-button>
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

        <!--添加-->
        <Add v-if="open_add" :open_add="open_add" :addform="model" @closeDialog="closeDialogFunc($event, 'add')"></Add>
        <!--修改-->
        <Edit v-if="open_edit" :open_edit="open_edit" :editform="model" @closeDialog="closeDialogFunc($event, 'edit')">
        </Edit>

    </div>
</template>

<script>
import PorductApi from '@/api/product.js';
import Add from './add.vue';
import Edit from './edit.vue';
export default {
    components: {
        Add,
        Edit
    },
    data() {
        return {
            /*切换菜单*/
            activeName: 'sell',
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
            /*当前编辑的对象*/
            model: {

            },
            open_edit: false,
            open_add: false,
            /*列表数据*/
            tableData: [],
            multipleSelection: [],
            // 
            searchForm: {
                name: ""
            }
        };
    },
    created() {
        /*获取列表*/
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
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            Params.attribute_name = self.searchForm.name;
            self.loading = true;
            PorductApi.AttributeList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        attrjoin(e) {
            if (e) {
                return e.join('|')
            } else {
                return ''
            }
        },
        /*搜索查询*/
        onSubmit() {
            this.curPage = 1;
            this.getData();
        },

        /*打开添加*/
        addClick() {
            this.open_add = true;
        },
        deleteClick(id) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                type: 'warning'
            })
                .then(() => {
                    PorductApi.deleteAttribute({
                        attribute_id: id
                    }).then(data => {
                        ElMessage({
                            message: $t('删除成功'),
                            type: 'success'
                        });
                        self.getData();
                    });
                });
        },
        deleteBatch() {
            let self = this;
            let arr = [];
            this.multipleSelection.forEach((item, index) => {
                arr.push(item.attribute_id);
            })
            let attribute_id = arr.join(',');
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                type: 'warning'
            })
                .then(() => {
                    PorductApi.deleteAttribute({
                        attribute_id: attribute_id
                    }).then(data => {
                        ElMessage({
                            message: $t('删除成功'),
                            type: 'success'
                        });
                        self.getData();
                    });
                });
        },
        handleSelectionChange(e) {
            this.multipleSelection = e;
        },
        /*打开编辑*/
        editClick(row) {
            this.model = row;
            this.open_edit = true;
        },
        /*关闭弹窗*/
        closeDialogFunc(e, f) {
            if (f == 'add') {
                this.open_add = e.openDialog;
                if (e.type == 'success') {
                    this.getData();
                }
            }
            if (f == 'edit') {
                this.open_edit = e.openDialog;
                if (e.type == 'success') {
                    this.getData();
                }
            }
        },
    }
};
</script>

<style scoped>
    .common-level-rail {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }
</style>