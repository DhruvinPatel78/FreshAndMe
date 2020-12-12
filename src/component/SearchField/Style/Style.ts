import {StyleSheet} from 'react-native';
import Color from '../../../common/color/color';
import color from '../../../common/color/color';

export const Style = StyleSheet.create({
  container: {
    backgroundColor: color.graylightColor,
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  iconLeft: {
    flex: 2,
    marginLeft: 10,
  },
  iconRight: {
    flex: 2,
  },
  textInput: {
    flex: 9,
    fontSize: 15,
    fontWeight: '700',
  },
});
