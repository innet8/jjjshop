<template>
  <!--
    	作者：luoyiming
    	时间：2019-10-24
    	描述：后台系统首页
    -->
  <div>
    <Home v-if="activeName=='home'" @close='changeName'></Home>
    <Cart v-if="activeName=='cart'" :type="type" :model='model' @close='changeName'></Cart>
  </div>

</template>

<script>
  import Home from './home/index.vue';
  import Cart from './cart/index.vue';
  export default {
    components: {
      Home,
      Cart
    },
    data() {
      return {
        activeName: 'home',
        model: {
          min_num: 0,
          max_num: 0,
        },
        type: ''
      };
    },
    computed: {

    },
    created() {},
    methods: {
      changeName(name, e) {
        if (name == 'tableBuy') {
          this.activeName = 'cart';
          this.type = name;
        } else if (name == 'addMeal') {
          this.activeName = 'cart';
          this.type = name;
        } else {
          this.activeName = name;
        }
        console.log(this.type)
        this.model = e;
      }
    }
  }
</script>

<style lang="scss">
</style>
