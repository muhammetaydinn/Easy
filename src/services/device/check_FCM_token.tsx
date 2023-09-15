import AsyncStorage from '@react-native-async-storage/async-storage';
import getNewFCMToken from './get_new_FCM_token';
import sendData from './send_data';

 export const check_FCM_token = async () => {
  try {
    const storedToken = await AsyncStorage.getItem('fcmToken');
    if (storedToken) {
      // Token exists, proceed to send data
      console.log('Device Token var',storedToken);
    } else {
      // Token doesn't exist, get a new FCM token
      console.log("Token doesn't exist, get a new FCM token");
      getNewFCMToken();
    }
  } catch (error) {
    console.error('Error checking FCM:', error);
  }
};
export function check() {
  try {
    check_FCM_token();
  } catch (error) {
    console.log(error);
  }
}


