export interface IAuthentication {
	registered: any,
	/**
	 * Registration Response
	 */
	loggedIn: ILoggedIn,
	/**
	 * error for CategoryList State
	 */
	error: string,
	/**
	 * Loading state of state
	 */
	loading: boolean
	fcmToken: string
};

export interface ILoggedIn {
	birthDate: string,
	deviceId: string,
	deviceType: string,
	firstName: string,
	isActive: number,
	isValid: number,
	lastName: string,
	mobileNo: string,
	token: string,
	userId: number
	userType: string,
}
