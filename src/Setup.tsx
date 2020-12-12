import React, {useEffect, useState} from 'react';
import App from './App';
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import {useSelector} from 'react-redux';
import {IRootReducerState} from './common/interface/store/reducer/Reducer';
import {Alert} from 'react-native';

const firebaseConfig = {
	apiKey: "AIzaSyAAj7OyvmtBPiH1SmhYQH4Dgpv8H7c-LOk",
	authDomain: "freshandme-8781a.firebaseapp.com",
	databaseURL: "https://freshandme-8781a.firebaseio.com",
	projectId: "freshandme-8781a",
	storageBucket: "freshandme-8781a.appspot.com",
	messagingSenderId: "485561502650",
	appId: "1:485561502650:web:340a6299a9df0234986b83",
	measurementId: "G-N3JR1E2H6E"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const Setup = () => {
	const [token, setToken] = useState<string>(useSelector((state: IRootReducerState) => state.authentication.fcmToken))
	const [tokenMatch, setTokenMatch] = useState<boolean>(true)

	const setupCloudMessaging = async() => {
		const authStatus = await messaging().requestPermission();
		//From Background
		// messaging().onNotificationOpenedApp(remoteMessage => {
		// 	console.log(
		// 		'Notification caused app to open from background state:',
		// 		remoteMessage.notification,
		// 	);
		// 	navigation.navigate(remoteMessage.data.type);
		// });

		//From Quite State
		messaging()
			.getInitialNotification()
			.then(remoteMessage => {
				if (remoteMessage) {
					const {notification}: any = remoteMessage
					Alert.alert('Fresh And Me', notification.title + notification.body);
				}
			})
		if (token !== await messaging().getToken()) {
			console.log("TOKEN CHANGE")
			setTokenMatch(false)
			setToken(await messaging().getToken())
		}
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log('Authorization status:', authStatus);
		}
	}

	useEffect(() => {
		setupCloudMessaging()
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			const {notification}: any = remoteMessage
			Alert.alert('Fresh And Me', notification.title + notification.body);
		});
		return unsubscribe
	},[])

	return <App fcmToken={token} match={tokenMatch} />
}

export default Setup
