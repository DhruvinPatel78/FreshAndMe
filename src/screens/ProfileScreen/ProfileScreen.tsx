import React, {useEffect, useState} from 'react';
import {Style} from './Style/Style';
import {
	Dimensions,
	SafeAreaView,
	Text,
	View,
	Button, Image, TouchableOpacity,
} from 'react-native';
import {NavigationProp, ProfileScreenProps} from '../../navigation/PropType';
import {CommonActions, useNavigation} from '@react-navigation/native';
import color from '../../common/color/color';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import moment from 'moment';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {editUserData, logoutUserAction, registerUser} from '../../store/actions/Authentication';
import Color from '../../common/color/color';
import CustomAlertInput from '../../component/CustomAlertInput/CustomAlertInput';
import {Snackbar} from 'react-native-paper';
import {addUserAddressAction, changeUserDefaultAddressAction, getUserAddressAction} from '../../store/actions/UserData';
import {IAddress} from '../../store/interface/UserData/UserDataInterface';
import {
	initialHomeAddress,
	initialOtherAddress,
	initialWorkAddress,
} from '../../store/reducers/UserData/InitialUserDataState';

const ProfileScreen: React.FC<ProfileScreenProps> = ({route, navigation}) => {

	const Navigation = useNavigation<NavigationProp>();
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [alertTitle, setAlertTitle] = useState<string>('');
	const [editField, setEditField] = useState<string>('');
	const [editFieldValue, setEditFieldValue] = useState<string>('');

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	const [homeAddress, setHomeAddress] = useState<IAddress>(initialHomeAddress);
	const [workAddress, setWorkAddress] = useState<IAddress>(initialWorkAddress);
	const [otherAddress, setOtherAddress] = useState<IAddress>(initialOtherAddress);

	const authReducer = useSelector((state: IRootReducerState) => state.authentication.loggedIn);
	const addressReducer = useSelector((state: IRootReducerState) => state.UserDataReducer.addresses);

	Navigation.setOptions({
		title: 'Profile',
		headerRight: () =>
			<Text style={{fontWeight: 'bold'}} onPress={logout}>Logout</Text>,
		headerRightContainerStyle: {
			marginHorizontal: 15,
		},
		headerShown: false,
	});

	useEffect(() => {
		navigation.addListener('focus', () => {
			dispatch(getUserAddressAction(authReducer.userId, authReducer.token, (response: string, msg: string) => {
				if (response === 'fail') {
					setSnackbarVisible(true);
					setSnackbarMsg(msg);
				}
			}));
		});
	}, [Navigation]);

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

	const updateDefaultAddress = (Address: IAddress) => {
		console.log('UPDATE ADDRESS');
		const payload = {
			userId: authReducer.userId,
			addressId: Address.addressId.toString(),
		};
		dispatch(changeUserDefaultAddressAction(authReducer.token, payload, (response: string, msg: string) => {
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
					setSnackbarVisible(true);
					setSnackbarMsg(msg);
				}
			}
		}));
	};

	const logout = () => {
		dispatch(logoutUserAction());
		// Navigation.popToTop();
	};

	const navigateToOrder = () => {
		Navigation.navigate('OrderScreen');
	};

	const navigateToLocation = () => {
		Navigation.navigate('LocationScreen');
	};

	const editHandler = (field: string, value: string) => {
		setEditField(field);
		setEditFieldValue(value);
		switch (field) {
			case 'name': {
				setAlertTitle('Update Name');
				break;
			}
		}
		setIsOpen(true);
	};

	const getCheckBoxColor = (checked: boolean) => {
		const style = {...Style.checkIconContainer};
		style.backgroundColor = checked ? Color.primaryColor : Color.grayColor;
		return style;
	};

	const onSubmitUpdate = (field: string[], value: string[]) => {
		setIsOpen(false);
		const authState: any = {...authReducer};
		field.forEach((field: string, index: number) => {
			let newField: string = '';
			switch (field) {
				case 'First Name':
					newField = 'firstName';
					break;
				case 'Last Name':
					newField = 'lastName';
					break;
				case 'Password':
					newField = 'password';
					break;
				case 'Mobile No':
					newField = 'mobileNo';
					break;
			}
			if (field !== 'Confirm Password') {
				authState[newField] = value[index];
			}
		});
		authState.birthDate = moment(authState.birthDate).format('DD/MM/YYYY');
		authState.isValid = authState.isValid ? 'true' : 'false';
		authState.isActive = authState.isActive ? 'true' : 'false';
		console.log(authState);
		dispatch(editUserData(authState, (response: string, msg?: string) => {
			switch (response) {
				case 'loading': {
					setSnackbarMsg('Loading....');
					setSnackbarVisible(true);
					break;
				}
				case 'success': {
					setSnackbarMsg('Profile Updated Successfully.');
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
		// dispatch(registerUser(authState.firstName, authState.lastName, authState.mobileNo, authState.password, authState.fcmToken));
	};

	const resetSnackBar = () => {
		if (snackbarMsg === 'Session Expire') {
			navigation.dispatch(CommonActions.reset({index: 1, routes: [{name: 'LoginScreen'}]}));
		} else {
			setSnackbarVisible(false);
			setSnackbarMsg('');
		}
	};

	return (
		<SafeAreaView style={Style.container}>
			<View style={Style.upperShape}/>
			<View style={Style.lowerShape}/>
			<View style={Style.card}>
				<View style={Style.cardHeader}>
					<View style={{flex: 1}}/>
					<View style={Style.avatarContainer}>
						<Image source={{uri: ''}}
									 style={Style.avatar}/>
						<View style={{
							flexDirection: 'row',
							top: -50,
							marginLeft: 10,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<Text style={Style.userName}>
								{`${authReducer.firstName} ${authReducer.lastName}`}
							</Text>
							<IconMatCom name={'pencil'} size={20}
													onPress={() => editHandler('First Name/Last Name', authReducer.firstName + '/' + authReducer.lastName)}/>
						</View>
					</View>
					<View style={Style.badgeContainer}>
						{authReducer.isValid
							? <Text style={Style.badgeText}>18 +</Text>
							: null}
					</View>
				</View>
				<View style={Style.dataContainer}>
					<IconMat name={'call'} size={20}/>
					<Text style={Style.dataStyle}>{authReducer.mobileNo}</Text>
					<IconMatCom name={'pencil'} size={20} onPress={() => editHandler('Mobile No', authReducer.mobileNo)}/>
				</View>
				<View style={Style.dataContainerCol}>
					<View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5}}>
						<IconMat name={'location-on'} size={20}/>
						<Text style={Style.dataStyle}>Address</Text>
						<IconMatCom name={'pencil'} onPress={navigateToLocation} size={20} style={{marginLeft: 'auto'}}/>
					</View>
					<TouchableOpacity style={Style.addressContainer} disabled={homeAddress.addressId === '0'}
														onPress={() => updateDefaultAddress(homeAddress)}>
						<View style={getCheckBoxColor(homeAddress.isDefault === 'true')}>
							<IconFont name={'check'} size={10} color={Color.whiteColor}/>
						</View>
						<IconIonic name={'home'} size={20} style={{marginHorizontal: 10}}/>
						<Text style={Style.dataStyle2}>
							{homeAddress.customAddress !== '' ? homeAddress.customAddress : 'No Address'}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={Style.addressContainer} disabled={workAddress.addressId === '0'}
														onPress={() => updateDefaultAddress(workAddress)}>
						<View style={getCheckBoxColor(workAddress.isDefault === 'true')}>
							<IconFont name={'check'} size={10} color={Color.whiteColor}/>
						</View>
						<IconMatCom name={'briefcase'} size={20} style={{marginHorizontal: 10}}/>
						<Text style={Style.dataStyle2}>
							{workAddress.customAddress !== '' ? workAddress.customAddress : 'No Address'}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={Style.addressContainer} disabled={otherAddress.addressId === '0'}
														onPress={() => updateDefaultAddress(otherAddress)}>
						<View style={getCheckBoxColor(otherAddress.isDefault === 'true')}>
							<IconFont name={'check'} size={10} color={Color.whiteColor}/>
						</View>
						<IconMatCom name={'crosshairs-gps'} size={20} style={{marginHorizontal: 10}}/>
						<Text style={Style.dataStyle2}>
							{otherAddress.customAddress !== '' ? otherAddress.customAddress : 'No Address'}
						</Text>
					</TouchableOpacity>

				</View>
				<View style={Style.dataContainer}>
					<IconMat name={'lock'} size={20}/>
					<Text style={Style.dataStyle}>Change Password</Text>
					<IconMatCom name={'pencil'} size={20} onPress={() => editHandler('Password/Confirm Password', '/')}/>
				</View>
				<TouchableOpacity onPress={navigateToOrder} style={[Style.dataContainer, {paddingLeft: 15}]}>
					<IconFont name={'clipboard-list'} size={20}/>
					<Text style={Style.dataStyle}>My Orders</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={logout}
													style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15}}>
					<Text style={{color: Color.redColor}}>Log out</Text>
				</TouchableOpacity>
			</View>
			<CustomAlertInput
				displayAlert={isOpen}
				alertTitleText={alertTitle}
				value={editFieldValue}
				field={editField}
				onSubmit={onSubmitUpdate}
				onCancel={() => setIsOpen(false)}
			/>
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

export default ProfileScreen;
