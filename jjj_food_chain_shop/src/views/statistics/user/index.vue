<template>
    <div class="statistics-member" v-loading="loading">
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">

                <el-form-item :label="$t('收银员')">
                    <el-select size="small" v-model="searchForm.user_id" :placeholder="$t('请选择')">
                        <el-option :label="$t('全部')" value=""></el-option>
                        <el-option v-for="(item, index) in exStyle" :key="index" :label="item.user_name"
                            :value="item.shop_user_id"></el-option>
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
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询') }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button v-auth="'/statistics/user/export'" size="small" type="primary" @click="onExport">{{ $t('导出') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-wrap">
            <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
               
                <el-table-column prop="shift_no" :label="$t('交班编号')" width="180"></el-table-column>
                <el-table-column prop="user.real_name" :label="$t('收银员')"></el-table-column>
                <el-table-column prop="" :label="$t('当班时间')" width="200">
                    <template #default="scope">
                        <div>
                            {{ scope.row.shift_start_time }}
                            {{ $t('至') }}
                            {{ scope.row.shift_end_time }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="total_income" :label="$t('营业收入')">
                    <template #default="scope">
                        {{ currency.unit }}{{ scope.row.total_income }}
                    </template>
                </el-table-column>
                <el-table-column prop="cash_income" :label="$t('现金收入')">
                    <template #default="scope">
                        {{ currency.unit }}{{ scope.row.cash_income }}
                    </template>
                </el-table-column>
                <el-table-column prop="previous_shift_cash" :label="$t('上一班遗留备用金')">
                    <template #default="scope">
                        {{ currency.unit }}{{ scope.row.previous_shift_cash }}
                    </template>
                </el-table-column>
                <el-table-column prop="cash_left" :label="$t('本班遗留备用金')">
                    <template #default="scope">
                        {{ currency.unit }}{{ scope.row.cash_left }}
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                <el-table-column fixed="right" :label="$t('操作')" width="120">
                    <template #default="scope">
                        <el-button v-auth="'/statistics/user/detail'" @click="detailClick(scope.row)" type="primary" link size="small">{{ $t('详情')
                        }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--分页-->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                :total="totalDataNumber">
            </el-pagination>
        </div>
        <detail v-if="open" :detailId="detailId" :open="open" @closeDialog="()=>{ open = false }"></detail>
    </div>
</template>

<script>
import qs from 'qs';
import { useUserStore } from '@/store';
import StatisticsApi from '@/api/statistics.js';
import detail from './detail.vue'
import { languageStore } from '@/store/model/language.js';
const { currency } = useUserStore();
const languageTag = languageStore().language
const { token } = useUserStore();
export default {
    components: { detail },
    data() {
        return {

            /*是否加载完成*/
            loading: false,
            /*列表数据*/
            tableData: [],
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            exStyle: [],
            searchForm: {
                user_id: "",
                create_time: "",
            },
            token,
            detailId: {},
            open: false,
            languageTag:languageTag,
            currency:currency,
        }
    },

    created() {

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
            this.curPage = 1;
            this.pageSize = val;
            this.getData();
        },
        /*获取数据*/
        getData() {
            let self = this;
            let params = self.searchForm;
            params.page = self.curPage;
            params.list_rows = self.pageSize;
            StatisticsApi.getUserShiftLog(params, true).then(res => {
                Object.assign(self.tableData, res.data.list.data.map(h=>{
                    h.cash_income = h.incomes.find(v=> v.pay_type == 40)?.price || '0.00';
                    return h;
                }));
                Object.assign(self.exStyle, res.data.cashierList.data);
                self.totalDataNumber = res.data.list.total;
                self.loading = false;
            })
            .catch(error => { });
        },
        onSubmit() {
            this.curPage = 1;
            this.tableData = [];
            this.getData();
        },
        detailClick(data) {
            this.detailId = data.id;
            this.open = true;
        },
        onExport: function () {
            let baseUrl = window.location.protocol + '//' + window.location.host;
            this.searchForm.token = this.token;
            window.location.href = baseUrl + '/index.php/shop/user.UserShiftLog/export?' + qs.stringify(this.searchForm)+'&language='+this.languageTag;
        },
    }
};
</script>

<style scoped="scoped">
.statistics-member .bd-box {
    border-top: 1px solid #EEEEEE;
}

.statistics-member .left-box {
    width: 100%;
}
</style>
