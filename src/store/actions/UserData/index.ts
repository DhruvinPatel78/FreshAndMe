import {
	ADD_ADDRESS, CHANGE_DEFAULT_ADDRESS,
	GET_ADDRESS,
	GET_ADDRESS_ERROR,
} from '../../actionTypes/UserData';
import {
	addUserAddressApi,
	changeUserDefaultAddressApi,
	getUserAddressApi,
} from '../../apiService/UserData/authenticationApi';
import {IAddress} from '../../interface/UserData/UserDataInterface';
import {
	initialHomeAddress,
	initialOtherAddress,
	initialWorkAddress,
} from '../../reducers/UserData/InitialUserDataState';
import {LOGOUT_USER, SESSION_EXPIRE} from '../../actionTypes/Authentication';


export const getUserAddressAction = (id: number, token: string, callBack: (response: string, msg: string) => void) => {
	return (dispatch: any) => {
		console.log('GET USER ADDRESS');
		getUserAddressApi(id, token)
			.then((res: any) => {
				console.log('GET ADDRESS RESPONSE');
				console.log(res);
				if (res.status === '1') {
					const homeAddress = res.data.filter((address: IAddress) => address.addressType === 'Home');
					const workAddress = res.data.filter((address: IAddress) => address.addressType === 'Work');
					const otherAddress = res.data.filter((address: IAddress) => address.addressType === 'Other');
					if (homeAddress.length > 0) {
						homeAddress[0].isDefault = homeAddress[0].isDefault === 1 ? "true" : "false";
						homeAddress[0].isCurrent = homeAddress[0].isCurrent === 1 ? "true" : "false";
					}
					if (workAddress.length > 0) {
						workAddress[0].isDefault = workAddress[0].isDefault === 1 ? "true" : "false";
						workAddress[0].isCurrent = workAddress[0].isCurrent === 1 ? "true" : "false";
					}
					if (otherAddress.length > 0) {
						otherAddress[0].isDefault = otherAddress[0].isDefault === 1 ? "true" : "false";
						otherAddress[0].isCurrent = otherAddress[0].isCurrent === 1 ? "true" : "false";
					}
					dispatch({
						type: GET_ADDRESS,
						payload: [
							homeAddress.length > 0 ? homeAddress[0] : initialHomeAddress,
							workAddress.length > 0 ? workAddress[0] : initialWorkAddress,
							otherAddress.length > 0 ? otherAddress[0] : initialOtherAddress,
						],
					});
				} else if(res.status === '2') {
					dispatch({
						type: GET_ADDRESS,
						payload: [ initialHomeAddress, initialWorkAddress, initialOtherAddress],
					});
				}
				else{
					if (res.status === '00') {
						dispatch({type: SESSION_EXPIRE});
					}
					callBack('fail', res.status === '00' ? 'Session Expire' : res.message);
				}
			})
			.catch((err: any) => {
				dispatch({
					type: GET_ADDRESS_ERROR,
					payload: err.response ? err.response.data.message : 'Known error occured',
				});
			});
	};
};

export const addUserAddressAction = (token: string, payload: any, callBack: (type: string) => void) => {
	return (dispatch: any) => {
		callBack('loading');
		addUserAddressApi(token, payload)
			.then((res: any) => {
				console.log(res);
				if (res.status === '1') {
					const data = {...payload};
					if (res.data.length > 0) {
						data.addressId = res.data[0].lastInsertedId;
					}
					dispatch({type: ADD_ADDRESS, payload: data});
					callBack('response');
				}
			})
			.catch((err: any) => {
				callBack('fail');
			});
	};
};

export const changeUserDefaultAddressAction = (token: string, payload: any, callBack: (response: string, msg: string) => void) => {
	return (dispatch: any) => {
		callBack('loading','');
		changeUserDefaultAddressApi(token, payload)
			.then((res: any) => {
				if (res.status === '1') {
					dispatch({type: CHANGE_DEFAULT_ADDRESS, payload: payload.addressId});
					callBack('success','');
				}
			})
			.catch((err: any) => {
				callBack('fail','Something went wrong.');
			});
	};
};
