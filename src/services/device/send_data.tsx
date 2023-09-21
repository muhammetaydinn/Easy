import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddDeviceModel} from '../../models/addDeviceModel';

async function sendData(fcmToken: string) {
  const currentTime = new Date();
  const gmtOffset = currentTime.getTimezoneOffset() / 60;
  const gmtTime = new Date(
    currentTime.getTime() + gmtOffset * 3600000,
  ).toString();
  const gmtPart = gmtTime.substring(gmtTime.indexOf('GMT'));
  var body = {
    timeZone: gmtPart.toString(),
    deviceType: Platform.OS.toUpperCase(),
    deviceToken: fcmToken,
  };

  if (fcmToken != null && fcmToken.length >= 0) {
    try {
      const response = await axios.post(`${baseUrl}/devices`, body);
      console.log('response', response.data);
      if (response.status >= 200 && response.status < 300) {
        var addDeviceResponse: AddDeviceModel = response.data;
        console.log('response', response.data);
        await AsyncStorage.setItem('fcmToken', fcmToken);
        //TODO:
        await AsyncStorage.setItem(
          'deviceId',
          addDeviceResponse.deviceId.toString(),
        );
        // await AsyncStorage.setItem('deviceId', response.data.deviceID.toString());
        console.log('Token saved',addDeviceResponse.deviceId.toString());
      } else {
        console.log('Token not saved');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
}

export default sendData;
