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
  RegisterScreenNavigationProp,
} from '../../navigation/PropType';
import InputField from '../../component/InputField/InputField';
import {Button} from 'react-native-paper';
import Color from '../../common/color/color';
import {useEffect, useState} from 'react';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {registerUser,clearRegisteredUser} from "../../store/actions/Authentication";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducerState} from "../../common/interface/store/reducer/Reducer";
import Loader from "../../component/Loader/Loader";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RegisterScreen = ({route, navigation}: RegisterScreenProps) => {
  const Navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch();
  const navigateToLogin = () => {
    Navigation.navigate('LoginScreen');
  };

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPassword, setConPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {registered} = useSelector((state:IRootReducerState) => state.authentication)

  const registerUsers = () => {
      setIsLoading(true)
      dispatch(registerUser(firstName,lastName,mobileNo,password))
  }
  useEffect(() => {
      if(registered){
        if(registered.Status === "1"){
          dispatch(clearRegisteredUser());
          setIsLoading(false)
          navigateToLogin();
        }
      }
  },[registered])
  console.log("registered",registered);
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
                  borderWidth: 0,
                  // flex: 1,
                  margin: 0,
                  width: 30,
                }}
                size={20}
                title=""
                checkedColor={Color.primaryColor}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={acceptTerms}
                onPress={() => setAcceptTerms(!acceptTerms)}
              />
              <Text style={Style.termsText}>
                I agree with Terms and Conditions and Privacy Policy.
              </Text>
            </View>
          </View>
          <View style={Style.FooterContainer}>
            <View style={Style.ButtonContainer}>
              <Button
                disabled={isLoading}
                contentStyle={{
                  height: 40,
                }}
                labelStyle={{
                  color: Color.whiteColor,
                }}
                onPress={registerUsers}
                mode="contained"
                color={Color.primaryColor}>
                {isLoading ? <Loader size="small"/> : "CREATE"}
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
