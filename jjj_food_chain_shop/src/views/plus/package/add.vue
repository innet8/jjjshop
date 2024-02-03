<template>
  <div class="user">
    <div class="common-form">新增活动</div>
    <div class="product-content">
      <el-form ref="form" :model="form" label-position="top" :rules="formRules" label-width="150px">
        <el-form-item label="活动标题" prop="name" :rules="[{required: true,message: ' '}]">
          <el-input type="text" v-model="form.name" placeholder="请输入活动标题" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="活动日期" prop="value1" :rules="[{required: true,message: ' '}]">
          <el-date-picker v-model="form.value1" type="daterange" value-format="YYYY-MM-DD" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <div class="common-form">券包设置</div>
        <el-form-item label="优惠券">
          <el-button type="primary" @click="addCoupon()">添加</el-button>
          <el-table :data="tableData" style="width: 60%">
            <el-table-column prop="coupon_id" label="优惠券id">
            </el-table-column>
            <el-table-column prop="name" label="优惠券">
            </el-table-column>
            <el-table-column  label="数量">
              <template #default="scope">
                <el-form-item   :rules="[{ required: true, message: '1-9' },cprules]"
                  :prop="'coupon.' + scope.$index + '.coupon_num'">
                  <el-input type="number" v-model="form.coupon[scope.$index].coupon_num">
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template #default="scope">
                <el-button type="primary" link size="small" @click='delcoupon(scope.row)'> 删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <div class="common-form">购买设置</div>
        <el-form-item label="购买金额" prop="money" :rules="[{required: true,message: ' '}]">
          <el-input type="number" v-model="form.money" class="max-w460">
            <template #append>元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="会员购买等级 ">
          <el-radio-group v-model="form.is_grade">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">指定等级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员等级 " v-if="form.is_grade">
          <el-select v-model="form.grade_ids" multiple placeholder="请选择">
            <el-option v-for="(item,index) in Grade" :key="index" :label="item.name" :value="item.grade_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买次数 ">
          <el-radio-group v-model="form.is_times">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">限购</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-if="form.is_times">
          <el-input type="number" v-model="form.times" class="max-w460">
            <template #prepend>每人限购</template>
            <template #append>次</template>
          </el-input>
        </el-form-item>
        <div class="common-form">发放设置</div>
        <el-form-item label="发放数量" prop="total_num" :rules="[{required: true,message: ' '}]">
          <el-input type="number" v-model="form.total_num" placeholder="请输入发放数量" class="max-w460"></el-input>
        </el-form-item>
      </el-form>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button  @click="gotoBack">返回</el-button>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </div>
    <!--选择优惠券-->
    <GetCoupon v-if="open_add" :open_add="open_add" @closeDialog="closeProductDialogFunc($event)">选择优惠券弹出层</GetCoupon>
  </div>
</template>
<script>
  import PackageApi from '@/api/package.js';
  import GetCoupon from '@/components/coupon/GetCoupon.vue';
  export default {
    components: {
      /*选择优惠券件*/
      GetCoupon,
    },
    data() {
      var cprule = (rule, value, callback) => {
        if (value >=10 ||value <=0) {
          callback(new Error('1-9'));
        } else {
          callback();
        }
      };
      return {
        form: {
          coupon: [],
          is_times: 0,
          times: 0,
          is_grade: 0,
          grade_ids: '',
          value1: [],
          name: '',
          total_num: '',
        },
        /*等级*/
        Grade: [],
        /*优惠券*/
        tableData: [],
        loading: false,
        open_add: false,
        formRules: {
        },
        /*左边长度*/
        formLabelWidth: '120px',
        cprules: {
          validator: cprule,
          trigger: 'blur'
        }
      };
    },
    created() {
      /*获取等级*/
      this.getGradeList();
    },
    methods: {
      /*获取等级*/
      getGradeList() {
        let self = this;
        PackageApi.getPackage({0:true})
          .then(data => {
            self.Grade = data.data.list;
          }).catch(error => {

          });
      },
      /*添加优惠券*/
      addCoupon() {
        this.open_add = true;
      },
      /*关闭优惠券*/
      closeProductDialogFunc(e) {
        let self = this;
        self.open_add = e.openDialog;
        if (e.type == 'success') {
          if (self.form.coupon.length < 1) {
            self.form.coupon.push({
              coupon_id: e.params.coupon_id,
              coupon_num: 1
            });
            self.tableData.push({
              coupon_id: e.params.coupon_id,
              name: e.params.name,
              coupon_num: 1
            });
          } else {
            let flag = true;
            self.form.coupon.forEach((item, index) => {
              if (item.coupon_id == e.params.coupon_id) {
                flag = false
              }
            })
            if (flag) {
              self.form.coupon.push({
                coupon_id: e.params.coupon_id,
                coupon_num: 1
              });
              self.tableData.push({
                coupon_id: e.params.coupon_id,
                name: e.params.name,
                coupon_num: 1
              });
            } else {
              ElMessage.error('请勿重复添加');
            }
          }
        }
      },
      delcoupon(item) {
        let self = this;
        let n = self.tableData.indexOf(item);
        self.tableData.splice(n, 1);
        self.form.coupon.splice(n, 1);
      },
      /*提交表单*/
      onSubmit() {
        let self = this;
        let form  = JSON.parse(JSON.stringify(self.form));
        if(self.form.coupon.length<=0){
          ElMessage.error(' 至少选择一个优惠券');
        }
        self.$refs.form.validate((valid) => {
          if (valid) {
            form.coupon = JSON.stringify(form.coupon);
            self.loading = true;
            PackageApi.savePackage(form, true).then(data => {
               form.coupon = JSON.parse(form.coupon);
                if (data.code == 1) {
                  this.$ElMessage({
                    message: data.msg,
                    type: 'success'
                  });
                  self.$router.push('/plus/package/index');
                } else {
                   self.loading = true;
                }
              })
              .catch(error => {
                self.loading = true;
              });
          }
        });
      },
      /*返回上一页面*/
      gotoBack() {
        this.$router.back(-1);
      },
    }
  };
</script>
