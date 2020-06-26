import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {InputFieldInterface} from './Interface/InputFieldInterface';
import {Style} from './Style/Style';
import Color from '../../common/color/color';
import {Input} from 'react-native-elements';

const InputField: React.FC<InputFieldInterface> = (props) => {
  const {
    title,
    value,
    keyboardType,
    returnKey,
    updateState,
    inputType,
    onSubmitEditing,
  } = props;

  // @ts-ignore
  // @ts-ignore
  return (
    <View style={Style.container}>
      {/*<TextInput*/}
      {/*  textContentType={inputType}*/}
      {/*  label={title}*/}
      {/*  returnKeyType={returnKey}*/}
      {/*  style={Style.textInputStyle}*/}
      {/*  value={value}*/}
      {/*  underlineColor={Color.secondaryColor}*/}
      {/*  keyboardType={keyboardType}*/}
      {/*  onChangeText={(text: string) => updateState(text)}*/}
      {/*  onSubmitEditing={onSubmitEditing}*/}
      {/*/>*/}
      <Input
        label={title}
        placeholder={'Enter ' + title}
        textContentType={inputType}
        returnKeyType={returnKey}
        style={Style.textInputStyle}
        labelStyle={{
          color: '#afafaf',
        }}
        inputStyle={{
          color: '#07122e',
          fontWeight: 'bold',
          height: 20,
        }}
        value={value}
        keyboardType={keyboardType}
        onChangeText={(text: string) => updateState(text)}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default InputField;
