import * as React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TouchableWithoutFeedback,
	FlatList,
	Dimensions,
	Image,
	Alert,
} from 'react-native';
import {Style} from './Style/Style';
import {
	ItemListScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import {CommonActions, useNavigation} from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';
import {useEffect, useState} from 'react';
import SearchField from '../../component/SearchField/SearchField';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {clearProductList, getProductList} from '../../store/actions/Product';
import Loader from '../../component/Loader/Loader';
import Color from '../../common/color/color';
import {Badge, Snackbar} from 'react-native-paper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemListScreen: React.FC<ItemListScreenProps> = ({route, navigation}) => {
	const Navigation = useNavigation<NavigationProp>();

	const dispatch = useDispatch();
	const productReducer = useSelector((state: IRootReducerState) => state.productReducer);
	const authReducer = useSelector((state: IRootReducerState) => state.authentication);
	const cartReducer = useSelector((state: IRootReducerState) => state.cartReducer);

	const [isLoading, setIsLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [pagination, setPagination] = useState<any>({
		strWhere: '',
		pageIndex: 1,
		pageSize: 10,
	});
	const [searchText, setSearchText] = useState<string>('');
	const {selectedCategory} = route.params;
	const categoryId = selectedCategory && selectedCategory.categoryId;

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	useEffect(() => {
		setPagination({...pagination, strWhere: preparePayload(categoryId)});
	}, []);

	const preparePayload = (categoryId: string) => {
		const data = [
			{
				key: 'categoryId',
				value: categoryId.toString(),
			},
			{
				key: 'productName',
				value: '',
			},
		];
		return JSON.stringify(data);
	};

	useEffect(() => {
		setIsLoading(true);
	}, []);

	useEffect(() => {
		if (Boolean(pagination.strWhere)) {
			setIsLoading(true);
			dispatch(getProductList(pagination, (status: boolean, msg: string) => {
				setIsLoading(false);
				setRefreshing(false);
				if (status) {
					setSnackbarVisible(false);
					setSnackbarMsg('');
				} else {
					setSnackbarVisible(true);
					setSnackbarMsg(msg);
				}
			}));
		}
	}, [pagination]);

	Navigation.setOptions({
		title: `${selectedCategory.categoryName} List`,
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
					backgroundColor: Color.primaryColor,
					color: Color.whiteColor,
				}}>{cartReducer.cartList.length}</Badge>
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

	const navigateToDetail = (item: any) => {
		Navigation.navigate('ItemDetailScreen', {
			selectedCategory,
			selectedProduct: item,
		});
	};

	const navigateToCart = () => {
		if (authReducer.loggedIn.token) {
			Navigation.navigate('CartScreen');
		} else {
			Navigation.popToTop();
		}
	};

	const handleLoadMore = () => {
		console.warn('LOAD MORE');
		console.log(pagination)
		if (productReducer.productList.length === pagination.pageIndex * 10) {
			setPagination((prevState: any) => {
				return {...prevState, pageIndex: pagination.pageIndex + 1};
			});
		}
	};

	const handleRefresh = () => {
		setRefreshing(true);
		const str = JSON.parse(pagination.strWhere);
		if (searchText) {
			str[1]['value'] = searchText;
		}
		console.log(str)
		setPagination((prevState: any) => {
			return {...prevState, pageIndex: 1, strWhere: JSON.stringify(str)};
		});
	};

	const searchProduct = (search: string) => {
		dispatch(clearProductList());
		setIsLoading(true);
		setTimeout(() => {
			const str = JSON.parse(pagination.strWhere);
			str[1]['value'] = search;
			console.log(str)
			setPagination((prevState: any) => {
				return {...prevState, strWhere: JSON.stringify(str)};
			});
		}, 2000);
	};

	useEffect(() => {
		if (!searchText) {
			dispatch(clearProductList());
			setIsLoading(true);
			setPagination((prevState: any) => {
				return {...prevState, pageIndex: 1, strWhere: preparePayload(categoryId)};
			});
		}
	}, [searchText]);

	const setCardStyle = (item: any) => {
		return {
			...Style.itemCard,
			borderColor: item.isPriceFix === 1 && item.availableQty === 0 ? Color.grayColor : Color.whiteColor,
			backgroundColor: item.isPriceFix === 1 && item.availableQty === 0 ? Color.grayColor : Color.whiteColor,
		};
	};

	const resetSnackBar = () => {
		setSnackbarVisible(false);
		setSnackbarMsg('');
	};

	return (
		<SafeAreaView style={Style.container}>
			<View
				style={Style.searchContainer}>
				<SearchField value={searchText} onChange={setSearchText} onSubmit={searchProduct}/>
			</View>
			{productReducer.productList ?
				<FlatList
					refreshing={refreshing}
					onRefresh={handleRefresh}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					numColumns={2}
					style={Style.listContainer}
					showsVerticalScrollIndicator={false}
					data={productReducer.productList}
					keyExtractor={(item: any, index: number) => item.productId}
					ListFooterComponent={() => isLoading ? <Loader/> : null}
					renderItem={({item}) => (
						<TouchableWithoutFeedback
							onPress={() => navigateToDetail(item)}
							// disabled={item.isPriceFix === 1 && item.availableQty === 0 ? true : false}
						>
							<View
								style={setCardStyle(item)}>
								<View
									style={Style.cardHeader}>
									<Text
										style={Style.cardTitle}>
										{item.productName}
									</Text>
									{item.isValid !== 0 && (
										<Text
											style={Style.cardValidText}>
											18+
										</Text>
									)}
								</View>
								<Text
									style={Style.cardPrice}>
									{'\u20B9'}
									{item.isPriceFix === 0 ? Boolean(item.productQty.length) && item.productQty[0].discountPrice : item.discountPrice}
								</Text>
								<View
									style={Style.cardImageContainer}>
									<Image
										source={{uri: item.bigImage}}
										style={Style.imageStyle}
										resizeMode={'cover'}
									/>
								</View>
								{item.isPriceFix === 1 && item.availableQty === 0 ? <View
									style={Style.notAvailableContainer}
								>
									<Text style={Style.notAvailableText}>
										Coming Soon...
									</Text>
								</View> : null}
							</View>
						</TouchableWithoutFeedback>
					)}
				/> : <Loader/>}
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
	);
};

export default ItemListScreen;
