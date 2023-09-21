import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import CImage from '../../components/atoms/CircleImage';
import {CustomAppBar} from '../../components/molecules/customAppBar';
import {User} from '../../models/user';
import {ProfileStackParams} from '../../navigators/ProfileStack';
import {getDataJSON} from '../../services/storage/asyncStorage';
import {getUserById} from '../../services/user/getUserById';
import {width} from '../../utils/hw';
import {Text} from '../../components/atoms/Text';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getFollowers, getFollowing} from '../../store/features/UserSlice';
type Props = NativeStackScreenProps<ProfileStackParams, 'ProfileScreen'>;
const ProfileScreen: React.FC<Props> = ({route, navigation}) => {
  const [userModel, setUserModel] = useState<User>({} as User);
  const dispatch = useAppDispatch();
  const {followers, following} = useAppSelector(state => state.UserSlice);

  useEffect(() => {
    // fetch user data from api
    // set user name
    const getUserData = async () => {
      try {
        //Todo:Farklı profiller için user id alınacak
        const user = await getDataJSON('user');
        const model: User = await getUserById(user.userId);
        setUserModel(model);
        dispatch(
          getFollowers({
            userId: user.userId,
            pageNumber: 1,
            pageSize: 10,
          }),
        );
        dispatch(
          getFollowing({
            userId: user.userId,
            pageNumber: 1,
            pageSize: 10,
          }),
        );
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
    <View style={{flex: 1}}>
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
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row'}}>
          <CImage
            uri={userModel?.image ?? ''}
            size={50}
            isProfile={true}
            radius={50}
          />
          <View style={{width: 20}} />
          <View style={{justifyContent: 'flex-start', flexDirection: 'column'}}>
            <Text>{userModel?.name ?? ''}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{followers?.size??""} follower </Text>
              <Text>{following?.size??""} following </Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button
            style={{
              borderWidth: 2,
              width: width / 2.5,
              borderColor: 'black',
            }}
            onPress={() => {
              navigation.navigate('EditProfileScreen');
              //TODO:
            }}>
            Edit Profile
          </Button>
          <Button
            style={{
              width: width / 2.5,
              backgroundColor: 'black',
              borderWidth: 2,
              borderColor: 'black',
            }}
            onPress={() => {
              //TODO:
            }}>
            See Stats
          </Button>
        </View>
        {/* {followers.content?.map((item, index) => {
          return (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <CImage
                uri={item.image ?? ''}
                size={50}
                isProfile={true}
                radius={50}
              />
              <View style={{width: 20}} />
              <Text>{item?.name ?? ''}</Text>
            </View>
          );
        })} */}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
