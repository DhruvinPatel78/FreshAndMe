import React, {useEffect, useState} from 'react';
import {CustomAlertInterface} from './Interface/CustomAlertInterface';
import {Modal, TouchableOpacity, View, Text, Dimensions} from 'react-native';
import color from '../../common/color/color';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {Styles} from './Style/Style';
import InputField from '../InputField/InputField';

const CustomAlertChildren: React.FC<CustomAlertInterface> = (props) => {

	const [isDisabled, setIsDisabled] = useState<boolean>(false)

	const onSubmit = () => {

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
							onPress={() => props.onClose()}
						/>
						<View>
							{props.children}
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

export default CustomAlertChildren;
