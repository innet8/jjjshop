<template>
  <el-dialog title="添加分类" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form size="small" :model="form" :rules="formRules" ref="form">
      <el-form-item label="父级分类" :label-width="formLabelWidth">
        <el-select v-model="form.parent_id" label="无">
          <el-option :value="0" label="无"></el-option>
          <template v-for="cat in category" :key="cat.category_id">
            <el-option :value="cat.category_id" :label="cat.name"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类图片" prop="image_id" :label-width="formLabelWidth">
        <el-row>
          <el-button type="primary" @click="openUpload">选择图片</el-button>
          <div v-if="form.image_id!=''" class="img">
            <img :src="file_path" width="100" height="100" />
          </div>
        </el-row>
      </el-form-item>

      <el-form-item label="分类排序" prop="sort" :label-width="formLabelWidth">
        <el-input v-model.number="form.sort" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="addUser" :loading="loading">确 定</el-button>
    </div>
    </template>
    <!--上传图片组件-->
    <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">上传图片</Upload>
  </el-dialog>

</template>

<script>
  import PorductApi from '@/api/product.js';
  import Upload from '@/components/file/Upload.vue';
  export default {
    components: {
      Upload
    },
    data() {
      return {
        category: [],
        form: {
          parent_id: 0,
          category_id: 0,
          name: '',
          sort: 100,
          image_id: ''
        },
        formRules: {
          name: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }],
          image_id: [{
            required: true,
            message: '请上传分类图片',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '分类排序不能为空'
          }, {
            type: 'number',
            message: '分类排序必须为数字'
          }]
        },
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        loading: false,
        /*是否上传图片*/
        isupload: false,
      };
    },
    props: ['open_add', 'addform'],
    created() {
      this.dialogVisible = this.open_add;
      /*获取父级分类*/
      this.getParentCategory();
    },
    methods: {
      /*获取父级分类*/
      getParentCategory: function() {
        let self = this;
        PorductApi.takeCatParentList({}, true)
            .then(res => {
              self.loading = false;
              // console.log(res.data);
              // Object.assign(self.category, res.data.list);
              // console.log(self.category)
              this.category = res.data.list;
            })
            .catch(error => {
              self.loading = false;
            });
      },
      /*添加用户*/
      addUser() {
        let self = this;
        let params = self.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            PorductApi.takeCatAdd(params).then(data => {
              self.loading = false;
              ElMessage({
                message: '添加成功',
                type: 'success'
              });
              self.dialogFormVisible(true);
            }).catch(error => {
              self.loading = false;
            });
          }
        });
      },

      /*关闭弹窗*/
      dialogFormVisible(e) {
        if (e) {
          this.$emit('closeDialog', {
            type: 'success',
            openDialog: false
          })
        } else {
          this.$emit('closeDialog', {
            type: 'error',
            openDialog: false
          })
        }
      },
      /*上传*/
      openUpload(e) {
        this.type = e;
        this.isupload = true;
      },
      /*获取图片*/
      returnImgsFunc(e) {
        if (e != null && e.length > 0) {
          this.file_path = e[0].file_path;
          this.form.image_id = e[0].file_id;
        }
        this.isupload = false;
      },

    }
  };
</script>

<style>
 .img {
    margin-top: 10px;
  }
</style>
