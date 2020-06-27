import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {Style} from './Style/Style';
import {
  ItemListScreenProps,
  ItemListScreenNavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import color from '../../common/color/color';
import {useState} from 'react';
import Grid from 'react-native-infinite-scroll-grid';
import SearchField from '../../component/SearchField/SearchField';
// import {Button} from 'react-native-elements';
// import {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemListScreen = ({route, navigation}: ItemListScreenProps) => {
  const width = Dimensions.get('window').width;
  const Navigation = useNavigation<ItemListScreenNavigationProp>();

  const {selectedCategory} = route.params;

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

  const navigateToDetail = (item: any) => {
    Navigation.navigate('ItemDetailScreen', {
      selectedCategory,
      selectedItem: item,
    });
  };

  const navigateToCart = () => {
    Navigation.navigate('CartScreen');
  };

  const [searchText, setSearchText] = useState<string>('');

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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}>
        <SearchField value={searchText} onChange={setSearchText} />
      </View>
      <View
        style={{
          flex: 10,
          paddingHorizontal: 15,
        }}>
        <Grid
          //refreshing={this.state.Refreshing}
          //onRefresh={this.handleRefresh}
          //onEndReached={this.handleLoadMore}
          //onEndThreshold={0}
          numColumns={2}
          data={DATA}
          keyExtractor={(item, index: number) => item.id}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() => navigateToDetail(item)}>
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  height: 250,
                  width: width / 2.3,
                  borderColor: color.whiteColor,
                  backgroundColor: color.whiteColor,
                  borderWidth: 1,
                  elevation: 5,
                }}>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      flex: 8,
                      paddingLeft: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                  {Boolean(item.extra) && (
                    <Text
                      style={{
                        backgroundColor: 'red',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        color: color.whiteColor,
                        fontWeight: 'bold',
                        fontSize: 15,
                        flex: 2,
                      }}>
                      {item.extra}
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: color.primaryColor,
                  }}>
                  {'\u20B9'} {item.price}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 8,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    resizeMode={'center'}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <IconAnt name={'minuscircleo'} size={30} />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                    }}>
                    10
                  </Text>
                  <IconAnt name={'pluscircleo'} size={30} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          marginExternal={0}
          marginInternal={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemListScreen;
