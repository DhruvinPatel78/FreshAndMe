export interface IPassword {
  /**
   * id password
   */
  id: number;
  /**
   * title of title
   */
  title: string;
  /**
   * user_id of password
   */
  username: string;
  /**
   * password of password
   */
  password: string;
  /**
   * description of password
   */
  description: string;
  /**
   * comment of created_at
   */
  create_at: string;
  /**
   * comment of updated_at
   */
  updated_at: string;
};

export interface IProfile {
  /**
   * id profile
   */
  id: number;
  /**
   * title of title
   */
  title: string;
  /**
   * Password List for PasswordManager
   */
  passwordList: IPassword[],
};

export interface IPasswordManagerState {
  profileList: IProfile[],
  loading: Boolean,
  error: string
}
