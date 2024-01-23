<template>
  <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-基础信息
    -->
  <div class="basic-setting-content pl16 pr16">
    <!--基本信息-->
    <div class="common-form">{{ $t('基本信息') }}</div>
    <el-form-item :label="$t('会员卡名称：')" :rules="[{ required: true, message: $t('请填写会员卡名称') }]" prop="model.card_name">
      <el-input v-model="form.model.card_name" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item :label="$t('卡片类型：')" prop="model.is_default">
      <el-radio-group v-model="form.model.is_default">
          <el-radio :label="0">{{ $t('默认') }}</el-radio>
          <el-radio :label="1">{{ $t('自定义') }}</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('卡片样式：')" prop="model.card_style" v-if="form.model.is_default==0">
      <div class="d-s-c f-w maxwidth-530">
        <div v-for="(item,index) in form.image" class="card-el-row">
          <div class="img" @click="chooseCardType(item.name)">
            <img :class="item.name == form.model.card_style?'card active':'card'" :src="item.url" width="111" height="61" />
          </div>
        </div>
      </div>
    </el-form-item>
    <el-form-item :label="$t('卡片样式：')" prop="card_style" v-if="form.model.is_default==1">
      <div class="d-s-c f-w maxwidth-530">
          <div class="img" @click="openUpload()">
            <img  v-img-url="form.model.default_style" width="111" height="61" />
          </div>
      </div>
    </el-form-item>
    <el-form-item :label="$t('排序：')" :rules="[{ required: true, message: $t('请填写排序') }]" prop="model.sort">
      <el-input v-model="form.model.sort" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item :label="$t('会员权益：')">
      <el-radio-group v-model="form.model.is_discount">
        <el-radio :label="0">{{ $t('无折扣') }}</el-radio>
        <el-radio :label="1">{{ $t('有折扣') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('折扣：')" :rules="[{ required: true, message: $t('请填写折扣') }]" prop="model.discount"
      v-if="form.model.is_discount==1">
      <el-input v-model="form.model.discount" type="number" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item :label="$t('开卡赠送：')">
      <el-checkbox v-model="form.model.open_points" :true-label="1" :false-label='0'> {{ $t('积分') }}</el-checkbox>
      <!-- <el-checkbox v-model="form.model.open_coupon" :true-label="1" :false-label='0'> {{ $t('优惠券') }}</el-checkbox> -->
      <el-checkbox v-model="form.model.open_money" :true-label="1" :false-label='0'> {{ $t('余额') }}</el-checkbox>
    </el-form-item>


    <el-form-item :label="$t('积分：')" :rules="[{ required: true, message: $t('请填写积分数量') }]" prop="model.open_points_num"
      v-if="form.model.open_points">
      <el-input v-model="form.model.open_points_num" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item :label="$t('余额：')" :rules="[{ required: true, message: $t('请填写余额数量') }]" prop="model.open_money_num"
      v-if="form.model.open_money">
      <el-input v-model="form.model.open_money_num" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item :label="$t('优惠券：')" :rules="[{ required: true, message: $t('请填写优惠券') }]" prop="model.open_coupons"
      v-if="form.model.open_coupon">
      <div class="d-s-c">
        <div style="width: 460px;border: 1px solid #dedede;min-height: 32px;"><span
            v-for="(item,index) in form.model.open_coupons" :key="index">{{item.name+';'}}</span></div>
            <span></span>
        <el-button type="primary" @click="addCoupon()">{{ $t('添加优惠券') }}</el-button>
      </div>
    </el-form-item>
    <el-form-item label="" v-if="form.model.open_coupon">
      <el-table :data="form.model.open_coupons" style="width: 60%">
        <el-table-column prop="name" :label="$t('券名称')">
        </el-table-column>
        <el-table-column prop="number" :label="$t('每人领取数量')" :rules="[{required: true,message: ' '}]">
          <template #default="scope">
            <el-input type="number" v-model="scope.row.number" placeholder="">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" prop="address">
          <template #default="scope">
            <el-button type="primary" link size="small" @click='delcoupon(scope.row)'> {{ $t('删除') }} </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!--上传图片组件-->
    <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">{{ $t('上传图片') }}</Upload>
    <!--选择优惠券-->
    <GetCoupon v-if="open_add" :open_add="open_add" @closeDialog="closeProductDialogFunc($event)">选择优惠券弹出层</GetCoupon>
  </div>
</template>

<script>
  import Upload from '@/components/file/Upload.vue';
  import draggable from 'vuedraggable';
  import GetCoupon from '@/components/coupon/GetCoupon.vue';
  export default {
    components: {
      Upload,
      draggable,
      GetCoupon
    },
    data() {
      return {
        isupload: false,
        open_add: false
      };
    },
    inject: ['form'],
    created() {

    },
    methods: {
      chooseCardType(e) {
        this.form.model.card_style = e;
      },
      /*添加优惠券*/
      addCoupon() {
        if(this.form.model.open_coupons.length>=15){
          ElMessage.error('您已经选择了十五张优惠券，若要更换请删除其他优惠券！');
          return
        }

        this.open_add = true;
      },
      /*关闭优惠券*/
      closeProductDialogFunc(e) {
        let self = this;
        self.open_add = e.openDialog;
        if (e.type == 'success') {
          let params = {
            coupon_id: e.params.coupon_id,
            name: e.params.name,
            number: 1,
            color:e.params.color,
            discount:e.params.discount,
            reduce_price:e.params.reduce_price,
            coupon_type:e.params.coupon_type,
            min_price:e.params.min_price,
          }
          self.form.model.open_coupons.push(params);
        }
      },
      delcoupon(item) {
        let self = this;
        let n = self.form.model.open_coupons.indexOf(item);
        self.form.model.open_coupons.splice(n, 1);
      },
      /*上传*/
      openUpload(e) {
        this.type = e;
        this.isupload = true;
      },
      /*获取图片*/
      returnImgsFunc(e) {
        if (e != null && e.length > 0) {
          this.form.model.default_style = e[0].file_path;
        }
        this.isupload = false;
      },
    }
  };
</script>

<style lang="scss">
.edit_container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  line-height: 20px;
  color: #2c3e50;
}

.ql-editor {
  height: 400px;
}

.draggable-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.draggable-list .wrapper>span {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.draggable-list .item {
  position: relative;
  width: 110px;
  height: 110px;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #dddddd;
}

.draggable-list .delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: red;
  line-height: 16px;
  font-size: 16px;
  color: #ffffff;
  display: none;
}

.draggable-list .item:hover .delete-btn {
  display: block;
}

.draggable-list .item img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
}

.draggable-list .img-select {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #dddddd;
  font-size: 30px;
}

.draggable-list .img-select i {
  color: #409eff;
}

.card-el-row {
  margin-bottom: 20px;
  margin-right: 20px;
}

.maxwidth-530 {
  max-width: 530px;
}

.card {
  border-radius: 4px;
}

.active.card {
  border: 2px solid #4aa3f7;
}
</style>
