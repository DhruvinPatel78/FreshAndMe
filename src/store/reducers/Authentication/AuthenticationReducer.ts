import {initialAuthenticationState} from "./InitialAuthenticationState";
import {
    REGISTER_USER_ERROR,
    REGISTER_USER,
    CLEAR_REGISTER_USER,
    LOGIN_USER,
    LOGIN_USER_ERROR
} from "../../actionTypes/Authentication";
import {IAction} from "../../../common/interface/store/action/Action";

export default (
    state: any = initialAuthenticationState,
    action: IAction
): any => {
    switch (action.type) {
        case REGISTER_USER: {
            return {
                ...state,
                registered: action.payload
            }
        }
        case REGISTER_USER_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case LOGIN_USER: {
            return {
                ...state,
                loggedIn: action.payload
            }
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case CLEAR_REGISTER_USER: {
            return {
                ...state,
                registered: initialAuthenticationState.registered
            }
        }
        default : return state;
    }
};
