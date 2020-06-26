/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';

import {Provider} from 'react-redux';
import store from './src/store';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

const PROVIDER = () => (
  <Provider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => PROVIDER);
