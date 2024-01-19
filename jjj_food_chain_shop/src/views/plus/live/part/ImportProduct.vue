<template>
  <!--
    	作者：luoyiming
    	时间：2019-10-25
    	描述：组件-选择商品
    -->
  <el-dialog title="选择商品" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="true"  :append-to-body="true" width="900px">
    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="productList" border style="width: 100%" highlight-current-row v-loading="loading" @selection-change="tableCurrentChange">
          <el-table-column width="70" label="商品图片">
            <template #default="scope">
              <img :src="scope.row.cover_img" width="30" height="30" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="price_type_text" label="价格类型"></el-table-column>
          <el-table-column prop="price_text" label="价格" width="200"></el-table-column>
          <el-table-column prop="create_time" width="140" label="添加时间"></el-table-column>
          <el-table-column type="selection" :selectable="selectableFunc" width="44" v-if="islist"></el-table-column>
          <el-table-column width="80" label="单选" v-if="!islist">
            <template #default="scope">
              <el-button size="small" v-if="scope.row.noChoose" @click="SingleFunc(scope.row)">选择</el-button>
              <el-button size="small" v-else disabled>已选</el-button>
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
          :page-sizes="[2, 10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"
        ></el-pagination>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addClerk" v-if="islist">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import LiveApi from '@/api/live.js';
export default {
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*当前是第几页*/
      curPage: 1,
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      formInline: {},
      //商品分类列表
      categoryList: [],
      //商品列表
      productList: [],
      //类别列表
      status: [
        {
          id: 10,
          name: '上架'
        },
        {
          id: 20,
          name: '下架'
        }
      ],
      multipleSelection: [],
      /*左边长度*/
      formLabelWidth: '120px',
      /*是否显示*/
      dialogVisible: false,
      /*结果类别*/
      type: 'error',
      /*传出去的参数*/
      params: null,
      excludeIds:[]
    };
  },
  props: ['open_import', 'islist','room_id'],
  created() {
	  this.dialogVisible = this.open_import;
	  this.getData();
  },
  methods: {
    /*是否可以勾选*/
    selectableFunc(e) {
      if (typeof e.noChoose !== 'boolean') {
        return true;
      }
      return e.noChoose;
    },

    /*选择第几页*/
    handleCurrentChange(val) {
      this.curPage = val;
      this.getData();
    },

    /*每页多少条*/
    handleSizeChange(val) {
      this.curPage = 1;
      this.pageSize = val;
      this.getData();
    },

    /*获取商品列表*/
    getData() {
      let self = this;
      let params = self.formInline;
      params.page = self.curPage;
      params.list_rows = self.pageSize;
      params.room_id = self.room_id;
      LiveApi.listProduct(params, true)
        .then(res => {
          if (res.code == 1) {
            self.loading = false;
            self.excludeIds = res.data.excludeIds;
            /*判断是否需要去重*/
            if (self.excludeIds && typeof self.excludeIds != 'undefined' && self.excludeIds.length > 0) {
              res.data.list.data.forEach(item => {
                if (self.excludeIds.indexOf(item.goods_id) > -1) {
                  item.noChoose = false;
                } else {
                  item.noChoose = true;
                }
              });
            } else {
              if (!self.islist) {
                res.data.list.data.forEach(item => {
                  item.noChoose = true;
                });
              }
            }
            self.productList = res.data.list.data;
            self.totalDataNumber = res.data.list.total;
          }
        })
        .catch(error => {});
    },

    /*单选*/
    SingleFunc(row) {
      this.multipleSelection = [row];
      this.addClerk();
    },

    //点击确定
    addClerk() {
      let self = this;
      let params = null;
      let type = 'success';
      if (self.multipleSelection.length < 1) {
        ElMessage ({
          message: '请至少选择一件产品商品！',
          type: 'error'
        });
        return;
      }
      if (self.islist && typeof self.islist != 'undefined') {
        self.multipleSelection.forEach(item => {
          item.image = item.imagePath;
        });
        params = self.multipleSelection;
      } else {
        params = self.multipleSelection[0];
        params.image = params.imagePath;
      }
      self.params = params;
      self.type = 'success';
      self.dialogVisible = false;
    },

    /*关闭弹窗*/
    dialogFormVisible() {
      this.$emit('closeDialog', {
        type: this.type,
        openDialog: false,
        params: this.params
      });
    },

    /*监听复选按钮选中事件*/
    tableCurrentChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.no-list .el-checkbox {
  display: none;
}
</style>
