<template>
  <!--
      作者 wangxw
      时间：2021-01-14
      描述：设置-商城设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form ref="form" :model="form" label-width="150px">
      <div class="common-form">商城后台设置</div>
      <el-form-item label="商城系统名称" :rules="[{required: true,message: ' '}]" prop="shop_name">
        <el-input v-model="form.shop_name" placeholder="商城名称" class="max-w460"></el-input>
        <div class="tips">
          shop端商城名称，显示在登录页
        </div>
      </el-form-item>
      <el-form-item label="商城登录背景" prop="shop_bg_img">
        <el-input v-model="form.shop_bg_img" placeholder="商城登录背景" class="max-w460"></el-input>
        <div class="tips">
          shop端商城登录背景，不填则为系统默认登录背景，填写网络地址
        </div>
      </el-form-item>
      <el-form-item label="商城登录logo" prop="shop_logo_img">
        <el-input v-model="form.shop_logo_img" placeholder="商城登录logo" class="max-w460"></el-input>
        <div class="tips">
          shop端商城登录logo，不填则为系统默认登录logo，填写网络地址
        </div>
      </el-form-item>
      <el-form-item label="收银台系统名称" :rules="[{required: true,message: ' '}]" prop="cashier_name">
        <el-input v-model="form.cashier_name" placeholder="收银台名称" class="max-w460"></el-input>
        <div class="tips">
          收银台名称，显示在登录页
        </div>
      </el-form-item>
      <el-form-item label="收银台登录背景" prop="cashier_bg_img">
        <el-input v-model="form.cashier_bg_img" placeholder="收银台登录背景" class="max-w460"></el-input>
        <div class="tips">
          收银台登录背景，不填则为系统默认登录背景，填写网络地址
        </div>
      </el-form-item>
      <div class="common-form">微信服务商支付设置</div>
      <el-form-item label="是否开启服务商支付">
        <div>
          <el-radio v-model="form.weixin_service.is_open" :label="1">开启</el-radio>
          <el-radio v-model="form.weixin_service.is_open" :label="0">关闭</el-radio>
        </div>
      </el-form-item>
      <template v-if="form.weixin_service.is_open == 1">
        <el-form-item label="服务商户号" :rules="[{required: true,message: ' '}]" prop="weixin_service.mch_id">
          <el-input v-model="form.weixin_service.mch_id" placeholder="服务商户号" class="max-w460"></el-input>
          <div class="tips">
            填写服务商户号、10位数字
          </div>
        </el-form-item>
        <el-form-item label="服务商支付秘钥apikey" :rules="[{required: true,message: ' '}]" prop="weixin_service.apikey">
          <el-input v-model="form.weixin_service.apikey" placeholder="服务商支付秘钥apikey" class="max-w460"></el-input>
          <div class="tips">
            填写服务商户支付秘钥apikey
          </div>
        </el-form-item>
        <el-form-item label="服务商appid" :rules="[{required: true,message: ' '}]" prop="weixin_service.app_id">
          <el-input v-model="form.weixin_service.app_id" placeholder="服务商appid" class="max-w460"></el-input>
          <div class="tips">
            填写服务商户号绑定的公众号appid
          </div>
        </el-form-item>
        <el-form-item label="apiclient_cert.pem" :rules="[{required: true,message: ' '}]" prop="weixin_service.cert_pem">
          <el-input type="textarea" :rows="4" placeholder="使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来"
            v-model="form.weixin_service.cert_pem" class="max-w460"></el-input>
          <div class="tips">使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来</div>
        </el-form-item>
        <el-form-item label="apiclient_key.pem" :rules="[{required: true,message: ' '}]" prop="weixin_service.key_pem">
          <el-input type="textarea" :rows="4" placeholder="使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来"
            v-model="form.weixin_service.key_pem" class="max-w460"></el-input>
          <div class="tips">使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来</div>
        </el-form-item>
      </template>
      <!--提交-->
      <div class="button-wrapper">
        <el-button  type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import SettingApi from '@/api/setting.js';
  export default {
    data() {
      return {
        /*是否正在加载*/
        loading: false,
        /*form表单数据*/
        form: {
          shop_name: '',
          shop_bg_img: '',
          shop_logo_img: '',
          cashier_name: '',
          cashier_bg_img: '',
          weixin_service: {
            is_open: 0,
            app_id: '',
            mch_id: '',
            apikey: '',
            cert_pem: '',
            key_pem: ''
          }
        },

      };
    },
    created() {
      this.getParams()
    },

    methods: {

      /*获取配置数据*/
      getParams() {
        let self = this;
        SettingApi.serviceDetail({}, true).then(res => {
            self.form.shop_name = res.data.vars.values.shop_name;
            self.form.shop_bg_img = res.data.vars.values.shop_bg_img;
            self.form.shop_logo_img = res.data.vars.values.shop_logo_img;
            self.form.cashier_name = res.data.vars.values.cashier_name;
            self.form.cashier_bg_img = res.data.vars.values.cashier_bg_img;
            if (res.data.vars.values.weixin_service) {
              self.form.weixin_service = res.data.vars.values.weixin_service;
              self.form.weixin_service.is_open = parseInt(self.form.weixin_service.is_open);
            }
            self.loading = false;
          })
          .catch(error => {
            self.loading = false;
          });

      },
      /*提交*/
      onSubmit() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            SettingApi.editService(params, true)
              .then(data => {
                self.loading = false;
                ElMessage({
                  message: '恭喜你，设置成功',
                  type: 'success'
                });
                self.$router.push('/setting/Index');
              })
              .catch(error => {
                self.loading = false;
              });
          }
        });
      },
    }
  };
</script>
<style>
  .tips {
    color: #ccc;
    width: 100%;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .button-wrapper {
    display: flex;
  }
</style>
