/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Setup from './src/Setup';
import {name as appName} from './src/app.json';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
	GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

const PROVIDER = () => (
	<Provider store={store}>
		<PaperProvider>
			<PersistGate loading={null} persistor={persistor}>
				<Setup />
			</PersistGate>
		</PaperProvider>
	</Provider>
);

AppRegistry.registerComponent(appName, () => PROVIDER);
