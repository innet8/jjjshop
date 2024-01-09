<template >
    <div class="product-content">
        <div class="table-wrap">
            <el-table size="small" :data="tableData" row-key="category_id" default-expand-all
                :tree-props="{ children: 'child' }" style="width: 100%" v-loading="loading">
                <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
                <el-table-column prop="" label="图片" width="180">
                    <template #default="scope">
                        <img v-if="scope.row.images" v-img-url="scope.row.images.file_path" alt="" width="50" />
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="分类排序"></el-table-column>
                <el-table-column prop="sort" label="状态">
                    <template #default="scope">
                        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"
                            @change="statusSet($event, scope.row.category_id)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="添加时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                        <el-button @click="editClick(scope.row)" type="primary" link size="small"
                            v-auth="'/product/store/category/Edit'">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import PorductApi from '@/api/product.js';
export default {
    data() {
        return {
            loading: false,
        };
    },
    created() {
      /*获取列表*/
      this.getData();
    },
    methods: {
        getData() {
            let self = this;
            self.loading = true;
            PorductApi.storeCatSP({}, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list;
                    self.categoryModel.catList = self.tableData;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
    },
}
</script>
<style ></style>