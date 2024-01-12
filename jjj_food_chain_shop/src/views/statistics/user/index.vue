<template>
    <div class="statistics-member" v-loading="loading">
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">

                <el-form-item :label="$t('收银员')">
                    <el-select size="small" v-model="searchForm.user_id" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item, index) in exStyle" :key="index" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('起始时间')">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker size="small" v-model="searchForm.create_time" type="daterange"
                            value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" icon="Search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success" @click="onExport">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-wrap">
            <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                <el-table-column prop="printer_id" label=""></el-table-column>
                <el-table-column prop="printer_name" :label="$t('交班编号')"></el-table-column>
                <el-table-column prop="sort" :label="$t('收银员')"></el-table-column>
                <el-table-column prop="sort" :label="$t('当班时间')"></el-table-column>
                <el-table-column prop="sort" :label="$t('营业收入')"></el-table-column>
                <el-table-column prop="sort" :label="$t('现金收入')"></el-table-column>
                <el-table-column prop="sort" :label="$t('上一班遗留备用金')"></el-table-column>
                <el-table-column prop="sort" :label="$t('本班遗留备用金')"></el-table-column>
                <el-table-column prop="create_time" label="添加时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">

                        <el-button @click="detailClick(scope.row)" type="primary" link size="small">{{ $t('详情')
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
    </div>
</template>

<script>
import qs from 'qs';
import { useUserStore } from '@/store';
const { token } = useUserStore();
export default {

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

            searchForm: {
                user_id: "",
                create_time: "",
            },
            token,
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
            //   let self = this;
            //   StatisticsApi.getUserTotal({}, true)
            //     .then(res => {
            //       Object.assign(self.dataModel, res.data);
            //       self.loading = false;
            //     })
            //     .catch(error => {});
        },
        onSubmit() {

        },
        onExport: function () {
            let baseUrl = window.location.protocol + '//' + window.location.host;
            this.searchForm.token = this.token;
            window.location.href = baseUrl + '/index.php/shop/takeout.operate/export?' + qs.stringify(this.searchForm);
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
