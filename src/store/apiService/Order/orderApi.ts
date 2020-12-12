import * as apiService from "../index";


export const addUserOrderAPI = (token: string, userId: number, strProduct: string, addressId: number, billAmount: number, orderType: string, orderToken: string) => {
    let payload = {
        userId,
        addressId,
        billAmount,
        strProduct,
        orderType,
        orderToken
    }
    let apiCall = `orderMaster/Order/insertData`;
    return apiService.post(apiCall, payload, {}, {
        "Authorization" : token
    });
};

/**
 * get User cart details Endpoint
 */
export const getUserOrderAPI = (userId: number, token: string, page: number) => {
    let payload = {
        userId,
        orderStatus: '',
        pageIndex: page,
        pageSize: 10
    }
    let apiCall = `orderMaster/Order/orderList`;
    return apiService.post(apiCall,payload, {}, {
        "Authorization" : token
    });
};
