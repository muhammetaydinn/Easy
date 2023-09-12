import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

export type AuthStackParams = {
  LoginScreen: any;
  RegisterScreen: any;
  ForgotPasswordScreen: any;
};

const RootStack = createNativeStackNavigator<AuthStackParams>();

function AuthStack() {
  return (
    <RootStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RootStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </RootStack.Navigator>
  );
}
export default AuthStack;
