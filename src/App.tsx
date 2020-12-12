/**
 * Shopping React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import Navigation from './navigation/navigation';
import {enableScreens} from 'react-native-screens';
import AnimatedSplash from 'react-native-animated-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import {Snackbar} from 'react-native-paper';
import GlobalFont from 'react-native-global-font'
import {useDispatch} from 'react-redux';
import {updateFCMToken} from './store/actions/Authentication';

enableScreens();

const App = (props: {fcmToken: string, match: boolean}) => {
	console.log(props)
	const [load, setLoad] = useState(false);
	const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

	const dispatch = useDispatch()

	useEffect(() => {
		if (!props.match) {
			dispatch(updateFCMToken(props.fcmToken))
		}
		GlobalFont.applyGlobal('Roboto-Regular')
		setTimeout(() => {
			setLoad(true);
		}, 1000);
	}, []);

	useEffect(() => {
		checkInternet();
	})

	useEffect(() => {
		checkInternet();
	},[snackbarVisible]);

	const checkInternet = () => {
		NetInfo.fetch().then((state:any) =>{
			setSnackbarVisible(!state.isInternetReachable);
		})
	}

	const resetSnackBar = () => {
		setSnackbarVisible(false);
	};

	return (
		<AnimatedSplash
			translucent={true}
			isLoaded={load}
			logoImage={require('./assets/images/shopping.png')}
			backgroundColor={'#262626'}
			logoHeight={150}
			logoWidht={150}
		>
			<Navigation fcmTokenMatched={props.match} />
			<Snackbar
				visible={snackbarVisible}
				onDismiss={resetSnackBar}
				action={{
					label: 'Ok',
					onPress: () => resetSnackBar(),
				}}>
				No Internet Found, Try Again
			</Snackbar>
		</AnimatedSplash>
	);
};

export default App;
