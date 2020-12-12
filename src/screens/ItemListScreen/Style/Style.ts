import {StyleSheet} from 'react-native';
import Color from '../../../common/color/color';
import { width } from '../../../common/Helper/helper'
import color from '../../../common/color/color';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.whiteColor,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  listContainer: {
    marginHorizontal: 15,
    flex: 1
  },
  itemCard: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    height: 250,
    width: width / 2.3,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    flex: 8,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardValidText: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    color: color.whiteColor,
    fontWeight: 'bold',
    fontSize: 15,
    flex: 2,
  },
  cardPrice: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primaryColor,
  },
  cardImageContainer: {
    alignItems: 'center',
    flex: 8,
    justifyContent: 'center',
  },
  imageStyle: {
    width: width / 3,
    height: width / 3,
  },
  notAvailableContainer: {
    height: 40,
    flexDirection: 'row',
    width: width / 2.3,
    borderWidth: 1,
    borderColor: color.whiteColor,
    backgroundColor: color.whiteColor,
    position: 'absolute',
    top: 105,
    left: -1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notAvailableText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.redColor
  }
});
