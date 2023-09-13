import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CImage from '../../components/atoms/CircleImage';
import {CustomAppBar} from '../../components/molecules/customAppBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabParamList} from '../../navigators/Tabs';
import {getDataJSON} from '../../services/storage/asyncStorage';
import {ProfileStackParams} from '../../navigators/ProfileStack';
type Props = NativeStackScreenProps<ProfileStackParams, 'ProfileScreen'>;
const ProfileScreen: React.FC<Props> = ({route, navigation}) => {
  const [userName, setUserName] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  useEffect(() => {
    // fetch user data from api
    // set user name
    const getUserData = async () => {
      try {
        const user = await getDataJSON('user');
        setUserName(user.name);
        setUserImage(user.image);
      } catch (error) {
        console.error('Error checking JWT expiration:', error);
        // Handle the error and navigate to an appropriate screen
      }
    };
    getUserData();
  }, []);
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
        {CustomAppBar(
          '',
          ['cog-outline'],
          //navigation.navigate('SettingsScreen')
          [
            () => {
              navigation.navigate('SettingsScreen');
            },
          ],
          navigation,
          true,
        )}
      </View>
      <Text>ProfileScreen</Text>
      <View>
        <CImage uri={userImage} size={50} isProfile={true} radius={50} />
        <Text>{userName}</Text>
        <Text>user follower list with image, id and name and bio </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
