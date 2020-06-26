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
import SplashScreen from './screens/SplashScreen/SplashScreen';
import {enableScreens} from 'react-native-screens';

enableScreens();

const App = () => {
  const [screen, setScreen] = useState('splash');
  useEffect(() => {
    setTimeout(() => {
      setScreen('navigation');
    }, 2000);
  }, []);
  return screen === 'splash' ? <SplashScreen /> : <Navigation />;
};

export default App;
