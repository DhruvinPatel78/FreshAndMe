import React, {useEffect, useState} from 'react';
import {CustomAlertInterface} from './Interface/CustomAlertInterface';
import {Modal, TouchableOpacity, View, Text, Dimensions} from 'react-native';
import color from '../../common/color/color';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {Styles} from './Style/Style';
import InputField from '../InputField/InputField';

const CustomAlertPlaceInput: React.FC<CustomAlertInterface> = (props) => {

	const {field, value} = props;
	const [fields, setField] = useState<string[]>([]);
	const [values, setValues] = useState<string[]>([]);

	const [isDisabled, setIsDisabled] = useState<boolean>(false)

	useEffect(() => {
		setField(field.split('/'));
		setValues(value.split('/'));
	}, [field, value]);

	const changeValue = (index: number, value: string) => {
		const updateValue = [...values];
		updateValue[index] = value;
		setValues(updateValue);
	};

	const ganerateType = (field: string) => {
		switch (field) {
			case 'First Name':
				return 'fname';
			case 'Last Name':
				return 'lname';
			case 'Mobile No':
				return 'phone';
			case 'Password':
				return 'password';
			case 'Confirm Password':
				return 'conpassword';
		}
		return '';
	};

	const renderField = () => {
		return (
			<View style={{
				marginHorizontal: 15,
			}}>
				{fields.length > 0 && fields.map((render: string, index: number) => {
					let type: string = ganerateType(render);
					console.warn(render);
					return <InputField
						title={render}
						value={values[index]}
						updateState={(val) => changeValue(index, val)}
						keyboardType={render === 'Mobile No' ? 'phone-pad' : 'default'}
						inputType={render === 'Mobile No' ? 'telephoneNumber' : 'name'}
						returnKey={'next'}
						type={type}
						toMatchValue={render === 'Confirm Password' ? values[0] : ''}
						isPassword={render === 'Password' || render === 'Confirm Password'}/>;
				})}
			</View>);
	};

	useEffect(() => {
		setIsDisabled(values.filter((value: string) => value === '').length !== 0)
	});

	const onSubmit = () => {
		props.onSubmit(fields, values);
		setField([]);
		setValues([]);
	};

	return (
		<Modal
			visible={props.displayAlert}
			transparent={true}
			animationType={'none'}>
			<View style={Styles.mainOuterComponent}>
				<View style={Styles.mainContainer}>
					<View style={Styles.header}>
						<IconMat
							name={'cancel'}
							size={25}
							style={{
								alignSelf: 'flex-end',
							}}
							color={color.grayDarkColor}
							onPress={() => props.onCancel()}
						/>
						<View>
							{fields && renderField()}
							<View style={Styles.footer}>
								<TouchableOpacity
									disabled={isDisabled}
									style={[Styles.buttonContainer, {backgroundColor:  isDisabled ? color.grayColor : color.primaryColor}]}
									onPress={onSubmit}>
									<Text style={Styles.button}>Save</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default CustomAlertPlaceInput;
