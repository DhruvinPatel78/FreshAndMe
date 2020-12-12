import * as React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	Dimensions,
	Image,
	ScrollView,
} from 'react-native';
import {Style} from './Style/Style';
import {
	ItemDetailScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import {CommonActions, useNavigation} from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import color from '../../common/color/color';
import CustomIconButton from '../../component/CustomButton/CustomIconButton';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {useEffect, useState} from 'react';
import Loader from '../../component/Loader/Loader';
import {Picker} from '@react-native-community/picker';
import {Badge, Snackbar} from 'react-native-paper';
import {addToCartAction} from '../../store/actions/Cart';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({route, navigation}) => {

	const width = Dimensions.get('window').width;
	const Navigation = useNavigation<NavigationProp>();

	const {selectedCategory, selectedProduct} = route.params;

	const dispatch = useDispatch();
	const authReducer = useSelector((state: IRootReducerState) => state.authentication);
	const cartReducer = useSelector((state: IRootReducerState) => state.cartReducer);

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	const [discount, setDiscount] = useState<number>(0);
	const [actualPrice, setActualPrice] = useState<number>(0);

	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [productQty, setProductQty] = useState<number>(0);
	const [productQtyId, setProductQtyId] = useState<number>(0);
	const [cartQty, setCartQty] = useState<number>(0);

	const [footerVisible, setFooterVisible] = useState<boolean>(false);

	useEffect(() => {
		if (selectedProduct.isPriceFix) {
			setProductQtyId(selectedProduct.productQtyId);
			setTotalPrice(selectedProduct.discountPrice);
			if (selectedProduct.discount) {
				setDiscount(selectedProduct.discount);
			}
			if (selectedProduct.productPrice) {
				setActualPrice(selectedProduct.productPrice);
			}
			setFooterVisible(selectedProduct.isPriceFix === 1 && selectedProduct.availableQty === 0)
			setProductQty((selectedProduct.isPriceFix === 1 && selectedProduct.availableQty === 0) ? 0 : 1)
		} else {
			if (selectedProduct.productQty) {
				const productWithQty = selectedProduct.productQty.filter((product: any) => product.availableQty > 0);
				setProductQtyId(productWithQty[0].productQtyId);
				setTotalPrice(productWithQty[0].discountPrice);
				setProductQty(1);
				if (productWithQty[0].discount) {
					setDiscount(productWithQty[0].discount);
				}
				if (productWithQty[0].productPrice) {
					setActualPrice(productWithQty[0].productPrice);
				}
			}
		}
		//dispatch(getProductDetailAction({'productId': selectedItemId}, authReducer.loggedIn.token));
	}, []);

	useEffect(() => {
		console.log("CART CHNAGE")
		setCartQty(cartReducer.cartList.length)
	},[cartReducer])

	Navigation.setOptions({
		title: `${selectedProduct.productName} Detail`,
		headerRight: () => (
			<View style={{
				flex: 1,
				flexDirection: 'row',
			}}>
				<IconFeather
					name={'shopping-cart'}
					size={25}
					style={{marginHorizontal: 5}}
					onPress={navigateToCart}
				/>
				{cartReducer && cartReducer.cartList.length > 0 &&
				<Badge style={{
					position: 'absolute',
					top: -10,
					right: -10,
					backgroundColor: color.primaryColor,
					color: color.whiteColor,
				}}>{cartQty}</Badge>
				}
			</View>
		),
		headerRightContainerStyle: {
			padding: 15,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	const navigateToCart = () => {
		if (authReducer.loggedIn.token) {
			Navigation.navigate('CartScreen');
		} else {
			Navigation.popToTop();
		}
	};

	const onProductQtyOption = (selectedOption: React.ReactText) => {
		setProductQtyId(+selectedOption);
	};

	useEffect(() => {
		if (selectedProduct.isPriceFix) {
			if (productQty <= selectedProduct.availableQty) {
				if (selectedProduct.availableQty === 0) {
					setTotalPrice(+(selectedProduct.discountPrice).toFixed(2));
				} else {
					setTotalPrice(+(productQty * selectedProduct.discountPrice).toFixed(2));
				}
			} else {
				setProductQty(selectedProduct.availableQty);
				setTotalPrice(+(selectedProduct.availableQty * selectedProduct.discountPrice).toFixed(2));
				setSnackbarMsg('Product Quantity Not Available');
				setSnackbarVisible(true);
			}
		} else {
			if (selectedProduct.productQty) {
				const product = selectedProduct.productQty.find((item: any) => item.productQtyId === productQtyId);
				if (product) {
					setDiscount(product.discount);
					setActualPrice(product.productPrice);
					if (productQty <= product.availableQty) {
						setTotalPrice(+(productQty * product.discountPrice).toFixed(2));
					} else {
						setProductQty(product.availableQty);
						setTotalPrice(+(product.availableQty * product.discountPrice).toFixed(2));
						setSnackbarMsg('Product Quantity Not Available');
						setSnackbarVisible(true);
					}
				}
			}
		}
	}, [productQtyId, productQty]);

	const updateQty = (action: string) => {
		const qty: number = action === '-' ? productQty - 1 : productQty + 1;
		if (qty > 0) {
			setProductQty(qty);
		} else {
			setSnackbarMsg('Quantity Not Allowed.');
			setSnackbarVisible(true);
		}
	};

	const resetSnackBar = () => {
		if (snackbarMsg === 'Session Expire' || snackbarMsg === 'Login is required.') {
			navigation.dispatch(CommonActions.reset({index: 1, routes: [{name: 'LoginScreen'}]}));
		} else {
			setSnackbarVisible(false);
			setSnackbarMsg('');
		}
	};

	const addToCart = () => {
		if (authReducer.loggedIn.token) {
			if (productQty > 0) {
				const product = selectedProduct.isPriceFix ? selectedProduct : selectedProduct.productQty.find((item: any) => item.productQtyId === productQtyId);
				dispatch(addToCartAction(authReducer.loggedIn, product.productId, productQty, productQtyId, (response: string, msg?: string) => {
					switch (response) {
						case 'loading': {
							setSnackbarMsg('Loading....');
							setSnackbarVisible(true);
							break;
						}
						case 'success': {
							dispatch({
								type: 'ADD_CART_PRODUCT',
								payload: product
							})
							setSnackbarMsg('Item Added To Cart Successfully.');
							setSnackbarVisible(true);
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
				setSnackbarMsg('Selected Quantity Not Allowed.');
				setSnackbarVisible(true);
			}
		}
		else {
			setSnackbarMsg('Login is required.');
			setSnackbarVisible(true);
		}
	};

	return (
		<SafeAreaView style={Style.container}>
			<View style={{
				marginHorizontal: 15,
				flex: 1,
			}}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Image
						source={{uri: selectedProduct.bigImage}}
						style={{
							width: width - 30,
							height: width / 1.5,
							backgroundColor: color.graylightColor,
							borderRadius: 10,
						}}
					/>
					<View
						style={{
							paddingTop: 10,
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<Text
							style={{
								flex: 10,
								fontSize: 25,
								fontWeight: 'bold',
							}}>
							{selectedProduct.productName}
						</Text>
						{selectedProduct.isValid === 1 && (
							<Text
								style={{
									backgroundColor: 'red',
									paddingHorizontal: 10,
									paddingVertical: 5,
									borderTopLeftRadius: 5,
									borderBottomLeftRadius: 5,
									color: color.whiteColor,
									fontWeight: 'bold',
									fontSize: 16,
									flex: 1,
								}}>
								18+
							</Text>
						)}
					</View>
					<Text
						style={{
							fontSize: 10,
							color: color.grayColor,
						}}>
						PRODUCT BY {selectedProduct.productCompany}
					</Text>
					<View
						style={{
							paddingTop: 10,
							flexDirection: 'row',
							alignItems: 'flex-end',
						}}>
						<Text
							style={{
								fontSize: 30,
								fontWeight: 'bold',
								color: color.primaryColor,
							}}>
							{'\u20B9'}
							{totalPrice}
						</Text>
						<Text
							style={{
								paddingHorizontal: 15,
								color: color.redColor,
								fontWeight: '500',
								fontSize: 16,
								paddingBottom: 5,
								textDecorationLine: 'line-through',
							}}>
							{actualPrice} /
						</Text>
						<Text
							style={{
								color: color.redColor,
								fontWeight: '500',
								fontSize: 16,
								paddingBottom: 5,
								// textDecorationLine: 'line-through',
							}}>
							({discount} % off)
						</Text>
					</View>
					<Text
						style={{
							marginTop: 10,
							fontSize: 12,
							color: color.grayColor,
						}}>
						PRODUCT DETAILS
					</Text>
					<View
						style={{
							marginTop: 10,
							marginBottom: 20,
							borderTopColor: color.grayColor,
							borderTopWidth: 1,
							paddingTop: 10,
						}}>
						<Text>
							{selectedProduct.productNote}
						</Text>
					</View>
				</ScrollView>
				{!footerVisible &&
				<View
					style={{
						marginVertical: 10,
						paddingVertical: 5,
						borderTopColor: color.grayColor,
						borderTopWidth: 1,
						height: selectedProduct.isPriceFix ? width / 7 : width / 4,
					}}>
					{!selectedProduct.isPriceFix &&
					<View style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
						<Text style={{
							fontSize: 15,
							fontWeight: 'bold',
						}}>
							Purchase Options :
						</Text>
						<Picker
							style={{
								borderBottomColor: color.primaryColor,
								borderBottomWidth: 1,
								flex: 1,
							}}
							selectedValue={productQtyId}
							onValueChange={(itemValue: React.ReactText, itemIndex) => onProductQtyOption(itemValue)}>
							{selectedProduct.productQty &&
							selectedProduct.productQty.map((item: any) => {
								return item.availableQty > 0 ?
									<Picker.Item
										label={`${item.unitValue} ${item.productUnit} at  ${item.discountPrice} \u20B9`}
										value={item.productQtyId}/> : null;
							})}
						</Picker>
					</View>}
					<View style={{
						flexDirection: 'row',
						flex: 1,
					}}>
						<View style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
							<IconAnt name={'minuscircleo'} size={35} onPress={() => updateQty('-')}/>
							<Text
								style={{
									fontSize: 20,
									fontWeight: 'bold',
									marginHorizontal: 20,
								}}>
								{productQty}
							</Text>
							<IconAnt name={'pluscircleo'} size={35} onPress={() => updateQty('+')}/>
						</View>
						<View style={{flex: 5}}>
							<CustomIconButton
								title={'ADD TO CART'}
								icon={'shoppingcart'}
								iconLib={'ant'}
								onClick={addToCart}
								backgroundColor={color.primaryColor}
							/>
						</View>
					</View>
				</View>}
			</View>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={resetSnackBar}
				action={{
					label: snackbarMsg !== 'Loading....' ? 'OK' : '',
					onPress: () => resetSnackBar(),
				}}>
				{snackbarMsg}
			</Snackbar>
		</SafeAreaView>
	);
};

export default ItemDetailScreen;
