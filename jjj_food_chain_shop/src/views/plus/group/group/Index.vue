<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-团购-列表
      -->
  <div>
    <div class="common-level-rail">
      <el-button size="small" type="primary" icon="Plus" v-auth="'/plus/group/group/add'"
        @click="addGroup">添加团购</el-button>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="group_id" label="ID" width="60"></el-table-column>
        <el-table-column prop="group_name" label="团购名称">
          <template #default="scope">
            <div class="text-ellipsis" :title="scope.row.group_name">{{scope.row.group_name}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="category.name" label="资讯分类" width="120"></el-table-column> -->
        <el-table-column prop="group_price" label="销售价格" width="100"></el-table-column>
        <el-table-column prop="sales_initial" label="虚拟销量" width="100"></el-table-column>
        <el-table-column prop="sales_actual" label="实际销量" width="100"></el-table-column>
        <el-table-column prop="group_sort" label="资讯排序" width="100"></el-table-column>
        <el-table-column prop="group_status" label="状态" width="100">
          <template #default="scope">
            <span v-if="scope.row.group_status == 1" class="green">显示</span>
            <span v-if="scope.row.group_status == 0" class="gray">隐藏</span>
          </template>
        </el-table-column>
        <el-table-column prop="suit_type" label="使用门店" width="100">
          <template #default="scope">
            <span v-if="scope.row.suit_type == 10" class="green">全部</span>
            <span v-if="scope.row.suit_type == 20" class="gray">部分</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" width="140"></el-table-column>
        <el-table-column prop="update_time" label="更新时间" width="140"></el-table-column>
        <el-table-column prop="name" label="操作" width="120">
          <template #default="scope">
            <el-button @click="editGroup(scope.row)" v-auth="'/plus/group/group/edit'" type="primary" link
              size="small">编辑</el-button>
            <el-button @click="deleteGroup(scope.row)" v-auth="'/plus/group/group/delete'" type="primary" link
              size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import GroupApi from '@/api/group.js';
  export default {
    components: {},
    data() {
      return {
        /*分类*/
        categoryData: [],
        /*表单数据*/
        tableData: [],
        /*是否打开添加弹窗*/
        open_add: false,
        /*是否打开编辑弹窗*/
        open_edit: false,
        /*当前编辑的对象*/
        userModel: {},
        commentData: [],
        loading: true,
        /*一页多少条*/
        pageSize: 20,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1
      };
    },
    created() {
      /*获取团购列表*/
      this.getTableList();
    },
    methods: {

      /*获取团购列表*/
      getTableList() {
        let self = this;
        let Params = {};
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        GroupApi.grouplist(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total;
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*添加团购*/
      addGroup() {
        this.$router.push({
          path: '/plus/group/group/add'
        });
      },

      /*编辑团购*/
      editGroup(row) {
        let params = row.group_id;
        this.$router.push({
          path: '/plus/group/group/edit',
          query: {
            group_id: params
          }
        });
      },

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

      /*删除团购*/
      deleteGroup(row) {
        let self = this;
        ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            self.loading = true;
            GroupApi.deleteGroup({
                  group_id: row.group_id
                },
                true
              )
              .then(data => {
                this.$ElMessage({
                  message: data.msg,
                  type: 'success'
                });
                self.loading = false;
                self.getTableList();
              })
              .catch(error => {});
          })
          .catch(() => {});
      },
    }
  };
</script>


