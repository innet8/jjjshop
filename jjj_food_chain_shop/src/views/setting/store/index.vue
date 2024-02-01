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
      <el-form-item :label="$t('店铺名称')" :rules="[{required: true,message: ' '}]" prop="name">
        <el-input v-model="form.name" :placeholder="$t('商城名称')" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item :label="$t('LOGO')" :rules="[{required: true,message: ' '}]" prop="name">
        <div class="ww100">
          <el-button @click="chooseImg('logoUrl')">{{$t('选择图片')}}</el-button>
        </div>
        <img class="mt10" v-img-url="form.logoUrl" :width="100">
      </el-form-item>
      
      <el-form-item :label="$t('店铺ID')" prop="customer">
        <el-input v-model="form.shop.shop_supplier_id" disabled placeholder="" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item :label="$t('机器码')"  prop="key">
        <el-input v-model="form.shop.device_code" disabled placeholder="" class="max-w460"></el-input>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button  @click="getParams" :loading="loading">{{$t('重置')}}</el-button>
        <el-button type="primary" @click="onSubmit" :loading="loading">{{$t('保存')}}</el-button>
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
          shop:{
          },
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
            self.form.shop =  res.data.shop;
            console.log(self.form,213);
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
                this.$ElMessage({
                  message: $t('操作成功'),
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
<style scoped>
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
