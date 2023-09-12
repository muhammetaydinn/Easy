import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigators/Auth';
import {Button} from 'react-native-paper';
type Props = NativeStackScreenProps<AuthStackParams, 'ForgotPasswordScreen'>;
const ForgotPasswordScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <View>
      <Text>ForgotPassword</Text>
      <Button mode="contained" onPress={() => navigation.pop()}>
        Login
      </Button>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
