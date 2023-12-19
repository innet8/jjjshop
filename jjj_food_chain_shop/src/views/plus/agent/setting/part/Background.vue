<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销-分销设置-页面背景图
      -->
  <div class="test-wrap mt30">
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <el-form-item label="分销中心首页">
        <el-button type="primary" plain icon="Upload" @click="openUpload(1)">上传图片</el-button>
        <div v-if="form.index != ''" class="img"><img :src="form.index" width="750" height="227" /></div>
        <div class="tips">尺寸：宽750像素 高度227像素</div>
      </el-form-item>
      <el-form-item label="申请成为分销商页">
        <el-button type="primary" plain icon="Upload" @click="openUpload(2)">上传图片</el-button>
        <div v-if="form.apply != ''" class="img"><img :src="form.apply" width="750" height="227" /></div>
        <div class="tips">尺寸：宽750像素 高度227像素</div>
      </el-form-item>
      <el-form-item label="申请提现页">
        <el-button type="primary" plain icon="Upload" @click="openUpload(3)">上传图片</el-button>
        <div v-if="form.cash_apply != ''" class="img"><img :src="form.cash_apply" width="750" height="227" /></div>
        <div class="tips">尺寸：宽750像素 高度227像素</div>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
    <!--上传图片组件-->
    <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">上传图片</Upload>
  </div>
</template>

<script>
import Upload from '@/components/file/Upload.vue';
import PlusApi from '@/api/plus.js';
export default {
  components: {
    Upload: Upload
  },
  data() {
    return {
      form: {
        index: '',
        apply: '',
        cash_apply: ''
      },
      /*是否上传图片*/
      isupload: false,
       /*是否正在加载*/
      loading: false,
       /*图片类别*/
      type: ''
    };
  },
  props:{
    settingData:Object
  },
  created() {
    this.form=this.settingData.data.background.values;
  },

  methods: {
    /*上传*/
    openUpload(e) {
      this.type = e;
      this.isupload = true;
    },

    /*获取图片*/
    returnImgsFunc(e) {
      if (e != null) {
        if (this.type == 1) {
          this.form.index = e[0].file_path;
        }
        if (this.type == 2) {
          this.form.apply = e[0].file_path;
        }
        if (this.type == 3) {
          this.form.cash_apply = e[0].file_path;
        }
      }
      this.isupload = false;
    },

    /*提交表单*/
    onSubmit() {
      let self = this;
      self.loading = true;
      let params = self.form;
      PlusApi.background(params, true)
        .then(data => {
          self.loading = false;
          ElMessage({
            message: '恭喜你，设置成功',
            type: 'success'
          });
        })
        .catch(error => {
          self.loading = false;
        });
    }

  }
};
</script>

<style lang="scss">
.test-wrap {
  padding: 30px;
}

.img {
  margin-top: 10px;
}

.tips {
  color: #ccc;
}
</style>
