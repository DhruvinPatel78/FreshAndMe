import * as apiService from "../index";


export const addToCartApi = (user: any, productId: number, qty: number, productQtyId: number) => {
    let payload = {
        cartId: 0,
        productId,
        userId: user.userId,
        qty,
        productQtyId
    }
    let apiCall = `Product/Cart/insertData`;
    return apiService.post(apiCall, payload, {}, {
        "Authorization" : user.token
    });
};

/**
 * get User cart details Endpoint
 */
export const getCartListApi = (userId: number,token:string) => {
    let payload = {
        userId,
    }
    let apiCall = `Product/Cart/fillUserCart`;
    return apiService.post(apiCall,payload, {}, {
        "Authorization" : token
    });
};

/**
 * update cart product API User Endpoint
 */
export const updateCartProductQty = (payload: any, token: number) => {
    console.log("API CALL=====>", payload);
    let apiCall = `Product/Cart/getQty`;
    return apiService.post(apiCall, payload, {},{
        "Authorization" : token
    });
};

export const deleteCartProductApi = (payload: any, token: string) => {
    console.log("API CALL=====>", payload);
    let apiCall = `Product/Cart/deleteData`;
    return apiService.post(apiCall, payload, {},{
        "Authorization" : token
    });
};
