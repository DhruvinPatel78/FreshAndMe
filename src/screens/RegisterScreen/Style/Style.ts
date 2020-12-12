import {StyleSheet} from 'react-native';
import Color from '../../../common/color/color';
import Constant from '../../../common/constant/constant';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
  },
  formContainer: {
    marginTop: 10,
  },
  SubContainer: {
    width: width / 1.1,
  },
  heading: {
    fontSize: Constant.Heading1,
    color: Color.secondaryColor,
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  termsText: {
    fontSize: 12,
    flex: 13,
    textAlignVertical: 'center',
  },
  FooterContainer: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  ButtonContainer: {
    width: width / 3,
  },
});
