import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Style} from './Style/Style';
import {
  ItemDetailScreenProps,
  ItemDetailScreenNavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import color from '../../common/color/color';
import CustomButton from '../../component/CustomButton/CustomButton';
// import {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemDetailScreen = ({route, navigation}: ItemDetailScreenProps) => {
  const width = Dimensions.get('window').width;
  const Navigation = useNavigation<ItemDetailScreenNavigationProp>();

  const {selectedCategory, selectedItem} = route.params;

  Navigation.setOptions({
    title: selectedCategory.title,
    headerRight: () => (
      <IconFeather
        name={'shopping-cart'}
        size={25}
        style={{marginHorizontal: 5}}
				onPress={navigateToCart}
      />
    ),
    headerRightContainerStyle: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const navigateToCart = () => {
    Navigation.navigate('CartScreen');
  };

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: selectedItem.image}}
          style={{
            width: width - 30,
            height: width - 30,
            backgroundColor: color.graylightColor,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 10,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            {selectedItem.title}
          </Text>
          {Boolean(selectedItem.extra) && (
            <Text
              style={{
                backgroundColor: 'red',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                color: color.whiteColor,
                fontWeight: 'bold',
                fontSize: 16,
                flex: 1,
              }}>
              {selectedItem.extra}
            </Text>
          )}
        </View>
        <Text
          style={{
            fontSize: 10,
            color: color.grayColor,
          }}>
          PRODUCT BY COMPANY
        </Text>
        <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: color.primaryColor,
            }}>
            {'\u20B9'} {selectedItem.price}
          </Text>
          {Boolean(selectedItem.extra) && (
            <Text
              style={{
                paddingHorizontal: 15,
                color: color.redColor,
                fontWeight: '500',
                fontSize: 16,
                paddingBottom: 5,
                // textDecorationLine: 'line-through',
              }}>
              (50 % off)
            </Text>
          )}
        </View>
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            color: color.grayColor,
          }}>
          PRODUCT DETAILS
        </Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderTopColor: color.grayColor,
            borderTopWidth: 1,
            paddingTop: 10,
          }}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          marginVertical: 10,
          paddingVertical: 5,
          borderTopColor: color.grayColor,
          borderTopWidth: 1,
          flexDirection: 'row',
          height: width / 6,
        }}>
        <View style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
          <IconAnt name={'minuscircleo'} size={35} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: 20,
            }}>
            10
          </Text>
          <IconAnt name={'pluscircleo'} size={35} />
        </View>
        <View style={{flex: 5}}>
          <CustomButton
            title={'ADD TO CART'}
            icon={'shoppingcart'}
            iconLib={'ant'}
            onClick={navigateToCart}
            backgroundColor={color.primaryColor}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ItemDetailScreen;
