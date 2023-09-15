import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';
import CImage from '../../components/atoms/CircleImage';
import { CustomAppBar } from '../../components/molecules/customAppBar';
import { User } from '../../models/user';
import { ProfileStackParams } from '../../navigators/ProfileStack';
import { getDataJSON } from '../../services/storage/asyncStorage';
import { getUserById } from '../../services/user/getUserById';
import { updateUser } from '../../services/user/updateUser';

type Props = NativeStackScreenProps<ProfileStackParams, 'EditProfileScreen'>;
const EditProfileScreen: React.FC<Props> = ({route, navigation}) => {
  const [userName, setUserName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userModel, setUserModel] = useState<User>({} as User);

  useEffect(() => {
    // fetch user data from api
    // set user name
    // getUserById();
    const getUserData = async () => {
      try {
        const user = await getDataJSON('user');
        const model: User = await getUserById(user.userId);
        setUserModel(model);
        setUserName(user.name);
      } catch (error) {
        console.error('Error checking JWT expiration:', error);
        // Handle the error and navigate to an appropriate screen
      }
    };
    getUserData();
  }, []);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(
      options as CameraOptions,
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          let imageUri =
            response.assets && response.assets[0]
              ? response.assets[0].uri
              : undefined;
          setSelectedImage(imageUri ?? null); // Use null as a default value
        }
      },
    );
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      cropping: true, // Enable cropping
      croppingStyle: 'square', // Set cropping style to square
      maxHeight: 2000,
      maxWidth: 2000,
    } as ImageLibraryOptions;

    launchCamera(options as CameraOptions, (response: ImagePickerResponse) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        // Process the captured image
        let imageUri =
          response.assets && response.assets[0]
            ? response.assets[0].uri
            : undefined;
        setSelectedImage(imageUri ?? null); // Use null as a default value
        console.log(imageUri);
      }
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <View style={{height: 50}}>
        {CustomAppBar(
          '',
          //TODO: DİSABLE İF NOTHING CHANGED OR LOADING
          ['check'],
          //navigation.navigate('SettingsScreen')
          [
            () => {
              navigation.navigate('SettingsScreen');
            },
          ],
          navigation,
          false,
        )}
      </View>
      <View style={{padding: 20}}>
        <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
          {
            <CImage
              uri={selectedImage ?? userModel.image}
              size={50}
              isProfile={true}
              radius={50}
            />
          }
          <Button
            onPress={() => {
              return Alert.alert(
                'Choose Profile Picture',

                'Select a profile picture',
                [
                  {
                    text: 'Camera',
                    onPress: () => {
                      handleCameraLaunch();
                    },
                  },
                  {
                    text: 'Gallery',
                    onPress: () => {
                      openImagePicker();
                    },
                  },
                ],
              );
            }}>
            Change Profile Picture
          </Button>
        </View>
        <View style={{marginTop: 20}} />
        <TextInput
          placeholder={userModel.name}
          onChangeText={text => {
            setUserName(text);
            console.log(text);
          }}
        />
        <View>
          <Button
            onPress={
              selectedImage || userName != userModel.name
                ? () => {
                    console.log('save');
                    updateUser(userName, selectedImage);
                  }
                : () => {}
            }>
            Save
          </Button>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
