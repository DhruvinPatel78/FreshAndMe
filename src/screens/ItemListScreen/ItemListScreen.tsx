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
import {useEffect, useState} from 'react';
import Grid from 'react-native-infinite-scroll-grid';
import SearchField from '../../component/SearchField/SearchField';
import {useDispatch, useSelector} from "react-redux";
import {IRootReducerState} from "../../common/interface/store/reducer/Reducer";
import {getProductList} from "../../store/actions/Product";
import Loader from "../../component/Loader/Loader";
// import {Button} from 'react-native-elements';
// import {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemListScreen = ({route, navigation}: ItemListScreenProps) => {
  const width = Dimensions.get('window').width;
  const Navigation = useNavigation<ItemListScreenNavigationProp>();
  const [productListState, setProductListState] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<any>({
        strWhere:"",
        pageIndex:0,
        pageSize:0
    })
    const {selectedCategory} = route.params;
    const categoryId = selectedCategory && selectedCategory.categoryId;
    const dispatch = useDispatch();
    const { productList } = useSelector((state:IRootReducerState) => state.productReducer)
    useEffect(() => {
      setPagination({...pagination,strWhere:"[{'key':'categoryId','value':"+categoryId+"}]"});
      dispatch(getProductList(pagination))
    },[])

    useEffect(() => {
        if(Boolean(productList.values.length)) {
            setProductListState(productList.values);
            setIsLoading(false);
        }
    },[productList])
    const getProductByCategory = () => {

    }
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


  return (
    <SafeAreaView style={Style.container}>
        {isLoading && <Loader/>}
        {!isLoading &&    <>
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
          data={productListState}
          keyExtractor={(item:any, index: number) => item.productId}
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
                    {item.productName}
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
                  {'\u20B9'} {item.productPrice}
                </Text>
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
      </View></>}
    </SafeAreaView>
  );
};

export default ItemListScreen;
