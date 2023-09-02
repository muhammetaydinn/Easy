import axios from 'axios';
import {baseUrl, header} from '../../constants/constants';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function sendData(token: string) {
  const currentTime = new Date();
  const gmtOffset = currentTime.getTimezoneOffset() / 60;
  const gmtTime = new Date(
    currentTime.getTime() + gmtOffset * 3600000,
  ).toString();
  const gmtPart = gmtTime.substring(gmtTime.indexOf('GMT'));
  var body = {
    timeZone: gmtPart.toString(),
    deviceType: Platform.OS.toUpperCase(),
    deviceToken: token,
  };
  console.log('body', body);
  if (token != null && token.length >= 0) {
    try {
      const response = await axios.post(`${baseUrl}/api/device/new`, body,{headers:header});
      console.log(response);
      if (response.status == 201) {
        await AsyncStorage.setItem('fcmToken', token);
        console.log('Token saved');
      } else {
        console.log('Token not saved');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
}

export default sendData;
