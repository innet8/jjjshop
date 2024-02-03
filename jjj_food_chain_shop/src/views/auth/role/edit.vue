<template>
    <!--
        作者：luoyiming
        时间：2019-10-25
        描述：权限-角色管理-编辑角色
    -->
    <div v-loading="loading" class="add-box-role">
        <!--form表单-->
        <el-form size="small" ref="form" :model="form" label-position="top" label-width="180px">
            <!--编辑角色-->
            <div class="common-form">{{ $t('编辑角色') }}</div>

            <el-form-item :label="$t('角色名称：')" prop="role_name" :rules="[{ required: true, message: ' ' }]">
                <el-input v-model="form.role_name" :placeholder="$t('请输入角色名称')" class="max-w460"></el-input>
            </el-form-item>
            <el-form-item class="role-list" :label="$t('权限列表：')" v-model="form.access_id">
                <el-tree :data="data" show-checkbox node-key="access_id" :default-expand-all="true"
                    :default-checked-keys="select_menu" :props="defaultProps" @check="handleCheckChange"></el-tree>
            </el-form-item>

            <!-- <el-form-item :label="$t('排序：')"><el-input type="number" v-model="form.sort" :placeholder="$t('接近0，排序等級越高')"
                    class="max-w460"></el-input></el-form-item> -->

            <!--提交-->
            <div class="common-button-wrapper">
                <el-button size="small"  @click="cancelFunc">{{ $t('取消') }}</el-button>
                <el-button type="primary" size="small" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import AuthApi from '@/api/auth.js';

export default {
    data() {
        return {
            /*是否正在加载*/
            loading: true,
            /*表单数据对象*/
            form: {
                access_id: []
            },
            data: [],
            /*角色列表*/
            roleList: [],
            /*权限选中*/
            select_menu: [],
            /*权限树菜单重新自定义字段*/
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            role_id: 0
        };
    },
    created() {
        this.role_id = this.$route.query.role_id;
        /*获取列表*/
        this.getData();
    },
    methods: {
        /*修改角色*/
        onSubmit() {
            let self = this;
            let form = self.form;
            self.$refs.form.validate(valid => {
                if (valid) {
                    self.loading = true;
                    AuthApi.roleEdit({
                        role_id: self.role_id,
                        params: JSON.stringify(form)
                    }, true)
                        .then(data => {
                            self.loading = false;
                            this.$ElMessage({
                                message: $t('保存成功'),
                                type: 'success'
                            });
                            self.$router.push('/auth/role/index');
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                } else {
                    const divElement = document.querySelector('.main-div');
                    divElement.scrollTop = 0;
                }
            });
        },

        /*获取所有的数据*/
        getData() {
            let self = this;
            AuthApi.roleEditInfo({
                role_id: self.role_id
            })
                .then(data => {
                    let obj = self.clearData(data.data.menu, data.data.select_menu);
                    self.select_menu = data.data.select_menu;
                    self.form = data.data.model;
                    self.roleList = data.data.roleList;
                    self.data = data.data.menu;
                    data.data.menu.map((item, index) => {
                        self.data[index].name = $t(item.name)
                        item.children.map((items, indexs) => {
                            self.data[index].children[indexs].name = $t(items.name);
                            items.children.map((itemThree, indexThree) => {
                                self.data[index].children[indexs].children[indexThree].name = $t(itemThree.name);
                                itemThree.children.map((itemFour, indexFour) => {
                                    self.data[index].children[indexs].children[indexThree].children[indexFour].name = $t(itemFour.name)
                                })
                            })
                        })
                    })
                    if (self.form.parent_id == 0) {
                        self.form.parent_id = 0 + '';
                    }
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },

        /*清除数据*/
        clearData(list, authlist) {
            let total = 0;
            let leng = list.length;
            for (let i = 0; i < leng; i++) {
                let item = list[i];
                if (item.children != null) {
                    let flag = this.clearData(item.children, authlist);
                    if (!flag) {
                        let _index = authlist.indexOf(item.access_id);
                        if (_index >= 0) {
                            authlist.splice(_index, 1);
                        }
                    }
                }
                if (authlist.indexOf(item.access_id) != -1) {
                    total++;
                }
            }
            if (total < leng) {
                return false;
            } else {
                return true;
            }
        },

        /*监听选中*/
        handleCheckChange(data, checked) {
            this.form.access_id = checked.checkedKeys.concat(checked.halfCheckedKeys);
        },

        /*取消*/
        cancelFunc() {
            this.$router.back(-1);
        }

    }
};
</script>

<style lang="scss" scoped>
.basic-setting-content {}

.product-add {}

.img {
    margin-top: 10px;
}
.add-box-role{
    height: calc(100% - 14px) ;
    overflow: hidden;
    .el-form{
        display: flex;
        flex-direction: column;
        height: 100%;
        .role-list{
            flex: 1 1 auto;
            overflow-y: auto;
        }
    }
}
</style>
