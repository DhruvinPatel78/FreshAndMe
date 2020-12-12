import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import {InputFieldInterface} from './Interface/InputFieldInterface';
import {Style} from './Style/Style';
import Color from '../../common/color/color';;

const FloatingTextInput: React.FC<InputFieldInterface> = (props) => {

	const [ isFocused, setIsFocused ] = useState<boolean>(false)

	const {
		title,
		value,
		keyboardType,
		returnKey,
		updateState,
		inputType,
		onSubmitEditing,
		isPassword
	} = props;

	// @ts-ignore
	// @ts-ignore
	return (
		<View style={{ paddingTop: 18 }}>
			<Text style={{
				position: 'absolute',
				left: 0,
				top: isFocused && value ? 5 : !value && isFocused ? 5 : 25,
				fontSize: !isFocused ? 18 : 14,
				color: !isFocused ? '#aaa' : '#000',
			}}>
				{title}
			</Text>
			<TextInput
				{...props}
				value={value}
				onChangeText={(text: string) => updateState(text)}
				style={{
					height: 40,
					fontSize: 18,
					color: Color.secondaryColor,
					borderBottomWidth: 2,
					borderBottomColor: !isFocused ? Color.grayColor : Color.secondaryColor,
				}}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onSubmitEditing={onSubmitEditing}
				secureTextEntry={isPassword}
			/>
		</View>
	);
};

export default FloatingTextInput;
