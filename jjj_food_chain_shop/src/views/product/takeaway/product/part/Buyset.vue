<template>
  <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-高级设置
    -->
  <div class="buy-set-content pl16 pr16">
    <!--其他设置-->
    <!--积分设置-->
    <div class="common-form">积分设置</div>
    <el-form-item label="是否开启积分赠送：">
      <el-radio-group v-model="form.model.is_points_gift">
        <el-radio :label="1">开启</el-radio>
        <el-radio :label="0">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <div class="common-form mt50">其他设置</div>
    <el-form-item v-if="form.model.product_status!=40" label="商品状态：" :rules="[{ required: true, message: '选择商品状态' }]" prop="model.product_status">
      <el-radio-group  v-model="form.model.product_status">
        <el-radio :label="10">上架</el-radio>
        <el-radio :label="20">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="初始销量：">
      <el-input type="number" min="0" v-model="form.model.sales_initial" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="商品排序：" :rules="[{ required: true, message: ' ' }]" prop="model.product_sort">
      <el-input type="number" min="0" v-model="form.model.product_sort" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="限购数量：" :rules="[{ required: true, message: ' ' }]" prop="model.limit_num">
      <el-input type="number" min="0" v-model="form.model.limit_num" class="max-w460"></el-input>
      <div class="gray9">每个会员购买的最大数量，0为不限购</div>
    </el-form-item>
	<el-form-item label="打印标签：" prop="model.label_id">
	  <el-select v-model="form.model.label_id">
		  <el-option label="无" :value="0"></el-option>
	     <template v-for="cat in form.labelList" :key="cat.label_id">
	      <el-option :value="cat.label_id" :label="cat.label_name"></el-option>
	    </template>
	  </el-select>
	</el-form-item>
    <!--会员折扣设置-->
    <div class="common-form mt50">会员折扣设置</div>
    <el-form-item label="是否开启会员折扣：">
      <el-radio-group v-model="form.model.is_enable_grade">
        <el-radio :label="1">开启</el-radio>
        <el-radio :label="0">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="会员折扣设置：" v-if="form.model.is_enable_grade==1">
      <el-radio-group v-model="form.model.is_alone_grade">
        <el-radio :label="0">默认折扣</el-radio>
        <el-radio :label="1">单独设置折扣</el-radio>
      </el-radio-group>
      <div class="gray9" v-if="form.model.is_alone_grade==0">默认折扣：默认为用户所属会员等级的折扣率</div>
    </el-form-item>
    <el-form-item label="折扣佣金类型：" v-if="form.model.is_alone_grade==1&&form.model.is_enable_grade==1">
      <el-radio-group v-model="form.model.alone_grade_type" @change="changeGradeType">
        <el-radio :label="10">百分比</el-radio>
        <el-radio :label="20">固定金额</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="" v-if="form.model.is_alone_grade==1&&form.model.is_enable_grade==1">
      <div class="max-w460">
        <el-table :data="form.gradeList" border size="" style="width: 100%">
          <el-table-column prop="name" label="会员等级">
          </el-table-column>
          <el-table-column prop="name" label="折扣">
            <template #default="scope">
              <div class="d-s-c">
                <el-input v-model="scope.row.product_equity" type="number" placeholder="请输入折扣"></el-input>
                <span class="ml10">{{ grade_unit }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form-item>

    <!--分销设置-->
    <div class="common-form mt50" v-if="form.basicSetting.is_open == 1">分销设置</div>
    <el-form-item label="是否开启分销：" v-if="form.basicSetting.is_open == 1">
      <el-radio-group v-model="form.model.is_agent">
        <el-radio :label="1">开启</el-radio>
        <el-radio :label="0">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="form.model.is_agent === 1">
      <el-form-item label="分销规则：" v-if="form.basicSetting.is_open == 1">
        <el-radio-group v-model="form.model.is_ind_agent">
          <el-radio :label="0">平台规则</el-radio>
          <el-radio :label="1">单独规则</el-radio>
        </el-radio-group>
        <div class="gray9">平台规则：层级({{form.basicSetting.level}}级)
          <span v-if="form.basicSetting.level >= 1" style="padding-left: 10px;">1级佣金({{form.agentSetting.first_money}}%)</span>
          <span v-if="form.basicSetting.level >= 2" style="padding-left: 10px;">2级佣金({{form.agentSetting.second_money}}%)</span>
          <span v-if="form.basicSetting.level >= 3" style="padding-left: 10px;">3级佣金({{form.agentSetting.third_money}}%)</span>
        </div>
      </el-form-item>
      <template v-if="form.model.is_ind_agent === 1 && form.basicSetting.is_open == 1">
        <el-form-item label="分销佣金类型：">
          <el-radio-group v-model="form.model.agent_money_type" @change="changeMoneyType">
            <el-radio :label="10">百分比</el-radio>
            <el-radio :label="20">固定金额</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单独分销设置：">
          <el-input type="number" min="0" v-model="form.model.first_money" class="max-w460">
            <template #prepend>
              一级佣金：
            </template>
            <template #append>
              {{ unit }}
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="form.basicSetting.level >= 2">
          <el-input type="number" min="0" v-model="form.model.second_money" class="max-w460">
            <template #prepend>
              二级佣金：
            </template>
            <template #append>
              {{ unit }}
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="form.basicSetting.level >= 3">
          <el-input type="number" min="0" v-model="form.model.third_money" class="max-w460">
            <template #prepend>
              三级佣金：
            </template>
            <template #append>
              {{ unit }}
            </template>
          </el-input>
        </el-form-item>
      </template>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        unit: '%',
        grade_unit: '%'
      };
    },
    created() {
      if(this.form.model.alone_grade_type == '20'){
        this.grade_unit = '元';
      }
      if(this.form.model.agent_money_type == '20'){
        this.unit = '元';
      }
    },
    inject: ['form'],
    methods: {
      /*换算单位*/
      changeMoneyType: function(val) {
        if (val == '10') {
          this.unit = '%';
        } else {
          this.unit = '元';
        }
      },
	  /*换算单位*/
	  changeGradeType: function(val) {
	    if (val == '10') {
	      this.grade_unit = '%';
	    } else {
	      this.grade_unit = '元';
	    }
	  }
    }
  };
</script>

<style></style>
