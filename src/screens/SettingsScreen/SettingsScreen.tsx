import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { CustomAppBar } from '../../components/molecules/customAppBar';
import { ProfileStackParams } from '../../navigators/ProfileStack';
import { logoutStorage } from '../../services/storage/logout';
type Props = NativeStackScreenProps<ProfileStackParams, 'SettingsScreen'>;
const ProfileScreen: React.FC<Props> = ({route, navigation}) => {
  /*
  *
 GET USER ID FROM ROUTE PARAMS OR FROM STORE
 IF USERID AND ID FROM STORE IS SAME THEN SHOW EDIT PROFILE BUTTON AND SETTING BUTTON

 AND FETCH USER DATA FROM API NAME image
 AND FETCH FOLLOWER FIRST 10 FOLLOWER FROM API
  AND FETCH FOLLOWING FIRST 10 FOLLOWING FROM API

  
  */
  return (
    <View>
      <View style={{height: 50}}>
        {CustomAppBar('', ['cog-outline'], [], navigation, false)}
      </View>
      <ScrollView>
        <Button
          onPress={() => {
            // TODO: clear all stored data and navigate to login screen
            console.log('sign out');
            logoutStorage();
            ////TODO: navigate to login screen
          }}>
          Sign Out
        </Button>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
