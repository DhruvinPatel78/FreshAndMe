import {initialOrderState} from "./InitialOrderState";
import {
    GET_USER_ORDER_LIST,
    ADD_USER_ORDER, CLEAR_USER_ORDER_LIST,
} from '../../actionTypes/Order';
import {IAction} from "../../../common/interface/store/action/Action";
import {IOrderState} from '../../interface/Order/OrderInterface';

export default (
    state: IOrderState = initialOrderState,
    action: IAction
): IOrderState => {
    switch (action.type) {
        case GET_USER_ORDER_LIST: {
            return {
                ...state,
                orderList: state.orderList.concat(action.payload),
                loading: false,
                error: ''
            }
        }
        case CLEAR_USER_ORDER_LIST: {
            return {
                ...state,
                orderList: [],
                loading: false,
                error: ''
            }
        }
        default : return state;
    }
};
