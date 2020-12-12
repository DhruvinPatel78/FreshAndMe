/**
 * It is root for store reducer
 */
import {combineReducers} from 'redux';
import homeReducer from './Home/HomeReducer';
import productReducer from './Product/PoductReducer';
import authentication from './Authentication/AuthenticationReducer'
import cartReducer from './Cart/CartReducer'
import UserDataReducer from './UserData/UserDataReducer'
import orderReducer from './Order/OrderReducer'
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';

/**
 *  Combine all reducer here
 */
export default combineReducers<IRootReducerState>({
  homeReducer,
  productReducer,
  authentication,
  cartReducer,
  UserDataReducer,
  orderReducer
});
