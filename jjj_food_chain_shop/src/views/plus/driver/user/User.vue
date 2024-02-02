<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-配送员-配送员用户
      -->
  <div class="user">
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.nick_name" placeholder="请输入昵称/姓名/手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="search-button" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="user_id" label="用户ID" width="70"></el-table-column>
          <el-table-column prop="nickName" label="微信头像" width="70">
            <template #default="scope">
              <img  v-if="scope.row.user" class="radius" v-img-url="scope.row.user.avatarUrl" width="30" height="30" />
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="	微信昵称"></el-table-column>
          <el-table-column prop="real_name" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <span class="orange" v-if="scope.row.status==0">正常</span>
              <span class="gray" v-if="scope.row.status==1">禁止</span>
            </template>
          </el-table-column>
          <el-table-column prop="deposit_money" label="押金">
          </el-table-column>
          <el-table-column prop="all_money" label="累计佣金">
            <template #default="scope">
              <span class="orange">{{ scope.row.all_money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="可提现佣金">
            <template #default="scope">
              <span class="orange">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="total_money" label="已提现佣金">
            <template #default="scope">
              <span class="orange">{{ scope.row.total_money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="140"></el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <div>
                <el-button @click="saleClick(scope.row)" type="primary" link size="small" v-auth="'/plus/driver/order/index'">订单
                </el-button>
                <el-button @click="detailedClick(scope.row)" type="primary" link size="small"
                  v-auth="'/plus/driver/cash/index'">
                  提现明细</el-button>
                <el-button @click="EditClick(scope.row)" type="primary" link size="small" v-auth="'/plus/driver/user/edit'">修改
                </el-button>
                <el-button @click="delClick(scope.row)" type="primary" link size="small" v-auth="'/plus/driver/user/delete'">删除
                </el-button>
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
    <!--编辑-->
    <Edit :open_edit="open_edit" :userModel="userModel" @close="closeEditFunc"></Edit>

  </div>
</template>

<script>
  import {
    deepClone
  } from '@/utils/base.js'
  import DriverApi from '@/api/driver.js';
  import Edit from './dialog/Edit.vue';
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
        /*搜索对象*/
        formInline: {
          nick_name: ''
        },
        /*是否打开弹窗*/
        open_dialog: false,
        /*基础设置当前用户的信息*/
        basicSetting: [],
        /*选中的用户*/
        userModel: {},
        /*是否打开修改*/
        open_edit: false

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
        self.loading = true;
        self.getData();
      },

      /*获取数据*/
      getData() {
        let self = this;
        let Params = {};
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        if (self.formInline.nick_name != '') {
          Params.nick_name = self.formInline.nick_name;
        }
        DriverApi.driverList(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total;
            self.basicSetting = data.data.basicSetting;
          })
          .catch(error => {
            self.loading = false;
          });
      },

      //搜索
      onSubmit() {
        this.curPage = 1;
        this.getData();
      },

      /*每页多少条*/
      handleSizeChange(val) {
        this.curPage = 1;
        this.pageSize = val;
        this.getData();
      },

      /*配送员订单*/
      saleClick(item) {
        this.$emit("chang-tab",'order')
        this.$router.push({
          path: '/plus/driver/index',
          query: {
            type: 'order',
            user_id: item.user_id
          }
        })
      },

      /*提现明细*/
      detailedClick(item) {
        this.$emit("chang-tab",'cash')
        this.$router.push({
          path: '/plus/driver/index',
          query: {
            type: 'cash',
            user_id: item.user_id
          }
        })
      },

      /*删除配送员*/
      delClick(row) {
        let self = this;
        ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            self.loading = true;
            DriverApi.deletedriver({
                  user_id: row.user_id
                },
                true
              )
              .then(data => {
                self.loading = false;
                this.$ElMessage({
                  message: data.msg,
                  type: 'success'
                });
                self.getData();
              })
              .catch(error => {
                self.loading = false;
              });
          })
          .catch(() => {
            self.loading = false;
          });
      },

      /*打开编辑用户弹窗*/
      EditClick(e) {
        this.userModel = deepClone(e);
        this.open_edit = true;
      },

      /*关闭编辑用户弹窗*/
      closeEditFunc(e) {
        this.open_edit = false;
        if (e.type == 'success') {
          this.getData();
        }
      }

    }
  };
</script>

<style lang="scss" scoped>
  .el-button {
    margin-left: 0;
    margin-right: 10px;
  }
</style>
