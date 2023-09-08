import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {check, check_FCM_token} from './services/device/check_FCM_token';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from './components/atoms/Text';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme} from '@react-navigation/native';
import HomeStack from './navigators/Main';
import {showToast} from './components/atoms/toast';
import {MyTheme} from './utils/theme';
import Tabs from './navigators/Tabs';
import SplashScreen from 'react-native-splash-screen';
import { PaperProvider } from 'react-native-paper';
import axios from 'axios';
import { baseUrl } from './constants/constants';

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
          <Tabs />
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
  );
}

export default App;
