import {IUserData} from '../../interface/UserData/UserDataInterface';

export const initialHomeAddress = {
	addressId: '0',
	address: '',
	pincode: '',
	landmark: '',
	isCurrent: '',
	latitude: '',
	longitude: '',
	isDefault: '',
	addressType: 'Home',
	customAddress: '',
}

export const initialWorkAddress = {
	addressId: '0',
	address: '',
	pincode: '',
	landmark: '',
	isCurrent: '',
	latitude: '',
	longitude: '',
	isDefault: '',
	addressType: 'Work',
	customAddress: '',
}

export const initialOtherAddress = {
	addressId: '0',
	address: '',
	pincode: '',
	landmark: '',
	isCurrent: '',
	latitude: '',
	longitude: '',
	isDefault: '',
	addressType: 'Other',
	customAddress: '',
}

export const initialUserData: IUserData = {
	addresses: [initialHomeAddress, initialWorkAddress, initialOtherAddress],
};


