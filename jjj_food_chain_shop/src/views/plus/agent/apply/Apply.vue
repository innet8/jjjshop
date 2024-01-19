<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-分销-入驻申请
      -->
  <div class="user">
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label=""><el-input v-model="formInline.nick_name" placeholder="请输入昵称/姓名/手机号"></el-input></el-form-item>
        <el-form-item><el-button type="primary" @click="onSubmit">查询</el-button></el-form-item>
      </el-form>
    </div>

    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table :data="tableData" size="small" border style="width: 100%" v-loading="loading">
          <el-table-column prop="user_id" label="用户ID" width="60"></el-table-column>
          <el-table-column prop="nickName" label="微信头像" width="70">
            <template #default="scope">
              <img class="radius" v-img-url="scope.row.avatarUrl" width="30" height="30" />
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="	微信昵称"></el-table-column>
          <el-table-column prop="real_name" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机号">
            <template #default="scope">
              <p class="text-ellipsis">{{ scope.row.mobile }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="referee.nickName" label="推荐人"></el-table-column>
          <el-table-column prop="apply_status" label="审核状态">
            <template #default="scope">
              <span :class="{
                red: scope.row.apply_status.value == 10,
                green: scope.row.apply_status.value == 20,
                gray: scope.row.apply_status.value == 30 }">
                {{ scope.row.apply_status.text }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="apply_type.text" label="审核方式	"></el-table-column>
          <el-table-column prop="apply_time" label="申请时间" width="135"></el-table-column>
          <el-table-column fixed="right" label="操作" width="50">
            <template #default="scope">
              <div>
                <el-button v-if="scope.row.apply_status.value == 10" @click="editClick(scope.row)" type="primary" link size="small" v-auth="'/plus/agent/apply/editApplyStatus'">
                  审核
                </el-button>
                <el-button v-if="scope.row.apply_status.value == 30" @click="editClick(scope.row)" type="primary" link size="small">查看</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="curPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"
        ></el-pagination>
      </div>
    </div>
    <Edit v-if="open_edit" :open_edit="open_edit" :form="userModel" @closeDialog="closeDialogFunc($event, 'edit')"></Edit>
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
        nick_name: ''
      },
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*当前编辑的对象*/
      userModel: {}
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
      Params.nick_name = this.formInline.nick_name;
      PlusApi.saleList(Params, true)
        .then(data => {
          self.loading = false;
          self.tableData = data.data.apply_list.data;
          self.totalDataNumber = data.data.apply_list.total;
        })
        .catch(error => {});
    },

    //搜索
    onSubmit() {
      this.curPage = 1;
      this.getData();
    },

    /*每页多少条*/
    handleSizeChange(val) {
      this.curPage = 1;
      this.getData();
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
    }
  }
};
</script>


