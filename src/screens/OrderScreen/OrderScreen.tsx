import * as React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	Dimensions,
	Image, BackHandler,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Style} from './Style/Style';
import {
	OrderScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import color from '../../common/color/color';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {useEffect, useState} from 'react';
import {addUserOrderAction, clearOrderList, getUserOrderList} from '../../store/actions/Order';
import Loader from '../../component/Loader/Loader';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OrderScreen:React.FC<OrderScreenProps> = ({route, navigation}) => {
	const width = Dimensions.get('window').width;
	const Navigation = useNavigation<NavigationProp>();

	Navigation.setOptions({
		title: 'My Order',
	});

	const dispatch = useDispatch();

	const orderReducer = useSelector((state: IRootReducerState) => state.orderReducer);
	const authReducer = useSelector((state: IRootReducerState) => state.authentication.loggedIn);

	const [orderListState, setOrderListState] = useState<any>([]);
	const [page, setPage] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [refreshing, setRefreshing] = useState(false);
	const [loadNew, setLoadNew] = useState<boolean>(true)

	useEffect(() => {
		Navigation.addListener('focus', () => getOrderList(0))
		Navigation.addListener('beforeRemove', () => {
			setOrderListState([])
			setPage(0)
			dispatch(clearOrderList());
		})
	},[Navigation])

	useEffect(() => {
		setOrderListState(orderReducer.orderList)
	},[orderReducer.orderList])

	useEffect(() => {
		if (orderListState.length) {
			setIsLoading(false)
			setRefreshing(false)
		}
	},[orderListState])

	const handleRefresh = () => {
		dispatch(clearOrderList())
		setRefreshing(true)
		setPage(0)
		getOrderList(0)
	};

	const handleLoadMore = () => {
		console.warn("LOAD MORE")
		setPage(page + 1)
	};

	const getOrderList = (page: number) => {
		dispatch(getUserOrderList(authReducer.token, authReducer.userId, page));
	}

	useEffect(() => {
		if (page !== 0) {
			getOrderList(page);
		}
	}, [page]);

	return (
		<SafeAreaView style={Style.container}>
			<FlatList
				data={orderListState}
				style={{
					marginVertical: 10,
				}}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0}
				refreshing={refreshing}
				onRefresh={handleRefresh}
				ListFooterComponent={() => isLoading ? <Loader/> : null}
				showsVerticalScrollIndicator={false}
				renderItem={({item}) => {
					// @ts-ignore
					return (
						<View
							style={{
								backgroundColor: color.whiteColor,
								borderRadius: 5,
								elevation: 5,
								marginVertical: 10,
								marginHorizontal: 5,
							}}>
							<View
								style={{
									flexDirection: 'row',
								}}>
								<View
									style={{
										flex: 3,
										padding: 10,
										borderRadius: 5,
									}}>
									<Image
										source={{uri: item.OrderDetail[0].smallImage}}
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
											{item.OrderDetail[0].productName}
										</Text>
										<Text
											style={{
												fontSize: 12,
												color: color.secondaryColor,
											}}>
											Quantity: {item.OrderDetail[0].qty} x {'\u20B9'} {item.OrderDetail[0].discountPrice}
										</Text>
										<Text
											style={{
												fontSize: 18,
												fontWeight: 'bold',
												color: color.primaryColor,
											}}>
											{'\u20B9'} {item.OrderDetail[0].qty * item.OrderDetail[0].discountPrice}
										</Text>
										<Text
											style={{
												fontSize: 10,
												color: color.secondaryColor,
											}}>
											Order Date: 20 Oct 2020
										</Text>
										<View style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}>
											<Text
												style={{
													fontSize: 15,
													color: color.secondaryColor,
													fontWeight: 'bold'
												}}>
												{item.orderStatus}
											</Text>
											<Text
												style={{
													fontSize: 15,
													color: color.secondaryColor,
													fontWeight: 'bold'
												}}>
												{item.orderType}
											</Text>
										</View>
									</View>
								</View>
								<View
									style={{
										flex: 2,
										paddingVertical: 10,
										alignItems: 'flex-end',
										paddingHorizontal: 10,
									}}>
									{Boolean(item.OrderDetail[0].isValid) && (
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
											18+
										</Text>
									)}
								</View>
							</View>
							{/*<OrderProgressBar completed={2} />*/}
							{/*<View*/}
							{/*	style={{*/}
							{/*		flexDirection: 'row',*/}
							{/*	}}>*/}
							{/*	<Button*/}
							{/*		style={{*/}
							{/*			flex: 1,*/}
							{/*			marginHorizontal: 10,*/}
							{/*			marginVertical: 10,*/}
							{/*		}}*/}
							{/*		mode="contained"*/}
							{/*		color={color.primaryColor}*/}
							{/*		labelStyle={{color: color.whiteColor}}>*/}
							{/*		View Details*/}
							{/*	</Button>*/}
							{/*	<Button*/}
							{/*		style={{*/}
							{/*			flex: 1,*/}
							{/*			marginHorizontal: 10,*/}
							{/*			marginVertical: 10,*/}
							{/*		}}*/}
							{/*		mode="outlined"*/}
							{/*		color={color.grayColor}*/}
							{/*		labelStyle={{color: color.grayColor}}>*/}
							{/*		Cancel Order*/}
							{/*	</Button>*/}
							{/*</View>*/}
						</View>
					);
				}}
			/>
		</SafeAreaView>
	);
};

export default OrderScreen;
