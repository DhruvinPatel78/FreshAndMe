import { IPasswordManagerState } from "../../interface/PasswordManager/PasswordManager";

export const initialPasswordManagerState: IPasswordManagerState = {
  /**
   * List of Profiles
   */
  profileList: [],
  /**
   * error for PasswordManager State
   */
  error: ''
  ,
  /**
   * Loading state of state
   */
  loading: false
};
