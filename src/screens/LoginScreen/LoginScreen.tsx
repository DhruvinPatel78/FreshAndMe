import * as React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Style} from './Style/Style';
import {
  LoginScreenNavigationProp,
  LoginScreenProps,
  //LoginScreenNavigationProp,
} from '../../navigation/PropType';
import InputField from '../../component/InputField/InputField';
import {Button} from 'react-native-paper';
import Color from '../../common/color/color';
import {DataType} from '../../common/Data/Data';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginScreen = ({route, navigation}: LoginScreenProps) => {
  const Navigation = useNavigation<LoginScreenNavigationProp>();

  const navigateToRegister = (selectedData: DataType) => {
    Navigation.navigate('RegisterScreen');
  };

  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <SafeAreaView style={Style.container}>
      <KeyboardAvoidingView>
        <View style={Style.SubContainer}>
          <Text style={Style.heading}>Sign In</Text>
          <View>
            <Image
              source={require('../../assets/images/manScooter.png')}
              height={100}
              width={100}
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
              returnKey={'go'}
            />
          </View>
          <View style={Style.FooterContainer}>
            <View style={Style.registerContainer}>
              <Text style={Style.forgotpasswordText}>Forgot password?</Text>
              <Text
                style={Style.createAccountText}
                onPress={navigateToRegister}>
                Create New Account
              </Text>
            </View>
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
                SING IN
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
