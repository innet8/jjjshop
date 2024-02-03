<template>
  <div class="user">
    <div class="common-form">新增活动会场</div>
    <div class="product-content">
      <el-form ref="form" :model="form" label-position="top" :rules="formRules" label-width="150px">
        <el-form-item label="活动标题" prop="name" :rules="[{required: true,message: ' '}]">
          <el-input type="text" v-model="form.name" placeholder="请输入活动标题" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="背景图" prop="image_id">
          <el-row>
            <el-button type="primary" @click="openUpload('image')">选择图片</el-button>
            <div v-if="form.image_id!=''" class="img">
              <img :src="file_path" width="100" height="100" />
            </div>
          </el-row>
        </el-form-item>
        <el-form-item label="分享标题" prop="share_title" :rules="[{required: true,message: ' '}]">
          <el-input type="text" v-model="form.share_title" placeholder="请输入分享标题" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="分享内容" prop="share_desc" :rules="[{required: true,message: ' '}]">
          <el-input type="text" v-model="form.share_desc" placeholder="请输入分享内容" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="分享图" prop="share_image_id">
          <el-row>
            <el-button type="primary" @click="openUpload('share')">选择图片</el-button>
            <div v-if="form.share_image_id!=''" class="img">
              <img :src="share_file_path" width="100" height="100" />
            </div>
          </el-row>
        </el-form-item>
        <el-form-item label="活动日期" prop="value1" :rules="[{required: true,message: ' '}]">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="form.value1" type="datetimerange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="个人中心状态">
          <div>
            <el-radio v-model="form.is_show" :label="1">显示</el-radio>
            <el-radio v-model="form.is_show" :label="0">隐藏</el-radio>
          </div>
        </el-form-item>
        <div class="common-form">邀请成功的条件</div>
        <el-form-item label="邀请成功的条件 ">
          <el-radio v-model="form.inv_condition" label="0">邀请成为会员</el-radio>
          <el-radio v-model="form.inv_condition" label="1">邀请成为会员且消费</el-radio>
        </el-form-item>
        <div class="common-form">礼品设置</div>
        <div v-for="(item, reward_index) in rewardData" :key="reward_index" class="mt16">
          <div>
            <span style="font-weight: 900;">奖项{{reward_index+1}}:</span>
            <span>每邀请</span>
            <el-input type="number" v-model="item.invitation_num" size="" style="width: 100px;"></el-input>
            <span>人获得礼品</span>
            <el-checkbox v-model="item.is_point" class="pl16">积分</el-checkbox>
            <el-input type="number" v-model="item.point" size="" style="width: 100px;"></el-input>
            <el-checkbox v-model="item.is_coupon" class="pl16">优惠券</el-checkbox>
            <el-input type="text" v-model="item.coupon_name" size="" disabled="true" style="width: 200px;"></el-input>
            <el-button type="primary" size="" @click="addCoupon(reward_index)">选择优惠券</el-button>
            <el-link type="primary" @click="delReward(reward_index)" style="float:right;">删除</el-link>
          </div>
        </div>
        <div style="padding:10px 20px 20px 40px;">
          <el-link type="primary" @click="addInv">添加奖励项</el-link>
        </div>
      </el-form>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button  @click="gotoBack">返回</el-button>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </div>
    <!--上传图片组件-->
    <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">上传图片</Upload>
    <!--选择优惠券-->
    <GetCoupon v-if="open_add" :open_add="open_add" @closeDialog="closeProductDialogFunc($event)">选择优惠券弹出层
    </GetCoupon>
  </div>
</template>
<script>
  import InvitationGiftApi from '@/api/invitationgift.js';
  import GetCoupon from '@/components/coupon/GetCoupon.vue';
  import Upload from '@/components/file/Upload.vue';
  export default {
    components: {
      /*选择优惠券件*/
      GetCoupon,
      Upload
    },
    data() {
      return {
        form: {
          name: '',
          inv_condition: '0',
          value1: [],
          image_id: '',
          is_show: 1,
          share_image_id: '',
          share_title: '',
          share_desc: ''
        },
        /*优惠券*/
        tableData: [],
        loading: false,
        open_add: false,
        /*奖励列表*/
        rewardData: [],
        coupon_index: 0,
        file_path: '',
        /*是否打开图片选择*/
        isupload: false,
        share_file_path: '',
        formRules: {
          image_id: [{
            required: true,
            message: '请上传背景图',
            trigger: 'blur'
          }],
          share_image_id: [{
            required: true,
            message: '请上传分享图',
            trigger: 'blur'
          }],
        },
      };
    },
    created() {
      /*获取数据*/
      this.getData();
    },
    methods: {
      /*获取数据*/
      getData() {
        let self = this;
        let invitation_gift_id = self.$route.query.invitation_gift_id;
        InvitationGiftApi.getInvitation({
            invitation_gift_id: invitation_gift_id
          }, true).then(data => {
            self.form = data.data.data;
            self.rewardData = data.data.data.Reward;
            self.file_path = data.data.data.file_path;
            self.share_file_path = data.data.data.share.file_path;
          })
          .catch(error => {
            self.loading = false;
          });

      },
      /*添加奖励*/
      addInv() {
        let obj = {
          invitation_num: 1,
          is_coupon: false,
          point: 0,
          is_point: false,
          coupon_ids: '',
          coupon_name: '',
        }
        this.rewardData.push(obj);
      },
      /*添加优惠券*/
      addCoupon(reward_index) {
        this.open_add = true;
        this.coupon_index = reward_index;
      },

      /*关闭优惠券*/
      closeProductDialogFunc(e) {
        let self = this;
        let index = self.coupon_index;
        self.open_add = e.openDialog;
        let n = self.rewardData[index].coupon_name.indexOf(e.params.name);
        if (n == -1) {
          self.rewardData[index].coupon_ids += e.params.coupon_id + ',';
          if (self.rewardData[index].coupon_name == '') {
            self.rewardData[index].coupon_name += e.params.name;
          } else {
            self.rewardData[index].coupon_name += ',' + e.params.name;
          }
        } else {
          ElMessage.error('请勿重复添加');
        }
      },
      /*提交表单*/
      onSubmit() {
        let self = this;
        if(self.rewardData.length == 0){
          ElMessage.error('请添加奖项');
          return;
        }
        let form = self.form;
        form.reward_data = self.rewardData;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            InvitationGiftApi.editInvitation(form, true).then(data => {
                self.loading = false;
                if (data.code == 1) {
                  this.$ElMessage({
                    message: data.msg,
                    type: 'success'
                  });
                  self.$router.push('/plus/invitation/index');
                } else {
                  self.loading = false;
                }
              })
              .catch(error => {
                self.loading = false;
              });
          }
        });
      },
      /*返回上一页面*/
      gotoBack() {
        this.$router.back(-1);
      },
      /*上传*/
      openUpload(e) {
        this.type = e;
        this.isupload = true;
      },
      /*获取图片*/
      returnImgsFunc(e) {
        if (e != null && e.length > 0) {
          if (this.type == "image") {
            this.file_path = e[0].file_path;
            this.form.image_id = e[0].file_id;
          } else if (this.type == "share") {
            this.share_file_path = e[0].file_path;
            this.form.share_image_id = e[0].file_id;
          }
        }
        this.isupload = false;
      },
      delReward(index) {
        this.rewardData.splice(index, 1);
      },
    }
  };
</script>
