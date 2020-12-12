import {StyleSheet} from 'react-native';
import Color from '../../../common/color/color';
import { width } from '../../../common/Helper/helper';
import color from '../../../common/color/color';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.whiteColor,
  },
  locationSearchContainer: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  locationContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  locationView: {
    backgroundColor: color.graylightColor,
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addressMenuStyle: {
    marginTop: 40,
    marginLeft: 60,
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressComponent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIconLeft: {
    flex: 2,
    marginLeft: 5,
  },
  locationIconRight: {
    flex: 2,
    marginBottom: 10,
  },
  locationText: {
    flex: 8,
    fontSize: 17,
    textAlign: 'center',
    color: Color.primaryColor,
  },
  searchContainer: {
    flex: 8,
  }
});
