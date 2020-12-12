import {initialUserData} from './InitialUserDataState';
import {
	ADD_ADDRESS, CHANGE_DEFAULT_ADDRESS,
	GET_ADDRESS,
} from '../../actionTypes/UserData';
import {IAction} from '../../../common/interface/store/action/Action';
import {IAddress, IUserData} from '../../interface/UserData/UserDataInterface';

export default (
	state: IUserData = initialUserData,
	action: IAction,
): IUserData => {
	switch (action.type) {
		case GET_ADDRESS: {
			console.log("GET ADDRESS ====>")
			console.log(action.payload)
			return {
				...state,
				addresses: action.payload
			};
			break;
		}
		case ADD_ADDRESS: {
			delete action.payload.userId;
			console.log('REDUCER===>');
			console.log(action.payload);
			return {
				...state,
				addresses: state.addresses.map((address: IAddress) => {
					if (address.addressType === action.payload.addressType) {
						address = {...action.payload};
					}
					return address;
				}),
			};
			break;
		}
		case CHANGE_DEFAULT_ADDRESS: {
			console.log("REDUCER PAYLOAD===>")
			console.log(typeof action.payload)
			console.log("REDUCER DATA ===>")
			console.log(typeof state.addresses[0].addressId)
			return {
				...state,
				addresses: state.addresses.map((address: IAddress) => {
					if (address.addressId.toString() === action.payload) {
						address.isDefault = "true";
					} else  {
						address.isDefault = "false";
					}
					return address;
				}),
			};
			break;
		}
		default :
			return state;
	}
};
