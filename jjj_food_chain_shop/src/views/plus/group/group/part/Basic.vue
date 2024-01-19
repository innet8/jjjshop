<template>
  <!--
      作者：luoyiming
      时间：2020-06-01
      描述：插件中心-团购-添加
    -->
  <div class="product-add pb50">
    <!--添加团购-->
    <div class="common-form">基本信息</div>
    <el-form-item label="团购名称" prop="group_name" :rules="[{ required: true, message: '请输入团购名称' }]">
      <el-input v-model="form.group_name" placeholder="请输入团购名称" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="须知：" prop="describe" :rules="[{ required: true, message: '请输入须知' }]">
      <el-input type="textarea" rows="3" v-model="form.describe" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="到期类型">
      <el-radio-group v-model="form.expire_type">
        <el-radio :label="10">购买后生效</el-radio>
        <el-radio :label="20">固定时间</el-radio>
      </el-radio-group>
    </el-form-item>
    <div v-if="form.expire_type == 10">
      <el-form-item label="有效天数" prop="expire_day" :rules="[{ required: true, message: '请输入有效天数' }]">
        <el-input v-model="form.expire_day" placeholder="请输入有效天数" type="number" class="max-w460"></el-input>
      </el-form-item>
    </div>
    <div v-else>
      <el-form-item label="有效时间" prop="time" :rules="[{ required: true, message: '请输入有效时间' }]">
        <el-date-picker v-model="form.time" type="daterange" align="right" unlink-panels value-format="YYYY-MM-DD"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </div>
    <el-form-item label="团购图片：" :rules="[{ required: true, message: '请上传团购图片' }]" prop="image">
      <div class="draggable-list">
        <draggable class="wrapper" v-model="form.image">
          <template #item="{ element, index }">
            <div class="item">
              <img v-img-url="element.file_path" />
              <a href="javascript:void(0);" class="delete-btn" @click.stop="deleteImg(index)"><el-icon><Close /></el-icon></a>
            </div>
          </template>
        </draggable>
        <div class="item img-select" @click="openUpload"><el-icon><Plus /></el-icon></div>
      </div>
    </el-form-item>
    <el-form-item label="划线价格" prop="line_price" :rules="[{ required: true, message: '请输入划线价格' }]">
      <el-input v-model="form.line_price" placeholder="请输入划线价格" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="销售价格" prop="group_price" :rules="[{ required: true, message: '请输入销售价格' }]">
      <el-input v-model="form.group_price" placeholder="请输入销售价格" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="虚拟销量" prop="sales_initial" :rules="[{ required: true, message: '请输入虚拟销量' }]">
      <el-input type="number" v-model="form.sales_initial" placeholder="请输入虚拟销量" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="适用门店">
      <el-radio-group v-model="form.suit_type">
        <el-radio :label="10">全部</el-radio>
        <el-radio :label="20">部分</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选择门店" v-if="form.suit_type==20" prop="shop_supplier_id" :rules="[{ required: true, message: '请选择门店' }]">
      <el-select v-model="form.shop_supplier_id" multiple placeholder="请选择">
        <el-option v-for="(item, index) in form.supplier" :key="index" :label="item.name"
          :value="item.shop_supplier_id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="团购状态">
      <el-radio-group v-model="form.group_status">
        <el-radio :label="1">显示</el-radio>
        <el-radio :label="0">隐藏</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="每日限购数量">
      <el-input type="number" v-model="form.limit_num" placeholder="请输入数字" class="max-w460"></el-input>
      <div class="gray9">每个会员每日购买的最大数量，0为不限购</div>
    </el-form-item>
    <el-form-item label="排序">
      <el-input type="number" v-model="form.group_sort" placeholder="请输入数字" class="max-w460"></el-input>
    </el-form-item>

    <Upload v-if="isupload" :config="{ total: 9 }" :isupload="isupload" @returnImgs="returnImgsFunc">上传图片</Upload>
  </div>
</template>

<script>
  import GroupApi from '@/api/group.js';
  import Upload from '@/components/file/Upload.vue';
  import draggable from 'vuedraggable';
  export default {
    components: {
      /*图片上传*/
      Upload: Upload,
      draggable
    },
    data() {
      return {
        /*是否上传图片*/
        isupload: false,
        /*form表单数据*/
      };
    },
    inject: ['form'],
    methods: {
      /*上传*/
      openUpload() {
        this.isupload = true;
      },

      /*获取图片*/
      returnImgsFunc(e) {
        let self = this;
        if (e != null) {
          let imgs = this.form.image.concat(e);
          this.form.image = imgs;
        }
        this.isupload = false;
      },
      /*删除图片*/
      deleteImg(index) {
        this.form.image.splice(index, 1);
      },
    }
  };
</script>


