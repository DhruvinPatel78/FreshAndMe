import * as apiService from "../index";


/**
 * Get order data
 */
export const getProductDetailApi = (data: any, token: string) => {
    let apiCall = `Product/Product/fillProductDetail`;
    return apiService.post(apiCall,data, {}, {
        "Authorization" : token
    });
};
