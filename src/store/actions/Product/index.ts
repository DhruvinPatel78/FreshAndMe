import {
    GET_PRODUCT_LIST,
    GET_PRODUCT_LIST_PAGE,
    GET_PRODUCT_LIST_ERROR,
    CLEAR_PRODUCT_LIST
} from "../../actionTypes/Product";
import {getProductListApi} from "../../apiService/Product/productApi";


export const getProductList = (data:any, callBack: (status: boolean, msg: string) => void) => {
    return (dispatch: any) => {
        getProductListApi({ ...data })
            .then((res: any) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    callBack(true, '');
                  dispatch({
                    type: data.pageIndex === 1 ? GET_PRODUCT_LIST : GET_PRODUCT_LIST_PAGE,
                    payload: res.data
                  });
                } else if (data.pageIndex === 1) {
                    callBack(false, 'Product List Not Available.');
                }
            })
            .catch((err:any) => {
                callBack(false, err.response.data.message)
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
