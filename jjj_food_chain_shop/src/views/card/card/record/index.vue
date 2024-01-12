<template>
  <!--
          作者 luoyiming
          时间：2020-06-09
          描述：会员-等级管理
      -->
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键词"><el-input v-model="formInline.search" placeholder="请输入关键词"></el-input></el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="过期" :value="0"></el-option>
            <el-option label="有效" :value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item><el-button type="primary" icon="Search" @click="onSubmit">查询</el-button></el-form-item>
      </el-form>
    </div>
    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="order_id" label="ID"></el-table-column>
          <el-table-column prop="card_name" :label="$t('昵称')">
            <template #default="scope">
              <img :src="scope.row.user.avatarUrl" width="30px" height="30px" />
              <span>{{scope.row.user.nickName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="card.card_tel" :label="$t('手机号')">
          </el-table-column>
          <el-table-column prop="card.user_id" :label="$t('用户ID')">
          </el-table-column>
          <el-table-column prop="card.card_name" label="会员卡名称">
          </el-table-column>
          <el-table-column prop="expire_time_text" label="有效期" >
          </el-table-column>
          <el-table-column prop="discount" label="折扣">
            <template #default="scope">
              <span v-if="scope.row.discount">{{scope.row.discount}}折</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="pay_price" label="价格"></el-table-column>

          <el-table-column prop="pay_time_text" label="领取时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button @click="putClick(scope.row)" type="primary" link size="small" v-auth="'/card/card/delay'" v-if="scope.row.expire_time>0">延期</el-button>
              <el-button @click="cancel(scope.row)" type="primary" link size="small" v-auth="'/card/card/cancel'" v-if="scope.row.pay_type==30">撤销</el-button>
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
    <!--发卡-->
    <expire v-if="open_edit" :open_edit="open_edit" :form="userModel" @closeDialog="closeDialogFunc($event, 'edit')"></expire>
  </div>
</template>

<script>
  import CardApi from '@/api/card.js';
  import expire from '../dialog/expire.vue';
  import {
    deepClone
  } from '@/utils/base.js';
  export default {
    components: {
      expire
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
          search: '',
          status: -1
        },
        open_edit:false,
        userModel:{}
      };
    },
    created() {
      /*获取列表*/
      this.getTableList();
    },
    methods: {

      /*换行*/
      keepTextStyle(val) {
        let str = val.replace(/(\\r\\n)/g, '<br/>');
        return str;
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

      /*获取列表*/
      getTableList() {
        let self = this;
        let Params = self.formInline;
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        CardApi.recordlist(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total
          })
          .catch(error => {

          });
      },
      /*搜索查询*/
      onSubmit() {
        let self = this;
        self.loading = true;
        self.curPage = 1;
        self.getTableList();
      },
      /*打开添加*/
      addClick() {
        this.$router.push('/card/card/add');
      },
      /*打开编辑*/
      editClick(item) {
        this.$router.push({
          path: '/card/card/edit',
          query: {
            card_id: item.card_id,
          }
        });
      },
      /*打开编辑*/
      putClick(item) {
        this.userModel = item;
        this.open_edit = true;
      },
      /*关闭弹窗*/
      closeDialogFunc(e, f) {
        if (f == 'edit') {
          this.open_edit = e.openDialog;
          if (e.type == 'success') {
            this.getTableList();
          }
        }
      },
      /*删除用户*/
      cancel(row) {
        let self = this;
        ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          CardApi.cancelcard({
              order_id: row.order_id
            }, true)
            .then(data => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: data.msg,
                  type: 'success'
                });
                self.getTableList();
              } else {
                ElMessage.error(data.msg);
              }
            })
            .catch(error => {
              self.loading = false;
            });

        }).catch(() => {

        });
      },

    }
  };
</script>

<style></style>
