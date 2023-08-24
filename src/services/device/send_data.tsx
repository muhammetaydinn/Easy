import axios from 'axios';
import {baseUrl} from '../../constants';
import {Platform} from 'react-native';

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
      const response = await axios.post(`${baseUrl}/api/device/new`, body);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

export default sendData;
