import * as React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {Style} from './Style/Style';
import {
  PaymentScreenProps,
  PaymentScreenNavigationProp, ItemListScreenNavigationProp,
} from '../../navigation/PropType';
import color from '../../common/color/color';
import {useNavigation} from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaymentScreen = ({route, navigation}: PaymentScreenProps) => {

  const Navigation = useNavigation<ItemListScreenNavigationProp>();

  const navigateToOrder = () => {
    Navigation.navigate('OrderScreen');
  };

  Navigation.setOptions({
    headerShown: false,
  });

  return (
    <SafeAreaView style={Style.container}>
      <Text
        style={{
          fontSize: 40,
          color: color.primaryColor,
          fontWeight: 'bold',
        }}
        onPress={navigateToOrder}
      >
        PAYMENT
      </Text>
    </SafeAreaView>
  );
};

export default PaymentScreen;
