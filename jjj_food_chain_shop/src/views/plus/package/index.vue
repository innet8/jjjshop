<template>
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="活动名称">
          <el-input v-model="formInline.search" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="addClick" icon="Plus" v-auth="'/plus/package/add'">添加活动</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-form">活动列表</div>
    <div class="product-content point-list">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="table-wrap">
          <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="package_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="money" label="活动价格"></el-table-column>
            <el-table-column prop="start_time.text" label="开始时间"></el-table-column>
            <el-table-column prop="end_time.text" label="结束时间"></el-table-column>
            <el-table-column prop="total_num" label="发放数量"></el-table-column>
            <el-table-column prop="people" label="参与人数"></el-table-column>
            <el-table-column prop="status.text" label="状态"></el-table-column>
            <el-table-column fixed="right" width="210" label="操作">
              <template #default="scope">
                <el-button v-auth="'/plus/package/edit'" @click="editClick(scope.row.package_id)" type="primary" link
                  size="small">
                  编辑
                </el-button>
                <el-button v-if="scope.row.status.value==1" v-auth="'/plus/package/send'"
                  @click="sendClick(scope.row.package_id)" type="primary" link size="small"> 发布
                </el-button>
                <el-button v-else="" v-auth="'/plus/package/send'" @click="endClick(scope.row.package_id)"
                  type="primary" link size="small"> 终止
                </el-button>
                <el-button v-auth="'/plus/package/orderlist'" @click="orderClick(scope.row.package_id)" type="primary" link
                  size="small"> 购买记录
                </el-button>
                <el-button v-auth="'/plus/package/delete'" @click="deleteClick(scope.row.package_id)" type="primary" link
                  size="small"> 删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import PackageApi from '@/api/package.js';
  export default {
    components: {
    },
    data() {
      return {
        formInline: {
          search: '',
        },
        form: {},
        tableData: [],
        /*一页多少条*/
        pageSize: 20,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*是否加载完成*/
        loading: true,
        path: "",
      };
    },
    created() {
      /*获取列表*/
      this.getTableList();
    },
    methods: {
      /*获取列表*/
      getTableList() {
        let self = this;
        let Params = {};
        Params.search = self.formInline.search;
        Params.page = self.curPage;
        PackageApi.packageList(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total
          }).catch(error => {
            self.loading = false;
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
        let self = this;
        self.curPage = 1;
        self.pageSize = val;
        self.getTableList();
      },

      /*添加*/
      addClick() {
        this.$router.push('/plus/package/add');
      },
      /*购买记录*/
      orderClick(e) {
        let self = this;
        this.$router.push({
          path: '/plus/package/orderlist',
          query: {
            gift_package_id: e
          }
        })
      },
      /*编辑*/
      editClick(e) {
        let self = this;
        this.$router.push({
          path: '/plus/package/edit',
          query: {
            package_id: e
          }
        })
      },

      /* 查询*/
      onSubmit() {
        let self = this;
        let params = self.form;
        self.loading = true;
        self.getTableList();
      },

      /*删除*/
      deleteClick(e) {
        let self = this;
       ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          PackageApi.delpackage({
            id: e
          }, true).then(data => {
            self.loading = false;
            ElMessage({
              message: data.msg,
              type: 'success'
            });
            self.getTableList();

          }).catch(error => {
            self.loading = false;
          });

        }).catch(() => {
          self.loading = false;
        });
      },

      /*发布*/
      sendClick(e) {
        let self = this;
        self.loading = true;
        PackageApi.send({
          id: e
        }, true).then(data => {
          self.loading = false;
          ElMessage({
            message: data.msg,
            type: 'success'
          });
          self.getTableList();

        }).catch(error => {
          self.loading = false;
        });
      },
      /*终止*/
      endClick(e) {
        let self = this;
        self.loading = true;
        PackageApi.end({
          id: e
        }, true).then(data => {
          self.loading = false;
          ElMessage({
            message: data.msg,
            type: 'success'
          });
          self.getTableList();

        }).catch(error => {
          self.loading = false;
        });
      },
    }
  };
</script>

<style>
  .point-list .el-input-number--mini {
    width: auto;
  }
</style>
