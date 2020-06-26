/**
 * Register root reducer state here
 */
import {IPasswordManagerState} from '../../../../store/interface/PasswordManager/PasswordManager';

export interface IRootReducerState {
  /**
   * PasswordManager Reducer state
   */
  passwordManagerReducer: IPasswordManagerState;
}
