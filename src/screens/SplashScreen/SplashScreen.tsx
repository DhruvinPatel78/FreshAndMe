import React from 'react';
import {Style} from './Style/Style';
import {SafeAreaView, Text} from 'react-native';

const splashScreen = () => {
  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.titleText}>Fresh And Me</Text>
    </SafeAreaView>
  );
};

export default splashScreen;
