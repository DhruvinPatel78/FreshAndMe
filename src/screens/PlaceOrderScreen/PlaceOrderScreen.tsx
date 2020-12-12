import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	Dimensions,
	Image, Alert,
} from 'react-native';
import {Style} from './Style/Style';
import {
	PlaceOrderScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFea from 'react-native-vector-icons/Feather';
import color from '../../common/color/color';
import CustomIconButton from '../../component/CustomButton/CustomIconButton';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {getUserAddressAction} from '../../store/actions/UserData';
import {Picker} from '@react-native-community/picker';
import {
	clearCartList,
	deleteCartProductQtyAction,
	getCartList,
	updateCartProductQtyAction,
} from '../../store/actions/Cart';
import {Snackbar} from 'react-native-paper';
import {addUserOrderAction, clearOrderList} from '../../store/actions/Order';
import CustomAlert from '../../component/CustomAlert/CustomAlert';
import Geolocation from '@react-native-community/geolocation';
import {IAddress} from '../../store/interface/UserData/UserDataInterface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlaceOrderScreen: React.FC<PlaceOrderScreenProps> = ({route, navigation}) => {
	const {width, height} = Dimensions.get('window');
	const Navigation = useNavigation<NavigationProp>();
	const dispatch = useDispatch();


	const cartReducer = useSelector((state: IRootReducerState) => state.cartReducer);
	const authState = useSelector((state: IRootReducerState) => state.authentication.loggedIn);
	const userState = useSelector((state: IRootReducerState) => state.UserDataReducer.addresses);

	const [cartListState, setCartListState] = useState<any>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const [address, setAddress] = useState<string>('0');
	const [addresses, setAddresses] = useState<any>([]);

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	Navigation.setOptions({
		title: 'Place Order',
	});

	const navigateToPayment = () => {
		if (address !== '0') {
			setIsOpen(true);
		} else {
			setSnackbarMsg('Please select delivery address.');
			setSnackbarVisible(true);
		}
	};

	const navigateToLocation = () => {
		Geolocation.getCurrentPosition(
			() => Navigation.navigate('LocationScreen'),
			(error) => Alert.alert(error.message, 'Please turned on your GPS.'));
		// Navigation.navigate('LocationScreen');
	};

	const NavigateToOrder = () => {
		dispatch(clearOrderList());
		Navigation.replace('OrderScreen');
		dispatch(clearCartList());
	};

	useEffect(() => {
		if (authState) {
			if (cartListState.length === 0) {
				dispatch(getCartList(authState.userId, authState.token));
			}
			navigation.addListener('focus', getUserAddress)
		}
	}, []);

	const getUserAddresses = () => {

	}

	useEffect(() => {
		if (cartReducer.cartList.length > 0) {
			setCartListState(cartReducer.cartList);
		}
	}, [cartReducer.cartList]);

	useEffect(() => {
		setIsLoading(cartReducer.loading);
	}, [cartReducer.loading]);

	useEffect(() => {
		if (cartListState.length > 0) {
			getTotalPrice();
		}
	}, [cartListState]);

	const getTotalPrice = () => {
		if (cartListState) {
			let totalPrice: number = 0;
			cartListState.forEach((product: any) => {
				totalPrice += product.discountPrice * product.qty;
			});
			setTotalPrice(totalPrice);
		}
	};

	const updateQty = (type: string, product: any) => {
		const updateQty = type === 'minus' ? product.qty - 1 : product.qty + 1;
		if (updateQty <= product.actualQty) {
			if (updateQty === 0) {
				dispatch(deleteCartProductQtyAction(product.cartId, authState.token, (response: string, msg?: string) => {
					switch (response) {
						case 'loading': {
							setSnackbarMsg('Loading....');
							setSnackbarVisible(true);
							break;
						}
						case 'success': {
							setSnackbarMsg('');
							setSnackbarVisible(false);
							break;
						}
						case 'fail': {
							setSnackbarMsg(msg ? msg : '');
							setSnackbarVisible(true);
							break;
						}
					}
				}));
			} else {
				dispatch(updateCartProductQtyAction(updateQty, product.productQtyId, userState, product.cartId));
			}
		} else {
			setSnackbarMsg('Product Quantity Not Available');
			setSnackbarVisible(true);
		}
	};

	const deleteProduct = (cartId: number) => {
		dispatch(deleteCartProductQtyAction(cartId, authState.token, (response: string, msg?: string) => {
			switch (response) {
				case 'loading': {
					setSnackbarMsg('Loading....');
					setSnackbarVisible(true);
					break;
				}
				case 'success': {
					setSnackbarMsg('');
					setSnackbarVisible(false);
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

	const onCashOnDelivery = () => {
		const strProduct: any[] = [];
		cartReducer.cartList.forEach((product: any) => {
			strProduct.push({
				cartId: product.cartId,
				productId: product.productId,
				qty: product.qty,
				productQtyId: product.productQtyId,
			});
		});
		dispatch(addUserOrderAction(authState.token, authState.userId, JSON.stringify(strProduct), +address, totalPrice, 'cash', '-', (response: string, msg?: string) => {
			switch (response) {
				case 'loading': {
					setSnackbarMsg('Loading....');
					setSnackbarVisible(true);
					break;
				}
				case 'success': {
					setSnackbarMsg('');
					setSnackbarVisible(false);
					NavigateToOrder();
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

	const resetSnackBar = () => {
		setSnackbarVisible(false);
		setSnackbarMsg('');
	};

	useEffect(() => {
		console.log(userState)
		if (Boolean(userState.length)) {
			const defaultAddress = userState.filter((address: IAddress) => address.isDefault === 'true')
			if (defaultAddress.length > 0) {
				setAddress(defaultAddress[0].addressId.toString());
			} else {
				setAddress(userState[0].addressId.toString());
			}
			setAddresses(userState.filter((address: IAddress) => address.addressId !== '0'));
		} else {
			setAddress('0');
			setAddresses([]);
		}
	}, [userState]);

	const onAddressOption = (selectedOption: React.ReactText) => {
		setAddress(selectedOption.toString());
	};

	const getUserAddress = () => {
		dispatch(getUserAddressAction(authState.userId, authState.token, (response: string, msg: string) => {
			if (response === 'fail') {
				setSnackbarVisible(true);
				setSnackbarMsg(msg);
			}
		}));
	};

	const alertClicked = (type: string) => {
		setIsOpen(false);
		type === 'cash' ? onCashOnDelivery() : type === 'digital' ? Navigation.navigate('PaymentScreen', {amount: totalPrice, address: address}) : null;
	};

	return (
		<SafeAreaView style={Style.container}>
			<View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingVertical: 10,
						borderBottomColor: color.grayColor,
						borderBottomWidth: 1,
					}}>
					<Text>ADDRESS</Text>
					<IconFea
						name="edit-2"
						size={18}
						style={{
							paddingLeft: 5,
						}}
						onPress={navigateToLocation}
					/>
				</View>
				<View
					style={{
						backgroundColor: color.whiteColor,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.23,
						shadowRadius: 2.62,
						elevation: 4,
						borderRadius: 5,
						padding: 10,
						marginVertical: 10,
					}}>
					{address === '0' ?
						<Text
							style={{
								marginVertical: 5,
							}}>
							{'No Address Added'}
						</Text> :
						<Picker
							style={{
								height: 30,
								borderBottomColor: color.primaryColor,
								borderBottomWidth: 1,
							}}
							selectedValue={address}
							onValueChange={(itemValue, itemIndex) => onAddressOption(itemValue)}>
							{Boolean(addresses.length) && addresses.map((item: any) => {
								return <Picker.Item label={item.address} value={item.addressId.toString()}/>;
							})
							}
						</Picker>}
				</View>
			</View>
			{cartReducer.cartList.length > 0 &&
			<>
				<FlatList
					data={cartReducer.cartList}
					style={{
						marginVertical: 10,
						borderTopColor: color.grayColor,
						borderTopWidth: 1,
						paddingTop: 10,
					}}
					renderItem={({item}) => {
						return (
							item.qty !== 0 ?
								<View
									style={{
										backgroundColor: color.whiteColor,
										borderRadius: 5,
										marginVertical: 5,
										flexDirection: 'row',
									}}>
									<View
										style={{
											flex: 3,
											borderRadius: 5,
										}}>
										<Image
											source={{uri: item.bigImage}}
											style={{
												height: 90,
												flex: 3,
												backgroundColor: color.grayColor,
												overflow: 'hidden',
											}}
											resizeMode={'cover'}
										/>
									</View>
									<View
										style={{
											flex: 8,
											paddingVertical: 5,
											paddingHorizontal: 5,
											justifyContent: 'space-between',
										}}>
										<View>
											<Text
												style={{
													fontSize: 20,
													fontWeight: 'bold',
													color: color.secondaryColor,
												}}>
												{item.productName}
											</Text>
											<Text
												style={{
													fontSize: 18,
													fontWeight: 'bold',
													color: color.primaryColor,
												}}>
												{'\u20B9'} {item.discountPrice}
											</Text>
										</View>
										<Text
											style={{
												fontSize: 15,
												fontWeight: 'bold',
											}}>
											Qty: {item.qty}
										</Text>
									</View>
									<View
										style={{
											flex: 2,
											justifyContent: 'space-between',
											paddingVertical: 10,
											alignItems: 'flex-end',
											paddingHorizontal: 10,
										}}>
									</View>
								</View> : null
						);
					}}
				/>
				<View
					style={{
						marginVertical: 10,
						paddingVertical: 5,
						borderTopColor: color.grayColor,
						borderTopWidth: 1,
						flexDirection: 'row',
						height: width / 7,
					}}>
					<View style={{flex: 5, alignItems: 'flex-start'}}>
						<Text
							style={{
								fontSize: 30,
								fontWeight: 'bold',
								color: color.secondaryColor,
							}}>
							{'\u20B9'} {totalPrice.toFixed(2)}
						</Text>
						<Text
							style={{
								fontSize: 10,
							}}>
							With all Text and Shipping
						</Text>
					</View>
					<View style={{flex: 5}}>
						<CustomIconButton
							title={'CHECK OUT'}
							icon={'credit-card-alt'}
							iconLib={'font'}
							onClick={navigateToPayment}
							backgroundColor={color.primaryColor}
						/>
					</View>
				</View>
			</>
			}
			{/*<AnimatedBottomSheet translateY={translateY} />*/}
			<Snackbar
				visible={snackbarVisible}
				onDismiss={resetSnackBar}
				action={{
					label: snackbarMsg !== 'Loading....' ? 'Ok' : '',
					onPress: () => resetSnackBar(),
				}}>
				{snackbarMsg}
			</Snackbar>
			<CustomAlert
				displayAlert={isOpen}
				alertTitleText={'Choose Payment Method'}
				onPressButton={alertClicked}
			/>
		</SafeAreaView>
	);
};

export default PlaceOrderScreen;
