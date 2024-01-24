<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存-单规格
    -->
    <div>
        <el-form-item :label="$t('商品价格：')" width="80" :rules="[{ required: true, message: $t('请填写商品价格') }]"
            prop="model.sku[0].product_price">
            <el-input-number :min="0" :controls="false" v-model="form.model.sku[0].product_price"
                :placeholder="$t('请填写商品价格')" class="max-w460"></el-input-number>
        </el-form-item>
        <!-- <el-form-item :label="$t('包装费：')" :rules="[{ required: true, message: $t('请填写包装费') }]" prop="model.sku[0].bag_price">
      <el-input type="number" v-model="form.model.sku[0].bag_price" class="max-w460"></el-input>
    </el-form-item> -->
        <el-form-item :label="$t('库存数量：')" :rules="[{ required: true, message: $t('请填写库存数量') }]"
            prop="model.sku[0].stock_num">
            <el-input-number :min="0" :controls="false" :placeholder="$t('请填写库存数量')" v-model="form.model.sku[0].stock_num"
                class="max-w460"></el-input-number>
        </el-form-item>
        <!--    <el-form-item label="成本价："  prop="model.sku[0].cost_price">
      <el-input type="number" v-model="form.model.sku[0].cost_price" class="max-w460"></el-input>
    </el-form-item> -->

    </div>
</template>

<script>
export default {
    inject: ['form']
}
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
    padding-left: 7px !important;
    padding-right: 7px !important;
}</style>
