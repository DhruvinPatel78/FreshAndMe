import * as React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	Dimensions,
	Image, BackHandler, TouchableOpacity,
} from 'react-native';
import {Badge, Button} from 'react-native-paper';
import {Style} from './Style/Style';
import {
	NavigationProp,
	NotificationScreenProps,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import color from '../../common/color/color';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {useEffect, useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotificationScreen:React.FC<NotificationScreenProps> = ({route, navigation}) => {
	const width = Dimensions.get('window').width;
	const Navigation = useNavigation<NavigationProp>();

	Navigation.setOptions({
		title: 'Notifications',
		headerRight: () => (
			<TouchableOpacity>
				<Text style={{ marginRight: 15}}>Clear</Text>
			</TouchableOpacity>
		),
	});

	const dispatch = useDispatch();

	const orderReducer = useSelector((state: IRootReducerState) => state.orderReducer);
	const authReducer = useSelector((state: IRootReducerState) => state.authentication.loggedIn);

	const [notificationList, setNotificationListState] = useState<any[]>([
		{id: 1, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: false, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 2, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: false, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 3, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: false, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 4, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: false, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 5, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: true, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 6, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: true, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 7, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: true, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 8, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: true, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 9, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: true, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
		{id: 10, Title: 'Product Related Notifications', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo', seen: true, img: 'http://onlineshoppingapi.nodevertex.com/Images/Product/big/4/4.jpg'},
	]);
	// const [page, setPage] = useState<number>(0);
	// const [isLoading, setIsLoading] = useState<boolean>(true);
	// const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		const backAction = () => {
			// dispatch(clearOrderList())
			Navigation.goBack();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);
		return () => backHandler.remove();
	}, []);

	// useEffect(() => {
	// 	setOrderListState(orderReducer.orderList)
	// },[orderReducer.orderList])
	//
	// useEffect(() => {
	// 	if (orderListState.length) {
	// 		setIsLoading(false)
	// 		setRefreshing(false)
	// 	}
	// },[orderListState])
	//
	// const handleRefresh = () => {
	// 	dispatch(clearOrderList())
	// 	setRefreshing(true)
	// 	setPage(0)
	// };
	//
	// const handleLoadMore = () => {
	// 	setPage(page + 1)
	// };
	//
	// const getOrderList = () => {
	// 	dispatch(getUserOrderList(authReducer.token, authReducer.userId, page));
	// }

	// useEffect(() => {
	// 	getOrderList();
	// }, [page]);

	const notificationSeen = (notification: any) => {
		const updateNotification = [...notificationList]
		updateNotification.forEach((noty: any) => {
			if(noty.id === notification.id) {
				noty.seen = noty.id == notification.id
			}
		})
		setNotificationListState(updateNotification)
	}

	return (
		<SafeAreaView style={Style.container}>
			<FlatList
				data={notificationList}
				style={{
					marginVertical: 10,
				}}
				// onEndReached={handleLoadMore}
				// onEndReachedThreshold={0}
				// refreshing={refreshing}
				// onRefresh={handleRefresh}
				// ListFooterComponent={() => isLoading ? <Loader/> : null}
				showsVerticalScrollIndicator={false}
				renderItem={({item}) => {
					console.log(item)
					// @ts-ignore
					return (
						<TouchableOpacity
							style={{
								backgroundColor: color.whiteColor,
								marginVertical: 10,
								borderBottomColor: color.grayMidColor,
								borderBottomWidth: 1
							}}
							onPress={() => notificationSeen(item)}
						>
							<View
								style={{
									flexDirection: 'row',
									paddingVertical: 10
								}}>
								<View
									style={{
										flex: 1,
										padding: 10,
										borderRadius: 20,
										backgroundColor: color.grayMidColor
									}}>
									<Image
										source={{uri: item.img}}
										style={{
											height: 40,
											backgroundColor: color.grayMidColor,
											overflow: 'hidden',
										}}
										resizeMode={'cover'}
									/>
									{!item.seen &&
									<View style={{
										height: 14,
										width: 14,
										backgroundColor: color.primaryColor,
										borderRadius: 7,
										top: 0,
										left: 0,
										position: 'absolute'
									}}/>
									}
								</View>
								<View
									style={{
										flex: 7,
										paddingVertical: 5,
										marginHorizontal: 10,
										justifyContent: 'space-between',
									}}>
									<View>
										<Text
											style={{
												fontSize: 16,
												fontWeight: 'bold',
												color: color.secondaryColor,
											}}>
											{item.Title}
										</Text>
										<Text
											style={{
												fontSize: 12,
												color: color.grayDarkColor,
											}}>
											{item.message}
										</Text>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</SafeAreaView>
	);
};

export default NotificationScreen;
