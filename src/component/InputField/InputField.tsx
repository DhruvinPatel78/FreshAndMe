import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {InputFieldInterface} from './Interface/InputFieldInterface';
import {Style} from './Style/Style';
import Color from '../../common/color/color';
// import {Input} from 'react-native-elements';
import Reinput from 'reinput';
import {validateName, validatePassword, validatePhoneNumber} from '../../common/Helper/helper';
import color from '../../common/color/color';
import {Snackbar} from 'react-native-paper';
import {clearError} from '../../store/actions/Authentication';

const InputField: React.FC<InputFieldInterface> = (props) => {

		const [isError, setIsError] = useState<string>('');
		const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
		const [snackbarMsg, setSnackbarMsg] = useState<string>('');
		const {
			title,
			ref,
			value,
			keyboardType,
			returnKey,
			updateState,
			inputType,
			onSubmitEditing,
			isPassword,
			type,
			toMatchValue,
			displayHint
		} = props;

		const resetSnackBar = () => {
			setSnackbarVisible(false);
			setSnackbarMsg('');
		};

		const textChange = (value: string) => {
			checkError(value)
			updateState(value);
		};

		const checkError = (value: string) => {
			if (type && value.length > 0) {
				switch (type) {
					case 'phone': {
						setIsError(!validatePhoneNumber(value) ? 'Invalid Phone Number': '');
						break;
					}
					case 'password': {
						setIsError(!validatePassword(value) ? 'Invalid Password': '');
						break;
					}
					case 'conpassword': {
						if (toMatchValue) {
							setIsError( value !== toMatchValue  ? 'Password not matched': '');
						}
						break;
					}
					case 'fname': {
						setIsError(!validateName(value) ? 'Invalid First Name': '');
						break;
					}
					case 'lname': {
						setIsError(!validateName(value) ? 'Invalid Last Name': '');
						break;
					}
				}
			} else {
				if (type === 'password' && displayHint) {
					setSnackbarVisible(true)
					setSnackbarMsg("Password must contains \nAt least 6 digit of length. \nOne capital , One symbol, One digit.")
				}
			}
		}

// @ts-ignore
// @ts-ignore
		return (
			<View style={Style.container}>
				<Reinput
					ref={ref}
					label={title}
					keyboardType={keyboardType}
					value={value}
					fontSize={18}
					fontWeight={'bold'}
					color={Color.secondaryColor}
					labelColor={Color.grayColor}
					labelActiveColor={Color.secondaryColor}
					underlineActiveColor={Color.secondaryColor}
					underlineColor={Color.grayColor}
					underlineHeight={1}
					secureTextEntry={isPassword}
					onChangeText={textChange}
					maxLength={props.maxLength ? props.maxLength : null}
					error={isError}
					errorColor={'red'}
					errorStyle={{
						fontSize: 10,
						paddingTop: 0,
					}}
					onBlur={() => value.length === 0 ? setIsError(''): null}
					onFocus={() => checkError(value)}
					onSubmitEditing={onSubmitEditing}
				/>
				<Snackbar
					visible={snackbarVisible}
					onDismiss={resetSnackBar}
					action={{
						label: 'Ok',
						onPress: () => resetSnackBar(),
					}}>
					{snackbarMsg}
				</Snackbar>
			</View>
		);
	}
;

export default InputField;
