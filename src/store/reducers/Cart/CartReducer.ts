import {initialCartState} from "./InitialCartState";
import {
    ADD_CART_PRODUCT,
    CLEAR_CART_LIST,
    DELETE_CART_PRODUCT,
    GET_USER_CART_ERROR,
    GET_USER_CART_LIST,
    START_USER_CART_LOADING,
    UPDATE_CART_PRODUCT_QTY,
} from '../../actionTypes/Cart';
import {IAction} from "../../../common/interface/store/action/Action";
import {ICart} from '../../interface/Cart/CartInterface';
import {act} from 'react-test-renderer';

export default (
    state: ICart = initialCartState,
    action: IAction
): ICart => {
    switch (action.type) {
        case GET_USER_CART_LIST: {
            return {
                ...state,
                cartList: action.payload,
                loading: false,
                error: ''
            }
        }
        case START_USER_CART_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_USER_CART_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        }
        case UPDATE_CART_PRODUCT_QTY: {
            console.log("REDUCER ===>")
            const cartList = state.cartList.map((product: any) => {
                if (product.productQtyId === action.payload.productQtyId && product.cartId === action.payload.cartId) {
                    product.qty = action.payload.qty
                }
                return product
            })
            return {
                ...state,
                cartList: cartList
            }
        }
        case ADD_CART_PRODUCT: {
            const cartList = [...state.cartList]
            cartList.push(action.payload)
            return {
                ...state,
                cartList: cartList
            }
        }

        case DELETE_CART_PRODUCT: {
            const cartList = state.cartList.filter((product: any) => product.cartId !== action.payload)
            return {
                ...state,
                cartList: cartList
            }
        }
        case CLEAR_CART_LIST: {
            return {
                ...state,
                cartList: []
            }
        }
        default : return state;
    }
};
