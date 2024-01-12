<template>
  <!--
      作者：luoyiming
      时间：2019-10-25
      描述：会员-用户列表-会员等级
  -->
  <el-dialog title="会员等级" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" :modal-append-to-body="false" width='600px'>
    <el-form size="small" :model="form" label-position="top">
      <el-form-item>
        <div class="d-s-s">
            <div class="d-b-s">
              <div class="fb mr10"></div>
              <div class="text item">
                <div>卡名称: {{form.card_name}}</div>
                <div>卡ID: {{form.card_id}}</div>
                <div>有效期:
                  <span v-if="form.expire>0">{{form.expire}}月</span>
                  <span v-else>永久有效</span>
                </div>
                <div>折扣: <span v-if="form.is_discount>0">{{form.discount}}折</span>
                  <span v-else>无</span>
                </div>
              </div>
            </div>
        </div>

      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth">
        <div class="d-s-s d-c">
          <el-button @click="openGetuser" icon="Plus">选择会员</el-button>
          <ul class="d-s-s select-user" v-if="select_list.length>0">
            <li class="mr10 d-c-c d-c p-10-0">
              <img :src="select_list[0].avatarUrl" class="radius" width="100" height="100" />
              <p class="lh18 ww100 text-ellipsis tc">{{select_list[0].nickName}}</p>
            </li>
          </ul>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
    <div  class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="editUser" :loading="loading">确 定</el-button>
    </div>
    </template>
    <!--选择用户-->
    <GetUser :is_open="open_getuser" @close="closeGetuserFunc"></GetUser>
  </el-dialog>
</template>

<script>
  import CardApi from '@/api/card.js';
  import GetUser from '@/components/user/GetUser.vue';
  export default {
    components: {
      GetUser,
    },
    data() {
      return {
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        loading: false,
        dialogVisible: false,
        /*获取用户是否显示*/
        open_getuser: false,
        user_ids: '',
        /*选择的用户列表*/
        select_list: [],
      };
    },
    props: ['open_edit', 'form'],
    created() {
      this.dialogVisible = this.open_edit;
    },
    methods: {

      /*修改用户*/
      editUser() {
        let self = this;
        self.loading = true;
        let params = {};
        params.card_id = self.form.card_id;
        params.user_ids = self.select_list[0].user_id;
        CardApi.putcard(params, true)
          .then(data => {
            self.loading = false;
            if (data.code == 1) {
              ElMessage({
                message: '恭喜你，发卡成功',
                type: 'success'
              });
              self.dialogFormVisible(true);
            }
          })
          .catch(error => {
            self.loading = false;
          });
      },
      /*打开获取用户*/
      openGetuser() {
        this.open_getuser = true;
      },
      /*关闭获取用户*/
      closeGetuserFunc(e) {
        if (e && e.type != 'error') {
          console.log(e)
          this.select_list = [...e.params];
        }
        this.open_getuser = false;
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
      }

    }
  };
</script>

<style>
  .d-c-s {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
</style>
