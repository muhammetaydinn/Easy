import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import check_FCM_token from './services/device/check_FCM_token';
import HomeScreen from './screens/HomeScreen/HomeScreen';
function check() {
  try {
    check_FCM_token();
  } catch (error) {
    console.log(error);
  }
}
async function androidPermission() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
}
const showToast = (remoteMessage: any) => {
  Toast.show({
    type: 'success',
    text1: remoteMessage.notification.title,
    text2: remoteMessage.notification.body + '👋',
  });
};
function App(): JSX.Element {
  androidPermission(); // for android api +33

  useEffect(() => {
    check();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      showToast(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <HomeScreen />
      <Toast />
    </SafeAreaView>
  );
}

export default App;

/*
  // const [token, setToken] = useState<string>('');
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     setToken((await messaging().getToken()).toString());
  //     // console.log('Authorization status:', authStatus);
  //     // console.log('token:', token);
  //   }
  // };
  */
