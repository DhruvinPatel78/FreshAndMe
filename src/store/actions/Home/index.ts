import {GET_BANNERS, GET_BANNERS_ERROR, GET_CATEGORY_LIST, GET_CATEGORY_LIST_ERROR} from "../../actionTypes/Home";
import {getCategoryListApi,getBannersApi} from "../../apiService/Home/homeApi";

export const getCategoryList = (data:any) => {

    return (dispatch: any) => {

        getCategoryListApi({ ...data })
            .then((res: any) => {
                dispatch({
                    type: GET_CATEGORY_LIST,
                    payload: res.Data
                });
            })
            .catch((err:any) => {
                dispatch({
                    type: GET_CATEGORY_LIST_ERROR,
                    payload: err.response ? err.response.data.message : "Known error occured"
                });
            });
    };
};

export const getBanners = (data:any) => {

    return (dispatch: any) => {
        getBannersApi({ ...data })
            .then((res: any) => {
                dispatch({
                    type: GET_BANNERS,
                    payload: res.Data
                });
            })
            .catch((err:any) => {
                dispatch({
                    type: GET_BANNERS_ERROR,
                    payload: err.response ? err.response.data.message : "Known error occured"
                });
            });
    };
};
