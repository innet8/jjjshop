<template >
    <div class="user">


        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="printer_id" label="ID"></el-table-column>
                    <el-table-column prop="printer_name" :label="$t('打印名称')"></el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="previewClick(scope.row)" type="primary" link size="small"
                                v-auth="'/setting/printer/edit'">{{ $t('预览') }}</el-button>
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
        <preview v-if="open" :open="open" :title="title" @close="(e) => { open = false; if (e == 1) { this.getData(); } }"></preview>
    </div>
</template>
<script>
import preview from './preview.vue';
export default {
    components: { preview },
    data() {
        return {
            /*是否加载完成*/
            loading: false,
            /*列表数据*/
            tableData: [
                {
                    printer_id: 1,
                    printer_name: $t('交班单'),
                    create_time: '2023-12-29 15:26:26',
                },
                {
                    printer_id: 2,
                    printer_name: $t('结账单'),
                    create_time: '2023-12-29 15:26:26',
                },
                {
                    printer_id: 3,
                    printer_name: $t('预结账单'),
                    create_time: '2023-12-29 15:26:26',
                },
                {
                    printer_id: 4,
                    printer_name: $t('一菜一单'),
                    create_time: '2023-12-29 15:26:26',
                },
                {
                    printer_id: 5,
                    printer_name: $t('营业数据'),
                    create_time: '2023-12-29 15:26:26',
                },
            ],
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,

            open: false,
            title:'',
        }
    },
    methods: {
        previewClick(e) {
            this.title = e.printer_name
            this.open = true
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
            this.curPage = 1;
            this.pageSize = val;
            this.getData();
        },
        getData() {

        },
    },
}
</script>
