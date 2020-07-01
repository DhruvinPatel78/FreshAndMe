import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@token')
        return jsonValue;
    } catch(e) {
        // error reading value
    }
}
