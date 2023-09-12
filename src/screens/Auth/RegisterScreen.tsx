import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {width} from '../../utils/hw';
import {TextInput, Button} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigators/Auth';
import {useAppDispatch} from '../../store/store';
import {setEmail} from '../../store/features/RegisterSlice';
import {register} from '../../services/auth/register';
type Props = NativeStackScreenProps<AuthStackParams, 'RegisterScreen'>;
const RegisterScreen: React.FC<Props> = ({navigation, route}) => {
  const email = useRef<string>('');
  const password = useRef<string>('');
  const name = useRef<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  async function getRegister() {
    setLoading(true);
    var response = await register(
      email.current,
      password.current,
      name.current,
    );
    setLoading(false);
    if (response == 'success') {
      navigation.pop();
    } else {
    }
  }

  const dispatch = useAppDispatch();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: width / 8,
        }}>
        <Text>RegisterScreen</Text>
        <TextInput
          placeholder="Email"
          onChange={e => {
            email.current = e.nativeEvent.text;
            dispatch(setEmail({email: email.current}));
          }}
        />
        <TextInput
          placeholder="Password"
          onChange={e => {
            password.current = e.nativeEvent.text;
          }}
        />
        <TextInput
          placeholder="Name"
          onChange={e => {
            name.current = e.nativeEvent.text;
          }}
        />

        <Button
          mode="contained"
          onPress={() => {
            getRegister();
          }}>
          {loading ? 'loading...' : 'Register'}
        </Button>
        <View style={{height: 64}}></View>
        <Text>Already have an account?</Text>
        <View style={{paddingHorizontal: 50}}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.pop();
            }}>
            Login
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
