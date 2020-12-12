import {StyleSheet} from 'react-native';
import Color from '../../../common/color/color';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.whiteColor,
  },
  dataContainerCol: {
    borderRadius: 10,
    borderColor: Color.grayMidColor,
    borderWidth: 1,
    paddingVertical: 10,
    flexDirection: 'column',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  dataStyle: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  checkIconContainer: {
    backgroundColor: Color.primaryColor,
    borderRadius: 10,
    height: 20,
    width: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Color.grayMidColor,
    borderTopWidth: 1,
    padding: 10
  },
  dataStyle2: {
    marginHorizontal: 10,
    fontSize: 16,
    flex: 1,
    color: Color.grayDarkColor,
    paddingVertical: 20
  },
});
