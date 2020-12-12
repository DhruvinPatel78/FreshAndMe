import {IAuthentication, ILoggedIn} from '../../interface/Authentication/AuthenticationInterface';

export const initialLoggedIn: ILoggedIn = {
    birthDate: '',
    deviceId: '',
    deviceType: '',
    firstName: '',
    isActive: 0,
    isValid: 0,
    lastName: '',
    mobileNo: '',
    token: '',
    userId: 0,
    userType: '',
}

export const initialAuthenticationState: IAuthentication = {
    /**
     * Registration Response
     */
    registered: undefined,
    /**
     * Registration Response
     */
    loggedIn: initialLoggedIn,
    /**
     * error for CategoryList State
     */
    error: ''
    ,
    /**
     * Loading state of state
     */
    loading: false,
    fcmToken: ''
};
