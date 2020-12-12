/**
 * Register root reducer state here
 */
import {IAuthentication} from '../../../../store/interface/Authentication/AuthenticationInterface';
import {IUserData} from '../../../../store/interface/UserData/UserDataInterface';
import {ICart} from '../../../../store/interface/Cart/CartInterface';
import {IOrderState} from '../../../../store/interface/Order/OrderInterface';

export interface IRootReducerState {
  homeReducer:any,
  productReducer:any,
  authentication: IAuthentication,
  cartReducer: ICart,
  UserDataReducer: IUserData,
  orderReducer: IOrderState
}
