import AsyncStorage from '@react-native-community/async-storage';
import { Dimensions } from 'react-native';

const phone = /^[0-9]{10}$/
const password = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{6,}$/
const name = /^[a-zA-Z\s]+$/

export const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@token')
        return jsonValue;
    } catch(e) {
        // error reading value
    }
}

export const removeToken = async () => {
    return AsyncStorage.removeItem('@token')
}

export const validatePhoneNumber = (phoneNumber: string) => {
    return phone.test(phoneNumber)
}

export const validatePassword = (verifyPassword: string) => {
    return password.test(verifyPassword)
}

export const validateName = (verifyName: string) => {
    return name.test(verifyName)
}

export const {width, height} = Dimensions.get('screen')
