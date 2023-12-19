<template>
  <!--
    	作者：wangxw
    	时间：2019-11-05
    	描述：diy组件 搜索栏
    -->
    <div @click.stop="$parent.$parent.onEditer(index)" class="drag optional" :class="{selected: index === selectedIndex}">
      <div class="diy-coupon" :style="{background:item.style.background,padding: item.style.paddingTop+'px '+' 0'}">
        <div :key="index" v-for="(coupon,index) in item.data" class="coupon-wrapper">
          <div class="coupon-item" :style="{background:coupon.color}">
            <i class="before" :style="{background:item.style.background}"></i>
            <div :style="{background:coupon.color}" class="left-content">
              <div class="content-top">
                <span class="unit">￥</span>
                <span class="price">{{ coupon.reduce_price }}</span>
              </div>
              <div class="content-bottom">
                <span>满{{ coupon.min_price }}元可用</span>
              </div>
            </div>
            <div class="right-receive">
              <span>立即领取</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-edit-del">
        <div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    props: ['item', 'index', 'selectedIndex'],
    methods: {

    }
  };
</script>

<style>
.diy-coupon{ display: flex;}
.diy-coupon .coupon-wrapper{ flex: 1; padding: 10px;}
.diy-coupon .coupon-wrapper .coupon-item{ display: flex; border-radius: 4px; overflow: hidden;}
.diy-coupon .coupon-wrapper .left-content{ padding: 10px; box-sizing: border-box; flex: 1; color: #FFFFFF;}
.diy-coupon .coupon-wrapper .left-content .price{ font-size: 20px; font-weight: bold;}
.diy-coupon .coupon-wrapper .content-top{}
.diy-coupon .coupon-wrapper .right-receive{ padding: 5px 0; width: 20px; line-height: 14px; text-align: center; color: #FFF5D4; background: #222222;}
</style>
