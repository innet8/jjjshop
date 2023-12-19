<template>
  <!--
      作者：luoyiming
      时间：2020-06-01
      描述：插件中心-团购-添加
    -->
  <div class="product-add pb50">
    <!--添加团购-->
    <el-form-item label="购买须知">
      <div class="edit_container">
        <Uediter :text="form.notice" :config="ueditor.config" editorId="notice" @contentChange="contentChangeFunc"></Uediter>
      </div>
    </el-form-item>
  </div>
</template>

<script>
  import Uediter from '@/components/UE.vue';
  export default {
    components: {
      /*编辑器*/
      Uediter,
    },
    data() {
      return {
        /*富文本配置*/
        ueditor: {
          text: '',
          config: {
            initialFrameWidth: 400,
            initialFrameHeight: 500
          }
        },
      };
    },
    inject: ['form'],
    methods: {
      /*获取富文本内容*/
      contentChangeFunc(e) {
        this.form.notice = e;
      },
    }
  };
</script>

<style>
  .edit_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .ql-editor {
    height: 400px;
  }

</style>