<template>
  <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：产品分类管理
    -->
  <div class="product">
    <!--内容-->
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input size="small" v-model="searchForm.search" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="small" v-model="searchForm.status" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="待叫号" :value="10"></el-option>
            <el-option label="已入座" :value="20"></el-option>
            <el-option label="已过号" :value="30"></el-option>
            <el-option label="已取消" :value="40"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker size="small" v-model="searchForm.create_time" type="daterange" value-format="YYYY-MM-DD"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="Search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" row-key="category_id"  style="width: 100%" v-loading="loading">
          <el-table-column prop="queue_no" label="就餐号"></el-table-column>
          <el-table-column prop="queue_num" label="就餐人数"></el-table-column>
          <el-table-column prop="tables.table_name" label="桌位名称"></el-table-column>
          <el-table-column prop="state_text" label="状态"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column prop="create_time" label="取号时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope" >
              <div v-if="!scope.row.is_top_row">
              <el-button v-if="scope.row.status==10" @click="editClick(scope.row)" type="text" size="small" v-auth="'/store/order/detail'">编辑
              </el-button>
              </div>
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
    <!--修改-->
    <Edit v-if="open_edit" :open_edit="open_edit" :editform="categoryModel"
      @closeDialog="closeDialogFunc($event, 'edit')"></Edit>
  </div>
</template>

<script>
  import QueueApi from '@/api/queue.js';
  import Edit from './edit.vue';
  export default {
    components: {
       Edit
    },
    data() {
      return {
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
        /*是否打开编辑弹窗*/
        open_edit: false,
        categoryModel: {
          model:''
        },
        searchForm: {
          search: '',
          status: '',
          create_time: ''
        },
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
        let Params = this.searchForm;
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        self.loading = true;
          QueueApi.recordlist(Params, true)
            .then(data => {
              self.loading = false;
              self.tableData = data.data.list.data;
              self.totalDataNumber = data.data.list.total;
            })
            .catch(error => {
              self.loading = false;
            });
      },
      /*打开编辑*/
      editClick(item) {
        this.categoryModel.model = item;
        this.categoryModel.model.table_name = item.tables.table_name;
        this.open_edit = true;
      },
      /*搜索查询*/
      onSubmit() {
        this.curPage = 1;
        this.tableData = [];
        this.getData();
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
    }
  };
</script>

<style lang="scss" scoped></style>
