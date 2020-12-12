import {Dimensions, StyleSheet} from 'react-native';
import color from '../../../common/color/color';

const {width, height} = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.whiteColor,
  },
  heading: {
    paddingLeft: 10,
    paddingVertical: 15,
    backgroundColor: color.primaryColor,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: color.secondaryColor
  },
  addressContainer: {
    width: width,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: color.grayMidColor
  },
  addressView: {
    marginHorizontal: 30,
    paddingRight: 15,
  },
  addressTypeText: {
    fontSize: 16,
    fontWeight:'bold',
    paddingBottom: 15,
    color: color.grayDarkColor
  },
  addressDefaultText: {
    fontSize: 14,
    fontWeight:'bold',
    paddingBottom: 15,
    color: color.primaryColor
  },
  editButton: {
    borderColor: color.primaryColor,
    borderWidth: 1,
    marginVertical: 15,
    padding: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editText: {
    fontWeight: 'bold',
    color: color.primaryColor
  }
});
