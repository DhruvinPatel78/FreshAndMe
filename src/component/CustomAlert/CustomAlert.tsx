import React from 'react';
import {CustomAlertInterface} from './Interface/CustomAlertInterface';
import {Modal, TouchableOpacity, View, Text, Dimensions} from 'react-native';
import color from '../../common/color/color';
import IconEnt from 'react-native-vector-icons/Entypo';
import {Styles} from './Style/Style'

const {width} = Dimensions.get('window');

const CustomAlert: React.FC<CustomAlertInterface> = (props) => {

	return (
		<Modal
			visible={props.displayAlert}
			transparent={true}
			animationType={'none'}>
			<View style={Styles.mainOuterComponent}>
				<View style={Styles.mainContainer}>
					<View style={Styles.header}>
						<IconEnt
							name={'cross'}
							size={30}
							color={color.secondaryColor}
							onPress={() => props.onPressButton('cancel')}
						/>
					</View>
					<View style={Styles.alertBody}>
						<View style={Styles.middlePart}>
							<Text style={Styles.alertTitleTextStyle}>
								{`${props.alertTitleText}`}
							</Text>
						</View>
						<View style={Styles.footer}>
							<TouchableOpacity
								style={[Styles.buttonContainer, {backgroundColor: color.primaryColor}]}
								onPress={() => props.onPressButton('cash')}>
								<Text style={Styles.button}>Cash On Delivery</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[Styles.buttonContainer, {backgroundColor: color.primaryColor}]}
								onPress={() => props.onPressButton('digital')}>
								<Text style={Styles.button}>Digital Payment</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default CustomAlert;
