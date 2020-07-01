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
import Loader from "../../component/Loader/Loader";
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';
// import {SearchBar} from 'react-native-elements';
import color from '../../common/color/color';
import {IRootReducerState} from "../../common/interface/store/reducer/Reducer";
import {useEffect, useState} from 'react';
import Grid from 'react-native-infinite-scroll-grid';
import SearchField from '../../component/SearchField/SearchField';
import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from "react-redux";
// import {Button} from 'react-native-elements';
// import {useState} from 'react';
import {getCategoryList,getBanners} from "../../store/actions/Home";
import {clearProductList} from "../../store/actions/Product";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeScreen = ({route, navigation}: HomeScreenProps) => {
  const width = Dimensions.get('window').width;
  const Navigation = useNavigation<HomeScreenNavigationProp>();
  const [categoryListState, setCategoryListState] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bannersListState, setBannersListState] = useState<any>([]);
  const [pagination, setPagination] = useState({
      strWhere:"",
      pageIndex:0,
      pageSize:0
  })
  const dispatch = useDispatch();
  const {categoryList,bannersList} = useSelector((state:IRootReducerState) => state.homeReducer)
  useEffect(() => {
      dispatch(getCategoryList(pagination))
      dispatch(getBanners(pagination))
  },[])

  useEffect(() => {
      if(Boolean(categoryList.values.length) && Boolean(bannersList.values.length)) {
          setBannersListState(bannersList.values)
          setCategoryListState(categoryList.values)
          setIsLoading(false)
      }
  },[categoryList, bannersList])


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
    dispatch(clearProductList())
    Navigation.navigate('ItemListScreen', {selectedCategory: category});
  };

  const navigateToCart = () => {
    Navigation.navigate('CartScreen');
  };

  const [searchText, setSearchText] = useState<string>('');



  return (
    <SafeAreaView style={Style.container}>
        {isLoading && <Loader/>}
            {!isLoading &&    <>
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
          data={bannersListState}
          horizontal={true}
          renderItem={({item}:any) => {
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
                  source={{uri: item.smallImage}}
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
                  {item.bannerName}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item:any) => item.bannerId}
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
          data={categoryListState}
          keyExtractor={(item:any, index: number) => item.categoryId}
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
                    source={{uri: item.smallImage}}
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
                    {item.categoryName}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          marginExternal={0}
          marginInternal={0}
        />
      </View>
        </>}
    </SafeAreaView>
  );
};

export default HomeScreen;
