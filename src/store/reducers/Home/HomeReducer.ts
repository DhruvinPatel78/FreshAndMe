import {initialHomeState} from "./InitialHomeState";
import {
    CLEAR_CATEGORY_LIST,
    GET_BANNERS,
    GET_BANNERS_ERROR,
    GET_CATEGORY_LIST,
    GET_CATEGORY_LIST_ERROR,
    GET_CATEGORY_LIST_PAGE,
} from '../../actionTypes/Home';
import {IAction} from "../../../common/interface/store/action/Action";


export default (
    state: any = initialHomeState,
    action: IAction
): any => {
    switch (action.type) {
        case CLEAR_CATEGORY_LIST: {
            return {
                ...state,
                categoryList: [],
                error: ''
            }
        }
        case GET_CATEGORY_LIST: {
            return {
                ...state,
                categoryList: action.payload
            }
        }
        case GET_CATEGORY_LIST_PAGE: {
            return {
                ...state,
                categoryList: state.categoryList.concat(action.payload)
            }
        }
        case GET_CATEGORY_LIST_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case GET_BANNERS: {
            return {
                ...state,
                bannersList: action.payload
            }
        }
        case GET_BANNERS_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default : return state;
    }
};
