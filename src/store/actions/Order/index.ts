import {
	ADD_USER_ORDER, CLEAR_USER_ORDER_LIST,
	GET_USER_ORDER_LIST, GET_USER_ORDER_LIST_ERROR, START_USER_ORDER_LOADING,
} from '../../actionTypes/Order';
import {
	addUserOrderAPI,
	getUserOrderAPI
} from '../../apiService/Order/orderApi';
import {GET_USER_CART_ERROR, GET_USER_CART_LIST} from '../../actionTypes/Cart';

export const addUserOrderAction = (token: string, userId: number, strProduct: string, addressId: number, amount: number, orderType: string, orderToken: string ,callBack: (response: string, msg?: string) => void) => {
	return (dispatch: any) => {
		callBack('loading');
		addUserOrderAPI(token, userId, strProduct, addressId, amount, orderType, orderToken)
			.then((response: any) => {
				if (response.status === '1') {
					callBack('success');
				} if (response.status === '00') {
					callBack('fail', 'Session Expire .!');
				}
			})
			.catch((error: any) => {
				callBack('fail', 'Something Went Wrong.');
				console.log(error.response.message);
			});
	};
};

export const getUserOrderList = (token: string, userId: number, page: number) => {
	return (dispatch: any) => {
		dispatch({type: START_USER_ORDER_LOADING});
		getUserOrderAPI(userId, token, page)
			.then((res: any) => {
				dispatch({
						type: GET_USER_ORDER_LIST,
						payload: res.data,
					});
			})
			.catch((err: any) => {
				dispatch({
					type: GET_USER_ORDER_LIST_ERROR,
					payload: err.response ? err.response.data.message : 'Known error occured',
				});
			});
	};
};

export const clearOrderList = () => {
	return (dispatch: any) => dispatch({type: CLEAR_USER_ORDER_LIST})
}
