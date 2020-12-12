import {
	GET_USER_CART_LIST,
	GET_USER_CART_ERROR,
	START_USER_CART_LOADING,
	UPDATE_CART_PRODUCT_QTY,
	DELETE_CART_PRODUCT,
	CLEAR_CART_LIST,
} from '../../actionTypes/Cart';
import {addToCartApi, deleteCartProductApi, getCartListApi, updateCartProductQty} from '../../apiService/Cart/cartsApi';
import {SESSION_EXPIRE} from '../../actionTypes/Authentication';

export const addToCartAction = (user: any, productId: number, qty: number, productQtyId: number, callBack: (response: string, msg?: string) => void) => {
	return (dispatch: any) => {
		callBack('loading');
		addToCartApi(user, productId, qty, productQtyId)
			.then((response: any) => {
				if (response.status === '1') {
					callBack('success');
				} else {
					if (response.status === '00') {
						dispatch({ type: SESSION_EXPIRE })
					}
					callBack('fail', response.status === '00' ? 'Session Expire' :response.message);
				}
			})
			.catch((error: any) => {
				callBack('fail', 'Something Went Wrong.');
				console.log(error.response.message);
			});
	};
};

export const getCartList = (userId: number, token: string) => {
	console.log('GET CART ACTION =====>');
	return (dispatch: any) => {
		dispatch({type: START_USER_CART_LOADING});
		getCartListApi(userId, token)
			.then((res: any) => {
				console.log(res)
				if (res.status === '1' || res.status === '2') {
					dispatch({
						type: GET_USER_CART_LIST,
						payload: res.data,
					})
				}
				if (res.status === '00') {
					dispatch({ type: SESSION_EXPIRE })
				}
			})
			.catch((err: any) => {
				dispatch({
					type: GET_USER_CART_ERROR,
					payload: err.response ? err.response.data.message : 'Known error occured',
				});
			});
	};
};

export const updateCartProductQtyAction = (qty: number, productQtyId: number, userState: any, cartId: number) => {
	return (dispatch: any) => {
		const payload = {
			productQtyId: productQtyId,
			qty,
			cartId,
		};
		updateCartProductQty(payload, userState.token)
			.then((res: any) => {
				if (res.status === '1') {
					const payload = {cartId, qty, productQtyId};
					dispatch({type: UPDATE_CART_PRODUCT_QTY, payload});
				}
			})
			.catch((err: any) => {
				console.log(err);
			});
	};
};

export const deleteCartProductQtyAction = (cartId: number, token: string, callBack: (response: string, msg?: string) => void) => {
	return (dispatch: any) => {
		callBack('loading');
		deleteCartProductApi({cartId}, token)
			.then((res: any) => {
				if (res.status === '1') {
					callBack('success');
					dispatch({type: DELETE_CART_PRODUCT, payload: cartId});
				}
			})
			.catch((err: any) => {
				callBack('fail', 'Something Went Wrong.');
				console.log(err);
			});
	};
};

export const clearCartList = () => {
	return (dispatch: any) => {
		dispatch({type: CLEAR_CART_LIST});
	};
}
