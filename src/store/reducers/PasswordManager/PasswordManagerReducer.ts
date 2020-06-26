/**
 * PasswordManager Reducer
 */

import { initialPasswordManagerState } from "./InitialPasswordManagerState";
import {
  IProfile,
  IPasswordManagerState,
  IPassword
} from "../../interface/PasswordManager/PasswordManager";
import { IAction } from "../../../common/interface/store/action/Action";
import {
  SET_CURRENT_PROFILE,
  SET_PROFILE_LIST,
  SET_ERROR
} from "../../actionTypes/Profile/profileActionTypes";

/**
 *
 * PasswordManager reducer which handle all action related couriers
 *
 * @param state
 * @param action
 */
export default (
  state: IPasswordManagerState = initialPasswordManagerState,
  action: IAction
): IPasswordManagerState => {
  switch (action.type) {
    case SET_PROFILE_LIST: {
      return {
        ...state,
        profileList: action.payload
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    default : return state;
  }
};
