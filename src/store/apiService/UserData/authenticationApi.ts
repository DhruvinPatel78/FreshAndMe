import * as apiService from '../index';

export const getUserAddressApi = (userId: number, token: string) => {
	let apiCall = `UserMaster/Address/fillUserAddress`;
	return apiService.post(apiCall, {userId}, {}, {
		'Authorization': token,
	});
};

/**
 * Login User Endpoint
 */
export const addUserAddressApi = (token: string, payload: any) => {
	console.log("Payload")
	console.log(payload)
	let apiCall = `UserMaster/Address/insertData	`;
	return apiService.post(apiCall, payload, {}, {
		'Authorization': token,
	});
};

export const changeUserDefaultAddressApi = (token: string, payload: any) => {
	console.log("Payload")
	console.log(payload)
	let apiCall = `UserMaster/Address/updateAddress`;
	return apiService.post(apiCall, payload, {}, {
		'Authorization': token,
	});
};

