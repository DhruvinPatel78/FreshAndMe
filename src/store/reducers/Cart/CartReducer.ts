import {initialCartState} from "./InitialCartState";
import {GET_USER_CART_ERROR,GET_USER_CART_LIST} from "../../actionTypes/Cart";
import {IAction} from "../../../common/interface/store/action/Action";

export default (
    state: any = initialCartState,
    action: IAction
): any => {
    switch (action.type) {
        case GET_USER_CART_LIST: {
            return {
                ...state,
                cartList: action.payload
            }
        }
        case GET_USER_CART_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default : return state;
    }
};
