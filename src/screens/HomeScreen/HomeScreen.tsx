import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import {Style} from './Style/Style';
import {
  HomeScreenProps,
  HomeScreenNavigationProp,
} from '../../navigation/PropType';
import {useNavigation} from '@react-navigation/native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEnty from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';
// import {SearchBar} from 'react-native-elements';
import color from '../../common/color/color';
import {useState} from 'react';
import Grid from 'react-native-infinite-scroll-grid';
import SearchField from '../../component/SearchField/SearchField';
// import {Button} from 'react-native-elements';
// import {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeScreen = ({route, navigation}: HomeScreenProps) => {
  const width = Dimensions.get('window').width;
  const Navigation = useNavigation<HomeScreenNavigationProp>();

  Navigation.setOptions({
    title: '',
    headerLeft: () => <IconFont name={'bars'} size={25} />,
    headerLeftContainerStyle: {
      padding: 15,
    },
    headerRight: () => (
      <>
        <IconFeather name={'bell'} size={25} style={{marginHorizontal: 5}} />
        <IconFeather
          name={'shopping-cart'}
          size={25}
          style={{marginHorizontal: 5}}
          onPress={navigateToCart}
        />
      </>
    ),
    headerRightContainerStyle: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const navigateToItemList = (category: any) => {
    Navigation.navigate('ItemListScreen', {selectedCategory: category});
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
      image:
        'https://png2.cleanpng.com/sh/bc6d8d7e553de506f8bd470d09145121/L0KzQYm3UsE3N5pviZH0aYP2gLBuTfNpd5R0hNN9ZT3lccO0gBhwa5DxeeZuLYTkgsW0hPFzc15ogNHsb3zkhLa0gB9kd5Iye9p4Y3BvccXsTgBvb155itN3c4Dkgrb1lL1qdZJsfeU2NXG7R4KBVsNjOpU2Uac3MEa1RYq9UsYyPWI9UKI8MES2R4S5Vb5xdpg=/kisspng-chocolate-bar-chocolate-tart-dark-chocolate-cocoa-chocolate-png-transparent-images-5a871863b2d195.0625962615188030437325.png',
    },
    {
      id: '2',
      title: 'Second Item',
      extra: '18+',
      image:
        'https://www.pikpng.com/pngl/b/121-1218137_chocolate-png-image-dark-chocolate-transparent-background-clipart.png',
    },
    {
      id: '3',
      title: 'Third Item',
      extra: '',
      image:
        'https://png2.cleanpng.com/sh/16a1833baabfa831dabf0a61b40ee76c/L0KzQYm3VMExN5l3fZH0aYP2gLBuTfhwfF5ogNHsb3zkhLa0kB1wd6Vtgdc2ZHH1e37qiP9kd51mjNc2ZnzkhrF5TmCiepDuiAVqboSwRbLqhMc6QWhoUdhsMkexRoO5V8gyP2k2TaQ8NEG4RIWAWMI4O191htk=/kisspng-hot-chocolate-smoothie-dark-chocolate-flavor-%D0%A1roissant-5acd7997c9fc27.6227817815234154478273.png',
    },
    {
      id: '4',
      title: 'First Item',
      extra: '',
      image:
        'https://png2.cleanpng.com/sh/bc6d8d7e553de506f8bd470d09145121/L0KzQYm3UsE3N5pviZH0aYP2gLBuTfNpd5R0hNN9ZT3lccO0gBhwa5DxeeZuLYTkgsW0hPFzc15ogNHsb3zkhLa0gB9kd5Iye9p4Y3BvccXsTgBvb155itN3c4Dkgrb1lL1qdZJsfeU2NXG7R4KBVsNjOpU2Uac3MEa1RYq9UsYyPWI9UKI8MES2R4S5Vb5xdpg=/kisspng-chocolate-bar-chocolate-tart-dark-chocolate-cocoa-chocolate-png-transparent-images-5a871863b2d195.0625962615188030437325.png',
    },
    {
      id: '5',
      title: 'Second Item',
      extra: '18+',
      image:
        'https://www.pikpng.com/pngl/b/121-1218137_chocolate-png-image-dark-chocolate-transparent-background-clipart.png',
    },
    {
      id: '6',
      title: 'Third Item',
      extra: '',
      image:
        'https://png2.cleanpng.com/sh/16a1833baabfa831dabf0a61b40ee76c/L0KzQYm3VMExN5l3fZH0aYP2gLBuTfhwfF5ogNHsb3zkhLa0kB1wd6Vtgdc2ZHH1e37qiP9kd51mjNc2ZnzkhrF5TmCiepDuiAVqboSwRbLqhMc6QWhoUdhsMkexRoO5V8gyP2k2TaQ8NEG4RIWAWMI4O191htk=/kisspng-hot-chocolate-smoothie-dark-chocolate-flavor-%D0%A1roissant-5acd7997c9fc27.6227817815234154478273.png',
    },
  ];

  return (
    <SafeAreaView style={Style.container}>
      <View
        style={{
          flex: 1.1,
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
          }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: color.graylightColor,
                flex: 1,
                marginVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <IconEnty
                name={'location-pin'}
                size={25}
                color={color.primaryColor}
                style={{
                  flex: 2,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  flex: 8,
                  fontSize: 17,
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}>
                Bardoli
              </Text>
              <IconFont
                style={{
                  flex: 2,
                  marginBottom: '5%',
                }}
                name={'sort-down'}
                size={25}
                color={color.primaryColor}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flex: 7,
          }}>
          <SearchField value={searchText} onChange={setSearchText} />
        </View>
      </View>
      <View
        style={{
          flex: 2,
        }}>
        <FlatList
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          data={DATA}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: width / 1.1,
                  backgroundColor: color.graylightColor,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                  resizeMode={'center'}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
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
            <TouchableWithoutFeedback onPress={() => navigateToItemList(item)}>
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
                    alignItems: 'flex-end',
                    paddingTop: 10,
                  }}>
                  {item.extra ? (
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
                      }}>
                      {item.extra}
                    </Text>
                  ) : (
                    <Text />
                  )}
                </View>
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
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
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

export default HomeScreen;
