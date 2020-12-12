import {Dimensions, StyleSheet} from 'react-native';
import color from '../../../common/color/color';

const {width, height} = Dimensions.get('window');

export const Styles = StyleSheet.create({
	mainOuterComponent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00000088',
	},
	mainContainer: {
		width: width * 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.whiteColor,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	header: {
		width: width * 0.8,
		paddingVertical: 5,
		paddingHorizontal: 5,
	},
	middlePart: {
		flex: 1,
		width: width * 0.8,
		padding: 4,
		color: color.secondaryColor,
		fontSize: 16,
		marginVertical: 2,
	},
	alertTitleTextStyle: {
		flex: 10,
		textAlign: 'center',
		color: color.secondaryColor,
		fontSize: 18,
		fontWeight: 'bold',
		padding: 2,
		marginHorizontal: 2,
	},
	buttonContainer: {
		marginHorizontal: 5,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10
	},
	button: {
		fontSize: 15,
		fontWeight: 'bold',
		color: color.whiteColor,
	},
	alertBody: {
		flex: 2,
		width: width * 0.8,
	},
	footer: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	}
});

