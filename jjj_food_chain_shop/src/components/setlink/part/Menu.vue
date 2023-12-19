<template>
  <!--
        作者：luoyiming
        时间：2020-06-08
        描述：超链接选择-页面
    -->
    <el-select v-model="activePage" placeholder="请选择" class="percent-w100" @change="changeFunc" value-key="url">
        <el-option v-for="item in pages" :key="item.url" :value-key="item.name" :label="item.name" :value="item"></el-option>
    </el-select>
</template>

<script>
    export default{
        data(){
            return {
                /*页面数据*/
                pages: [
                    {
                        url: '/pages/user/address/address',
                        name: '收货地址',
                        type: '菜单'
                    },{
                        url: '/pages/coupon/coupon',
                        name: '领券中心',
                        type: '菜单',
                    },
                    {
                        url: '/pages/user/my-coupon/my-coupon',
                        name: '我的优惠券',
                        type: '菜单',
                    },{
                        url: '/pages/plus/birthgift/birthgift',
                        name: '生日有礼',
                        type: '菜单',
                    },
                    {
                        url: '/pages/plus/newgifts/newgifts',
                        name: '新客有礼',
                        type: '菜单',
                    },{
                        url: '/pages/plus/points/list/list',
                        name: '积分商城',
                        type: '菜单',
                    },{
                        url: '/pages/plus/signin/signin',
                        name: '签到',
                        type: '菜单',
                    },{
                        url: '/pages/order/package',
                        name: '券包',
                        type: '菜单',
                    },{
                        url: '/pages/plus/rider/rider',
                        name: '骑手大厅',
                        type: '菜单',
                        sys_tag:'driver'
                    },{
                        url: '/pages/plus/invite/invite',
                        name: '邀请有礼',
                        type: '菜单',
                    },{
                        url: '/pages/agent/index/index',
                        name: '分销中心',
                        type: '菜单',
                    }, {
                        url: '/pages/user/set/set',
                        name: '设置',
                        type: '菜单',
                    },{
                        url: 'scanQrcode',
                        name: '扫一扫(仅限导航组)',
                        type: '菜单',
                    },{
                        url: '/pages/plus/group/list',
                        name: '团购商品',
                        type: '菜单',
                    },{
                        url: 'receipt',
                        name: '团购核销',
                        type: '菜单',
                    },{
                        url: '/pages/order/group-list',
                        name: '团购订单',
                        type: '菜单',
                    }
                    ],
                /*选中的值*/
                activePage: '收货地址'
            }
        },
        created() {
          /*初始化*/
          this.changeFunc(this.pages[0]);
        },
        methods: {
            /*选中的值*/
            changeFunc(e){
                this.$emit('changeData', e);
            }
        }
    }
</script>

<style>
</style>
