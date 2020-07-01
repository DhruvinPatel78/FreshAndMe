import * as apiService from "../index";


/**
 * Login User Endpoint
 */
export const getCartListApi = (token:string) => {
    let apiCall = `Product/Cart/fillUserCart`;
    return apiService.post(apiCall, {
        userId:2,
        strTokenJson: "[{'userId':2'firstName':'Rujut','mobileNo':'9638076983','userType':'Admin'}]",
        token: token
    });
};
