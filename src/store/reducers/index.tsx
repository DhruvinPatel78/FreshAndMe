/**
 * It is root for store reducer
 */
import {combineReducers} from 'redux';
import passwordManagerReducer from './PasswordManager/PasswordManagerReducer';
import homeReducer from './Home/HomeReducer';
import productReducer from './Product/PoductReducer';
import authentication from './Authentication/AuthenticationReducer'
import cartReducer from './Cart/CartReducer'
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';

/**
 *  Combine all reducer here
 */
export default combineReducers<IRootReducerState>({
  passwordManagerReducer,
  homeReducer,
  productReducer,
  authentication,
  cartReducer
});
