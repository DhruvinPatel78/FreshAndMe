export interface IUserData {
	addresses: IAddress[],
};

export interface IAddress {
	addressId: string,
	address: string,
	pincode: string,
	landmark: string,
	isCurrent: string,
	latitude: string,
	longitude: string,
	isDefault: string,
	addressType: string,
	customAddress: string
}
