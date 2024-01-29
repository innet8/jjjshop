<template>
  <div>
    <el-dialog :title="$t('退款')" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form size="small" ref="form" :model="form" label-position="top">
        <el-form-item :label="$t('可退款金额')" :label-width="formLabelWidth" prop="order_no"
          :rules="[{required: true,message: ' '}]">
          <el-input v-model="form.pay_price" disabled :placeholder="$t('可退款金额')" :readonly="true">
            <template #append>
                {{ currency.unit }}
            </template>
        </el-input>
        </el-form-item>
        <el-form-item :label="$t('订单号')" :label-width="formLabelWidth" prop="order_no"
          :rules="[{required: true,message: ' '}]">
          <el-input v-model="form.order_no" :placeholder="$t('请输入订单号')" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('退款金额')" :label-width="formLabelWidth" prop="refund_money"
          :rules="[{required: true,message: ' '}]">
          <el-input type="number" v-model="form.refund_money" :placeholder="$t('请输入退款金额')"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="submit" :loading="loading">{{ $t('确定') }}</el-button>
      </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useUserStore } from '@/store';
const { currency } = useUserStore();
  import OrderApi from '@/api/order.js';
  import draggable from 'vuedraggable';
  export default {
    components: {
      draggable
    },
    data() {
      return {
        loading: false,
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        form: {
          order_id: '',
          refund_money: '',
          order_no: '',
          pay_price:'',
        },
        currency:currency,
      };
    },
    props: ['open_edit', 'order_no', 'order_id','pay_price'],
    created() {
      this.dialogVisible = this.open_edit;
      this.form.order_no = this.order_no;
      this.form.order_id = this.order_id;
      this.form.pay_price = this.pay_price;
    },
    methods: {
      /*处理*/
      submit() {
        let self = this;
        let form = self.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('确认退款?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.loading = true;
              OrderApi.storeRefund(form, true).then(data => {
                  self.loading = false;
                  ElMessage({
                    message: data.msg,
                    type: 'success'
                  });
                  self.dialogFormVisible(true);
                })
                .catch(error => {
                  self.loading = false;
                });
            }).catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消退款'
              });
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
    }
  };
</script>


