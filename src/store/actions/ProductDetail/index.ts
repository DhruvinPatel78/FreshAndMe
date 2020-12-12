import {
    GET_PRODUCT_DETAIL,
    START_PRODUCT_DETAIL_LOADING,
    PRODUCT_DETAIL_ERROR,
} from "../../actionTypes/ProductDetail";
import {getProductDetailApi} from "../../apiService/ProductDetail/productDetailApi";


export const getProductDetailAction = (data:any, token: string) => {
    return (dispatch: any) => {
        dispatch({ type: START_PRODUCT_DETAIL_LOADING })
        getProductDetailApi({ ...data }, token)
            .then((res: any) => {
                dispatch({
                    type: GET_PRODUCT_DETAIL,
                    payload: res.data
                });
            })
            .catch((err:any) => {
                dispatch({
                    type: PRODUCT_DETAIL_ERROR,
                    payload: err.response ? err.response.data.message : "Known error occured"
                });
            });
    };
};

