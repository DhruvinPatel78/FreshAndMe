import * as React from 'react';
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
	CartScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import color from '../../common/color/color';
import CustomIconButton from '../../component/CustomButton/CustomIconButton';
import {useEffect, useState} from 'react';
import {deleteCartProductQtyAction, getCartList, updateCartProductQtyAction} from '../../store/actions/Cart';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import Loader from '../../component/Loader/Loader';
import {Snackbar} from 'react-native-paper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartScreen: React.FC<CartScreenProps> = ({route, navigation}) => {
	const width = Dimensions.get('window').width;
	const [cartListState, setCartListState] = useState<any>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const Navigation = useNavigation<NavigationProp>();
	const dispatch = useDispatch();
	const cartReducer = useSelector((state: IRootReducerState) => state.cartReducer);
	const userState = useSelector((state: IRootReducerState) => state.authentication.loggedIn);

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	useEffect(() => {
		dispatch(getCartList(userState.userId, userState.token));
	}, []);

	useEffect(() => {
		setCartListState(cartReducer.cartList);
	}, [cartReducer.cartList]);

	useEffect(() => {
		setIsLoading(cartReducer.loading);
	}, [cartReducer.loading]);

	useEffect(() => {
		if (cartReducer.error.length > 0) {
			setSnackbarVisible(true);
			setSnackbarMsg(cartReducer.error);
		}
	}, [cartReducer.error]);

	useEffect(() => {
		if (Boolean(cartListState)) {
			getTotalPrice();
		}
	}, [cartListState]);

	Navigation.setOptions({
		title: 'Cart',
	});

	const navigateToPlaceOrder = () => {
		Navigation.navigate('PlaceOrderScreen');
	};

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
				Alert.alert(
					`Are you sure?`,
					`Are you sure to remove ${product.productName} from the cart?`,
					[
						{
							text: 'Yes',
							onPress: () => {
								dispatch(deleteCartProductQtyAction(product.cartId, userState.token, (response: string, msg?: string) => {
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
								}))
							}
						},
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel'
						},
					],
					{ cancelable: false }
					)
			} else {
				dispatch(updateCartProductQtyAction(updateQty, product.productQtyId, userState, product.cartId));
			}
		} else {
			setSnackbarMsg('Product Quantity Not Available');
			setSnackbarVisible(true);
		}
	};

	const resetSnackBar = () => {
		setSnackbarVisible(false);
		setSnackbarMsg('');
	};

	return (
		<SafeAreaView style={Style.container}>
			{!isLoading && cartListState.length > 0 ?
				<>
					<FlatList
						data={cartListState}
						style={{
							marginVertical: 10,
							width: width - 30,
						}}
						ListFooterComponent={() => isLoading ? <Loader/> : null}
						keyExtractor={(item: any, index) => index.toString()}
						renderItem={({item}: any) => {
							return (
								<View
									style={{
										backgroundColor: color.whiteColor,
										borderRadius: 5,
										shadowColor: "#000",
										shadowOffset: {
											width: 0,
											height: 2,
										},
										shadowOpacity: 0.23,
										shadowRadius: 2.62,
										elevation: 4,
										marginVertical: 5,
										marginHorizontal: 5,
										flexDirection: 'row',
									}}>
									<View
										style={{
											flex: 3,
											padding: 10,
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
													fontSize: 10,
													color: color.grayColor,
												}}>
												PRODUCT BY COMPANY
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												marginBottom: 10,
											}}>
											<IconAnt name={'minuscircleo'} size={25} onPress={() => updateQty('minus', item)}/>
											<Text
												style={{
													fontSize: 18,
													fontWeight: 'bold',
													marginHorizontal: 10,
												}}>
												{item.qty}
											</Text>
											<IconAnt name={'pluscircleo'} size={25} onPress={() => updateQty('plus', item)}/>
										</View>
									</View>
									<View
										style={{
											flex: 4,
											justifyContent: 'space-between',
											paddingVertical: 10,
											alignItems: 'flex-end',
											paddingHorizontal: 10,
										}}>
										<Text
											style={{
												fontSize: 18,
												fontWeight: 'bold',
												color: color.primaryColor,
											}}>
											{'\u20B9'} {item.discountPrice}
										</Text>
										{Boolean(item.extra) && (
											<Text
												style={{
													backgroundColor: 'red',
													paddingHorizontal: 10,
													paddingVertical: 5,
													borderRadius: 5,
													color: color.whiteColor,
													fontWeight: 'bold',
													fontSize: 16,
												}}>
												{item.extra}
											</Text>
										)}
									</View>
								</View>
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
								title={'PLACE ORDER'}
								icon={'right'}
								iconLib={'ant'}
								onClick={navigateToPlaceOrder}
								backgroundColor={color.primaryColor}
							/>
						</View>
					</View>
				</> : isLoading ? <Loader/> :
				!isLoading && cartListState.length === 0 &&
				<View style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}>
					<Image
						source={require('../../assets/images/empty_cart.png')}
						height={50}
						width={50}
						resizeMode={'center'}
					/>
					<Text style={{
						fontSize: 25,
						fontWeight: 'bold',
						color: color.secondaryColor,
					}}>Cart is Empty.</Text>
				</View>
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

export default CartScreen;
