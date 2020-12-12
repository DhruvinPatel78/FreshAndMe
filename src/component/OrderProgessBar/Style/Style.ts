import {Dimensions, StyleSheet} from 'react-native';
import color from '../../../common/color/color';

const width = Dimensions.get('window').width;

export const Style = StyleSheet.create({
	container: {
		height: 40,
		marginHorizontal: 30,
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	IconContainer: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20
	},
	progressBar: {
		height: width * 0.03,
		width: width * 0.1
	}
})
