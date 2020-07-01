import * as apiService from "../index";


/**
 * Register User Data
 */
export const registerUserApi = (firstName:string,lastName:string,mobileNo:string,password:string) => {
    let apiCall = `UserMaster/User/userRegister`;
    return apiService.post(apiCall, {
        firstName:firstName,
        lastName:lastName,
        mobileNo:mobileNo,
        password:password,
        birthDate:"01/01/1995",
        userType:"User",
        isValid:"false",
        isActive:"true"
    });
};

/**
 * Login User Endpoint
 */
export const loginUserApi = (mobileNo:string,password:string) => {
    let apiCall = `UserMaster/User/userLogin`;
    return apiService.post(apiCall, {
        mobileNo:mobileNo,
        password:password,
    });
};

