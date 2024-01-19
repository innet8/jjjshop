<template>
  <!--
      描述：活动-新客有礼
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
      <!--小票打印设置-->
      <div class="common-form">新客设置</div>
      <el-form-item label="是否开启活动">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动时间">
        <div>
        <el-date-picker v-model="form.time" type="datetimerange" align="right" unlink-panels value-format="YYYY-MM-DD"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions0">
        </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="背景图" prop="image">
        <el-row>
          <el-button type="primary" @click="openUpload">选择图片</el-button>
          <div v-if="form.image!=''" class="img">
            <img :src="form.image" width="100" height="100" />
          </div>
        </el-row>
      </el-form-item>
      <el-form-item label="赠送优惠券">
        <div>
          <el-radio-group v-model="form.is_coupon">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </div>
        <template v-if="form.is_coupon==1">
          <el-select v-model="form.coupon_ids" multiple placeholder="请选择优惠券">
            <el-option v-for="(item,index) in couponList" :key="item.coupon_id+''" :label="item.name+''"
              :value="item.coupon_id +''">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="赠送积分">
        <div>
          <el-radio-group v-model="form.is_point">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </div>
        <template v-if="form.is_point==1">
          <el-input type="text" v-model="form.points" placeholder="请输入赠送积分" class="max-w460"></el-input>
        </template>
      </el-form-item>

      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
    <!--上传图片组件-->
    <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">上传图片</Upload>
  </div>
</template>

<script>
  import NewgiftApi from '@/api/plus/newgift.js';
  import Upload from '@/components/file/Upload.vue';
  import {
    formatDate
  } from '@/utils/DateTime.js'
  export default {
    components: {
      Upload
    },
    data() {
      let endDate = new Date();
      let startDate = new Date();
      startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
      return {
        isupload: false,
        loading: true,
        form: {
          time: [formatDate(startDate, 'yyyy-MM-dd'), formatDate(endDate, 'yyyy-MM-dd')],
          is_point: 0,
          points: '',
          is_coupon: 0,
          coupon_ids: [],
          image: '',
          status: 0,
        },
        couponList: [],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
          }
        }
      };
    },
    created() {
      this.getData();
    },

    methods: {
      getData() {
        let self = this;
        self.loading = true;
        NewgiftApi.getNewgift({}, true)
          .then(data => {
            if (data.data.detail) {
              self.form = data.data.detail;
            }
            self.couponList = data.data.list;
            self.loading = false;
          })
          .catch(error => {});
      },
      //提交表单
      onSubmit() {
        let self = this;
        let params = this.form;

        if (params.coupon_ids.length <= 0) {
          params.coupon_ids = ''
        }
        NewgiftApi.editNewgift(params, true)
          .then(data => {
            ElMessage({
              message: data.msg,
              type: 'success'
            });
          })
          .catch(error => {});
      },
      /*上传*/
      openUpload(e) {
        this.type = e;
        this.isupload = true;
      },
      /*获取图片*/
      returnImgsFunc(e) {
        if (e != null && e.length > 0) {
          this.form.image = e[0].file_path;
        }
        this.isupload = false;
      },

    }

  };
</script>

<style>
  .tips {
    color: #ccc;
  }

  .img {
    margin-top: 10px;
  }
</style>
