import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import Color from '../common/color/color';
import {RootStackParamList} from './PropType';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ItemListScreen from '../screens/ItemListScreen/ItemListScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen/ItemDetailScreen';
import CartScreen from '../screens/CartScreen/CartScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen/PlaceOrderScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import LocationScreen from '../screens/LocationScreen/LocationScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';
import {useSelector} from 'react-redux';
import {IRootReducerState} from '../common/interface/store/reducer/Reducer';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import ManageAddressScreen from '../screens/ManageAddress/ManageAddress';

const Stack = createStackNavigator<RootStackParamList>();

const defaultNavigationOptions: StackNavigationOptions = {
	headerStyle: {
		backgroundColor: Color.whiteColor,
		elevation: 0,
	},
	headerBackTitle: 'Back',
	headerTintColor: Color.secondaryColor,
	headerTitleAlign: 'center',
};

const navigation: React.FC<any> = (props: {fcmTokenMatched: boolean}) => {

	console.log(props)
	const authReducer = useSelector((state: IRootReducerState) => state.authentication);

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={defaultNavigationOptions}>
				{authReducer.loggedIn.token === '' && <>
					<Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
					<Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerTitle: ''}}/>
				</>
				}
				<Stack.Screen name="HomeScreen" component={HomeScreen}/>
				<Stack.Screen name="ItemListScreen" component={ItemListScreen}/>
				<Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen}/>
				{authReducer.loggedIn.token !== '' && <>
					<Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
					<Stack.Screen name="CartScreen" component={CartScreen}/>
					<Stack.Screen name="PlaceOrderScreen" component={PlaceOrderScreen}/>
					<Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
					<Stack.Screen name="LocationScreen" component={LocationScreen}/>
					<Stack.Screen name="OrderScreen" component={OrderScreen}/>
					<Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
					<Stack.Screen name="ManageAddressScreen" component={ManageAddressScreen}/>
				</>
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default navigation;
