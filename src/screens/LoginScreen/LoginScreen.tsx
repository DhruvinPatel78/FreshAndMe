import * as React from 'react';
import {
	Image,
	SafeAreaView,
	Text,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Alert,
	ToastAndroid, TextInput,
} from 'react-native';
import {Style} from './Style/Style';
import AsyncStorage from '@react-native-community/async-storage';
import {
	NavigationProp,
	LoginScreenProps,
} from '../../navigation/PropType';
import InputField from '../../component/InputField/InputField';
import Color from '../../common/color/color';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearError, loginUser, logoutUserAction} from '../../store/actions/Authentication';
import {IRootReducerState} from '../../common/interface/store/reducer/Reducer';
import {Button, Snackbar} from 'react-native-paper';
import {validatePassword, validatePhoneNumber} from '../../common/Helper/helper';

const LoginScreen:React.FC<LoginScreenProps> = ({route, navigation}) => {
	const dispatch = useDispatch();
	const Navigation = useNavigation<NavigationProp>();
	const authReducer = useSelector((state: IRootReducerState) => state.authentication);

	const [mobileNo, setMobileNo] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
	const [snackbarMsg, setSnackbarMsg] = useState<string>('');

	const navigateToRegister = () => {
		Navigation.navigate('RegisterScreen');
	};

	const navigateToHome = () => {
		Navigation.navigate('HomeScreen');
	};

	const userLogin = () => {
		if (mobileNo && password) {
			if (validatePhoneNumber(mobileNo) && validatePassword(password)) {
				dispatch(loginUser(mobileNo, password, authReducer.fcmToken, (loading: boolean) => {
					setIsLoading(loading)
				}));
			} else {
				setSnackbarMsg('Invalid Phone Number.');
				setSnackbarVisible(true);
			}
		} else if (mobileNo && !password) {
			setSnackbarMsg('Password is missing.');
			setSnackbarVisible(true);
		} else if (!mobileNo && password) {
			setSnackbarMsg('Mobile No is missing.');
			setSnackbarVisible(true);
		} else {
			setSnackbarMsg('Mobile No and Password are missing.');
			setSnackbarVisible(true);
		}
		// setIsLoading(false);
	};

	useEffect(() => {
		dispatch(logoutUserAction())
	},[])

	// useEffect(() => {
	// 	setIsLoading(authReducer.loading);
	// }, [authReducer.loading]);

	useEffect(() => {
		if (authReducer.error) {
			setIsLoading(false)
			setSnackbarMsg(authReducer.error);
			setSnackbarVisible(true);
		}
	}, [authReducer.error]);

	useEffect(() => {
		if (authReducer.loggedIn.userId) {
			navigateToHome();
		}
	}, [authReducer.loggedIn]);

	const resetSnackBar = () => {
		if (authReducer.error) {
			dispatch(clearError())
		}
		setIsLoading(false)
		setSnackbarVisible(false);
		setSnackbarMsg('');
	};

	return (
		<SafeAreaView style={Style.container}>
			<KeyboardAvoidingView>
				<View style={Style.SubContainer}>
					<View style={Style.headingContainer}>
						<Text style={Style.heading}>Sign In</Text>
						<Text onPress={() => navigateToHome()}>Skip</Text>
					</View>
					<View>
						<Image
							source={require('../../assets/images/manScooter.png')}
							height={100}
							width={100}
						/>
						<InputField
							title={'Mobile Number'}
							inputType={'telephoneNumber'}
							updateState={setMobileNo}
							value={mobileNo}
							type={'phone'}
							isPassword={false}
							keyboardType={'phone-pad'}
							maxLength={10}
							returnKey={'next'}
						/>
						<InputField
							title={'Password'}
							inputType={'password'}
							updateState={setPassword}
							value={password}
							isPassword={true}
							type={'password'}
							keyboardType={'default'}
							returnKey={'go'}
						/>
					</View>
					<View style={Style.FooterContainer}>
						<View style={Style.registerContainer}>
							<Text style={Style.forgotpasswordText}>Forgot password?</Text>
							<Text
								style={Style.createAccountText}
								onPress={navigateToRegister}>
								Create New Account
							</Text>
						</View>
						<View style={Style.ButtonContainer}>
							<Button
								contentStyle={{
									height: 40,
								}}
								labelStyle={{
									color: Color.whiteColor,
								}}
								disabled={isLoading}
								mode="contained"
								onPress={userLogin}
								color={Color.primaryColor}>
								{'SING IN'}
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

export default LoginScreen;
