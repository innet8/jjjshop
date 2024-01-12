<template >
    <div class="supplier">
        <div class="common-level-rail">
            <el-button size="small" type="primary" @click="addClick" v-auth="'/setting/printer/add'">添加</el-button>
        </div>
        <!--内容-->
        <div class="supplier-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="printer_id" label="图片"></el-table-column>
                    <el-table-column prop="printer_name" label="名称"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="sort" label="状态">
                        <template #default="scope">
                            <el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0"
                                @click="changeStatus($event, scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="添加时间"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small">编辑</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small">删除</el-button>
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
        <addEdit v-if="open" :open="open" @close="(e) => { open = false; if(e==1){ this.getData();} }"></addEdit>
    </div>
</template>
<script>
import addEdit from './addEdit.vue';
export default {
    components:{addEdit},
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
        }
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

        /*打开添加*/
        addClick() {
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
<style lang="">
    
</style>