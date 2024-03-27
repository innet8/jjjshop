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

    /*添加采购单*/
    addErpPurchaseOrder(data, errorback) {
        return request._post('/shop/purchase.ErpPurchaseOrder/add', data, errorback);
    },
    /*编辑采购单*/
    editErpPurchaseOrder(data, errorback) {
        return request._post('/shop/purchase.ErpPurchaseOrder/edit', data, errorback);
    },
    /*调整采购单*/
    adjustErpPurchaseOrder(data, errorback) {
        return request._post('/shop/purchase.ErpPurchaseOrder/adjust', data, errorback);
    },
    /*操作采购单*/
    operateErpPurchaseOrder(data, errorback) {
        return request._post('/shop/purchase.ErpPurchaseOrder/operate', data, errorback);
    },
    /*删除采购单*/
    deleteErpPurchaseOrder(data, errorback) {
        return request._post('/shop/purchase.ErpPurchaseOrder/delete', data, errorback);
    },
    /*采购单列表*/
    getErpPurchaseOrder(data, errorback) {
        return request._post('/shop/purchase.ErpPurchaseOrder/list', data, errorback);
    },
    /*采购单详情*/
    detailErpPurchaseOrder(data, errorback) {
        return request._post('/shop/purchase.ErpPurchaseOrder/detail', data, errorback);
    },

    /*入库记录*/
    getErpInventoryRecordIn(data, errorback) {
        return request._post('/shop/purchase.ErpInventoryRecordIn/list', data, errorback);
    },
    /*入库记录撤销*/
    cancelErpInventoryRecordIn(data, errorback) {
        return request._post('/shop/purchase.ErpInventoryRecordIn/cancel', data, errorback);
    },
    /*入库记录删除*/
    deleteErpInventoryRecordIn(data, errorback) {
        return request._post('/shop/purchase.ErpInventoryRecordIn/delete', data, errorback);
    },
}

export default PurchaseApi;
