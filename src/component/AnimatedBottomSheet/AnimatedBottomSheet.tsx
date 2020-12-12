import React, {useEffect, useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
} from 'react-native';

import Animated from 'react-native-reanimated';
import color from '../../common/color/color';

const {width, height} = Dimensions.get('window');

const AnimatedBottomSheet: React.FC<any> = (props) => {
	return (
		<Animated.View style={{...styles.bottomSheet, transform: [{translateY: props.translateY}]}}>
			<Text style={{ fontSize: 25 }}>Payment Option</Text>
			<View style={{ flex: 2, flexDirection: 'row' }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 15 }}>Cash</Text>
				</View>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
					<Text style={{ fontSize: 15 }}>Digital</Text>
				</View>
			</View>
			<Text>Hello</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	bottomSheet: {
		position: 'absolute',
		bottom: 5,
		width: width - 30,
		height: width / 2,
		backgroundColor: color.whiteColor,
		borderRadius: 25,
		marginHorizontal: 15,
		alignItems: 'center',
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
});

export default AnimatedBottomSheet;
