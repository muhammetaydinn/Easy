import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import sendData from './send_data';

let token: string;
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //   setToken((await messaging().getToken()).toString());
    token = (await messaging().getToken()).toString();
    console.log('Got token:', token);
  } else {
    console.log('REQUEST PERMISSION DENIED');
  }
};
const getNewFCMToken = async () => {
  try {
    await requestUserPermission();
    //read from storage
    const tokenStorage = await AsyncStorage.getItem('fcmToken');

    if (token != tokenStorage&& token != null&&token.length>0) {
      // Store the new token
   
      // Proceed to send data
      await sendData(token);
         await AsyncStorage.setItem('fcmToken', token);
    }
  } catch (error) {
    console.error('Error getting new FCM token:', error);
  }
};

export default getNewFCMToken;
