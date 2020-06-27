import * as React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import color from '../../common/color/color';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {CustomButtonInterface} from './Interface/CustomButtonInterface';

const CustomButton: React.FC<CustomButtonInterface> = (props) => {
  const {title, icon, backgroundColor, onClick, iconLib} = props;

  const Icon =
    iconLib === 'font' ? IconFont : iconLib === 'mat' ? IconMat : IconAnt;

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: backgroundColor,
          paddingVertical: 5,
          borderRadius: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          elevation: 5,
        }}>
        <Text
          style={{
            color: color.whiteColor,
            fontWeight: 'bold',
            marginLeft: 15,
          }}>
          {title}
        </Text>
        <Icon
          name={icon}
          size={20}
          color={color.secondaryColor}
          style={{
            backgroundColor: color.whiteColor,
            padding: 10,
            borderRadius: 10,
            marginHorizontal: 5,
            elevation: 5,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;
