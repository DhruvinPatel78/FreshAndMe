import {
	REGISTER_USER,
	REGISTER_USER_ERROR,
	CLEAR_REGISTER_USER,
	LOGIN_USER,
	LOGIN_USER_ERROR, AUTH_LOADING_START, LOGOUT_USER, SESSION_EXPIRE, CLEAR_REGISTER_ERROR, UPDATE_FCM_TOKEN,
} from '../../actionTypes/Authentication';
import {registerUserApi, loginUserApi, updateUserDataApi} from '../../apiService/Authentication/authenticationApi';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {CLEAR_CART_LIST} from '../../actionTypes/Cart';


export const registerUser = (firstName: string, lastName: string, mobileNo: string, password: string, fcmToken: string) => {
	return (dispatch: any) => {
		registerUserApi(firstName, lastName, mobileNo, password, fcmToken)
			.then((res: any) => {
				if (res.status === "3") {
					dispatch({
						type: REGISTER_USER_ERROR,
						payload: res.message,
					})
				} else if (res.status === '1') {
					dispatch({
						type: REGISTER_USER,
						payload: res.status,
					});
				}
			})
			.catch((err: any) => {
				dispatch({
					type: REGISTER_USER_ERROR,
					payload: err.response ? err.response.data.message : 'Known error occured',
				});
			});
	};
};

export const loginUser = (mobileNo: string, password: string, fcmToken: string, callBack:(loading: boolean) => void) => {
	return (dispatch: any) => {
		// dispatch({type: AUTH_LOADING_START});
		callBack(true)
		loginUserApi(mobileNo, password, fcmToken)
			.then((res: any) => {
				if (res.status === '1') {
					res.data.password = password;
					console.log(res.data);
					AsyncStorage.setItem('@token', res.data.token).then(() => {
						dispatch({
							type: LOGIN_USER,
							payload: res.data,
						});
					});
				} else if(res.status === '2') {
					dispatch({
						type: LOGIN_USER_ERROR,
						payload: 'Invalid Phone Number or Password',
					});
				}
				callBack(false)
			})
			.catch((err: any) => {
				dispatch({
					type: LOGIN_USER_ERROR,
					payload: err.response ? err.response.data.message : 'Known error occured',
				});
				callBack(false)
			});
	};
};

export const editUserData = (userData: any, callBack:(status: string, msg?: string) => void) => {
	return (dispatch: any) => {
		callBack('loading');
		updateUserDataApi(userData)
			.then((res: any) => {
				if (res.status === '1') {
					AsyncStorage.setItem('@token', userData.token).then(() => {
						dispatch({
							type: LOGIN_USER,
							payload: userData,
						});
						callBack('success');
					});
				}else if (res.status === '3') {
					callBack('fail', 'Data Already Exist.');
				}
			})
			.catch((err: Error) => {
				callBack('fail', err.message);
			});
	};
};

export const logoutUserAction = () => {
	return (dispatch: any) => {
		console.log('ACTION LOGOUT');
		dispatch({type: LOGOUT_USER});
		dispatch({type: CLEAR_CART_LIST});
	};
};

export const clearRegisteredUser = () => {
	return (dispatch: any) => {
		dispatch({type: CLEAR_REGISTER_USER});
	};
};

export const clearError = () => {
	return (dispatch: any) => {
		dispatch({type: CLEAR_REGISTER_ERROR});
	};
};

export const sessionExpire = () => {
	return (dispatch: any) => {
		dispatch({type: SESSION_EXPIRE});
	};
};

export const updateFCMToken = (token: string) => {
	return (dispatch: any) => {
		dispatch({type: UPDATE_FCM_TOKEN, payload: token});
	};
}
