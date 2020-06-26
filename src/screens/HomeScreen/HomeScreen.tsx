import * as React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {Style} from './Style/Style';
import {
  HomeScreenProps,
  // HomeScreenNavigationProp,
} from '../../navigation/PropType';
// import {useNavigation} from '@react-navigation/native';
// import {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeScreen = ({route, navigation}: HomeScreenProps) => {
  // const Navigation = useNavigation<HomeScreenNavigationProp>();
  //
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const navigateToDetail = (selectedData: DataType) => {
  //   Navigation.navigate('LoginScreen', {selectedProfile: selectedData});
  // };

  return (
    <SafeAreaView style={Style.container}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
