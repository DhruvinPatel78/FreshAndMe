import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IAddress} from '../store/interface/UserData/UserDataInterface';

export type RootStackParamList = {
	LoginScreen: undefined;
	RegisterScreen: undefined;
	HomeScreen: undefined;
	ItemListScreen: {
		selectedCategory: any;
	};
	ItemDetailScreen: {
		selectedCategory: any;
		selectedProduct: any;
	};
	CartScreen: undefined;
	PlaceOrderScreen: undefined;
	PaymentScreen: {
		amount: number;
		address: any;
	};
	LocationScreen: undefined;
	OrderScreen: undefined;
	ProfileScreen: undefined;
	NotificationScreen: undefined;
	ManageAddressScreen: {
		selectedAddress: IAddress;
	};
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;
export type NavigationProp = StackNavigationProp<RootStackParamList>;

type ItemListScreenRouteProp = RouteProp<RootStackParamList, 'ItemListScreen'>;
type ItemDetailScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetailScreen'>;
type CartScreenRouteProp = RouteProp<RootStackParamList, 'CartScreen'>;
type OrderScreenRouteProp = RouteProp<RootStackParamList, 'OrderScreen'>;
type PlaceOrderScreenRouteProp = RouteProp<RootStackParamList, 'PlaceOrderScreen'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;
type LocationScreenRouteProp = RouteProp<RootStackParamList, 'LocationScreen'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'RegisterScreen'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;
type NotificationScreenRouteProp = RouteProp<RootStackParamList, 'NotificationScreen'>;
type ManageAddressScreenRouteProp = RouteProp<RootStackParamList, 'ManageAddressScreen'>;

export type HomeScreenProps = {
	route: HomeScreenRouteProp;
	navigation: NavigationProp;
};

export type ItemListScreenProps = {
	route: ItemListScreenRouteProp;
	navigation: NavigationProp;
};

export type ItemDetailScreenProps = {
	route: ItemDetailScreenRouteProp;
	navigation: NavigationProp;
};

export type CartScreenProps = {
	route: CartScreenRouteProp;
	navigation: NavigationProp;
};

export type PlaceOrderScreenProps = {
	route: PlaceOrderScreenRouteProp;
	navigation: NavigationProp;
};

export type PaymentScreenProps = {
	route: PaymentScreenRouteProp;
	navigation: NavigationProp;
};

export type OrderScreenProps = {
	route: OrderScreenRouteProp;
	navigation: NavigationProp;
};

export type LocationScreenProps = {
	route: LocationScreenRouteProp;
	navigation: NavigationProp;
};

export type LoginScreenProps = {
	route: LoginScreenRouteProp;
	navigation: NavigationProp;
};

export type RegisterScreenProps = {
	route: RegisterScreenRouteProp;
	navigation: NavigationProp;
};

export type ProfileScreenProps = {
	route: ProfileScreenRouteProp;
	navigation: NavigationProp;
};

export type NotificationScreenProps = {
	route: NotificationScreenRouteProp;
	navigation: NavigationProp;
};

export type ManageAddressScreenProps = {
	route: ManageAddressScreenRouteProp;
	navigation: NavigationProp;
};
