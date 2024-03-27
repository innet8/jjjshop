<template>
    <div class="order-list">
        <!--搜索表单-->
        <div class="common-seach-wrap">

            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item :label="$t('供应商')">
                    <el-select size="small" v-model="searchForm.supplier" :placeholder="$t('全部库存')">
                        <el-option :label="$t('全部')" value=" "></el-option>
                        <el-option :label="$t('库存低于10')" value="10"></el-option>
                        <el-option :label="$t('库存低于20')" value="20"></el-option>
                        <el-option :label="$t('库存低于50')" value="50"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('采购员')">
                    <el-select size="small" v-model="searchForm.buyer" :placeholder="$t('全部库存')">
                        <el-option :label="$t('全部')" value=" "></el-option>
                        <el-option :label="$t('库存低于10')" value="10"></el-option>
                        <el-option :label="$t('库存低于20')" value="20"></el-option>
                        <el-option :label="$t('库存低于50')" value="50"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('商品状态')">
                    <el-select size="small" v-model="searchForm.status" :placeholder="$t('商品状态')">
                        <el-option :label="$t('全部')" value="all"></el-option>
                        <el-option :label="$t('上架中')" value="sell"></el-option>
                        <el-option :label="$t('下架中')" value="lower"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('采购名称/申请人')"><el-input size="small" v-model="searchForm.name" :placeholder="$t('请输入采购名称/申请人')"></el-input></el-form-item>
                <el-form-item :label="$t('起始时间')">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker size="small" v-model="searchForm.create_time" type="daterange" value-format="YYYY-MM-DD" range-separator="~" :start-placeholder="$t('开始日期')"
                            :end-placeholder="$t('结束日期')"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询')
                        }}</el-button>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" icon="Plus" v-auth="'/purchase/order/add'" @click="addClick">{{
                $t('添加') }}</el-button>
        </div>

        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="number" :label="$t('编号')"></el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('采购方式')">
                        <template #default="scope">
                            {{ scope.row.type == 10 ? $t('总部采购') : $t('自行采购') }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" :label="$t('采购名称')" width="200"></el-table-column>
                    <el-table-column prop="total_num" :label="$t('商品数量')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('供应商')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('采购员')"></el-table-column>
                    <el-table-column prop="applicant.real_name" :label="$t('申请人')"></el-table-column>
                    <el-table-column prop="product_status.text" :label="$t('状态')" width="100">
                        <template #default="scope">
                            {{ statusAction(scope.row.status) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('申请时间')">
                        <template #default="scope">
                            <div style="line-height: 20px;">{{ scope.row.create_time.split(" ")[0] || '-' }}<br />{{ scope.row.create_time.split(" ")[1] || '-' }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="240">
                        <template #default="scope">
                            <el-button @click="detailClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/order/details'">{{ $t('查看') }}</el-button>
                            <el-button @click="editClick(scope.row)" type="primary" link size="small" v-if="scope.row.status == 10" v-auth="'/purchase/order/edit'">{{ $t('编辑')
                                }}</el-button>
                            <el-button @click="passClick(scope.row)" type="primary" link size="small" v-if="scope.row.status == 10" v-auth="'/purchase/order/examine'">{{ $t('通过')
                                }}</el-button>
                            <el-button @click="turnDownClick(scope.row)" type="primary" link size="small" v-if="scope.row.status == 10" v-auth="'/purchase/order/examine'">{{
                $t('驳回') }}</el-button>
                            <el-button @click="adjustClick(scope.row, 1)" type="primary" link size="small" v-if="scope.row.status == 30" v-auth="'/purchase/order/purchased'">{{
                $t('已采购') }}</el-button>
                            <el-button @click="adjustClick(scope.row, 2)" type="primary" link size="small" v-if="scope.row.status == 40" v-auth="'/purchase/order/warehousing'">{{
                $t('入库') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small" v-if="scope.row.status == 10 || scope.row.status == 20"
                                v-auth="'/purchase/order/delete'">{{ $t('删除')
                                }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage" :page-size="pageSize"
                layout="total, prev, pager, next, jumper" :total="totalDataNumber"></el-pagination>
        </div>

        <el-dialog v-model="dialogVisible" :title="$t('提示')" width="420" align-center>
            <el-form size="small" :inline="true" ref="form" :model="form" label-position="top">
                <el-form-item style="width: 100%;margin-right: 0;" :label="$t('确定审核驳回吗？')" :rules="[{ required: true, message: $t('请输入驳回原因') }]" prop="turnDown">
                    <el-input size="small" v-model="form.turnDown" :placeholder="$t('请输入驳回原因')"></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleClose">{{ $t('取消') }}</el-button>
                    <el-button type="primary" @click="handleTurnDown"> {{ $t('确定') }}</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogShow" :title="dialogTitle" width="420" align-center>
            {{ dialogText }}
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="handleDataChange"> {{ $t('调整数据') }}</el-button>
                    <el-button type="primary" @click="handleOk(2)" v-if="this.dialogType == 1"> {{ $t('完成并入库') }}</el-button>
                    <el-button @click="dialogShow = false">{{ $t('取消') }}</el-button>
                    <el-button type="primary" @click="handleOk"> {{ $t('确定') }}</el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>
<script>
import PurchaseApi from '@/api/purchase.js';
export default {
    data() {
        return {
            /*是否正在加载*/
            loading: false,
            /*一页多少条*/
            pageSize: 10,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            /*列表数据*/
            tableData: [],
            /*搜索参数*/
            searchForm: {
                supplier: '',
                buyer: '',
                status: '',
                name: '',
                create_time: ''
            },
            form: {
                turnDown: '',
            },
            turnDownId: 0,
            dialogVisible: false,
            dialogShow: false,
            dialogTitle: '',
            dialogText: '',
            dialogType: '',
            dialogId: '',
            loading: false,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {

        // 状态计算
        statusAction(status) {
            let result = '';
            if (status == 10) return result = $t('待审核');
            if (status == 20) return result = $t('已驳回');
            if (status == 30) return result = $t('采购中');
            if (status == 40) return result = $t('已采购');
            if (status == 50) return result = $t('已入库');
        },

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
        /*搜索查询*/
        onSubmit() {
            this.curPage = 1;
            this.getData();
        },
        // 获取
        getData() {
            let self = this;
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            Params.name = self.searchForm.name;
            self.loading = true;
            PurchaseApi.getErpPurchaseOrder(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;

                })
                .catch(error => { });
        },

        /*打开添加*/
        addClick() {
            this.$router.push('/purchase/order/add');
        },

        // 编辑
        editClick(row) {
            this.$router.push({
                path: '/purchase/order/edit',
                query: {
                    purchase_order_id: row.id,
                }
            });
        },

        // 调整数据
        handleDataChange(row) {
            this.$router.push({
                path: '/purchase/order/edit',
                query: {
                    purchase_order_id: this.dialogId,
                    change:'true',
                }
            });
        },

        // 查看详情
        detailClick(row) {
            this.$router.push({
                path: '/purchase/order/details',
                query: {
                    purchase_order_id: row.id,
                }
            });
        },



        /*驳回*/
        turnDownClick(row) {
            this.dialogVisible = true;
            this.turnDownId = row.id;
        },

        /*驳回*/
        handleTurnDown() {
            let self = this;
            self.loading = true;
            PurchaseApi.operateErpPurchaseOrder({
                purchase_order_id: this.turnDownId,
                status: 20,
                remark: this.form.turnDown,
            },
                true
            )
                .then(data => {
                    self.loading = false;
                    if (data.code == 1) {
                        this.$ElMessage({
                            message: $t('操作成功'),
                            type: 'success'
                        });
                        //刷新页面
                        this.dialogVisible = false;
                        this.form.turnDown = '';
                        self.getData();
                    } else {
                        self.loading = false;
                    }
                })
                .catch(error => {
                    self.loading = false;
                });

        },

        /*打开添加*/
        handleClose() {
            this.dialogVisible = false;
            this.form.turnDown = '';
        },

        /*通过*/
        passClick(row) {
            let self = this;
            ElMessageBox.confirm($t('确定审核通过吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            })
                .then(() => {
                    self.loading = true;
                    PurchaseApi.operateErpPurchaseOrder({
                        purchase_order_id: row.id,
                        status: 30,
                    },
                        true
                    )
                        .then(data => {
                            self.loading = false;
                            if (data.code == 1) {
                                this.$ElMessage({
                                    message: $t('操作成功'),
                                    type: 'success'
                                });
                                //刷新页面
                                self.getData();
                            } else {
                                self.loading = false;
                            }
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => { });
        },

        /*删除*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            })
                .then(() => {
                    self.loading = true;
                    PurchaseApi.deleteErpPurchaseOrder({
                        purchase_order_id: row.id
                    },
                        true
                    )
                        .then(data => {
                            self.loading = false;
                            if (data.code == 1) {
                                this.$ElMessage({
                                    message: $t('删除成功'),
                                    type: 'success'
                                });
                                //刷新页面
                                self.getData();
                            } else {
                                self.loading = false;
                            }
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => { });
        },

        // 调整
        adjustClick(row, type) {
            this.dialogType = type;
            this.dialogId = row.id;
            type == 1 ? this.dialogTitle = $t('已采购') : this.dialogTitle = $t('入库')
            type == 1 ? this.dialogText = $t('确定已采购完成吗？') : this.dialogText = $t('确定已入库吗？')
            this.dialogShow = true;
        },

        // 入库或者采购
        handleOk(e) {
            if(e == 2){
                this.dialogType = e;
            }
            let self = this;
            self.loading = true;
            PurchaseApi.operateErpPurchaseOrder({
                purchase_order_id: this.dialogId,
                status: this.dialogType == 1 ? 40 : 50,
            },
                true
            )
                .then(data => {
                    self.loading = false;
                    if (data.code == 1) {
                        this.$ElMessage({
                            message: $t('操作成功'),
                            type: 'success'
                        });
                        //刷新页面
                        this.dialogShow = false;
                        self.getData();
                    } else {
                        self.loading = false;
                    }
                })
                .catch(error => {
                    self.loading = false;
                });
        },

    },


}
</script>
<style scoped>
.common-seach-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
}
</style>