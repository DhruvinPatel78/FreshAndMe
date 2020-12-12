import * as React from 'react';
import {
	Image,
	SafeAreaView,
	Text,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Alert,
} from 'react-native';
import {Style} from './Style/Style';
import {
	RegisterScreenProps,
	NavigationProp,
} from '../../navigation/PropType';
import InputField from '../../component/InputField/InputField';
import Color from '../../common/color/color';
import {useEffect, useState} from 'react';
import {Button, RadioButton, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {registerUser, clearRegisteredUser, clearError} from '../../store/actions/Authentication';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import DeviceInfo from 'react-native-device-info';
import {validateName, validatePassword, validatePhoneNumber} from '../../common/Helper/helper';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RegisterScreen: React.FC<RegisterScreenProps> = ({route, navigation}) => {
	const Navigation = useNavigation<NavigationProp>();
	const dispatch = useDispatch();
	const navigateToLogin = () => {
		Navigation.navigate('LoginScreen');
	};

	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [mobileNo, setMobileNo] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [conPassword, setConPassword] = useState<string>('');
	const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	const authState = useSelector((state: IRootReducerState) => state.authentication);

	const registerUsers = () => {
		setIsLoading(true);
		if (validateData()) {
			dispatch(registerUser(firstName, lastName, mobileNo, password, authState.fcmToken));
		}
		setIsLoading(false)
	};

	const validateData = () => {
		if (validatePassword(password) && password === conPassword) {
			if (validateName(firstName) && validateName(lastName) && validatePhoneNumber(mobileNo)) {
				return true
			} else if (!validatePhoneNumber(mobileNo) && !validateName(lastName) && !validatePhoneNumber(mobileNo)){
				setSnackbarMsg('Invalid Phone Number, First and Last name');
				setSnackbarVisible(true);
				return false
			} else if (!validateName(firstName)) {
				setSnackbarMsg('Invalid First Name');
				setSnackbarVisible(true);
				return false
			} else if (!validateName(lastName)) {
				setSnackbarMsg('Invalid Last Name');
				setSnackbarVisible(true);
				return false
			}
		} else if(validatePassword(password) && password !== conPassword){
			setSnackbarMsg('Password not match.');
			setSnackbarVisible(true);
			return false
		} else {
			setSnackbarMsg('Invalid Password');
			setSnackbarVisible(true);
		}
	}

	useEffect(() => {
		if (authState.registered) {
			if (authState.registered === '1') {
				dispatch(clearRegisteredUser());
				setIsLoading(false);
				navigateToLogin();
			}
		}
		if (authState.error) {
			setSnackbarMsg(authState.error)
			setSnackbarVisible(true)
		}
	}, [authState]);

	const resetSnackBar = () => {
		setSnackbarVisible(false);
		setSnackbarMsg('');
		setIsLoading(false);
		dispatch(clearError());
	};

	return (
		<SafeAreaView style={Style.container}>
			<KeyboardAvoidingView>
				<View style={Style.SubContainer}>
					<Text style={Style.heading}>Create Account</Text>
					<View style={Style.formContainer}>
						<InputField
							title={'First Name'}
							inputType={'name'}
							updateState={setFirstName}
							value={firstName}
							isPassword={false}
							type={'fname'}
							keyboardType={'default'}
							returnKey={'next'}
						/>
						<InputField
							title={'Last Name'}
							inputType={'name'}
							updateState={setLastName}
							value={lastName}
							type={'lname'}
							isPassword={false}
							keyboardType={'default'}
							returnKey={'next'}
						/>
						<InputField
							title={'Mobile Number'}
							inputType={'telephoneNumber'}
							updateState={setMobileNo}
							value={mobileNo}
							maxLength={10}
							type={'phone'}
							isPassword={false}
							keyboardType={'phone-pad'}
							returnKey={'next'}
						/>
						<InputField
							title={'Password'}
							inputType={'password'}
							type={'password'}
							updateState={setPassword}
							value={password}
							isPassword={true}
							keyboardType={'default'}
							returnKey={'next'}
							displayHint={true}
						/>
						<InputField
							title={'Confirm Password'}
							inputType={'password'}
							updateState={setConPassword}
							value={conPassword}
							type={'conpassword'}
							toMatchValue={password}
							isPassword={true}
							keyboardType={'default'}
							returnKey={'go'}
						/>
						<View style={Style.checkboxContainer}>
							<RadioButton
								color={Color.primaryColor}
								status={acceptTerms ? 'checked' : 'unchecked'}
								onPress={() => setAcceptTerms(!acceptTerms)}
							/>
							<Text style={Style.termsText}>
								I agree with Terms and Conditions and Privacy Policy.
							</Text>
						</View>
					</View>
					<View style={Style.FooterContainer}>
						<View style={Style.ButtonContainer}>
							<Button
								disabled={isLoading || !(firstName && lastName && mobileNo && password && conPassword && acceptTerms)}
								contentStyle={{
									height: 40,
								}}
								labelStyle={{
									color: Color.whiteColor,
								}}
								onPress={registerUsers}
								mode="contained"
								color={Color.primaryColor}>
								{'CREATE'}
							</Button>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
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

export default RegisterScreen;
