<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-分销-提现申请
      -->
  <div class="user">
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审核状态">
          <el-select v-model="formInline.apply_status" placeholder="请选择状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="待审核" value="10"></el-option>
            <el-option label="审核通过" value="20"></el-option>
            <el-option label="已打款" value="40"></el-option>
            <el-option label="驳回" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现方式">
          <el-select v-model="formInline.pay_type" placeholder="请选择提现方式">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="微信" value="10"></el-option>
            <el-option label="支付宝" value="20"></el-option>
            <el-option label="银行卡" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="formInline.user_id" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.search" placeholder="请输入昵称/姓名/手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="user_id" label="用户ID" width="60"></el-table-column>
          <el-table-column prop="nickName" label="微信头像" width="70">
            <template #default="scope">
              <img class="radius" v-img-url="scope.row.avatarUrl" width="30" height="30" />
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="微信昵称" width="100"></el-table-column>
          <el-table-column prop="real_name" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机号">
            <template #default="scope">
              <p class="text-ellipsis" :title="scope.row.mobile">{{ scope.row.mobile }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="提现金额">
            <template #default="scope">
              <span class="orange">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pay_type.text" label="提现方式"></el-table-column>
          <el-table-column prop="pay_type" label="提现信息	">
            <template #default="scope">
              <div v-if="scope.row.pay_type.value == 20">
                <p>
                  <span>{{ scope.row.alipay_name }}</span>
                </p>
                <p>
                  <span>{{ scope.row.alipay_account }}</span>
                </p>
              </div>
              <div v-else-if="scope.row.pay_type.value == 30">
                <p>
                  <span>{{ scope.row.bank_name }}</span>
                </p>
                <p>
                  <span>{{ scope.row.bank_account }}</span>
                </p>
                <p>
                  <span>{{ scope.row.bank_card }}</span>
                </p>
              </div>
              <div v-else>
                <p><span>--</span></p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="apply_status.text" label="审核状态"></el-table-column>
          <el-table-column prop="create_time" label="申请时间" width="135"></el-table-column>
          <el-table-column prop="audit_time" label="审核时间" width="135"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
              <div v-if="scope.row.apply_status.value == 10 || scope.row.apply_status.value == 20">
                <el-button @click="editClick(scope.row)" type="text" size="small" v-auth="'/plus/agent/cash/submit'">审核
                </el-button>
                <template v-if="scope.row.apply_status.value == 20 && scope.row.pay_type.value != 10">
                  <el-button @click="makeMoney(scope.row)" type="text" size="small" v-auth="'/plus/agent/cash/money'">
                    确认打款</el-button>
                </template>
                <template v-if="scope.row.apply_status.value == 20 && scope.row.pay_type.value == 10">
                  <el-button @click="WxPay(scope.row.id)" type="text" size="small" v-auth="'/plus/agent/cash/money'">
                    微信付款</el-button>
                </template>
              </div>
              <div v-if="scope.row.apply_status.value == 30">
                <el-button @click="editClick(scope.row)" type="text" size="small">详情</el-button>
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
    <Edit v-if="open_edit" :open_edit="open_edit" :form="userModel" @closeDialog="closeDialogFunc($event, 'edit')">
    </Edit>
  </div>
</template>

<script>
  import PlusApi from '@/api/plus.js';
  import Edit from './dialog/Edit.vue';
  export default {
    components: {
      /*编辑组件*/
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
        formInline: {
          apply_status: '-1',
          pay_type: '-1',
          search: '',
          /*用户ID*/
          user_id: ''
        },
        /*是否打开编辑弹窗*/
        open_edit: false,
        /*当前编辑的对象*/
        userModel: {}
      };
    },
    props: {},
    watch: {

      $route(to, from) {
        if (to.query.user_id != null) {
          this.formInline.user_id = to.query.user_id;
        } else {
          this.formInline.user_id = '';
        }
        this.curPage = 1;
        this.getData();
      }

    },
    created() {
      if (this.$route.query.user_id != null) {
        this.formInline.user_id = this.$route.query.user_id;
      }
      /*获取列表*/
      this.getData();
    },
    methods: {

      /*获取数据*/
      getData() {
        let self = this;
        let Params = self.formInline;
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        PlusApi.cash(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total;
          })
          .catch(error => {});
      },

      /*搜索*/
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

      /*选择第几页*/
      handleCurrentChange(val) {
        let self = this;
        self.curPage = val;
        self.getData();
      },

      /*打开弹出层编辑*/
      editClick(item) {
        this.userModel = item;
        this.open_edit = true;
      },

      /*关闭弹窗*/
      closeDialogFunc(e, f) {
        if (f == 'add') {
          this.open_add = e.openDialog;
          if (e.type == 'success') {
            this.getData();
          }
        }
        if (f == 'edit') {
          this.open_edit = e.openDialog;
          if (e.type == 'success') {
            this.getData();
          }
        }
      },

      /*确认打款*/
      makeMoney(e) {
        let self = this;
       ElMessageBox.confirm('确认要打款吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            self.loading = true;
            PlusApi.money({
                  id: e.id
                },
                true
              )
              .then(data => {
                self.loading = false;
                if (data.code == 1) {
                  ElMessage({
                    message: '恭喜你，操作成功',
                    type: 'success'
                  });
                  this.getData();
                } else {
                  self.loading = false;
                }
              })
              .catch(error => {
                self.loading = false;
              });
          })
          .catch(() => {});
      },

      /*微信打款*/
      WxPay(e) {
        let self = this;
        ElMessageBox.confirm('该操作 将使用微信支付企业付款到零钱功能，确定打款吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            self.loading = true;
            PlusApi.WxPay({
                  id: e
                },
                true
              )
              .then(data => {
                self.loading = false;
                if (data.code == 1) {
                  ElMessage({
                    message: '恭喜你，操作成功',
                    type: 'success'
                  });
                  this.getData();
                } else {
                  self.loading = false;
                }
              })
              .catch(error => {
                self.loading = false;
              });
          })
          .catch(() => {});
      }
    }
  };
</script>

<style></style>
