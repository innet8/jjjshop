import request from '@/utils/request'

let PurchaseApi = {

  /*添加供应商*/
  supplierAdd(data, errorback) {
    return request._post('/shop/purchase.ErpSupplier/add', data, errorback);
  },
  /*添加供应商*/
  supplierEdit(data, errorback) {
    return request._post('/shop/purchase.ErpSupplier/edit', data, errorback);
  },
  /*删除供应商*/
  supplierdDelete(data, errorback) {
    return request._post('/shop/purchase.ErpSupplier/delete', data, errorback);
  },
  /*供应商列表*/
  supplierList(data, errorback) {
    return request._post('/shop/purchase.ErpSupplier/list', data, errorback);
  },
}

export default PurchaseApi;
