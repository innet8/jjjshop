<template>
  <!--
      	作者：luoyiming
      	时间：2019-12-25
      	描述：插件中心-文章
      -->
  <div class="user">
    <div class="common-seach-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="资讯管理" name="article">
          <Articleindex v-if="activeName=='article'"></Articleindex>
        </el-tab-pane>
        <el-tab-pane label="分类管理" name="category">
          <Categoryindex v-if="activeName=='category'"></Categoryindex>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import Articleindex from './article/Index.vue';
  import Categoryindex from './category/Index.vue';
  export default {
    components: {
      Articleindex,
      Categoryindex,
    },
    data() {
      return {
        activeName: 'article',
        /*是否加载完成*/
        loading: true,
      }
    },
    created() {


    },
    methods: {}
  }
</script>
