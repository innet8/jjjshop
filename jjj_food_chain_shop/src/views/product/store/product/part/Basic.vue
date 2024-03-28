<template>
    <!--
          作者：luoyiming
          时间：2019-10-26
          描述：商品管理-商品编辑-基础信息
      -->
    <div class="basic-setting-content">
        <!--基本信息-->
        <div class="common-form">{{ $t('基本信息') }}</div>
        <el-form-item :label="$t('类型：')">
            <el-radio-group v-model="form.model.type" :disabled="canChange" @change="changeType">
                <el-radio :label="10">{{ $t('成品') }}</el-radio>
                <el-radio :label="20">{{ $t('材料') }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-for="(item, index) in languageList" :key="index">
            <el-form-item :label="$t('商品名称：') + `(${item.value})`" :prop="`model.product_name.${item.key}`" :rules="[{ required: true, message: $t('请填写商品名称') }]">
                <el-input v-model="form.model.product_name[item.key]" :placeholder="$t('请输入商品名称')" class="max-w460"></el-input>
            </el-form-item>
        </template>

        <el-form-item :label="$t('所属分类：')" :rules="[{ required: true, message: $t('请选择所属分类') }]" prop="model.category_id">
            <el-cascader class="max-w460" :options="options" v-model="form.model.category_id" clearable style="width: 100%;" :placeholder="$t('请选择分类')"></el-cascader>
        </el-form-item>

        <el-form-item :label="$t('特色分类：')" v-if="form.model.type == 10">
            <el-select v-model="form.model.special_id" clearable class="max-w460" size="default" :placeholder="$t('请选择特色分类')">
                <template v-for="cat in form.special" :key="cat.category_id">
                    <el-option :value="cat.category_id" :label="cat.name_text"></el-option>
                    <template v-for="cat_c in cat.child" :key="cat_c.category_id">
                        <el-option :value="cat_c.category_id" :label="cat_c.name_text">|—{{ cat_c.name_text }}</el-option>
                    </template>
                </template>
            </el-select>
        </el-form-item>

        <el-form-item :label="$t('商品图片：')" :rules="[{
            required: true,
            validator: () => {
                return form.model.image.length > 0 ? true : false;
            },
            message: $t('请上传商品图片')
        }]" prop="model.image">
            <div class="draggable-list">
                <draggable class="wrapper" v-model="form.model.image">
                    <transition-group>
                        <div class="item" v-for="(item, index) in form.model.image" :key="item.file_path">

                            <img v-img-url="item.file_path" />
                            <a href="javascript:void(0);" class="delete-btn" @click.stop="deleteImg(index)"><el-icon>
                                    <Close />
                                </el-icon></a>
                        </div>
                    </transition-group>
                </draggable>
                <div v-if="form.model.image.length == 0" class="item img-select" @click="openProductUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </div>
            </div>
            <div class="gray9">{{ $t('支持JPG、JPEG、PNG格式，小于15MB，尺寸：160*120px') }}</div>
        </el-form-item>
        <el-form-item :label="$t('商品卖点：')">
            <el-input type="textarea" :placeholder="$t('请输入商品卖点')" v-model="form.model.selling_point" show-word-limit :maxlength="50" class="max-w460"></el-input>
        </el-form-item>

        <el-form-item :label="$t('供应商：')">
            <el-select v-model="form.model.erp_supplier_id" filterable clearable class="max-w460" size="default" :placeholder="$t('请选择供应商')">
                <template v-for="item in supplierList" :key="item.id">
                    <el-option :value="item.id" :label="item.name"></el-option>
                </template>
            </el-select>
        </el-form-item>
        <!--商品图片组件-->
        <Upload v-if="isProductUpload" :config="{ total: 1 }" :isupload="isProductUpload" :aspectRatio="1.333" @returnImgs="returnProductImgsFunc">{{ $t('上传图片') }}</Upload>
    </div>
</template>

<script>
import Upload from '@/components/file/Upload.vue';
// import draggable from 'vuedraggable';
import PurchaseApi from '@/api/purchase.js';
import { languageStore } from '@/store/model/language.js';
const languageList = languageStore().languageList;
export default {
    components: {
        Upload,
        // draggable
    },
    data() {
        return {
            formData: {},
            isProductUpload: false,
            languageList: languageList,
            options: [],
            supplierList: [],
        };
    },
    props:{
        canChange:{
            type:Boolean,
            default:false,
        },
    },
    inject: ['form'],
    watch: {
        'form': {
            handler(val) {
                this.options = [];
                val.category.map((item, index) => {
                    this.options.push({
                        value: item.category_id,
                        label: item.name_text,
                        children: [],
                    })
                    item.child.map((items, indexs) => {
                        this.options[index].children.push({
                            value: items.category_id,
                            label: items.name_text,
                        })
                    })
                })
            },
            deep: true,
            immediate: true,
        }
    },
    created() {
        this.formData = this.form;
        // this['formData'] = this.form;
        this.getData();
    },
    methods: {
        //获取供应商
        getData() {
            let self = this;
            let Params = {};
            Params.list_rows = 200;
            PurchaseApi.supplierList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.supplierList = data.data.list.data;

                })
                .catch(error => { });
        },

        changeType() {
            this.form.model.sku[0].material = [];
            this.form.model.sku = this.form.model.sku.slice(0,1)
            this.form.single_select_list = [];
            this.form.many_select_list = [[]];
            this.form.ing_select_list = [[]];
        },
        /*打开上传图片*/
        openProductUpload: function () {
            this.isProductUpload = true;
        },

        /*上传商品图片*/
        returnProductImgsFunc(e) {
            if (e != null) {
                let imgs = this.form.model.image.concat(e);
                this.form.model['image'] = imgs;
            }
            this.isProductUpload = false;
            this.$emit('validateField', 'model.image')

        },

        /*删除商品图片*/
        deleteImg(index) {
            this.form.model.image.splice(index, 1);
        },
    }
};
</script>
