<template>
    <el-dialog :title="$t('选择自助餐')" v-model="dialogVisible" @close="dialogFormVisible" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">

                <el-form-item :label="$t('状态')">
                    <el-select size="small" v-model="searchForm.status" :placeholder="$t('全部状态')">
                        <el-option :label="$t('全部状态')" value=""></el-option>
                        <el-option :label="$t('开启')" value="1"></el-option>
                        <el-option :label="$t('关闭')" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('自助餐名称')"><el-input size="small" v-model="searchForm.name" :placeholder="$t('请输入自助餐名称')"></el-input></el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询')
                        }}</el-button>
                </el-form-item>
            </el-form>

        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" ref="multipleTable" :data="tableData" border style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange"
                    :row-key="getRowKey">
                    <el-table-column prop="name_text" :label="$t('自助餐名称')" minWidth="200">
                        <template #default="scope">
                            <div class="product-info">
                                <div class="info">
                                    <div class="name">{{ scope.row.name_text }}</div>
                                    <div class="price">{{ $t('销售价：') }}{{ scope.row.price }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sale_num" :label="$t('实际销量')" width="100"></el-table-column>
                    <el-table-column prop="time_limit" :label="$t('用餐时间')" width="100">
                        <template #default="scope">
                            <div class="name">{{ scope.row.time_limit == 0 ? $t('不限制') : scope.row.time_limit }}</div>

                        </template>
                    </el-table-column>
                    <el-table-column prop="is_comb" :label="$t('组合')" width="100">
                        <template #default="scope">
                            {{ scope.row.is_comb == 1 ? $t('开启') : $t('关闭') }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_status.text" :label="$t('状态')" width="100">
                        <template #default="scope">
                            {{ scope.row.status == 10 ? $t('开启') : $t('关闭') }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')" width="180">
                        <template #default="scope">
                            <p class="create-time">{{ scope.row.create_time.split(" ")[0] || '-' }}</p>
                            <p class="create-time">{{ scope.row.create_time.split(" ")[1] || '' }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" type="selection" :selectable="selectable" width="40" :reserve-selection="true"></el-table-column>
                </el-table>
            </div>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage" :page-size="pageSize"
                layout="total, prev, pager, next, jumper" :total="totalDataNumber"></el-pagination>
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
                status: '',
                name: '',
            },

            /*一页多少条*/
            pageSize: 5,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            tableData: [],
            multipleSelection: [],
        }
    },
    props: {
        open_product: {
            type: Boolean,
            default: false,
        },
        multiple_selection: {
            type: Array,
            default: [],
        },
        openIndex: {
            type: Number,
            default: 0,
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
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            self.loading = true;
            PorductApi.getBuffetList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;

                    if (this.multiple_selection.length > 0) { // 判断是否存在勾选过的数据
                        this.tableData.forEach((row, index) => {  // 获取数据列表接口请求到的数据
                            this.multiple_selection.forEach(item => {  // 勾选到的数据
                                if (row.id == item) {
                                    this.$refs.multipleTable.toggleRowSelection(this.tableData[index], true); // 若有重合，则回显该条数据
                                    this.tableData[index].select_open = 1;
                                }
                            });
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        selectable(row, index) {
            if (row.select_open != undefined) {
                if (row.select_open == 1) {
                    return false
                }
            } else {
                return true
            }
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
            } 
            else {
                this.$emit('closeDialogFunc', {
                    type: 'error',
                    openDialog: false
                })
            }
        },

        submit() {
            this.$emit('closeDialogFunc', {
                type: 'submit',
                openDialog: false,
                data: this.multipleSelection,
                index:this.openIndex
            })
        },

        getRowKey(row) {
            return row.id;
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

.create-time {
    line-height: 24px !important;
}
</style>