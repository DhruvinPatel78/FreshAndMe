import {initialProductState} from "./InitialProductState";
import {CLEAR_PRODUCT_LIST, GET_PRODUCT_LIST, GET_PRODUCT_LIST_ERROR} from "../../actionTypes/Product";
import {IAction} from "../../../common/interface/store/action/Action";
import {GET_CATEGORY_LIST_PAGE} from '../../actionTypes/Home';

export default (
    state: any = initialProductState,
    action: IAction
): any => {
    switch (action.type) {
        case GET_PRODUCT_LIST: {
            return {
                ...state,
                productList: action.payload
            }
        }
        case GET_CATEGORY_LIST_PAGE: {
            return {
                ...state,
                productList: state.productList.concat(action.payload)
            }
        }
        case GET_PRODUCT_LIST_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case CLEAR_PRODUCT_LIST: {
            return {
                ...state,
                productList: []
            }
        }
        default : return state;
    }
};
