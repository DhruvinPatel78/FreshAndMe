import React, {useState, useEffect} from 'react';
import {
	Dimensions,
	SafeAreaView,
	ScrollView,
	Text, TouchableOpacity,
	View,
} from 'react-native';
import {ManageAddressScreenProps, NavigationProp} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import {Style} from './Style/Style';
import Loader from '../../component/Loader/Loader';
import MapView, {MapEvent, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import InputField from '../../component/InputField/InputField';
import {Snackbar} from 'react-native-paper';
import CustomIconButton from '../../component/CustomButton/CustomIconButton';
import color from '../../common/color/color';
import CustomAlertChildren from '../../component/CustomAlertChildren/CustomAlertChildren';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {addUserAddressAction} from '../../store/actions/UserData';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {IAddress} from '../../store/interface/UserData/UserDataInterface';

const {height, width} = Dimensions.get('window');

const latitudeDelta = 0.0090;
const longitudeDelta = 0.0090;

const ManageAddressScreen: React.FC<ManageAddressScreenProps> = ({route, navigation}) => {

	const dispatch = useDispatch();
	const Navigation = useNavigation<NavigationProp>();
	const {selectedAddress} = route.params;

	const addressType = useState<string>(selectedAddress.addressType);

	const authState = useSelector((state: IRootReducerState) => state.authentication.loggedIn);

	const [currentLocation, setCurrentLocation] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta,
		longitudeDelta,
	});

	const [currentRegion, setCurrentRegion] = useState({
		latitude: selectedAddress.latitude ? +selectedAddress.latitude : 0,
		longitude: selectedAddress.longitude ? +selectedAddress.longitude : 0,
		latitudeDelta,
		longitudeDelta,
	});

	const [currentAddress, setCurrentAddress] = useState(selectedAddress.address);
	const [customAddress, setCustomAddress] = useState(selectedAddress.customAddress);
	const [pincode, setPincode] = useState<string>(selectedAddress.pincode);
	const [landMark, setLandMark] = useState<string>(selectedAddress.landmark);

	Geocoder.init('AIzaSyDv0GMEn2WjcucXnzbqBbjacPu9eM3X4fQ', {language: 'en'});

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	Navigation.setOptions({
		title: `${selectedAddress.addressType} Address`,
		headerLeft: () => (
			<IconMat name={'clear'} size={25} style={{marginHorizontal: 5}} onPress={Navigation.goBack}/>
		),
		headerLeftContainerStyle: {
			padding: 15,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		headerRight: () => (
			<IconMat
				name={'check'}
				size={25}
				color={color.primaryColor}
				style={{marginHorizontal: 5}}
				onPress={saveAddress}/>
		),
		headerRightContainerStyle: {
			padding: 15,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	const saveAddress = () => {
		console.log('SAVE ADDRESS');
		const payload = {
			addressId: selectedAddress.addressId.toString(),
			userId: authState.userId,
			address: currentAddress,
			pincode: pincode,
			landmark: landMark,
			isCurrent: selectedAddress.isCurrent ? selectedAddress.isCurrent ? 'true' : 'false': 'true',
			latitude: currentRegion.latitude.toString(),
			longitude: currentRegion.longitude.toString(),
			isDefault: selectedAddress.isDefault ? selectedAddress.isDefault ? 'true' : 'false': 'false',
			addressType: selectedAddress.addressType,
			customAddress: customAddress,
		};
		console.log(payload);
		if (pincode && currentAddress) {
			dispatch(addUserAddressAction(authState.token, payload, (response: string) => {
				switch (response) {
					case 'loading': {
						setSnackbarMsg('Loading....');
						setSnackbarVisible(true);
						break;
					}
					case 'response': {
						setSnackbarMsg('');
						setSnackbarVisible(false);
						Navigation.goBack();
						break;
					}
					case 'fail': {
						setSnackbarMsg('Something Went Wrong.');
						setSnackbarVisible(true);
						break;
					}
				}
			}));
		} else {
			setSnackbarMsg('Address is Missing');
			setSnackbarVisible(true);
		}
	};

	useEffect(() => {
		console.log('MOUNT');
		navigation.addListener('focus', () => {
			console.log('FOCUS');
			if (currentRegion.latitude === 0) {
				Geolocation.getCurrentPosition(info => {
					const location = {...currentRegion};
					location.latitude = info.coords.latitude;
					location.longitude = info.coords.longitude;
					setCurrentRegion(location);
				});
			}
			Geolocation.getCurrentPosition(info => {
				const location = {...currentLocation};
				location.latitude = info.coords.latitude;
				location.longitude = info.coords.longitude;
				setCurrentLocation(location);
			});
			// else {
			//     setCurrentRegion({
			//         latitude: 0,
			//         longitude: 0,
			//         latitudeDelta,
			//         longitudeDelta,
			//     });
			// }
		});
		navigation.addListener('blur', () => {
			console.log('BLUR ===========>');
			setCurrentRegion({
				latitude: 0,
				longitude: 0,
				latitudeDelta,
				longitudeDelta,
			});
			setCustomAddress('');
			setPincode('');
			setLandMark('');
		});
		// navigation.addListener('beforeRemove', (e) => {
		//     console.log('REMOVE ===========>');
		//     // Prevent default behavior of leaving the screen
		//     e.preventDefault();
		//
		//     const updatedAddress = {
		//         address: currentAddress,
		//         customAddress: customAddress,
		//         type: address.type,
		//         id: address.id,
		//         latitude: currentRegion.latitude,
		//         longitude: currentRegion.longitude,
		//     };
		//
		//     console.log(currentAddress);
		//     console.log(customAddress);
		//     console.log(currentRegion);
		//
		//     //changeAddress(updatedAddress)
		//
		//     navigation.dispatch(e.data.action);
		// });
	}, [navigation]);

	useEffect(() => {
		if (currentRegion.latitude !== 0) {
			setMarkerLatLngState(currentRegion.latitude, currentRegion.longitude);
			// Geocoder.from(currentRegion.latitude, currentRegion.longitude)
			// 	.then((json: any) => {
			// 		// console.log("formatted address ====>");
			// 		// console.log(json.results[0].formatted_address);
			// 		setPincode(json.results[0].address_components.find((geo: any) => geo.types.includes('postal_code')).long_name);
			// 		setCurrentAddress(json.results[0].formatted_address);
			// 	})
			// 	.catch((error: any) => console.warn(error));
		}
	}, [currentRegion]);

	const onChangeRegion = (region: any) => {
		console.log('REGION CHANGE');
		console.log(region);
		// console.log('Region Change', region);
		const location = {...currentRegion};
		location.latitude = region.latitude;
		location.longitude = region.longitude;
		setCurrentRegion(location);
	};

	const changeLatLng = (coordinate: any) => {
		const location = {...currentRegion};
		location.latitude = coordinate.lat;
		location.longitude = coordinate.lng;
		setCurrentRegion(location);
	};

	const UpdateAddress = () => {
		console.log();
		// const updatedAddress = {
		// 	address: currentAddress,
		// 	customAddress: customAddress,
		// 	type: selectedAddress.addressType,
		// 	id: address.id,
		// 	latitude: currentRegion.latitude,
		// 	longitude: currentRegion.longitude,
		// };
		//
		// changeAddress(updatedAddress)
		// navigation.goBack()
	};

	const setMarkerLatLngState = (lat: number, lng: number) => {
		// setMarkerLatLng({latitude: lat, longitude: lng});
		Geocoder.from(lat, lng)
			.then((json: any) => {
				setPincode(json.results[0].address_components.find((geo: any) => geo.types.includes('postal_code')).long_name);
				setCurrentAddress(json.results[0].formatted_address);
			})
			.catch((error: any) => console.warn(error));
	};

	const resetSnackBar = () => {
		setSnackbarMsg('');
		setSnackbarVisible(false);
	};


	return <SafeAreaView style={Style.container}>
		<ScrollView
			style={{
				flex: 1,
			}}
		>
			{currentRegion.latitude !== 0 ?
				<MapView
					style={{
						width: width,
						height: height * 0.5,
					}}
					provider={PROVIDER_GOOGLE}
					region={currentRegion}
					onRegionChangeComplete={onChangeRegion}
					loadingEnabled={true}
					// onPress={(e: MapEvent) => setMarkerLatLngState(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
				>
					{/*{markertlatlng.latitude &&*/}
					<Marker
						draggable={true}
						coordinate={{
							latitude: currentRegion.latitude,
							longitude: currentRegion.longitude,
						}}
						onDragEnd={(e) => onChangeRegion(e.nativeEvent.coordinate)}
						// coordinate={markertlatlng}
						// title={'MARK'}
						// description={''}
						// onDrag={(e: MapEvent) => setMarkerLatLngState(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
					/>
					{/*<Callout style={{*/}
					{/*	width: width / 2,*/}
					{/*	padding: 5,*/}
					{/*	borderRadius: 20,*/}
					{/*}}>*/}
					{/*	<Text>{Address}</Text>*/}
					{/*</Callout>*/}
					{/*}*/}
				</MapView> :
				<Loader/>
			}
			<View style={{
				flex: 1,
				paddingHorizontal: 15,
				marginTop: 10,
			}}>
				{/*Address and change addresss button*/}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'flex-start',
					}}>
					<View style={{
						flex: 1,
					}}>
						<Text style={{
							color: '#151420',
							fontWeight: 'bold',
							fontSize: 16,
						}}>{currentAddress}</Text>
					</View>
					<TouchableOpacity
						style={{
							backgroundColor: color.whiteColor,
							borderColor: color.primaryColor,
							borderWidth: 1,
							paddingHorizontal: 15,
							paddingVertical: 10,
							borderRadius: 15,
						}}
						onPress={() => setIsOpen(!isOpen)}
					>
						<Text style={{
							color: color.primaryColor,
							fontWeight: 'bold',
						}}>CHANGE</Text>
					</TouchableOpacity>
				</View>
				<View style={{marginBottom: 10}}>
					<InputField
						value={customAddress}
						updateState={text => setCustomAddress(text)}
						keyboardType={'default'}
						inputType={'name'}
						isPassword={false}
						returnKey={'done'}
						title={'Address'}
					/>
				</View>
				<View style={{marginBottom: 10}}>
					<InputField
						value={landMark}
						updateState={text => setLandMark(text)}
						keyboardType={'default'}
						inputType={'name'}
						isPassword={false}
						returnKey={'done'}
						title={'Landmark'}
					/>
				</View>
				<View style={{marginBottom: 10}}>
					<InputField
						value={pincode}
						updateState={text => setPincode(text)}
						keyboardType={'default'}
						inputType={'telephoneNumber'}
						isPassword={false}
						returnKey={'done'}
						title={'Pincode'}
					/>
					{/*<View style={{*/}
					{/*	flexDirection: 'row',*/}
					{/*	alignItems: 'center',*/}
					{/*	justifyContent: 'space-between',*/}
					{/*}}>*/}
					{/*	<Text style={{*/}
					{/*		color: '#151420',*/}
					{/*		fontWeight: 'bold',*/}
					{/*		fontSize: 14,*/}
					{/*	}}>Save As : {address.type}</Text>*/}
					{/*	<TouchableOpacity*/}
					{/*		style={{*/}
					{/*			backgroundColor: '#bdc3c7',*/}
					{/*			paddingHorizontal: 15,*/}
					{/*			paddingVertical: 5,*/}
					{/*			marginVertical: 10,*/}
					{/*			borderRadius: 10,*/}
					{/*		}}*/}
					{/*		onPress={UpdateAddress}*/}
					{/*	>*/}
					{/*		<Text style={{*/}
					{/*			color: '#e4744c',*/}
					{/*			fontWeight: 'bold',*/}
					{/*		}}>SAVE</Text>*/}
					{/*	</TouchableOpacity>*/}
					{/*</View>*/}
				</View>
			</View>
		</ScrollView>
		{/*<View*/}
		{/*	style={{*/}
		{/*		position: 'absolute',*/}
		{/*		bottom: 0,*/}
		{/*		paddingVertical: 5,*/}
		{/*		paddingHorizontal: 15,*/}
		{/*		borderTopColor: color.grayColor,*/}
		{/*		borderTopWidth: 1,*/}
		{/*		flexDirection: 'row',*/}
		{/*		height: width / 7,*/}
		{/*		width: width,*/}
		{/*		justifyContent: 'flex-end',*/}
		{/*		backgroundColor: color.whiteColor*/}
		{/*	}}>*/}
		{/*	<View style={{width: width / 3}}>*/}
		{/*		<CustomIconButton*/}
		{/*			title={'SAVE'}*/}
		{/*			icon={'location-on'}*/}
		{/*			iconLib={'mat'}*/}
		{/*			onClick={() => {}}*/}
		{/*			backgroundColor={color.primaryColor}*/}
		{/*		/>*/}
		{/*	</View>*/}
		{/*</View>*/}
		<CustomAlertChildren
			displayAlert={isOpen}
			alertTitleText={'Search Location'}
			onClose={() => setIsOpen(!isOpen)}>
			<View
				style={{
					height: height * 0.4,
				}}>
				<GooglePlacesAutocomplete
					query={{
						key: 'AIzaSyDv0GMEn2WjcucXnzbqBbjacPu9eM3X4fQ',
						language: 'en', // language of the results
						components: 'country:in',
					}}
					onPress={(data: any, details = null) => {
						Geocoder.from(data.description)
							.then((json: any) => {
								var location = json.results[0].geometry.location;
								console.log(location);
								setMarkerLatLngState(location.lat, location.lng);
								changeLatLng(location);
								setIsOpen(!isOpen);
								// changeLocation(location)
								// navigation.pop()
							})
							.catch((error: any) => console.warn(error));
					}}
					onFail={(error) => console.error(error)}
					styles={{
						textInputContainer: {
							backgroundColor: 'rgba(0,0,0,0)',
							borderTopWidth: 0,
							borderBottomWidth: 0,
						},
						textInput: {
							marginLeft: 0,
							marginRight: 0,
							height: 38,
							color: '#5d5d5d',
							fontSize: 16,
							borderBottomWidth: 1,
							borderBottomColor: color.secondaryColor,
						},
						predefinedPlacesDescription: {
							color: '#1faadb',
						},
						container: {
							height: 100,
							paddingHorizontal: 10,
						},
					}}
				/>
			</View>
		</CustomAlertChildren>
		<TouchableOpacity
			style={{
				height: 40,
				width: 40,
				borderRadius: 20,
				backgroundColor: color.whiteColor,
				position: 'absolute',
				top: height * 0.42,
				right: 15,
				justifyContent: 'center',
				alignItems: 'center',
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,

				elevation: 5,
			}}
			onPress={() => onChangeRegion({latitude: currentLocation.latitude, longitude: currentLocation.longitude})}
		>
			<IconMat name={'gps-fixed'} color={color.secondaryColor} size={25}/>
		</TouchableOpacity>
		<Snackbar
			visible={snackbarVisible}
			onDismiss={resetSnackBar}
			action={{
				label: snackbarMsg !== 'Loading....' ? 'Ok' : '',
				onPress: () => resetSnackBar(),
			}}>
			{snackbarMsg}
		</Snackbar>
	</SafeAreaView>;
};

export default ManageAddressScreen;
