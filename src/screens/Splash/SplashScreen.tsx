import React, {useEffect} from 'react';
import {View, ActivityIndicator, Image, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAllKeys, getDataJSON} from '../../services/storage/asyncStorage';
import {AllStackParams} from '../../navigators/AllStack';
type Props = NativeStackScreenProps<AllStackParams, 'SplashScreen'>;
interface JwtClaims {
  exp: number;
  // Add other claims here if needed
}

const SplashScreen: React.FC<Props> = ({navigation, route}) => {
  useEffect(() => {
    const checkJwtExpiration = async () => {
      try {
        getAllKeys();
        const jwtToken = await getDataJSON('user');
        console.log('jwtToken', jwtToken);

        if (jwtToken) {
          const decodedToken: JwtClaims = jwtDecode(jwtToken.jwt);
          console.log('decodedToken', decodedToken);

          // Rest of your code remains the same
          const expirationTime = decodedToken.exp * 1000;
          console.log('expirationTime', expirationTime);
          const currentTime = Date.now();

          if (currentTime > expirationTime) {
            console.log('Token expired');
            navigation.replace('AuthStack');
          } else {
            console.log('Token not expired');
            navigation.replace('TabsStack');
          }
        } else {
          console.log('Token not found');
          navigation.replace('AuthStack');
        }
      } catch (error) {
        console.error('Error checking JWT expiration:', error);
        // Handle the error and navigate to an appropriate screen
      }
    };

    checkJwtExpiration();
  }, [navigation]);

  return (
    <View style={{
      flex: 1,
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Image source={require('../../../assets/images/screen_light.png')}
      
        //fill container
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export default SplashScreen;
