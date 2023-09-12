import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { showToast } from './components/atoms/toast';
import AllStack from './navigators/AllStack';
import { check } from './services/device/check_FCM_token';
import { MyTheme } from './utils/theme';

async function androidPermission(): Promise<void> {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
}

function App(): JSX.Element {
  androidPermission(); // for android api +33
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide(); // for splash screen android
    }
    check();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showToast(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer theme={MyTheme}>
     <AllStack/>
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
}

export default App;
