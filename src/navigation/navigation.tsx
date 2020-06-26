import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import Color from '../common/color/color';
import {RootStackParamList} from './PropType';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

const Stack = createStackNavigator<RootStackParamList>();

const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Color.whiteColor,
    elevation: 0,
  },
  headerBackTitle: 'Back',
  headerTintColor: Color.secondaryColor,
  headerTitleAlign: 'center',
};

const navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavigationOptions}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
