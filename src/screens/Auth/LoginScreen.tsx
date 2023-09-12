import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthStackParams} from '../../navigators/Auth';
import {setText} from '../../store/features/LoginSlice';
import {useAppDispatch} from '../../store/store';
import {width} from '../../utils/hw';
import {login} from '../../services/auth/login';
import {useNavigation} from '@react-navigation/native';
import {AllStackParams} from '../../navigators/AllStack';

type Props = NativeStackScreenProps<AuthStackParams, 'LoginScreen'>;
const LoginScreen: React.FC<Props> = ({navigation, route}) => {
  const navigationn =
    useNavigation<NativeStackNavigationProp<AllStackParams>>();
  const navigateToHome = () => {
    navigationn.navigate('TabsStack', {screen: 'HomeScreen'});
  };
  const email = useRef<string>('');
  const password = useRef<string>('');
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function getLoginModel() {
    setLoading(true);
    var response = await login(email.current, password.current);
    setLoading(false);
    if (response == 'success') {
      navigateToHome();
    } else {
      return Alert.alert('Error', response);
    }
  }
  return (
    <View
      style={{flex: 1, justifyContent: 'center', paddingHorizontal: width / 8}}>
      <Text>LoginScreen</Text>
      <TextInput
        inputMode="email"
        placeholder="Email"
        onChange={e => {
          email.current = e.nativeEvent.text;
          dispatch(
            setText({
              email: email.current,
              password: password.current,
            }),
          );
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        inputMode="text"
        onChange={e => {
          password.current = e.nativeEvent.text;
          dispatch(
            setText({
              email: email.current,
              password: password.current,
            }),
          );
        }}
      />

      <Button
        mode="contained"
        onPress={() => {
          getLoginModel();
          console.log(
            'email:\t' + email.current + '\t\tpassword:\t' + password.current,
          );
        }}>
      {loading? "loading...": "Login"}
      </Button>
      <View style={{height: 64}}></View>
      <Text>Don't have an account?</Text>
      <View style={{paddingHorizontal: 50}}>
        <Button
          mode="contained"
          onPress={() => {
            navigation.push('RegisterScreen');
          }}>
          Register
        </Button>
        <Text>Forgot Password?</Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.push('ForgotPasswordScreen');
          }}>
          Forgot Password
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
