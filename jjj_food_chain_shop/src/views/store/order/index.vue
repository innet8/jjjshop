<template>
    <!--
      作者：luoyiming
      时间：2019-10-25
      描述：订单列表
  -->
    <div class="user">
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="">
                    <el-radio-group v-model="searchForm.time_type" class="radio-search">
                        <el-radio-button label="2">{{ $t('昨天') }}</el-radio-button>
                        <el-radio-button label="1">{{ $t('今天') }}</el-radio-button>
                        <el-radio-button label="3">{{ $t('一周') }}</el-radio-button>
                        <el-radio-button label="0">{{ $t('全部') }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('订单类型')">
                    <el-select size="small" v-model="searchForm.order_source" :placeholder="$t('请选择')">
                        <el-option :label="$t('全部')" :value="0"></el-option>
                        <el-option :label="$t('收银订单')" :value="20"></el-option>
                        <el-option :label="$t('桌台订单')" :value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('订单号')">
                    <el-input size="small" v-model="searchForm.order_no" :placeholder="$t('请输入订单号')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('配送方式')">
                    <el-select size="small" v-model="searchForm.style_id" :placeholder="$t('请选择')">
                        <el-option :label="$t('全部')" value=""></el-option>
                        <el-option v-for="(item, index) in exStyle" :key="index" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('起始时间')">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker size="small" v-model="searchForm.create_time" type="daterange"
                            value-format="YYYY-MM-DD" :range-separator="$t('至')" :start-placeholder="$t('开始日期')"
                            :end-placeholder="$t('结束日期')"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询') }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button v-auth="'/store/operate/export'" size="small" type="success" @click="onExport">{{ $t('导出')
                    }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-tabs size="small" v-model="activeName" @tab-change="handleClick">
                    <el-tab-pane :label="$t('全部订单')" name="all">
                        <template #label>
                            <span>{{ $t('全部订单') }} <el-tag size="">{{ order_count.all }}</el-tag></span>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('待付款')" name="payment">
                        <template #label>
                            <span>{{ $t('待付款') }} <el-tag size="">{{ order_count.payment }}</el-tag></span>
                        </template>
                    </el-tab-pane>
                    <!-- <el-tab-pane :label="$t('进行中')" name="process">
                        <template #label>
                            <span>{{ $t('进行中') }} <el-tag size="">{{ order_count.process }}</el-tag></span>
                        </template>
                    </el-tab-pane> -->
                    <el-tab-pane :label="$t('已取消')" name="cancel">
                        <template #label>
                            <span>{{ $t('已取消') }} <el-tag size="">{{ order_count.cancel }}</el-tag></span>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('已完成')" name="complete">
                        <template #label>
                            <span>{{ $t('已完成') }} <el-tag size="">{{ order_count.complete }}</el-tag></span>
                        </template>
                    </el-tab-pane>
                </el-tabs>
                <el-table size="small" :data="tableData.data" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="order_source_text" :label="$t('订单类型')"></el-table-column>
                    <el-table-column prop="table_no" :label="$t('桌号/序号')">
                        <template #default="scope">
                            <div>
                                {{ scope.row.table_no ? scope.row.table_no : scope.row.callNo || "-" }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_no" :label="$t('订单号')"></el-table-column>
                    <el-table-column prop="order_status" :label="$t('状态')">
                        <template #default="scope">
                            <div>
                                {{
                                    scope.row.order_status.value == 10 ? $t('待付款') :
                                    scope.row.order_status.value == 20 ? $t('已取消') : $t('已完成')
                                }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pay_time_text" :label="$t('支付时间')"></el-table-column>
                    <el-table-column prop="order_price" :label="$t('订单金额')">
                        <template #default="scope">

                            <p>{{ currency.unit }}{{ scope.row.order_price }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pay_price" :label="$t('实付金额')">
                        <template #default="scope">
                            <div>
                                <div class="orange">{{ currency.unit }}{{ scope.row.pay_price }}</div>
                                <!-- <p class="gray9" v-if="scope.row.setting_service_money > 0">({{ $t('服务费') }}：{{
                                    scope.row.setting_service_money }})</p>
                                <p class="gray9" v-if="scope.row.consumption_tax_money > 0">({{ $t('消费税') }}：{{
                                    scope.row.consumption_tax_money }})</p>
                                <p class="gray9" v-if="scope.row.refund_money > 0">({{ $t('退款金额：') }}{{
                                    scope.row.refund_money }})
                                </p> -->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :label="$t('买家')" show-overflow-tooltip>
                        <template #default="scope">
                            <template v-if="scope.row.user">
                               <span>{{ scope.row.user.nickName }}</span><br/>
                                <span class="gray9">ID：({{ scope.row.user.user_id }})</span>
                            </template>
                            <p v-else>-</p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="supplier.name" :label="$t('门店名称')"></el-table-column> -->

                    <el-table-column prop="pay_type.text" :label="$t('支付方式')">
                        <template #default="scope">
                            <div>
                                <span class="gray9">{{ scope.row.order_status.value == 30 ? scope.row.pay_type.text : '-'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="delivery_type.text" :label="$t('配送方式')">
                        <template #default="scope">
                            <div v-if="!scope.row.is_top_row">
                                <span class="green">{{ scope.row.delivery_type.text }}</span>
                            </div>
                        </template>
                    </el-table-column> -->
                    <el-table-column fixed="right" :label="$t('操作')" width="160">
                        <template #default="scope">
                            <div>
                                <el-button @click="addClick(scope.row)" type="primary" link size="small"
                                    v-auth="'/store/order/detail'">{{ $t('详情') }}
                                </el-button>
                                <el-button v-if="scope.row.order_status.value == 30" @click="refundClick(scope.row)"
                                    type="danger" link size="small" v-auth="'/store/operate/refund'">{{ $t('退款')
                                    }}</el-button>
                                <el-button v-if="scope.row.order_status.value == 10" @click="cancelClick(scope.row)"
                                    type="danger" link size="small" v-auth="'/store/operate/order_cancel'">{{ $t('取消') }}
                                </el-button>
                                <el-button v-if="scope.row.order_status.value == 20" @click="delClick(scope.row)"
                                    type="danger" link size="small" v-auth="'/store/order/delete'">{{ $t('删除') }}
                                </el-button>
                                <!-- <el-button v-if="scope.row.order_status.value == 10 && scope.row.pay_status.value == 20"
                                    @click="verifyClick(scope.row)" type="primary" link size="small"
                                    v-auth="'/store/operate/extract'">{{ $t('核销') }}
                                </el-button> -->
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--分页-->
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                    :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                    :total="totalDataNumber"></el-pagination>
            </div>
        </div>
        <!--处理-->
        <Cancel v-if="open_edit" :open_edit="open_edit" :order_no="order_no" :order_id="order_id"
            @closeDialog="closeDialogFunc($event, 'edit')">
        </Cancel>
        <!--处理-->
        <refund v-if="open_refund" :open_edit="open_refund" :order_no="order_no" :order_id="order_id"
            @closeDialog="closerefundDialogFunc($event, 'edit')">
        </refund>
    </div>
</template>

<script>
import OrderApi from '@/api/order.js';
import Cancel from './dialog/cancel.vue';
import refund from './dialog/refund.vue';
import qs from 'qs';
import { useUserStore } from '@/store';
const { token, currency } = useUserStore();
import { languageStore } from '@/store/model/language';

export default {
    components: {
        Cancel,
        refund,
    },
    data() {
        return {
            currency: currency,
            /*切换菜单*/
            activeName: 'all',
            /*是否加载完成*/
            loading: true,
            /*列表数据*/
            tableData: [],
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            /*横向表单数据模型*/
            searchForm: {
                order_no: '',
                style_id: '',
                create_time: '',
                time_type: '',
                order_source: 0,
            },
            /*配送方式*/
            exStyle: [],
            /*门店列表*/
            shopList: [],
            /*时间*/
            create_time: '',
            /*统计*/
            order_count: {
                all: 0,
                payment: 0,
                delivery: 0,
                received: 0,
                cancel: 0
            },
            /*是否打开编辑弹窗*/
            open_edit: false,
            open_refund: false,
            /*当前编辑的对象*/
            order_no: 0,
            order_id: 0,
            token,
        };
    },
    created() {
        /*获取列表*/
        this.getData();
    },
    methods: {
        /*跨多列*/
        arraySpanMethod(row) {
            if (row.rowIndex % 2 == 0) {
                if (row.columnIndex === 0) {
                    return [1, 8];
                }
            }
        },
        /*选择第几页*/
        handleCurrentChange(val) {
            let self = this;
            self.curPage = val;
            self.getData();
        },

        /*每页多少条*/
        handleSizeChange(val) {
            this.curPage = 1;
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
            let Params = this.searchForm;
            Params.dataType = self.activeName;
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            self.loading = true;
            OrderApi.storeOrderlist(Params, true)
                .then(res => {
                    // let list = [];
                    // for (let i = 0; i < res.data.list.data.length; i++) {
                    //     let item = res.data.list.data[i];
                    //     let topitem = {
                    //         order_no: item.order_no,
                    //         create_time: item.create_time,
                    //         order_source: item.order_source,
                    //         order_source_text: item.order_source_text,
                    //         is_top_row: true,
                    //         order_status: item.order_status.value,
                    //         table_no: item.table_no,
                    //     };
                    //     list.push(topitem);
                    //     list.push(item);
                    // }
                    self.tableData.data = res.data.list.data;
                    self.totalDataNumber = res.data.list.total;
                    self.exStyle = res.data.ex_style;
                    self.order_count = res.data.order_count.order_count;
                    self.loading = false;
                })
                .catch(error => { });
        },

        /*打开添加*/
        addClick(row) {
            let self = this;
            let params = row.order_id;
            self.$router.push({
                path: '/store/order/detail',
                query: {
                    order_id: params
                }
            });
        },
        /*核销*/
        verifyClick(row) {
            let self = this;
            let extract_form = {};
            ElMessageBox.confirm('确定要核销吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                extract_form.order_id = row.order_id;
                OrderApi.storeExtract(extract_form,
                    true
                )
                    .then(data => {
                        self.loading = false;
                        ElMessage({
                            message: '恭喜你，操作成功',
                            type: 'success'
                        });
                        self.getData();
                    })
                    .catch(error => {
                        self.loading = false;
                    });
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消核销'
                });
            });

        },
        getLogistics(row) {
            let self = this;
            let Params = {
                order_id: row.order_id,
            }
            self.loading = true;
            OrderApi.queryLogistics(Params, true)
                .then(res => {
                    self.logisticsData = res.data.express.list;
                    self.loading = false;
                    self.openLogistics()
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        openLogistics() {
            this.isLogistics = true;
        },
        closeLogistics() {
            this.isLogistics = false;
        },
        /*搜索查询*/
        onSubmit() {
            this.curPage = 1;
            this.tableData = [];
            this.getData();
        },
        onExport: function () {
            let baseUrl = window.location.protocol + '//' + window.location.host;
            this.searchForm.token = this.token;
            window.location.href = baseUrl + '/index.php/shop/store.operate/export?' + qs.stringify(this.searchForm) + '&language=' + languageStore().language;
        },
        /*打开取消*/
        cancelClick(item) {
            this.order_no = item.order_no;
            this.order_id = item.order_id;
            this.open_edit = true;
        },
        refundClick(item) {
            this.order_no = item.order_no;
            this.order_id = item.order_id;
            this.open_refund = true;
        },

        delClick(item) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                type: 'warning'
            })
                .then(() => {
                    OrderApi.storedelete({
                        order_id: item.order_id
                    }).then(data => {
                        ElMessage({
                            message: $t('删除成功'),
                            type: 'success'
                        });
                        self.getData();
                    });
                });
        },
        /*关闭弹窗*/
        closeDialogFunc(e, f) {
            if (f == 'edit') {
                this.open_edit = e.openDialog;
                if (e.type == 'success') {
                    this.getData();
                }
            }
        },
        /*关闭弹窗*/
        closerefundDialogFunc(e, f) {
            if (f == 'edit') {
                this.open_refund = e.openDialog;
                if (e.type == 'success') {
                    this.getData();
                }
            }
        },
    }
};
</script>
<style lang="scss" scoped>
.product-info {
    padding: 10px 0;
    border-top: 1px solid #eeeeee;
}

.order-code {
    display: flex;
    align-items: center;
    gap: 16px;

}

.order-code .state-text {
    padding: 0 4px;
    border-radius: 4px;
    background: #808080;
    color: #ffffff;
    height: 24px;
    line-height: 24px;
}

.order-code .state-text-red {
    background: red;
}

.table-wrap .product-info:first-of-type {
    border-top: none;
}

.table-wrap .el-table__body tbody .el-table__row:nth-child(odd) {
    background: #f5f7fa;
}

.radio-search {
    :deep(.el-radio-button) {
        margin-right: -1px;
        margin-bottom: 0;

        .el-radio-button__inner {
            padding: 8px 11px !important;
        }

    }


}
</style>
