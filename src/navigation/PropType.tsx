import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'RegisterScreen'>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

// type PasswordListRouteProp = RouteProp<RootStackParamList, 'PasswordList'>;
// export type PasswordListNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'PasswordList'
// >;

export type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export type LoginScreenProps = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

export type RegisterScreenProps = {
  route: RegisterScreenRouteProp;
  navigation: RegisterScreenNavigationProp;
};
