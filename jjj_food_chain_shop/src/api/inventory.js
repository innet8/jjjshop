import request from '@/utils/request'

let InventoryApi = {

    /*库存管理*/
    getErpInventory(data, errorback) {
        return request._post('/shop/inventory.ErpInventory/list', data, errorback);
    },
    
    /*出库记录*/
    getErpInventoryRecordOut(data, errorback) {
        return request._post('/shop/inventory.ErpInventoryRecordOut/list', data, errorback);
    },

}

export default InventoryApi;
