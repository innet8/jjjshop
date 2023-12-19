<template>
  <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：门店-店员列表-添加店员
    -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <!--添加店员-->
      <div class="common-form">基本信息</div>
      <el-form-item label="门店名称" prop="supplier.name" :rules="[{required: true,message: ' '}]">
        <el-input class="max-w460" v-model="form.supplier.name" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="supplier.user_name" :rules="[{required: true,message: ' '}]">
        <el-input class="max-w460" v-model="form.supplier.user_name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="supplier.password" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.supplier.password" placeholder="请输入登录密码" type="password" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="supplier.confirm_password" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.supplier.confirm_password" placeholder="请输入确认密码" type="password" class="max-w460">
        </el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="supplier.link_name" :rules="[{required: true,message: ' '}]">
        <el-input class="max-w460" v-model="form.supplier.link_name" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="supplier.link_phone" :rules="[{required: true,message: ' '}]">
        <el-input class="max-w460" v-model="form.supplier.link_phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="店铺类型">
        <el-radio-group v-model="form.supplier.store_type">
          <el-radio :label="10">分店</el-radio>
          <el-radio :label="20">直营</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-radio-group v-model="form.supplier.category_set">
          <el-radio :label="10">同步主店</el-radio>
          <el-radio :label="20">分店创建</el-radio>
        </el-radio-group>
        <div class="tips">温馨提示：选择后，请勿随意修改，以免造成门店商品数据错乱</div>
      </el-form-item>
      <el-form-item label="绑定用户">
        <el-row>
          <el-button icon="Picture" @click="userClick()">选择用户</el-button>
          <div v-if="form.supplier.user_id!=0" class="img">
            <span>用户昵称：{{user_info.nickName}}</span>
            <img :src="user_info.avatarUrl" width="100" height="100" />
          </div>
        </el-row>
      </el-form-item>
         <el-form-item label="门店logo">
        <el-row>
          <el-button icon="Picture" @click="openUpload('logo')">选择图片</el-button>
          <div v-if="form.supplier.logo!=''" class="img">
            <img :src="form.supplier.logo" width="100" height="100" />
          </div>
        </el-row>
      </el-form-item>
      <el-form-item label="所属区域" prop="supplier.region_id" :rules="[{required: true,message: ' '}]">
        <el-select v-model="form.supplier.province_id" placeholder="省" @change="initCity">
          <el-option :label="item.name" :value="item.id" v-for="(item,index) in areaList" :key='index'></el-option>
        </el-select>
        <el-select v-if="form.supplier.province_id!=''" v-model="form.supplier.city_id" placeholder="市"
          @change="initRegion">
          <el-option :label="item1.name" :value="item1.id"
            v-for="(item1,index1) in areaList[form.supplier.province_id]['city']" :key='index1'></el-option>
        </el-select>
        <el-select v-if="form.supplier.city_id!=''" v-model="form.supplier.region_id" placeholder="区">
          <el-option :label="item2.name" :value="item2.id"
            v-for="(item2,index2) in areaList[form.supplier.province_id]['city'][form.supplier.city_id]['region']"
            :key='index2'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="supplier.address" :rules="[{required: true,message: ' '}]">
        <el-input class="max-w460" v-model="form.supplier.address" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="门店坐标" prop="supplier.coordinate" :rules="[{required: true,message: ' '}]">
       <el-input disabled v-model="form.supplier.coordinate" class="max-w460"></el-input>
       <div class="ww100 mt16">
       	<Getpoint :form="form" @getMapdata="getMapdataFunc" @chose="choseFunc"></Getpoint>
       </div>
      </el-form-item>
      <el-form-item label="商家介绍" prop="supplier.description">
        <el-input rows="6" type="textarea" v-model="form.supplier.description" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.supplier.is_recycle">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">禁止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="营业状态">
        <el-radio-group v-model="form.supplier.status">
          <el-radio :label="0">营业中</el-radio>
          <el-radio :label="1">停止营业</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
    <!--上传图片组件-->
    <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">上传图片</Upload>
    <!--管理用户-->
    <GetUser :is_open="open_user" @close="closeDialogFunc($event, 'add')"></GetUser>
  </div>
</template>

<script>
  import SupplierApi from '@/api/supplier.js';
  import select_region from '@/utils/select.region.js';
  import GetUser from '@/components/user/GetUser.vue';
  import Getpoint from '@/components/map/Getpoint.vue';
  import Upload from '@/components/file/Upload.vue';
  export default {
    components: {
      /*上传组件*/
      Upload,
      /*选择用户*/
      GetUser,
      Getpoint
    },
    data() {
      return {
        /*form表单数据*/
        form: {
          supplier: {
            logo: '',
            business_id: 0,
            user_id: 0,
            store_type: 10,
            address: '',
            coordinate: '',
            province_id: '',
            city_id: '',
            region_id: '',
            is_recycle: 0,
            status: 0,
            category_set: 10
          },
        },
        loading: false,
        open_user: false,
        user_info: {},
        /*省市区*/
        areaList: select_region,
        /*是否上传图片*/
        isupload: false,
        type: 'logo',
      };
    },
    created() {
      console.log(this.areaList)
    },
    methods: {
      onSubmit() {
        let self = this;
        let form = self.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            SupplierApi.addSupplier(form, true)
              .then(data => {
                self.loading = false;
                if (data.code == 1) {
                  ElMessage({
                    message: '恭喜你，门店添加成功',
                    type: 'success'
                  });
                  self.$router.push('/supplier/supplier/index');
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
      /*取消*/
      cancelFunc() {
        this.$router.back(-1);
      },
      /*打开弹出层*/
      userClick() {
        this.open_user = true;
      },
      /*上传*/
      openUpload(e) {
        this.type = e;
        this.isupload = true;
      },

      /*获取图片*/
      returnImgsFunc(e) {
        if (e != null && e.length > 0) {
          if (this.type == 'logo') {
            this.form.supplier.logo = e[0].file_path;
          }
        }
        this.isupload = false;
      },
      /*关闭获取用户弹窗*/
      closeDialogFunc(e) {
        if (e && e.type != 'error') {
          this.user_info = e.params[0];
          this.form.supplier.user_id = e.params[0].user_id;
        }
        this.open_user = false;
      },
      /*获取经纬度*/
      getMapdataFunc(e) {
        this.form.supplier.coordinate = e.data[0].toFixed(6) + ',' + e.data[1].toFixed(6);
      },
      /*选择的地址*/
      choseFunc(e) {
        this.form.supplier.coordinate = e.location.lat + ',' + e.location.lng;
        this.form.supplier.address = e.address;
      },
      /*初始化城市id*/
      initCity() {
        this.form.supplier.city_id = ''
      },

      /*初始化区id*/
      initRegion() {
        this.form.supplier.region_id = ''
      },
    }

  };
</script>

<style lang="scss" scoped>
  .tips {
    color: #FF0000;
  }

  .basic-setting-content {}

  .product-add {
    padding-bottom: 50px;
  }

  .img {
    margin-top: 10px;
  }
</style>
