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
  CartScreenProps,
  CartScreenNavigationProp,
} from '../../navigation/PropType';
import {getToken} from "../../common/Helper/helper";
import {useNavigation} from '@react-navigation/native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import color from '../../common/color/color';
import CustomButton from '../../component/CustomButton/CustomButton';
import {useEffect, useState} from "react";
import {getCartList} from "../../store/actions/Cart";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducerState} from "../../common/interface/store/reducer/Reducer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartScreen = ({route, navigation}: CartScreenProps) => {
  const width = Dimensions.get('window').width;
  const [cartListState, setCartListState] = useState([]);
  const Navigation = useNavigation<CartScreenNavigationProp>();
  const token = getToken().then(res => {
      return res;
  });
  const dispatch = useDispatch();
  const {cartList} = useSelector((state:IRootReducerState) => state.cartReducer)
  // useEffect(() => {
  //   dispatch(getCartList(token as any));
  // },[])
  // useEffect(() => {
  //   if(Boolean(cartList.values.length)){
  //       setCartListState(cartList.values)
  //   }
  // },[cartList])
  Navigation.setOptions({
    title: 'Cart',
  });

  const navigateToPlaceOrder = () => {
    Navigation.navigate('PlaceOrderScreen');
  };



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
        renderItem={({item}:any) => {
          return (
            <View
              style={{
                backgroundColor: color.whiteColor,
                borderRadius: 5,
                elevation: 5,
                marginVertical: 5,
                marginHorizontal: 5,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 3,
                  padding: 10,
                  borderRadius: 5,
                }}>
                <Image
                  source={{uri: item.smallImage}}
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
                      fontSize: 10,
                      color: color.grayColor,
                    }}>
                    PRODUCT BY COMPANY
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <IconAnt name={'minuscircleo'} size={25} />
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                    }}>
                    10
                  </Text>
                  <IconAnt name={'pluscircleo'} size={25} />
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'flex-end',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: color.primaryColor,
                  }}>
                  {'\u20B9'} {item.price}
                </Text>
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
          );
        }}
      />
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
            title={'PLACE ORDER'}
            icon={'right'}
            iconLib={'ant'}
            onClick={navigateToPlaceOrder}
            backgroundColor={color.primaryColor}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
