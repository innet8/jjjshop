<template >
    <div class="supplier">
        <!-- <div class="common-level-rail">
            <el-button size="small" type="primary" @click="addClick" v-auth="'/setting/printer/add'">添加</el-button>
        </div> -->
        <!--内容-->
        <div class="supplier-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="img" :label="$t('图片')">
                        <template #default="scope">
                            <img :src="domain+scope.row.img" style="width: 48px;" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" :label="$t('名称')"></el-table-column>
                    <el-table-column prop="sort" :label="$t('排序')"></el-table-column>
                    <el-table-column prop="" :label="$t('状态')">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/supplier/pay/state')" :model-value="scope.row.status" :active-value="1" :inactive-value="0"
                                @click="changeStatus(scope.row)"></el-switch>
                        </template>
                    </el-table-column>

                </el-table>
            </div>

            <!--分页-->
            <!-- <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                    :current-page="curPage" :page-size="pageSize" layout=" prev, pager, next, jumper"
                    :total="totalDataNumber">
                </el-pagination>
            </div> -->
        </div>

    </div>
</template>
<script>
import SettingApi from '@/api/setting.js';
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

            /*是否打开添加弹窗*/
            open: false,
            /*是否打开编辑弹窗*/
            title: '',
            domain:'',
        }
    },
    created() {
        this.domain = localStorage.getItem('SHOP_BASIC_URL');
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
        /*获取列表*/
        getData() {
            let self = this;
            SettingApi.getPaytype({}, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data;
                })
                .catch(error => {

                });
        },

        changeStatus(row) {
            let self = this;
            let params = {
                key: row.value,
                status: row.status == 1 ? 0 : 1,
            }
            let text = ''
            text = row.status == 1 ? $t('禁用') : $t('启用');
            ElMessageBox.confirm( $t("确定")+ text + $t("这个支付方式?"),  $t("提示"), {
                confirmButtonText: $t("确定"),
                cancelButtonText: $t("取消"),
                type: "warning",
            })
                .then(() => {
                    self.loading = true;
                    SettingApi.setPaytype(params, true)
                        .then(data => {
                            self.loading = false;
                            self.getData();
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => { });
        },

        /*打开添加*/
        addClick() {
            this.title = $t('添加支付方式')
            this.open = true
        },

        /*打开编辑*/
        editClick(item) {
            this.editId = item.editId
            this.open = true
        },
    },
}
</script>
