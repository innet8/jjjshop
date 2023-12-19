<template>
  <!--
          作者：luoyiming
          时间：2019-10-25
          描述：门店-门店管理
      -->
  <div class="user clearfix">

    <!--添加门店-->
    <div class="common-level-rail fl">
      <el-button size="small" type="primary" icon="Plus" @click="addClick" v-auth="'/supplier/supplier/add'"
        v-if="is_chain==1">添加门店</el-button>
    </div>
    <div class="common-seach-wrap fr" v-auth="'/auth/shop'">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.search" placeholder="请输入门店名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="Search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="shop_supplier_id" label="门店ID" width="120"></el-table-column>
          <el-table-column prop="name" label="门店名称">
            <template #default="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="superUser.user_name" label="登录账号"></el-table-column>
          <el-table-column prop="link_name" label="联系人" width="120"></el-table-column>
          <el-table-column prop="link_phone" label="联系电话" width="120"></el-table-column>
          <el-table-column prop="address" label="联系地址"></el-table-column>
          <el-table-column prop="total_money" label="总金额"></el-table-column>
          <el-table-column prop="money" label="可用余额"></el-table-column>
          <el-table-column prop="cash_money" label="已提现"></el-table-column>
          <el-table-column prop="freeze_money" label="提现中"></el-table-column>
          <el-table-column prop="create_time" label="添加时间" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button @click="recycle(scope.row,0)" type="text" size="small" v-auth="'/supplier/supplier/recycle'"
                v-if="scope.row.is_recycle==1">开启</el-button>
              <el-button @click="recycle(scope.row,1)" type="text" size="small" v-auth="'/supplier/supplier/recycle'"
                v-else>禁止</el-button>
              <el-button @click="editClick(scope.row)" type="text" size="small"
                v-auth="'/supplier/supplier/edit'">编辑</el-button>
              <el-button @click="qrcode(scope.row)" type="text" size="small"
                v-auth="'/supplier/supplier/qrcode'">二维码</el-button>
              <el-button @click="settingClick(scope.row)" type="text" size="small"
                v-auth="'/supplier/supplier/setting'">设置</el-button>
              <el-button v-if="scope.row.is_main==0" @click="deleteClick(scope.row.shop_supplier_id)" type="text"
                size="small" v-auth="'/supplier/supplier/delete'">删除</el-button>
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
    <Qrcode :open='isqrcode' :code_id='code_id' @close="closeQrcode"></Qrcode>
  </div>
</template>

<script>
  import SupplierApi from '@/api/supplier.js';
  import Qrcode from './dialog/Qrcode.vue';
  export default {
    components: {
      Qrcode
    },
    data() {
      return {
        /*是否加载完成*/
        loading: true,
        /*列表数据*/
        tableData: [],
        /*门店列表数据*/
        storeList: [],
        /*一页多少条*/
        pageSize: 20,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*横向表单数据模型*/
        formInline: {
          shop_id: '',
          search: ''
        },
        /*是否打开添加弹窗*/
        open_add: false,
        /*是否打开编辑弹窗*/
        open_edit: false,
        /*当前编辑的对象*/
        userModel: {},
        isqrcode: false,
        code_id: '',
        is_chain: '',
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
        SupplierApi.supplierList(Params, true)
          .then(res => {
            self.loading = false;
            self.tableData = res.data.list.data;
            self.totalDataNumber = res.data.list.total;
            self.is_chain = res.data.is_chain;
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*搜索查询*/
      onSubmit() {
        this.curPage = 1;
        this.getTableList();
      },

      /*打开添加*/
      addClick() {
        this.$router.push('/supplier/supplier/add');
      },
      qrcode(row) {
        let self = this;
        self.code_id = row.shop_supplier_id;
        self.isqrcode = true;
      },
      closeQrcode() {
        let self = this;
        self.isqrcode = false;
      },
      /*打开编辑*/
      editClick(row) {
        let self = this;
        let params = row.shop_supplier_id;
        this.$router.push({
          path: '/supplier/supplier/edit',
          query: {
            shop_supplier_id: params
          }
        })
      },
      /*打开编辑*/
      settingClick(row) {
        let self = this;
        let params = row.shop_supplier_id;
        this.$router.push({
          path: '/supplier/supplier/setting',
          query: {
            shop_supplier_id: params
          }
        })
      },
      /* 强制下架上架*/
      recycle(row, state) {
        let self = this;
        let war = "";
        if (state == 1) {
          war = "禁止"
        } else if (state == 0) {
          war = "开启"
        }
        ElMessageBox.confirm("确认要" + war + "吗?", '提示', {
            type: 'warning'
          })
          .then(() => {
            SupplierApi.supplierRecycle({
              shop_supplier_id: row.shop_supplier_id,
              is_recycle: state
            }).then(data => {
             ElMessage({
                message: war + '成功',
                type: 'success'
              });
              self.getTableList();
            });
          });
      },
      /*删除*/
      deleteClick(row) {
        let self = this;
        ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          SupplierApi.deleteSupplier({
              shop_supplier_id: row
            }, true)
            .then(data => {
              self.loading = false;
              if (data.code == 1) {
               ElMessage({
                  message: '恭喜你，门店删除成功',
                  type: 'success'
                });
                self.getTableList();
              }
            })
            .catch(error => {
              self.loading = false;
            });

        }).catch(() => {
          self.loading = false;
        });
      }

    }
  };
</script>

<style></style>