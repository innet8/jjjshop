<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-商城设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="150px">
      <!--添加门店-->
      <div class="common-form">商城设置</div>
      <el-form-item label="商城名称" :rules="[{required: true,message: ' '}]" prop="name">
        <el-input v-model="form.name" placeholder="商城名称" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="商城LOGO" :rules="[{required: true,message: ' '}]" prop="name">
        <div class="ww100">
          <el-button @click="chooseImg('logoUrl')">选择图片</el-button>
        </div>
        <img class="mt10" v-img-url="form.logoUrl" :width="100">
      </el-form-item>
      <div class="common-form">会员设置</div>
      <el-form-item label="默认头像" :rules="[{required: true,message: '请选择默认头像'}]">
        <div class="ww100">
        <el-button @click="chooseImg('avatarUrl')">选择图片</el-button>
        </div>
        <img class="mt10" v-img-url="form.avatarUrl" :width="100">
      </el-form-item>
      <div class="common-form">h5注册设置</div>
      <el-form-item label="是否开启短信验证" prop="sms_open">
        <el-checkbox v-model="form.sms_open">是否开启短信验证</el-checkbox>
        <div class="tips">用户注册是否开启短信验证</div>
      </el-form-item>
      <el-form-item label="是否开启微信授权" prop="wx_open">
        <el-checkbox v-model="form.wx_open">是否开启微信授权</el-checkbox>
        <div class="tips">用户登录是否开启微信授权</div>
      </el-form-item>
      <div class="common-form">日志记录</div>
      <el-form-item label="是否记录查询日志" prop="is_get_log">
        <el-checkbox v-model="form.is_get_log">是否记录查询日志</el-checkbox>
        <div class="tips">如果记录，日志量会有点大</div>
      </el-form-item>
      <div class="common-form">物流查询api</div>
      <el-form-item label="快递100 Customer" prop="customer">
        <el-input v-model="form.customer" placeholder="" class="max-w460"></el-input>
        <div class="tips">用于查询物流信息,<el-link :underline="false" href="https://www.kuaidi100.com/openapi/" target="_blank"
            type="primary">快递100申请</el-link>
        </div>
      </el-form-item>
      <el-form-item label="快递100 Key" prop="key">
        <el-input v-model="form.key" placeholder="" class="max-w460"></el-input>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
    <!--上传图片-->
    <Upload v-if="isupload" :isupload="isupload" :type="type" :config="{ total: 1 }" @returnImgs="returnImgsFunc">
    </Upload>

  </div>

</template>

<script>
  import SettingApi from '@/api/setting.js';
  import Upload from '@/components/file/Upload.vue';
  import { formatModel } from '@/utils/base.js';
  import { useUserStore } from '@/store';
  const { changStore } = useUserStore();
  export default {
    components: {
      Upload
    },
    data() {
      return {
        /*是否正在加载*/
        loading: false,
        /*form表单数据*/
        form: {
          name: '',
          customer: '',
          key: '',
          sms_open: '',
          wx_open: '',
          is_get_log: 0,
          avatarUrl: '',
        },
        all_type: [],
        type: [],
        /*是否打开图片选择*/
        isupload: false
      };
    },
    created() {
      this.getParams()
    },

    methods: {

      /*获取配置数据*/
      getParams() {
        let self = this;
        SettingApi.storeDetail({}, true).then(res => {
            let vars = res.data.vars.values;
            // self.form = formatModel(self.form, vars);
            self.form = Object.assign(self.form,vars);
            self.form.customer = vars.kuaidi100.customer;
            self.form.key = vars.kuaidi100.key;
            console.log(self.form)
            self.loading = false;
          })
          .catch(error => {

          });
      },
      /*提交*/
      onSubmit() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            SettingApi.editStore(params, true)
              .then(data => {
                self.loading = false;
                ElMessage({
                  message: '恭喜你，商城设置成功',
                  type: 'success'
                });
                changStore(params);
                self.$router.push('/setting/store/index');
              })
              .catch(error => {
                self.loading = false;
              });
          }
        });
      },
      /*选择图片*/
      chooseImg(e) {
        this.type = e;
        this.isupload = true;
      },
      /*关闭选择图片*/
      returnImgsFunc(e) {
        this.isupload = false;
        if (e != null && e.length > 0) {
          if (this.type == 'avatarUrl') {
            this.form.avatarUrl = e[0].file_path;
          }else if(this.type == 'logoUrl'){
            this.form.logoUrl = e[0].file_path;
          }
        }
      }
    }

  };
</script>
<style>
  .tips {
    color: #ccc;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
