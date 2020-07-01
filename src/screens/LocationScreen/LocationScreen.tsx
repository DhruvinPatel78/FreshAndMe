import * as React from 'react';
import {Text, SafeAreaView, View, Dimensions} from 'react-native';
import {Style} from './Style/Style';
import {
  LocationScreenProps,
  LocationScreenNavigationProp,
} from '../../navigation/PropType';
import color from '../../common/color/color';
import {useNavigation} from '@react-navigation/native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../component/CustomButton/CustomButton';
// import IconFeather from 'react-native-vector-icons/Feather';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LocationScreen = ({route, navigation}: LocationScreenProps) => {
  const {width} = Dimensions.get('window');
  const Navigation = useNavigation<LocationScreenNavigationProp>();

  Navigation.setOptions({
    title: 'Select Location',
    headerLeft: () => (
      <IconMat name={'clear'} size={25} style={{marginHorizontal: 5}} onPress={Navigation.goBack} />
    ),
    headerLeftContainerStyle: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={Style.container}>
      <View
        style={{
          width: width,
          backgroundColor: color.grayColor,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 6,
        }}>
        <Text
          style={{
            fontSize: 40,
            color: color.primaryColor,
            fontWeight: 'bold',
          }}>
          MAP
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          flex: 5,
        }}>
        <Text
          style={{
            borderBottomColor: color.grayColor,
            borderBottomWidth: 1,
            marginVertical: 5,
            paddingBottom: 5,
            color: color.grayColor,
          }}>
          ADDRESS
        </Text>
        <View
          style={{
            width: width - 30,
            flex: 4,
          }}>
          <Text />
        </View>
        <View
          style={{
            marginVertical: 10,
            paddingVertical: 5,
            borderTopColor: color.grayColor,
            borderTopWidth: 1,
            flexDirection: 'row',
            height: width / 6,
          }}>
          <View style={{flex: 5, alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: color.secondaryColor,
              }}>
              {'\u20B9'} 500.00
            </Text>
            <Text
              style={{
                fontSize: 10,
              }}>
              With all Text and Shipping
            </Text>
          </View>
          <View style={{flex: 5}}>
            <CustomButton
              title={'ADD LOCATION'}
              icon={'location-on'}
              iconLib={'mat'}
              onClick={() => {}}
              backgroundColor={color.primaryColor}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;
