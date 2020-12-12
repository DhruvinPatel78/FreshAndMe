import * as apiService from "../index";


/**
 * Get order data
 */
export const getProductListApi = (data: any) => {
    let apiCall = `Product/Product/fillData`;
    return apiService.post(apiCall,data);
};
