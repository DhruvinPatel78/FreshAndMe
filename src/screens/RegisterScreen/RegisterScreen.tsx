import * as React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Style} from './Style/Style';
import {
  RegisterScreenProps,
  //LoginScreenNavigationProp,
} from '../../navigation/PropType';
import InputField from '../../component/InputField/InputField';
import {Button} from 'react-native-paper';
import Color from '../../common/color/color';
import {useState} from 'react';
import {CheckBox} from 'react-native-elements';
//import {useNavigation} from '@react-navigation/native';
// import {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RegisterScreen = ({route, navigation}: RegisterScreenProps) => {
  //const Navigation = useNavigation<LoginScreenNavigationProp>();
  //
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const navigateToDetail = (selectedData: DataType) => {
  //   Navigation.navigate('LoginScreen', {selectedProfile: selectedData});
  // };

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPassword, setConPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  return (
    <SafeAreaView style={Style.container}>
      <KeyboardAvoidingView>
        <View style={Style.SubContainer}>
          <Text style={Style.heading}>Create Account</Text>
          <View style={Style.formContainer}>
            <InputField
              title={'First Name'}
              inputType={'name'}
              updateState={setFirstName}
              value={firstName}
              keyboardType={'default'}
              returnKey={'next'}
            />
            <InputField
              title={'Last Name'}
              inputType={'name'}
              updateState={setLastName}
              value={lastName}
              keyboardType={'default'}
              returnKey={'next'}
            />
            <InputField
              title={'Mobile Number'}
              inputType={'telephoneNumber'}
              updateState={setMobileNo}
              value={mobileNo}
              keyboardType={'phone-pad'}
              returnKey={'next'}
            />
            <InputField
              title={'Password'}
              inputType={'password'}
              updateState={setPassword}
              value={password}
              keyboardType={'default'}
              returnKey={'next'}
            />
            <InputField
              title={'Confirm Password'}
              inputType={'password'}
              updateState={setConPassword}
              value={conPassword}
              keyboardType={'default'}
              returnKey={'go'}
            />
            <View style={Style.checkboxContainer}>
              <CheckBox
                containerStyle={{
                  backgroundColor: Color.whiteColor,
                  borderWidth: 0,
                }}
                title=""
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={acceptTerms}
                onPress={() => setAcceptTerms(!acceptTerms)}
              />
              <Text
                onPress={() => Alert.alert('Hello')}>
                I agree with Terms and Conditions and Privacy Policy.
              </Text>
            </View>
          </View>
          <View style={Style.FooterContainer}>
            <View style={Style.ButtonContainer}>
              <Button
                contentStyle={{
                  height: 40,
                }}
                labelStyle={{
                  color: Color.whiteColor,
                }}
                mode="contained"
                color={Color.primaryColor}>
                CREATE
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
