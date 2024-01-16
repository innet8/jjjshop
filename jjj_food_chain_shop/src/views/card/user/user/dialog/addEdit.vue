<template >
    <el-dialog :title="title" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" ref="form" :model="form" label-position="top" label-width="120px">
            <!--店员修改-->
            <el-form-item label="昵称" prop="nickName">
                <el-input class="max-w460" v-model="form.nickName" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                    <el-radio :label="2">保密</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="等级" >
                <el-select v-model="form.grade_id" placeholder="-请选择等级-">
                    <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name"
                        :value="item.grade_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input class="max-w460" v-model="form.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input class="max-w460" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker v-model="form.birthday" type="date" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button size="small" type="info" @click="dialogFormVisible">取消</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">确 定</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                user_id: 0,
                nickName: '',
                avatarUrl: '',
                gender: '',
                mobile: '',
                password: '',
                birthday: '',
                reg_source: ''
            },
            loading: false,
        };
    },
    props: ['open', 'editform', 'title', 'gradeList'],
    created() {
        this.dialogVisible = this.open;
    },
    methods: {
        onSubmit() { },

        /*关闭弹窗*/
        dialogFormVisible() {
            this.$emit('closeDialog')
        },
    },
}
</script>
<style lang="">
    
</style>