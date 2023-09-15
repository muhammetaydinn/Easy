import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../constants/constants';
import { storeDataJSON } from '../storage/asyncStorage';

export const login = async (email: string, password: string) => {
  var deviceId: string | null = await AsyncStorage.getItem('deviceId');
  console.log('userdeviceId', deviceId);
  console.log('email', email);
  console.log('password', password);
  if (
    email.length < 1 ||
    password.length < 1 ||
    deviceId == null ||
    deviceId.length < 1
  ) {
    return deviceId == null || deviceId.length < 1
      ? 'Cannot get deviceId Close app and relaunch'
      : 'Please fill all the fields';
  } else {
    try {
      const response = await axios.post(`${baseUrl}/device/login/` + deviceId, {
        email: email,
        password: password,
      });
      storeDataJSON('user', response.data);
      return 'success';
    } catch (error) {
      console.error('Login ERROR:', error);
      //show error message
      throw error;
    }
  }
};
