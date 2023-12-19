<template>
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <!--添加门店-->
      <div class="common-form">菜品打印</div>
      <el-form-item label="名称" prop="name" :rules="[{ required: true, message: ' ' }]"><el-input v-model="form.name" class="max-w460"></el-input></el-form-item>
      <el-form-item label="是否开启">
        <div>
          <el-radio v-model="form.is_open" :label="1">开启</el-radio>
          <el-radio v-model="form.is_open" :label="0">关闭</el-radio>
        </div>
      </el-form-item>
	  <el-form-item label="打印类型">
	    <div>
	      <el-radio @change="form.printer_id = ''" v-model="form.type" :label="10">小票打印</el-radio>
	      <el-radio @change="form.printer_id = ''" v-model="form.type" :label="20">标签打印</el-radio>
	    </div>
	  </el-form-item>
      <el-form-item label="用餐类型">
        <div>
          <el-radio @change="form.category_id = []" v-model="form.product_type" :label="0">配送打印</el-radio>
          <el-radio @change="form.category_id = []" v-model="form.product_type" :label="1">店内打印</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="打印模式">
        <div>
          <el-radio v-model="form.print_type" :label="10">付款打印</el-radio>
          <el-radio v-model="form.print_type" :label="20">下单打印</el-radio>
        </div>
      </el-form-item>
	  <el-form-item label="打印方式">
	    <div>
	      <el-radio v-model="form.print_method" :label="10">整单打印</el-radio>
	      <el-radio v-model="form.print_method" :label="20">按商品分组打印</el-radio>
	      <el-radio v-model="form.print_method" :label="30">按标签打印</el-radio>
	    </div>
	  </el-form-item>
      <el-form-item v-if="form.type==10" label="打印机 " prop="printer_id" :rules="[{ required: true, message: ' ' }]">
        <el-select v-model="form.printer_id" placeholder="请选择">
          <el-option v-for="(item, index) in type" :key="index" :label="item.printer_name"
            :value="item.printer_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type==20" label="打印机 " prop="printer_id" :rules="[{ required: true, message: ' ' }]">
        <el-select v-model="form.printer_id" placeholder="请选择">
          <el-option v-for="(item, index) in typeTag" :key="index" :label="item.printer_name"
            :value="item.printer_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.product_type == 0&&form.print_method==20" label="商品分组" prop="category_id" :rules="[{ required: true, message: ' ' }]">
        <el-select v-model="form.category_id" multiple placeholder="请选择">
          <el-option v-for="item in takeList" :key="item.category_id" :label="item.name" :value="item.category_id + ''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.product_type == 1&&form.print_method==20" label="商品分组" prop="category_id" :rules="[{ required: true, message: ' ' }]">
        <el-select v-model="form.category_id" multiple placeholder="请选择">
          <el-option v-for="item in storeList" :key="item.category_id" :label="item.name" :value="item.category_id + ''"></el-option>
        </el-select>
      </el-form-item>
	  
	  <el-form-item v-if="form.print_method==30" label="打印标签" prop="label_id">
	    <el-select v-model="form.label_id" multiple placeholder="请选择">
	      <el-option v-for="item in labelList" :key="item.label_id" :label="item.label_name"
	        :value="item.label_id + ''"></el-option>
	    </el-select>
	    <div class="tips">不选择打印全部</div>
	  </el-form-item>

      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import SupplierApi from '@/api/supplier.js';

export default {
  data() {
    return {
      /*切换菜单*/
      // activeIndex: '1',
      /*form表单数据*/
      form: {
        name: '',
        is_open: 1,
        printer_id: '',
        product_type: 0,
        print_type: 10,
        category_id: [],
		type: 10,
		print_method: 10,
		label_id: [],
      },
      loading: false,
      type: [],
      typeTag: [],
      storeList: [],
      takeList: [],
      labelList: [],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      SupplierApi.getPrinting({}, true)
        .then(data => {
          this.storeList = data.data.storeList;
          this.takeList = data.data.takeList;
          this.type = data.data.printerList;
		  this.typeTag = data.data.printerTagList;
		  this.labelList = data.data.labelList;
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
          SupplierApi.addPrinting(form, true)
            .then(data => {
              self.loading = false;
              ElMessage({
                message: '恭喜你，添加成功',
                type: 'success'
              });
              self.$router.push('/supplier/printing/index');
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

<style></style>
