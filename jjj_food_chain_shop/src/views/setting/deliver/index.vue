<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-配送方式设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <!--配送方式设置-->
      <div class="common-form">配送方式设置</div>
      <el-form-item label="配送方式">
        <div>
          <el-radio v-model="form.radio" label="local" @change="getRadio">商家配送</el-radio>
          <el-radio v-model="form.radio" label="dada" @change="getRadio">达达配送</el-radio>
          <el-radio v-model="form.radio" label="driver" @change="getRadio">配送员</el-radio>
          <el-radio v-model="form.radio" label="meituan" @change="getRadio">美团配送</el-radio>
          <el-radio v-model="form.radio" label="uu" @change="getRadio">UU跑腿</el-radio>
        </div>
      </el-form-item>
      <div v-if="form.radio == 'local'">
        <el-form-item label="自动配送时间(分钟)">
          <el-input v-model="form.engine.local.time" class="max-w460"></el-input>
          <div class="tips">设置0不自动配送，下单后未配送，设置时间后自动操作配送</div>
        </el-form-item>
      </div>
      <!--达达-->
      <div v-if="form.radio == 'dada'">
        <el-form-item label="app_key">
          <el-input v-model="form.engine.dada.app_key" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="app_secret">
          <el-input v-model="form.engine.dada.app_secret" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="商户编号">
          <el-input v-model="form.engine.dada.source_id" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="门店编号">
          <el-input v-model="form.engine.dada.shop_no" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="环境">
          <el-radio-group v-model="form.engine.dada.online">
            <el-radio :label="'0'">测试环境</el-radio>
            <el-radio :label="'1'">正式环境</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <!--美团-->
      <div v-if="form.radio == 'meituan'">
        <el-form-item label="app_key">
          <el-input v-model="form.engine.meituan.app_key" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="app_secret">
          <el-input v-model="form.engine.meituan.app_secret" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="门店id">
          <el-input v-model="form.engine.meituan.shop_id" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="回调地址">
          <el-input v-model="form.engine.meituan.call_back" class="max-w460" readonly="true"></el-input>
        </el-form-item>
      </div>
      <!--蜂鸟即配-->
      <div v-if="form.radio == 'uu'">
        <el-form-item label="app_id">
          <el-input v-model="form.engine.uu.app_id" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="app_key">
          <el-input v-model="form.engine.uu.app_key" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="openid">
          <el-input v-model="form.engine.uu.openid" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="运营城市">
          <el-input v-model="form.engine.uu.city_name" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="环境">
          <el-radio-group v-model="form.engine.uu.online">
            <el-radio :label="'0'">测试环境</el-radio>
            <el-radio :label="'1'">正式环境</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import SettingApi from '@/api/setting.js';

  export default {
    data() {
      return {
        /*切换菜单*/
        // activeIndex: '1',
        /*form表单数据*/
        form: {
          radio: 'local',
          engine: {
            dada: {
              app_key: '',
              app_secret: '',
              source_id: '',
              shop_no: '',
              online: '0',
            },
            meituan: {
              app_key: '',
              app_secret: '',
              shop_id: '',
              call_back: '',
            },
            uu: {
              app_id: '',
              app_key: '',
              openid: '',
              city_name: '',
              online: '0',
            },
            local: {
              time: '',
            },
          }
        },
        loading: false
      };
    },
    created() {
      this.getData();
    },

    methods: {
      getData() {
        let self = this;
        SettingApi.deliverDetail({}, true)
          .then(data => {
            let vars = data.data.vars.values;
            self.form.radio = vars.default;
            self.form.engine.dada = vars.engine.dada;
            self.form.engine.local = vars.engine.local;
            self.form.engine.meituan = vars.engine.meituan;
            self.form.engine.uu = vars.engine.uu;
          })
          .catch(error => {});
      },
      //提交表单
      onSubmit() {
        let self = this;
        self.loading = true;
        let params = this.form;
        SettingApi.editDeliver(params, true)
          .then(data => {
            self.loading = false;
            ElMessage({
              message: '恭喜你，上传设置成功',
              type: 'success'
            });
          })
          .catch(error => {
            self.loading = false;
          });
      },
      //监听单选按钮
      getRadio(val) {}
    }
  };
</script>

<style>
  .tips {
    color: #ccc;
  }
</style>
