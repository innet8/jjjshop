<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-分销-分销海报
      -->
  <div class="">
    <!--基本信息-->
    <div class="common-form">分销海报设置</div>
    <div class="poster-box d-s-s" v-loading="loading">
      <div class="left-box">
        <div v-if="form.backdrop" class="img"><img v-img-url="form.backdrop.src" /></div>
        <div class="userinfo">
          <div
            class="photo pa"
            v-drag="{type:'photo',obj:curObj}"
            :class="{ radius: form.avatar.style == 'circle' }"
            :style="'width:' + form.avatar.width + 'px;height:' + form.avatar.width + 'px;top:' + form.avatar.top + 'px;left:' + form.avatar.left + 'px;'"
          >
            <span class="icon iconfont icon-yonghu"></span>
          </div>
          <div
            class="name pa"
             v-drag="{type:'name',obj:curObj}"
            :style="'font-size:' + form.nickName.fontSize + 'px;color:' + form.nickName.color + ';top:' + form.nickName.top + 'px;left:' + form.nickName.left + 'px;'"
          >
            昵称
          </div>
          <div
            class="code pa"
            v-drag="{type:'code',obj:curObj}"
            :class="{ radius: form.qrcode.style == 'circle' }"
            :style="'width:' + form.qrcode.width + 'px;height:' + form.qrcode.width + 'px;top:' + form.qrcode.top + 'px;left:' + form.qrcode.left + 'px;'"
          >
            <img src="../../../../assets/img/qrcode.png" alt="" />
          </div>
        </div>
      </div>
      <div class="right-box flex-1">
        <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
          <el-form-item label="海报背景图">
            <el-button type="primary" @click="openUpload(1)">上传图片</el-button>
            <div class="tips">尺寸：宽750像素 高大于(等于)1200像素</div>
          </el-form-item>
          <el-form-item label="头像宽度" prop="avatar.width" :rules="[{ required: true, message: ' ' }]">
            <el-input v-model="form.avatar.width" min="30" type="number" class="max-w460"></el-input>
          </el-form-item>
          <el-form-item label="头像样式">
            <el-radio v-model="form.avatar.style" label="square">正方形</el-radio>
            <el-radio v-model="form.avatar.style" label="circle">圆形</el-radio>
          </el-form-item>
          <el-form-item label="昵称字体大小" prop="nickName.fontSize" :rules="[{ required: true, message: ' ' }]">
            <el-input v-model="form.nickName.fontSize" min="12" type="number" class="max-w460"></el-input>
          </el-form-item>
          <el-form-item label="昵称字体颜色">
            <div class="d-s-c">
              <el-color-picker v-model="form.nickName.color"></el-color-picker>
              <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(form.nickName, 'color', '#ffffff')">重置</el-button>
            </div>
          </el-form-item>
          <el-form-item label="小程序码宽度 " prop="qrcode.width" :rules="[{ required: true, message: ' ' }]">
            <el-input v-model="form.qrcode.width" min="50" type="number" class="max-w460"></el-input>
          </el-form-item>
          <el-form-item label="小程序码样式 ">
            <el-radio v-model="form.qrcode.style" label="square">正方形</el-radio>
            <el-radio v-model="form.qrcode.style" label="circle">圆形</el-radio>
          </el-form-item>
          <!--提交-->
          <div class="common-button-wrapper"><el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button></div>
        </el-form>
      </div>
    </div>
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
        nickName: {
          fontSize: 20,
          color:'',
          left:0,
          top:0
        },
        avatar: {
          width: 30,
          style: 'square',
          left:0,
          top:0
        },
        qrcode: {
          width: 50,
          style: 'square',
          left:0,
          top:0
        },
        backdrop: {
          src: ''
        }
      },
      /**/
      loading: true,
      /*是否上传图片*/
      isupload: false,
      /*当前对象*/
      curObj:this
    };
  },
  created() {
    /*获取数据*/
    this.getData();
  },
  directives: {
    /*拖动指令*/
    drag: {
        mounted(el,binding){
        let self = this;
        el.onmousedown = function(event) {
          event = event || window.event;
          let diffX = event.clientX - el.offsetLeft;
          let diffY = event.clientY - el.offsetTop;

          /*鼠标移动*/
          document.onmousemove = function(event) {
            event = event || window.event;
            let moveX = event.clientX - diffX;
            let moveY = event.clientY - diffY;
            binding.value.obj.dragDiv(moveX,moveY,binding.value.type);
          };

          /*鼠标弹起*/
          document.onmouseup = function(event) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  methods: {
    /*拖动赋值*/
    dragDiv(x, y,type) {
      if(x<0){
        x=0;
      }
      if(y<0){
        y=0;
      }
      if(type=='photo'){
        this.form.avatar.left=x;
        this.form.avatar.top=y;
      }else if(type=='code'){
        this.form.qrcode.left=x;
        this.form.qrcode.top=y;
      }else if(type=='name'){
        this.form.nickName.left=x;
        this.form.nickName.top=y;
      }

    },

    /*上传*/
    openUpload(e) {
      this.type = e;
      this.isupload = true;
    },

    /*获取图片*/
    returnImgsFunc(e) {
      if (e != null) {
        if (this.type == 1) {
          this.form.backdrop.src = e[0].file_path;
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

    /*获取数据*/
    getData() {
      let self = this;
      PlusApi.GetBackground({}, true)
        .then(data => {
          self.form = data.data.data;
          self.loading=false;
        })
        .catch(error => {});
    },

    //提交表单
    onSubmit() {
      let self = this;
      let form = self.form;
      self.$refs.form.validate(valid => {
        if (valid) {
          self.loading = true;
          PlusApi.SaveBackground(
            {
              form
            },
            true
          )
            .then(data => {
              self.loading = false;
              this.$ElMessage({
                message: $t('保存成功'),
                type: 'success'
              });
              self.getData();
            })
            .catch(error => {
              self.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.poster-box .left-box {
  position: relative;
  width: 375px;
  min-height: 640px;
  overflow: hidden;
  margin: 0 30px;
  border: 1px solid #cccccc;
  border-radius: 18px;
}
.poster-box .left-box .userinfo {
  position: absolute;
  top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.poster-box .left-box .userinfo .photo {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #ffffff;
  cursor: pointer;
}
.poster-box .left-box .userinfo .photo .svg-icon {
  width: 80%;
  height: 80%;
  font-size: 60px;
  color: #3a8ee6;
}
.poster-box .left-box .userinfo .photo img {
  width: 80%;
  height: 80%;
}
.poster-box .left-box img {
  width: 100%;
}
.poster-box .left-box .userinfo .name {
  min-height: 30px;
  line-height: 100%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.poster-box .left-box .userinfo .code {
  cursor: pointer;
  overflow: hidden;
}
.poster-box .left-box .userinfo .code img {
  width: 100%;
  height: 100%;
}
</style>
