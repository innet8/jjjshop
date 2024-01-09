<template>
  <div class="user">
    <!--添加等级-->
    <div class="common-level-rail">
      <el-button size="small" type="primary" @click="addClick" icon="Plus" v-auth="'/plus/fullreduce/add'">添加活动</el-button>
    </div>

    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column label="商家名称">
            <template #default="scope">
                <span v-if="scope.row.supplier_name==null" class="green">平台</span>
                <span v-if="scope.row.supplier_name!=null">{{scope.row.supplier_name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="active_name" label="活动名称"></el-table-column>
          <el-table-column prop="full_type" label="满类型">
            <template #default="scope">
              <span v-if="scope.row.full_type == 1">满额</span>
              <span v-if="scope.row.full_type == 2">满件数</span>
            </template>
          </el-table-column>
          <el-table-column prop="full_value" label="满值"></el-table-column>
          <el-table-column prop="reduce_type" label="减类型">
            <template #default="scope">
              <span v-if="scope.row.reduce_type == 1">减金额</span>
              <span v-if="scope.row.reduce_type == 2">打折</span>
            </template>
          </el-table-column>
          <el-table-column prop="reduce_value" label="减值"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button @click="editClick(scope.row)" type="primary" link size="small" v-auth="'/plus/fullreduce/edit'" >编辑</el-button>
              <el-button @click="deleteClick(scope.row)" type="primary" link size="small" v-auth="'/plus/fullreduce/delete'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage"
          :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber">
        </el-pagination>
      </div>
    </div>

    <!--添加-->
    <Add v-if="open_add" :open_add="open_add" @closeDialog="closeDialogFunc($event, 'add')"></Add>

    <!--编辑-->
    <Edit v-if="open_edit" :open_edit="open_edit" :form="currentModel" @closeDialog="closeDialogFunc($event, 'edit')"></Edit>
  </div>
</template>

<script>
  import FullreduceApi from '@/api/plus/fullreduce.js';
  import Edit from './Edit.vue';
  import Add from './Add.vue';
  import {deepClone} from '@/utils/base.js';
  export default {
    components: {
      /*编辑组件*/
      Edit,
      Add
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
        /*横向表单数据模型*/
        formInline: {
          user: '',
          region: ''
        },
        /*是否打开添加弹窗*/
        open_add: false,
        /*是否打开编辑弹窗*/
        open_edit: false,
        /*当前编辑的对象*/
        currentModel: {}
      };
    },
    created() {

      /*获取列表*/
      this.getTableList();

    },
    methods: {

      /*选择第几页*/
      handleCurrentChange(val) {
        let self = this;
        self.curPage = val;
        self.loading = true;
        self.getTableList();
      },

      /*每页多少条*/
      handleSizeChange(val) {
        this.curPage = 1;
        this.pageSize = val;
        this.getTableList();
      },

      /*获取列表*/
      getTableList() {
        let self = this;
        let Params = {};
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        FullreduceApi.getList(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total
          })
          .catch(error => {

          });
      },

      /*打开添加*/
      addClick() {
        this.open_add = true;
      },

      /*打开编辑*/
      editClick(item) {
        this.currentModel = deepClone(item);
        this.open_edit = true;
      },

      /*关闭弹窗*/
      closeDialogFunc(e, f) {
        if (f == 'add') {
          this.open_add = e.openDialog;
          if (e.type == 'success') {
            this.getTableList();
          }
        }
        if (f == 'edit') {
          this.open_edit = e.openDialog;
          if (e.type == 'success') {
            this.getTableList();
          }
        }
      },

      /*删除用户*/
      deleteClick(row) {
        let self = this;
        ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          FullreduceApi.del({
              fullreduce_id: row.fullreduce_id
            }, true)
            .then(data => {
              self.loading = false;
              ElMessage({
                message: data.msg,
                type: 'success'
              });
              self.getTableList();
            })
            .catch(error => {
              self.loading = false;
            });

        }).catch(() => {

        });
      }

    }
  };
</script>

<style></style>
