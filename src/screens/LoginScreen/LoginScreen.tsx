import * as React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {Style} from './Style/Style';
import AsyncStorage from '@react-native-community/async-storage';
import {
  LoginScreenNavigationProp,
  LoginScreenProps,
} from '../../navigation/PropType';
import InputField from '../../component/InputField/InputField';
import {Button, Snackbar} from 'react-native-paper';
import Color from '../../common/color/color';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/Authentication";
import {IRootReducerState} from "../../common/interface/store/reducer/Reducer";
import Loader from "../../component/Loader/Loader";

const LoginScreen = ({route, navigation}: LoginScreenProps) => {
  const Navigation = useNavigation<LoginScreenNavigationProp>();
  const {loggedIn} = useSelector((state:IRootReducerState) => state.authentication)
  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigateToRegister = () => {
    Navigation.navigate('RegisterScreen');
  };

  const navigateToHome = () => {
    Navigation.navigate('HomeScreen');
  };

  const userLogin = () => {
    setIsLoading(true)
    dispatch(loginUser(mobileNo,password,(response: any) => {
      if(Boolean(response.Data) && Boolean(response.Status === "1")) {
        saveInAsyncStorage(response.Data.token).then((res) => {
          setIsLoading(false);
          navigateToHome();
        })
      } else {
        setIsLoading(false)
        setSnackBarVisible(true);
      }
    }));
  }
  const saveInAsyncStorage = async (token:any) => {
    try {
       await AsyncStorage.setItem('@token', token);
    } catch (error) {
      throw error
    }
  }
  // @ts-ignore
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
                disabled={isLoading}
                mode="contained"
                onPress={userLogin}
                color={Color.primaryColor}>
                {isLoading ? <Loader size="small"/> : "SING IN"}
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Snackbar
          visible={snackBarVisible}
          onDismiss={() => setSnackBarVisible(false)}
          action={{
            label: 'OK',
            onPress: () => setSnackBarVisible(false)
          }}>
       SignIn Failed !
      </Snackbar>
    </SafeAreaView>
  );
};

export default LoginScreen;
