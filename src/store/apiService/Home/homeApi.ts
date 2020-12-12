import * as apiService from "../index";


/**
 * Get order data
 */
export const getCategoryListApi = (data: any) => {
    let apiCall = `CategoryMaster/Category/fillData`;
    return apiService.post(apiCall,data);
};


export const getBannersApi = (data: any) => {
    let apiCall = `CategoryMaster/Banner/fillData`;
    return apiService.post(apiCall,data);
};
