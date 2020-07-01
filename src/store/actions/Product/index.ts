import {GET_PRODUCT_LIST, GET_PRODUCT_LIST_ERROR,CLEAR_PRODUCT_LIST} from "../../actionTypes/Product";
import {getProductListApi} from "../../apiService/Product/productApi";


export const getProductList = (data:any) => {
    return (dispatch: any) => {
        getProductListApi({ ...data })
            .then((res: any) => {
                dispatch({
                    type: GET_PRODUCT_LIST,
                    payload: res.Data
                });
            })
            .catch((err:any) => {
                dispatch({
                    type: GET_PRODUCT_LIST_ERROR,
                    payload: err.response ? err.response.data.message : "Known error occured"
                });
            });
    };
};
export const clearProductList = () => {
    return (dispatch: any) => {
        dispatch({
            type: CLEAR_PRODUCT_LIST,
        });
    };
};
