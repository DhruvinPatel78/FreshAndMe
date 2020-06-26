/**
 * It is root for store reducer
 */
import { combineReducers } from "redux";
import passwordManagerReducer from "./PasswordManager/PasswordManagerReducer";
import { IRootReducerState } from "../../common/interface/store/reducer/Reducer";

/**
 *  Combine all reducer here
 */
export default combineReducers<IRootReducerState>({
  passwordManagerReducer
});
