import * as React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import color from '../../common/color/color';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {CustomButtonInterface} from './Interface/CustomButtonInterface';
import Loader from '../Loader/Loader';

const CustomButton: React.FC<CustomButtonInterface> = (props) => {
  const {title, backgroundColor, onClick, disabled, loading } = props;

  return (
    <TouchableWithoutFeedback onPress={onClick} disabled={disabled}>
      <View
        style={{
          flex: 1,
          backgroundColor: !disabled ? backgroundColor : color.graylightColor,
          paddingVertical: 25,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}>
        {loading ? <Loader size="small"/> :
        <Text
          style={{
            color: color.whiteColor,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;
