import {StyleSheet} from 'react-native';
import Color from '../../../common/color/color';

export const Style = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    color: Color.secondaryColor,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
