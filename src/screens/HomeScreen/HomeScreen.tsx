import * as React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TouchableWithoutFeedback,
	Dimensions,
	Image,
	Alert,
	FlatList,
	ScrollView,
	RefreshControl, TouchableOpacity,
} from 'react-native';
import {Badge, Button, Divider, Menu, Provider} from 'react-native-paper';
import {Style} from './Style/Style';
import {
	HomeScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEnty from 'react-native-vector-icons/Entypo';
import Loader from '../../component/Loader/Loader';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import color from '../../common/color/color';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {useEffect, useState} from 'react';
import SearchField from '../../component/SearchField/SearchField';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoryList, getBanners, clearCategoryList} from '../../store/actions/Home';
import {clearProductList, getProductList} from '../../store/actions/Product';
import {CommonActions} from '@react-navigation/native';
import {clearOrderList} from '../../store/actions/Order';
import {Snackbar} from 'react-native-paper';
import {getCartList} from '../../store/actions/Cart';
import FlatListSlider from '../../component/FlatListSlider/FlatListSlider';
import {Picker} from '@react-native-community/picker';

const HomeScreen: React.FC<HomeScreenProps> = ({route, navigation}) => {

	const Navigation = useNavigation<NavigationProp>();

	const dispatch = useDispatch();
	const homeReducer = useSelector((state: IRootReducerState) => state.homeReducer);
	const authReducer = useSelector((state: IRootReducerState) => state.authentication);
	const cartReducer = useSelector((state: IRootReducerState) => state.cartReducer);

	const {width, height} = Dimensions.get('window');

	const addresses = [
		{id: 'bardoli', value: 'Bardoli'},
		{id: 'astan', value: 'Astan'},
		{id: 'baben', value: 'Baben'},
	];

	const [categoryIsLoading, setCategoryIsLoading] = useState<boolean>(true);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [addressListVisible, setAddressListVisible] = useState<boolean>(false);
	const [selectedAddress, setSelectedAddress] = useState<string>(addresses[0].value);
	// const [cartCount, setCartCount] = useState<any>([]);
	const [bannerIsLoading, setBannerIsLoading] = useState<boolean>(true);
	const [activeBanner, setActiveBanner] = useState<number>(0);
	const [pagination, setPagination] = useState({
		strWhere: '',
		pageIndex: 1,
		pageSize: 10,
	});
	const [searchText, setSearchText] = useState<string>('');

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	Navigation.setOptions({
		title: '',
		headerLeft: () =>
			<IconFont name={'user-circle-o'} size={25} onPress={navigateToProfile}/>,
		headerLeftContainerStyle: {
			marginHorizontal: 15,
		},
		headerRight: () => (
			<>
				<IconFeather name={'bell'} size={25} style={{marginHorizontal: 5}} onPress={navigateToOrder}/>
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
					}}>{cartReducer.cartList.length}</Badge>
					}
				</View>
			</>
		),
		headerRightContainerStyle: {
			marginHorizontal: 15,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	useEffect(() => {
		dispatch(clearOrderList());
		getBannerList();
		if (authReducer.loggedIn && authReducer.loggedIn.token) {
			dispatch(getCartList(authReducer.loggedIn.userId, authReducer.loggedIn.token));
		}
	}, []);

	const getCategory = () => {
		setCategoryIsLoading(true);
		dispatch(getCategoryList(pagination, (status: boolean, msg: string) => {
			setCategoryIsLoading(false);
			setRefreshing(false);
			if (status) {
				setSnackbarVisible(false);
				setSnackbarMsg('');
			} else {
				setSnackbarVisible(true);
				setSnackbarMsg(msg);
			}
		}));
	};

	const getBannerList = () => {
		setBannerIsLoading(true);
		dispatch(getBanners(pagination, (status: boolean, msg: string) => {
			setBannerIsLoading(false);
			if (status) {
				setSnackbarVisible(false);
				setSnackbarMsg('');
			} else {
				setSnackbarVisible(true);
				setSnackbarMsg(msg);
			}
		}));
	};

	const navigateToItemList = (category: any) => {
		dispatch(clearProductList());
		Navigation.navigate('ItemListScreen', {selectedCategory: category});
	};

	const navigateToCart = () => {
		if (authReducer.loggedIn.token) {
			Navigation.navigate('CartScreen');
		} else {
			notLoggedIn();
		}
	};

	const navigateToOrder = () => {
		if (authReducer.loggedIn.token) {
			Navigation.navigate('NotificationScreen');
		} else {
			notLoggedIn();
		}
	};

	const navigateToProfile = () => {
		if (authReducer.loggedIn.token) {
			Navigation.navigate('ProfileScreen');
		} else {
			notLoggedIn();
		}
	};

	const notLoggedIn = () => {
		setSnackbarMsg('Login is required.');
		setSnackbarVisible(true);
	};

	const handleLoadMore = () => {
		console.warn('LOAD MORE');
		if (homeReducer.categoryList.length === pagination.pageIndex * 10) {
			setCategoryIsLoading(true);
			setPagination((prevState: any) => {
				return {...prevState, pageIndex: pagination.pageIndex + 1};
			});
		}
	};

	const handleRefresh = () => {
		setRefreshing(true);
		setPagination((prevState: any) => {
			return {...prevState, pageIndex: 1};
		});
	};

	const searchCategory = (search: string) => {
		dispatch(clearCategoryList());
		setCategoryIsLoading(true);
		setTimeout(() => {
			setPagination((prevState: any) => {
				return {...prevState, strWhere: search};
			});
		}, 2000);
	};

	useEffect(() => {
		if (!searchText) {
			dispatch(clearCategoryList());
			setCategoryIsLoading(true);
			setPagination((prevState: any) => {
				return {...prevState, pageIndex: 1, strWhere: ''};
			});
		}
	}, [searchText]);

	useEffect(() => {
		getCategory();
	}, [pagination]);

	const resetSnackBar = () => {
		setSnackbarVisible(false);
		if (snackbarMsg === 'Login is required.') {
			navigation.dispatch(CommonActions.reset({index: 1, routes: [{name: 'LoginScreen'}]}));
		}
		setSnackbarMsg('');
	};

	const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom;
	};

	const addressChanged = (address: any) => {
		console.warn('HELlo');
		setSelectedAddress(address.value);
		setAddressListVisible(false);
	};

	return (
		<SafeAreaView style={Style.container}>
			<View style={Style.locationSearchContainer}>
				<View style={Style.locationContainer}>
					<View
						style={Style.locationView}>
						<Menu
							visible={addressListVisible}
							onDismiss={() => setAddressListVisible(false)}
							contentStyle={Style.addressMenuStyle}
							anchor={<TouchableOpacity onPress={() => setAddressListVisible(!addressListVisible)} style={Style.addressContainer}>
								<View style={Style.addressComponent}>
									<IconEnty
										name={'location-pin'}
										size={25}
										color={color.primaryColor}
										style={{
											flex: 2,
											marginLeft: 10,
										}}
									/>
									<Text
										style={{
											flex: 8,
											fontSize: 17,
											fontWeight: 'bold',
											textAlign: 'center',
										}}>
										{selectedAddress}
									</Text>
									<IconFont
										style={{
											flex: 2,
											marginBottom: '5%',
										}}
										name={'sort-down'}
										size={25}
										color={color.primaryColor}
									/>
								</View>
							</TouchableOpacity>}>
							{addresses.map((address: any) => {
								return <Menu.Item
									key={address.id}
									onPress={() => {
										setSelectedAddress(address.value);
										setAddressListVisible(false);
									}}
									title={address.value}/>;
							})}
						</Menu>
					</View>
				</View>
				<View
					style={Style.searchContainer}>
					<SearchField value={searchText} onChange={setSearchText} onSubmit={searchCategory}/>
				</View>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					flex: 1,
				}}
				onScroll={({nativeEvent}) => {
					if (isCloseToBottom(nativeEvent)) {
						handleLoadMore();
					}
				}}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
				}
				scrollEventThrottle={400}
			>
				{bannerIsLoading ? <Loader/> :
					<View style={{
						height: width * 0.4,
					}}>
						{/*<FlatListSlider*/}
						{/*	data={homeReducer.bannersList}*/}
						{/*	timer={5000}*/}
						{/*	indicatorContainerStyle={{position:'absolute', bottom: 20}}*/}
						{/*	indicatorActiveColor={'#8e44ad'}*/}
						{/*	indicatorInActiveColor={'#ffffff'}*/}
						{/*	indicatorActiveWidth={30}*/}
						{/*	animation*/}
						{/*/>*/}
						<Carousel
							data={homeReducer.bannersList}
							renderItem={({item}: any) => {
								return (
									<View
										key={item.id}
										style={{
											backgroundColor: color.graylightColor,
											borderRadius: 5,
											flexDirection: 'row',
											flex: 1,
											alignItems: 'center',
											height: width * 0.3,
										}}>
										<Image
											source={{uri: item.smallImage}}
											style={{
												width: 100,
												height: 100,
												flex: 1,
											}}
											resizeMode={'contain'}
										/>
										<Text
											style={{
												fontSize: 25,
												fontWeight: 'bold',
												flex: 1,
											}}>
											{item.bannerName}
										</Text>
									</View>
								);
							}}
							autoplay={true}
							loop={true}
							onSnapToItem={(index) => setActiveBanner(index)}
							sliderWidth={width}
							itemWidth={width * 0.92}
						/>
						<Pagination
							dotsLength={homeReducer.bannersList.length}
							activeDotIndex={activeBanner}
							containerStyle={{
								backgroundColor: 'rgba(0, 0, 0, 0)',
								position: 'absolute',
								bottom: 0,
								marginHorizontal: 15,
								paddingVertical: 10,
								width: width * 0.92,
							}}
							dotStyle={{
								width: 10,
								height: 10,
								borderRadius: 5,
								marginHorizontal: 2,
								backgroundColor: color.grayColor,
							}}
							inactiveDotStyle={{
								// Define styles for inactive dots here
							}}
							inactiveDotOpacity={0.4}
							inactiveDotScale={0.6}
						/>
					</View>
				}
				{Boolean(homeReducer.categoryList.length) ?
					<View style={{
						flex: 1,
					}}>
						<FlatList
							refreshing={refreshing}
							// onRefresh={handleRefresh}
							// onEndReached={handleLoadMore}
							onEndReachedThreshold={0.5}
							style={{
								marginHorizontal: 15,
								flex: 1,
							}}
							ListFooterComponent={() => categoryIsLoading ? <Loader/> : null}
							numColumns={2}
							showsVerticalScrollIndicator={false}
							data={homeReducer.categoryList}
							keyExtractor={(item: any, index: number) => item.categoryId}
							renderItem={({item}) => (
								<TouchableWithoutFeedback onPress={() => navigateToItemList(item)}>
									<View
										style={{
											marginVertical: 10,
											marginHorizontal: 5,
											borderRadius: 10,
											height: 250,
											width: width / 2.3,
											borderColor: color.whiteColor,
											backgroundColor: color.whiteColor,
											borderWidth: 1,
											shadowColor: '#000',
											shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.23,
											shadowRadius: 2.62,
											elevation: 4,
										}}>
										<View
											style={{
												alignItems: 'flex-end',
												paddingTop: 10,
											}}>
											{item.extra ? (
												<Text
													style={{
														backgroundColor: 'red',
														paddingHorizontal: 10,
														paddingVertical: 5,
														borderTopLeftRadius: 5,
														borderBottomLeftRadius: 5,
														color: color.whiteColor,
														fontWeight: 'bold',
														fontSize: 15,
													}}>
													{item.extra}
												</Text>
											) : (
												<Text/>
											)}
										</View>
										<View
											style={{
												alignItems: 'center',
												flex: 8,
												justifyContent: 'center',
											}}>
											<Image
												source={{uri: item.smallImage}}
												style={{
													width: 150,
													height: 150,
												}}
												resizeMode={'contain'}
											/>
											<Text
												style={{
													marginTop: 20,
													fontSize: 18,
													fontWeight: 'bold',
												}}>
												{item.categoryName}
											</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							)}
						/>
					</View>
					: <Loader/>}
			</ScrollView>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={resetSnackBar}
				action={{
					label: 'Ok',
					onPress: () => resetSnackBar(),
				}}>
				{snackbarMsg}
			</Snackbar>
		</SafeAreaView>
	)
		;
};

export default HomeScreen;
