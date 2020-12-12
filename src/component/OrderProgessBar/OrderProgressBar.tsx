import React from 'react';
import {Dimensions, View} from 'react-native';
import color from '../../common/color/color';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import {Style} from './Style/Style';
import {IOrderProgressBarInterface} from './Interface/OrderProgressBarInterface';

const OrderProgressBar: React.FC<IOrderProgressBarInterface> = (props: IOrderProgressBarInterface) => {

	const { completed } = props;

	const generateIconContainer = (index: number) => {
		return {
			...Style.IconContainer,
			backgroundColor: completed >= index ? color.primaryColor : color.grayMidColor
		}
	}

	const generateProgressBar = (index: number) => {
		return {
			...Style.progressBar,
			backgroundColor: completed >= index ? color.primaryColor : color.grayMidColor
		}
	}

	return (
		<View style={Style.container}>
			<View style={generateIconContainer(1)}>
				<IconFont5 name={'clipboard-list'} size={20} color={completed >= 1 ? color.whiteColor : color.grayDarkColor}/>
			</View>
			<View style={generateProgressBar(2)}/>
			<View style={generateIconContainer(2)}>
				<IconFont5 name={'credit-card'} size={20} color={completed >= 2 ? color.whiteColor : color.grayDarkColor}/>
			</View>
			<View style={generateProgressBar(3)}/>
			<View style={generateIconContainer(3)}>
				<IconFont5 name={'truck'} size={20} color={completed >= 3 ? color.whiteColor : color.grayDarkColor}/>
			</View>
			<View style={generateProgressBar(4)}/>
			<View style={generateIconContainer(4)}>
				<IconFont5 name={'box-open'} size={20} color={completed >= 4 ? color.whiteColor : color.grayDarkColor}/>
			</View>
		</View>
	);
};

export default OrderProgressBar;
