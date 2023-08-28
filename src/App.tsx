import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {check, check_FCM_token} from './services/device/check_FCM_token';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import {showToast} from './components/atoms/toast/toast';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from './components/atoms/Text/Text';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

async function androidPermission(): Promise<void> {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
}
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};
function App(): JSX.Element {
  androidPermission(); // for android api +33

  useEffect(() => {
    check();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showToast(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
            }}>
            <Tab.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => (
                  <MaterialCommunityIcons
                    name="home"
                    size={size * 1.2}
                    color={focused ? 'black' : color}
                  />
                ),
                tabBarShowLabel: false,
              }}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => (
                  <MaterialCommunityIcons
                    name="magnify"
                    size={size * 1.2}
                    color={focused ? 'black' : color}
                  />
                ),
              }}
              name="Details"
              component={DetailsScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => (
                  <MaterialCommunityIcons
                    name={
                      focused
                        ? 'bookmark-multiple'
                        : 'bookmark-multiple-outline'
                    }
                    size={size}
                    color={focused ? 'black' : color}
                  />
                ),
              }}
              name="Details2"
              component={DetailsScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => (
                  <MaterialCommunityIcons
                    name={focused ? 'account-circle' : 'account-circle-outline'}
                    size={size*1.2}
                    color={focused ? 'black' : color}
                  />
                ),
              }}
              name="Details3"
              component={DetailsScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </>
  );
}

export default App;

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

