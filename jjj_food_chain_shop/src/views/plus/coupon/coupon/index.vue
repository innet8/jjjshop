<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-优惠券-优惠券列表
      -->
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
    </div>
    <div class="common-level-rail">
      <el-button size="small" type="primary" icon="Plus" @click="addClick">添加优惠券</el-button>
    </div>
    <div class="product-content">
      <el-form ref="form" :model="form" label-position="top" label-width="100px">
        <div class="table-wrap">
          <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column label="商家名称">
              <template #default="scope">
                  <span v-if="scope.row.supplier_name==null" class="green">平台</span>
                  <span v-if="scope.row.supplier_name!=null">{{scope.row.supplier_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="coupon_type.text" label="优惠券类型" width="100"></el-table-column>
            <el-table-column prop="name" label="优惠券名称"></el-table-column>
            <el-table-column prop="min_price" label="最低消费金额"></el-table-column>
			<el-table-column prop="max_price" label="最多优惠金额">
				<template #default="scope">
					<span v-if="scope.row.coupon_type.value==10">{{scope.row.reduce_price}}</span>
					<span v-else>{{scope.row.max_price}}</span>
				</template>
			</el-table-column>
            <el-table-column prop="seckill_stock" label="优惠方式">
              <template #default="scope">
                <div v-if="scope.row.coupon_type.value==10">
                  <span>立减 <strong class="orange">{{scope.row.reduce_price}}</strong> 元</span>
                </div>
                <div v-if="scope.row.coupon_type.value==20">
                  <span>打 <strong class="orange">{{scope.row.discount}}</strong> 折</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="seckill_stock" label="有效期">
              <template #default="scope">
                <div v-if="scope.row.expire_type==10">
                  <span>领取 <strong>{{scope.row.expire_day}}</strong> 天内有效</span>
                </div>
                <div v-if="scope.row.expire_type==20">
                  <span>
                    {{scope.row.start_time.text}}
                    ~
                    {{scope.row.end_time.text}}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="receive_num" label="发放总数量">
              <template #default="scope">
                <div v-if="scope.row.total_num==-1">
                  <span>不限制</span>
                </div>
                <div v-else>
                  <span>{{scope.row.total_num}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="receive_num" label="已领取数量"></el-table-column>
            <el-table-column prop="sort" label="排序" ></el-table-column>
            <el-table-column prop="create_time" label="添加时间" width="135"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">

                <el-button @click="editClick(scope.row)" type="primary" link size="small">编辑</el-button>
                <el-button @click="deleteClick(scope.row)" type="primary" link size="small">删除</el-button>


              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage"
           :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import CouponApi from '@/api/coupon.js';
  export default {
    data() {
      return {
        formInline: {},
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
      };
    },
    created() {
      /*获取列表*/
      this.getData();
    },
    methods: {
      /*获取列表*/
      getData() {
        let self = this;
        let Params = {};
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        CouponApi.couponList(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total
          })
          .catch(error => {});
      },
      /*选择第几页*/
      handleCurrentChange(val) {
        let self = this;
        self.curPage = val;
        self.loading = true;
        self.getData();
      },

      /*每页多少条*/
      handleSizeChange(val) {
        this.curPage = 1;
        this.pageSize = val;
        this.getTableList();
      },
      /*添加优惠券*/
      addClick() {
        this.$router.push('/plus/coupon/coupon/add');
      },
      /*修改优惠券*/
      editClick(e) {
        let self = this;
        this.$router.push({
          path: '/plus/coupon/coupon/edit',
          query: {
            coupon_id: e.coupon_id
          }
        })
      },
      /*删除优惠券*/
      deleteClick(e) {
        let self = this;
       ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          CouponApi.deleteCoupon({
              coupon_id: e.coupon_id
            }, true).then(data => {
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

        }).catch(() => {
          self.loading = false;
        });
      }

    }
  };
</script>

