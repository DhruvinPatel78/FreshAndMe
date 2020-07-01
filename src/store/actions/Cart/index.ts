import {GET_USER_CART_LIST,GET_USER_CART_ERROR} from "../../actionTypes/Cart";
import {getCartListApi} from "../../apiService/Cart/cartsApi";



export const getCartList = (token:string) => {
    return (dispatch: any) => {
        getCartListApi(token)
            .then((res: any) => {
                dispatch({
                    type: GET_USER_CART_LIST,
                    payload: res.Data
                });
            })
            .catch((err:any) => {
                dispatch({
                    type: GET_USER_CART_ERROR,
                    payload: err.response ? err.response.data.message : "Known error occured"
                });
            });
    };
};
