import * as React from 'react';
import {Text, SafeAreaView, Alert, View} from 'react-native';
import {Style} from './Style/Style';
import {
	PaymentScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import color from '../../common/color/color';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import CashfreePG from 'cashfreereactnativepg';
import Loader from '../../component/Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {addUserOrderAction, clearOrderList} from '../../store/actions/Order';
import {Snackbar} from 'react-native-paper';
import {clearCartList} from '../../store/actions/Cart';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaymentScreen: React.FC<PaymentScreenProps> = ({route, navigation}) => {

	const Navigation = useNavigation<NavigationProp>();
	const [orderId, setOrderId] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const [cftoken, setCftoken] = useState<string>('');

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const dispatch = useDispatch();

	const authReducer = useSelector((state: IRootReducerState) => state.authentication.loggedIn);
	const cartReducer = useSelector((state: IRootReducerState) => state.cartReducer);

	const navigateToOrder = (eventData: any) => {
		if (JSON.parse(eventData).txStatus === 'CANCELLED') {
			Navigation.goBack();
		} else {
			placeOrder(JSON.parse(eventData).referenceId);
		}
	};

	const resetSnackBar = () => {
		setSnackbarVisible(false);
		setSnackbarMsg('');
	};

	const placeOrder = (referenceId: string) => {
		const strProduct: any[] = [];
		cartReducer.cartList.forEach((product: any) => {
			strProduct.push({
				cartId: product.cartId,
				productId: product.productId,
				qty: product.qty,
				productQtyId: product.productQtyId,
			});
		});
		dispatch(addUserOrderAction(authReducer.token, authReducer.userId, JSON.stringify(strProduct), route.params.address, amount, 'digital', referenceId, (response: string, msg?: string) => {
			switch (response) {
				case 'loading': {
					setSnackbarMsg('Loading....');
					setSnackbarVisible(true);
					break;
				}
				case 'success': {
					setSnackbarMsg('');
					setSnackbarVisible(false);
					dispatch(clearOrderList());
					Navigation.replace('OrderScreen');
					dispatch(clearCartList());
					break;
				}
				case 'fail': {
					setSnackbarMsg(msg ? msg : '');
					setSnackbarVisible(true);
					break;
				}
			}
		}));
	};

	Navigation.setOptions({
		headerShown: false,
	});

	useEffect(() => {
		setAmount(route.params.amount);
		setOrderId(ganerateOrderId());
	}, []);

	useEffect(() => {
		if (orderId !== '') {
			axios.post('https://test.cashfree.com/api/v2/cftoken/order', {
				orderId: orderId,
				orderAmount: amount,
				orderCurrency: 'INR',
			}, {
				headers: {
					'x-client-id': '203653335677a4683456236a856302',
					'x-client-secret': '8b1392aed1ab188c06d6473613343cae0e795f39',
					'Content-Type': 'application/json',
				},
			}).then((response) => {
				console.log(response.data);
				if (response.data.status === 'OK') {
					setCftoken(response.data.cftoken);
				}
			});
		}
	}, [orderId]);

	const ganerateOrderId = () => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i <= 10; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	};

	return (
		<SafeAreaView style={Style.container}>
			{!cftoken ? <Loader/> :
				<CashfreePG
					appId="203653335677a4683456236a856302"
					orderId={orderId}
					orderAmount={amount.toString()}
					orderNote="This is an order note"
					source="reactsdk"
					customerName={authReducer.firstName + authReducer.lastName}
					customerEmail="abc@email.com"
					customerPhone={authReducer.mobileNo}
					env="test" //blank for prod
					tokenData={cftoken}
					callback={(eventData: any) => navigateToOrder(eventData)}
				/>
			}
			<Snackbar
				visible={snackbarVisible}
				onDismiss={resetSnackBar}
				action={{
					label: snackbarMsg !== 'Loading....' ? 'Ok' : '',
					onPress: () => resetSnackBar(),
				}}>
				{snackbarMsg}
			</Snackbar>
		</SafeAreaView>
	);
};

export default PaymentScreen;
