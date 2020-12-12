import * as React from 'react';
import {
	Text,
	SafeAreaView,
	View,
	Dimensions,
	Alert,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import {Style} from './Style/Style';
import {
	LocationScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import color from '../../common/color/color';
import {useNavigation} from '@react-navigation/native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import CustomIconButton from '../../component/CustomButton/CustomIconButton';
import MapView, {Callout, MapEvent, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {ILatLng, InitialLatLng} from './Interface/LocationScreenInterface';
import Loader from '../../component/Loader/Loader';
import {RadioButton, Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addUserAddressAction, getUserAddressAction} from '../../store/actions/UserData';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import Color from '../../common/color/color';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {IAddress} from '../../store/interface/UserData/UserDataInterface';
import {
	initialHomeAddress,
	initialOtherAddress,
	initialWorkAddress,
} from '../../store/reducers/UserData/InitialUserDataState';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LocationScreen: React.FC<LocationScreenProps> = ({route, navigation}) => {

	const dispatch = useDispatch();

	const authState = useSelector((state: IRootReducerState) => state.authentication.loggedIn);
	const addressReducer = useSelector((state: IRootReducerState) => state.UserDataReducer.addresses);

	const {width, height} = Dimensions.get('window');

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	const [homeAddress, setHomeAddress] = useState<IAddress>(initialHomeAddress);
	const [workAddress, setWorkAddress] = useState<IAddress>(initialWorkAddress);
	const [otherAddress, setOtherAddress] = useState<IAddress>(initialOtherAddress);

	const Navigation = useNavigation<NavigationProp>();

	Navigation.setOptions({
		title: 'Addresses',
		headerLeft: () => (
			<IconMat name={'clear'} size={25} style={{marginHorizontal: 5}} onPress={Navigation.goBack}/>
		),
		headerLeftContainerStyle: {
			padding: 15,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	useEffect(() => {
		dispatch(getUserAddressAction(authState.userId, authState.token, (response: string, msg: string) => {
			if (response === 'fail') {
				setSnackbarVisible(true);
				setSnackbarMsg(msg);
			}
		}));
	}, []);

	useEffect(() => {
		if (addressReducer[0].addressId !== '0') {
			setHomeAddress(addressReducer[0]);
		}
		if (addressReducer[1].addressId !== '0') {
			setWorkAddress(addressReducer[1]);
		}
		if (addressReducer[2].addressId !== '0') {
			setOtherAddress(addressReducer[2]);
		}
	}, [addressReducer]);

	const resetSnackBar = () => {
		setSnackbarMsg('');
		setSnackbarVisible(false);
	};

	return (
		<SafeAreaView style={Style.container}>
			<Text style={Style.heading}>SAVED ADDRESSES</Text>
			<View style={Style.addressContainer}>
				<IconAnt name={'home'} size={25} style={{marginLeft: 5}}/>
				<View style={Style.addressView}>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
						<Text style={Style.addressTypeText}>Home</Text>
						{homeAddress.addressId !== '0' && homeAddress.isDefault === 'true' &&
						<Text style={Style.addressDefaultText}>Default</Text>
						}
					</View>
					<Text style={{marginRight: 10}}>
						{homeAddress.customAddress === '' && homeAddress.address === '' && 'No Address'}
						{homeAddress.customAddress !== '' && homeAddress.customAddress}
						{homeAddress.address !== '' && ' - ' + homeAddress.address}
					</Text>
					<TouchableOpacity
						style={Style.editButton}
						onPress={() => Navigation.navigate('ManageAddressScreen', {selectedAddress: homeAddress})}
					>
						<Text style={Style.editText}>Edit</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={Style.addressContainer}>
				<IconMatCom name={'briefcase-outline'} size={25} style={{marginLeft: 5}}/>
				<View
					style={Style.addressView}>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
						<Text style={Style.addressTypeText}>Work</Text>
						{workAddress.addressId !== '0' && workAddress.isDefault === 'true' &&
						<Text style={Style.addressDefaultText}>Default</Text>
						}
					</View>
					<Text style={{marginRight: 10}}>
						{workAddress.customAddress === '' && workAddress.address === '' && 'No Address'}
						{workAddress.customAddress !== '' && workAddress.customAddress}
						{workAddress.address !== '' && ' - ' + workAddress.address}
					</Text>
					<TouchableOpacity
						style={Style.editButton}
						onPress={() => Navigation.navigate('ManageAddressScreen', {selectedAddress: workAddress})}
					>
						<Text style={Style.editText}>Edit</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={Style.addressContainer}>
				<IconMat name={'gps-fixed'} size={25} style={{marginLeft: 5}}/>
				<View
					style={Style.addressView}>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
						<Text style={Style.addressTypeText}>Other</Text>
						{otherAddress.addressId !== '0' && otherAddress.isDefault === 'true' &&
						<Text style={Style.addressDefaultText}>Default</Text>
						}
					</View>
					<Text style={{marginRight: 10}}>
						{otherAddress.customAddress === '' && otherAddress.address === '' && 'No Address'}
						{otherAddress.customAddress !== '' && otherAddress.customAddress}
						{otherAddress.address !== '' && ' - ' + otherAddress.address}
					</Text>
					<TouchableOpacity
						style={Style.editButton}
						onPress={() => Navigation.navigate('ManageAddressScreen', {selectedAddress: otherAddress})}
					>
						<Text style={Style.editText}>Edit</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/*<View style={Style.addressContainer}>*/}
			{/*	<IconMatCom name={'briefcase'} size={20} style={{marginLeft: 10}}/>*/}
			{/*	<Text style={Style.dataStyle2}>*/}
			{/*		{workAddress.customAddress === '' && workAddress.address === '' && 'No Address'}*/}
			{/*		{workAddress.customAddress !== '' && workAddress.customAddress}*/}
			{/*		{workAddress.address !== '' && ' - ' + workAddress.address}*/}
			{/*	</Text>*/}
			{/*	<TouchableOpacity onPress={() => Navigation.navigate('ManageAddressScreen', {selectedAddress: workAddress})}>*/}
			{/*		<IconMatCom*/}
			{/*			name={'pencil'}*/}
			{/*			color={color.secondaryColor}*/}
			{/*			size={20}*/}
			{/*			style={{marginLeft: 'auto'}}/>*/}
			{/*	</TouchableOpacity>*/}
			{/*</View>*/}
			{/*<View style={Style.addressContainer}>*/}
			{/*	<IconMatCom name={'crosshairs-gps'} size={20} style={{marginLeft: 10}}/>*/}
			{/*	<Text style={Style.dataStyle2}>*/}
			{/*		{otherAddress.customAddress === '' && otherAddress.address === '' && 'No Address'}*/}
			{/*		{otherAddress.customAddress !== '' && otherAddress.customAddress}*/}
			{/*		{otherAddress.address !== '' && ' - ' + otherAddress.address}*/}
			{/*	</Text>*/}
			{/*	<TouchableOpacity onPress={() => Navigation.navigate('ManageAddressScreen', {selectedAddress: otherAddress})}>*/}
			{/*		<IconMatCom*/}
			{/*			name={'pencil'}*/}
			{/*			color={color.secondaryColor}*/}
			{/*			size={20}*/}
			{/*			style={{marginLeft: 'auto'}}/>*/}
			{/*	</TouchableOpacity>*/}
			{/*</View>*/}
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

export default LocationScreen;
