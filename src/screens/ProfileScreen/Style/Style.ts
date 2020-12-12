import {Dimensions, StyleSheet} from 'react-native';
import Color from '../../../common/color/color';
import color from '../../../common/color/color';

const {width, height} = Dimensions.get('screen');

export const Style = StyleSheet.create({
	container: {
		backgroundColor: Color.whiteColor,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	upperShape: {
		width: width * 2,
		height: height,
		backgroundColor: Color.primaryColor,
		transform: [
			{rotateX: '100deg'},
			{rotateZ: '50deg'},
		],
		marginLeft: -width - (width * 0.2),
		marginTop: -(height - 500),
	},
	lowerShape: {
		position: 'absolute',
		bottom: 2,
		width: width * 2.2,
		height: height,
		backgroundColor: Color.primaryColor,
		transform: [
			{rotateX: '100deg'},
			{rotateZ: '50deg'},
		],
		right: -width - (width * 0.25),
		marginBottom: -(height - 500),
	},
	card: {
		position: 'absolute',
		top: width * 0.3,
		width: width - 60,
		height: height * 0.75,
		backgroundColor: color.whiteColor,
		borderRadius: 20,
		flex: 1,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	cardHeader: {
		height: 'auto',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
	},
	avatarContainer: {
		flex: 2,
		alignItems: 'center',
	},
	avatar: {
		height: 120,
		width: 120,
		borderRadius: 60,
		top: -60,
		// backgroundColor: Color.whiteColor,
		// borderWidth: 3,
		// borderColor: Color.grayMidColor,
	},
	userName: {
		fontSize: 25,
		fontWeight: 'bold',
		color: Color.secondaryColor,
	},
	badgeContainer: {
		flex: 1,
		alignItems: 'center',
		width: 'auto',
	},
	badgeText: {
		backgroundColor: 'red',
		paddingHorizontal: 5,
		paddingVertical: 10,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
		color: color.whiteColor,
		fontWeight: 'bold',
		fontSize: 14,
	},
	dataContainer: {
		width: '85%',
		borderRadius: 10,
		borderColor: Color.grayMidColor,
		borderWidth: 1,
		padding: 10,
		flexDirection: 'row',
		marginVertical: 5
	},
	dataContainerCol: {
		width: '85%',
		borderRadius: 10,
		borderColor: Color.grayMidColor,
		borderWidth: 1,
		paddingVertical: 10,
		flexDirection: 'column',
		marginVertical: 5
	},
	dataContainerColumn: {
		width: '85%',
		borderRadius: 10,
		borderColor: Color.grayMidColor,
		borderWidth: 1,
		padding: 10,
		flexDirection: 'column',
		marginVertical: 5
	},
	dataStyle: {
		marginHorizontal: 10,
		fontSize: 16,
		fontWeight: 'bold',
		flex: 1
	},
	dataStyle2: {
		marginHorizontal: 10,
		fontSize: 14,
		flex: 1,
		color: Color.grayDarkColor
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: Color.grayMidColor,
		borderTopWidth: 1,
		padding: 10
	},
	checkIconContainer: {
		backgroundColor: Color.primaryColor,
		borderRadius: 10,
		height: 20,
		width: 20,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
