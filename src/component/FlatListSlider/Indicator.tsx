import React from 'react';
import {View, StyleSheet} from 'react-native';

const Indicator:React.FC = ({
															 itemCount,
															 currentIndex,
															 indicatorStyle,
															 indicatorContainerStyle,
															 indicatorActiveColor,
															 indicatorInActiveColor,
															 indicatorActiveWidth = 6,
														 }: any) => {
	return (
		<View style={[styles.container, indicatorContainerStyle]}>
			{renderIndicator(itemCount, currentIndex, indicatorStyle, indicatorActiveColor, indicatorInActiveColor, indicatorActiveWidth)}
		</View>
	);
};
export default Indicator

const renderIndicator= (
	count: number,
	currentIndex: number,
	indicatorStyle: any,
	indicatorActiveColor: string,
	indicatorInActiveColor: string,
	indicatorActiveWidth: number,
) => {
	let indicators = [];
	for (let i = 0; i < count; i++) {
		indicators.push(
			<View
				style={[
					styles.indicator,
					indicatorStyle,
					i === currentIndex
						? indicatorActiveColor
						? {
							...styles.active,
							...{
								backgroundColor: indicatorActiveColor,
								width: indicatorActiveWidth,
							},
						}
						: styles.active
						: {
							...styles.inactive,
							...{backgroundColor: indicatorInActiveColor},
						},
				]}
			/>,
		);
	}
	return indicators;
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
	},
	indicator: {
		width: 6,
		height: 6,
		borderRadius: 3,
		marginRight: 5,
	},
	active: {},
	inactive: {},
});
