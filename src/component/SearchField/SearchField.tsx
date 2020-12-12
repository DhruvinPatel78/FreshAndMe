import * as React from 'react';
import color from '../../common/color/color';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {TextInput, View} from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {SearchFieldInterface} from './Interface/SearchFieldInterface';
import {Style} from './Style/Style';

const SearchField: React.FC<SearchFieldInterface> = (props) => {
  const {value, onChange, onSubmit} = props;

  const clearSearch = () => {

  }

  return (
    <View style={Style.container}>
      <IconAnt
        name={'search1'}
        size={25}
        color={color.secondaryColor}
        style={Style.iconLeft}
      />
      <TextInput
        style={Style.textInput}
        placeholder={'Search'}
        value={value}
        onChangeText={(text: string) => onChange(text)}
        returnKeyType={'go'}
        onSubmitEditing={() => onSubmit(value)}
      />
      {Boolean(value) && (
        <IconMat
          name={'clear'}
          size={25}
          color={color.secondaryColor}
          style={Style.iconRight}
          onPress={() => onChange('')}
        />
      )}
    </View>
  );
};
export default SearchField;
