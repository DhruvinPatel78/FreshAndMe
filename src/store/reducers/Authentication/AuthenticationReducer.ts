import {initialAuthenticationState, initialLoggedIn} from './InitialAuthenticationState';
import {
    REGISTER_USER_ERROR,
    REGISTER_USER,
    CLEAR_REGISTER_USER,
    LOGIN_USER,
    LOGIN_USER_ERROR,
    AUTH_LOADING_START,
    AUTH_LOADING_STOP,
    LOGOUT_USER,
    SESSION_EXPIRE, CLEAR_REGISTER_ERROR, UPDATE_FCM_TOKEN,
} from '../../actionTypes/Authentication';
import {IAction} from "../../../common/interface/store/action/Action";
import {IAuthentication} from '../../interface/Authentication/AuthenticationInterface';

export default (
    state: IAuthentication = initialAuthenticationState,
    action: IAction
): IAuthentication => {
    switch (action.type) {
        case REGISTER_USER: {
            return {
                ...state,
                registered: action.payload
            }
            break;
        }
        case REGISTER_USER_ERROR: {
            return {
                ...state,
                error: action.payload
            }
            break;
        }
        case CLEAR_REGISTER_ERROR: {
            return {
                ...state,
                loading: false,
                error: '',
                registered: initialAuthenticationState.registered
            }
            break;
        }
        case LOGIN_USER: {
            console.log("STORE LOGGED IN", action.payload)
            return {
                ...state,
                loggedIn: action.payload,
                loading: false,
                error: '',
            }
            break;
        }
        case LOGOUT_USER: {
            console.log("USER LOGGED OUT")
            return {
                ...state,
                loggedIn: initialLoggedIn,
                loading: false,
                error: '',
                fcmToken: ''
            }
            break;
        }
        case SESSION_EXPIRE: {
            console.log("USER LOGGED OUT")
            return {
                ...state,
                loggedIn: initialLoggedIn,
                loading: false,
                error: '',
                fcmToken: ''
            }
            break;
        }
        case UPDATE_FCM_TOKEN: {
            console.log("USER LOGGED OUT")
            return {
                ...state,
                fcmToken: action.payload
            }
            break;
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
            break;
        }
        case CLEAR_REGISTER_USER: {
            return {
                ...state,
                registered: initialAuthenticationState.registered
            }
            break;
        }
        case AUTH_LOADING_START: {
            console.log("STORE LOADING START")
            return {
                ...state,
                loading: true
            }
            break;
        }
        case AUTH_LOADING_STOP: {
            return {
                ...state,
                loading: false
            }
            break;
        }
        default : return state;
    }
};
