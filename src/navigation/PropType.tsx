import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ItemListScreen: {
    selectedCategory: any;
  };
  ItemDetailScreen: {
    selectedCategory: any;
    selectedItem: any;
  };
  CartScreen: undefined;
  PlaceOrderScreen: undefined;
  PaymentScreen: undefined;
  LocationScreen: undefined;
  OrderScreen: undefined;
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type ItemListScreenRouteProp = RouteProp<RootStackParamList, 'ItemListScreen'>;
export type ItemListScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type ItemDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ItemDetailScreen'
>;
export type ItemDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type CartScreenRouteProp = RouteProp<RootStackParamList, 'CartScreen'>;
export type CartScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type OrderScreenRouteProp = RouteProp<RootStackParamList, 'OrderScreen'>;
export type OrderScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type PlaceOrderScreenRouteProp = RouteProp<
  RootStackParamList,
  'PlaceOrderScreen'
>;
export type PlaceOrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type LocationScreenRouteProp = RouteProp<RootStackParamList, 'LocationScreen'>;
export type LocationScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'RegisterScreen'>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;
export type PaymentScreenNavigationProp = StackNavigationProp<
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

export type ItemListScreenProps = {
  route: ItemListScreenRouteProp;
  navigation: ItemListScreenNavigationProp;
};

export type ItemDetailScreenProps = {
  route: ItemDetailScreenRouteProp;
  navigation: ItemDetailScreenNavigationProp;
};

export type CartScreenProps = {
  route: CartScreenRouteProp;
  navigation: CartScreenNavigationProp;
};

export type PlaceOrderScreenProps = {
  route: PlaceOrderScreenRouteProp;
  navigation: PlaceOrderScreenNavigationProp;
};

export type PaymentScreenProps = {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
};

export type OrderScreenProps = {
  route: OrderScreenRouteProp;
  navigation: OrderScreenNavigationProp;
};

export type LocationScreenProps = {
  route: LocationScreenRouteProp;
  navigation: LocationScreenNavigationProp;
};

export type LoginScreenProps = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

export type RegisterScreenProps = {
  route: RegisterScreenRouteProp;
  navigation: RegisterScreenNavigationProp;
};
