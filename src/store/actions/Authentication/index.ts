import {
    REGISTER_USER,
    REGISTER_USER_ERROR,
    CLEAR_REGISTER_USER,
    LOGIN_USER,
    LOGIN_USER_ERROR
} from "../../actionTypes/Authentication";
import {registerUserApi,loginUserApi} from "../../apiService/Authentication/authenticationApi";


export const registerUser = (firstName:string,lastName:string,mobileNo:string,password:string) => {
    return (dispatch: any) => {
        registerUserApi(firstName,lastName,mobileNo,password)
            .then((res: any) => {
                dispatch({
                    type: REGISTER_USER,
                    payload: res
                });
            })
            .catch((err:any) => {
                dispatch({
                    type: REGISTER_USER_ERROR,
                    payload: err.response ? err.response.data.message : "Known error occured"
                });
            });
    };
};
export const loginUser = (mobileNo:string,password:string,callBack: any) => {
    return (dispatch: any) => {
        loginUserApi(mobileNo,password)
            .then((res: any) => {
                callBack(res);
            })
            .catch((err:any) => {
                dispatch({
                    type: LOGIN_USER_ERROR,
                    payload: err.response ? err.response.data.message : "Known error occured"
                });
            });
    };
};
export const clearRegisteredUser = () => {
    return (dispatch: any) => {
        dispatch({type: CLEAR_REGISTER_USER,});
    };
};
