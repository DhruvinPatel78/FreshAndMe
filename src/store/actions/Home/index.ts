import {
	CLEAR_CATEGORY_LIST,
	GET_BANNERS,
	GET_BANNERS_ERROR,
	GET_CATEGORY_LIST,
	GET_CATEGORY_LIST_ERROR,
	GET_CATEGORY_LIST_PAGE,
} from '../../actionTypes/Home';
import {getCategoryListApi, getBannersApi} from '../../apiService/Home/homeApi';

export const getCategoryList = (data: any, callBack: (status: boolean, msg: string) => void) => {
	return (dispatch: any) => {
		getCategoryListApi(data)
			.then((res: any) => {
				console.log('RESPONSE ====>Category')
				console.log(res)
				if (res.data.length > 0) {
					callBack(true, '');
				} else if (data.pageIndex === 1) {
					callBack(false, 'Categories Not Available.');
				}
				dispatch({
					type: data.pageIndex === 1 ? GET_CATEGORY_LIST : GET_CATEGORY_LIST_PAGE,
					payload: res.data,
				});
			})
			.catch((err: any) => {
				callBack(false, err.response ? err.response.data.message : 'Known error occured');
				dispatch({
					type: GET_CATEGORY_LIST_ERROR,
					payload: err.response ? err.response.data.message : 'Known error occured',
				});
			});
	};
};

export const clearCategoryList = () => {
	return (dispatch: any) => dispatch({type: CLEAR_CATEGORY_LIST});
};

export const getBanners = (data: any, callBack: (status: boolean, msg: string) => void) => {
	return (dispatch: any) => {
		getBannersApi(data)
			.then((res: any) => {
				console.log('RESPONSE ====>Banner')
				console.log(res)
				callBack(true, '');
				dispatch({
					type: GET_BANNERS,
					payload: res.data,
				});
			})
			.catch((err: any) => {
				callBack(false, err.response ? err.response.data.message : 'Known error occured');
				dispatch({
					type: GET_BANNERS_ERROR,
					payload: err.response ? err.response.data.message : 'Known error occured',
				});
			});
	};
};
