import {StyleSheet} from 'react-native';
import Color from '../../../common/color/color';
import Constant from '../../../common/constant/constant';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
  },
  SubContainer: {
    width: width / 1.1,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: Constant.Heading1,
    color: Color.secondaryColor,
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'flex-start',
  },
  FooterContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  forgotpasswordText: {
    color: Color.grayColor,
    fontSize: 14,
  },
  createAccountText: {
    color: Color.secondaryColor,
    fontWeight: 'bold',
  },
  ButtonContainer: {
    flex: 1,
    justifyContent:'center',
  },
});
