import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';

const ChildItem:React.FC = ({
															 item,
															 style,
															 onPress,
															 index,
															 imageKey,
															 local,
															 height
														 }: any) => {
	return (
		<View
			style={styles.container}>
			<Image
				style={[styles.image, style, {height: height}]}
				source={local ? item[imageKey] : {uri: item[imageKey]}}
			/>
		</View>
	);
};

export default ChildItem

const styles = StyleSheet.create({
	container: {},
	image: {
		height: 230,
		resizeMode: 'stretch',
	},
});
