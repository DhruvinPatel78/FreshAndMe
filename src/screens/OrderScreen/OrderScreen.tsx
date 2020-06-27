import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {Style} from './Style/Style';
import {
  OrderScreenProps,
  OrderScreenNavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import color from '../../common/color/color';
import CustomButton from '../../component/CustomButton/CustomButton';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OrderScreen = ({route, navigation}: OrderScreenProps) => {
  const width = Dimensions.get('window').width;
  const Navigation = useNavigation<OrderScreenNavigationProp>();

  Navigation.setOptions({
    title: 'My Order',
  });

  // const navigateToPlaceOrder = () => {
  //   Navigation.navigate('PlaceOrderScreen');
  // };

  const DATA = [
    {
      id: '1',
      title: 'First Item',
      extra: '',
      price: '100',
      image:
        'https://png2.cleanpng.com/sh/bc6d8d7e553de506f8bd470d09145121/L0KzQYm3UsE3N5pviZH0aYP2gLBuTfNpd5R0hNN9ZT3lccO0gBhwa5DxeeZuLYTkgsW0hPFzc15ogNHsb3zkhLa0gB9kd5Iye9p4Y3BvccXsTgBvb155itN3c4Dkgrb1lL1qdZJsfeU2NXG7R4KBVsNjOpU2Uac3MEa1RYq9UsYyPWI9UKI8MES2R4S5Vb5xdpg=/kisspng-chocolate-bar-chocolate-tart-dark-chocolate-cocoa-chocolate-png-transparent-images-5a871863b2d195.0625962615188030437325.png',
    },
    {
      id: '2',
      title: 'Second Item',
      extra: '18+',
      price: '500',
      image:
        'https://www.pikpng.com/pngl/b/121-1218137_chocolate-png-image-dark-chocolate-transparent-background-clipart.png',
    },
    {
      id: '3',
      title: 'Third Item',
      extra: '',
      price: '150',
      image:
        'https://png2.cleanpng.com/sh/16a1833baabfa831dabf0a61b40ee76c/L0KzQYm3VMExN5l3fZH0aYP2gLBuTfhwfF5ogNHsb3zkhLa0kB1wd6Vtgdc2ZHH1e37qiP9kd51mjNc2ZnzkhrF5TmCiepDuiAVqboSwRbLqhMc6QWhoUdhsMkexRoO5V8gyP2k2TaQ8NEG4RIWAWMI4O191htk=/kisspng-hot-chocolate-smoothie-dark-chocolate-flavor-%D0%A1roissant-5acd7997c9fc27.6227817815234154478273.png',
    },
    {
      id: '4',
      title: 'First Item',
      extra: '',
      price: '200',
      image:
        'https://png2.cleanpng.com/sh/bc6d8d7e553de506f8bd470d09145121/L0KzQYm3UsE3N5pviZH0aYP2gLBuTfNpd5R0hNN9ZT3lccO0gBhwa5DxeeZuLYTkgsW0hPFzc15ogNHsb3zkhLa0gB9kd5Iye9p4Y3BvccXsTgBvb155itN3c4Dkgrb1lL1qdZJsfeU2NXG7R4KBVsNjOpU2Uac3MEa1RYq9UsYyPWI9UKI8MES2R4S5Vb5xdpg=/kisspng-chocolate-bar-chocolate-tart-dark-chocolate-cocoa-chocolate-png-transparent-images-5a871863b2d195.0625962615188030437325.png',
    },
    {
      id: '5',
      title: 'Second Item',
      extra: '18+',
      price: '150',
      image:
        'https://www.pikpng.com/pngl/b/121-1218137_chocolate-png-image-dark-chocolate-transparent-background-clipart.png',
    },
    {
      id: '6',
      title: 'Third Item',
      extra: '',
      price: '120',
      image:
        'https://png2.cleanpng.com/sh/16a1833baabfa831dabf0a61b40ee76c/L0KzQYm3VMExN5l3fZH0aYP2gLBuTfhwfF5ogNHsb3zkhLa0kB1wd6Vtgdc2ZHH1e37qiP9kd51mjNc2ZnzkhrF5TmCiepDuiAVqboSwRbLqhMc6QWhoUdhsMkexRoO5V8gyP2k2TaQ8NEG4RIWAWMI4O191htk=/kisspng-hot-chocolate-smoothie-dark-chocolate-flavor-%D0%A1roissant-5acd7997c9fc27.6227817815234154478273.png',
    },
  ];

  return (
    <SafeAreaView style={Style.container}>
      <FlatList
        data={DATA}
        style={{
          marginVertical: 10,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View
              style={{
                backgroundColor: color.whiteColor,
                borderRadius: 5,
                elevation: 5,
                marginVertical: 5,
                marginHorizontal: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 3,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: 100,
                      flex: 3,
                      backgroundColor: color.grayColor,
                      overflow: 'hidden',
                    }}
                    resizeMode={'center'}
                  />
                </View>
                <View
                  style={{
                    flex: 8,
                    paddingVertical: 5,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: color.secondaryColor,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: color.secondaryColor,
                      }}>
                      Quantity: 10
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: color.primaryColor,
                      }}>
                      {'\u20B9'} {item.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: color.secondaryColor,
                      }}>
                      Order Date: 20 Oct 2020
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    paddingVertical: 10,
                    alignItems: 'flex-end',
                    paddingHorizontal: 10,
                  }}>
                  {Boolean(item.extra) && (
                    <Text
                      style={{
                        backgroundColor: 'red',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        color: color.whiteColor,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {item.extra}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Button
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}
                  mode="contained"
                  color={color.primaryColor}
                  labelStyle={{color: color.whiteColor}}>
                  View Details
                </Button>
                <Button
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}
                  mode="outlined"
                  color={color.grayColor}
                  labelStyle={{color: color.grayColor}}>
                  View Details
                </Button>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;
